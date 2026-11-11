import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Modality } from '@google/genai';
import dotenv from 'dotenv';
import { buildRealtorSummaryPrompt } from './prompt_templates/realtorSummaryPrompt';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Function to obtain an initialized GoogleGenAI client strictly using GEMINI_API_KEY
function getGenAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables. Please provide GEMINI_API_KEY.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

/**
 * Parses Gemini SDK and API errors to return a friendly, structured response
 */
function parseGeminiError(err: any): { statusCode: number; message: string } {
  const errMsg = typeof err?.message === 'string' ? err.message : JSON.stringify(err || '');
  if (
    errMsg.includes('API_KEY_INVALID') ||
    errMsg.includes('API key not valid') ||
    (errMsg.includes('INVALID_ARGUMENT') && errMsg.includes('API key'))
  ) {
    return {
      statusCode: 401,
      message: 'GEMINI_API_KEY is invalid or expired. Please check your API key in Settings > Secrets.',
    };
  }
  if (
    errMsg.includes('PERMISSION_DENIED') ||
    errMsg.includes('blocked') ||
    errMsg.includes('ACCESS_TOKEN_SCOPE_INSUFFICIENT')
  ) {
    return {
      statusCode: 403,
      message: 'GEMINI_API_KEY does not have access to the Gemini API. Please check your key in Settings > Secrets.',
    };
  }
  if (errMsg.includes('RESOURCE_EXHAUSTED') || errMsg.includes('Quota') || errMsg.includes('429')) {
    return {
      statusCode: 429,
      message: 'Gemini API quota exceeded. Please check your key or upgrade in Settings > Secrets.',
    };
  }
  return {
    statusCode: 500,
    message: err?.message || 'Gemini processing failed',
  };
}

/**
 * Wrap raw 16-bit linear PCM at 24kHz mono into a standard WAV audio container
 * Enforces 16-bit word alignment and RIFF chunk padding
 */
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitsPerSample = 16): Buffer {
  const bytesPerSample = (bitsPerSample / 8) * numChannels;
  const alignedSize = pcmBuffer.length - (pcmBuffer.length % bytesPerSample);
  const cleanBuffer = alignedSize === pcmBuffer.length ? pcmBuffer : pcmBuffer.subarray(0, alignedSize);
  const dataSize = cleanBuffer.length;
  const paddingByte = dataSize % 2 !== 0 ? 1 : 0;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize + paddingByte, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // Subchunk1Size
  header.writeUInt16LE(1, 20); // AudioFormat: 1 (PCM)
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * bytesPerSample, 28);
  header.writeUInt16LE(bytesPerSample, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return paddingByte > 0
    ? Buffer.concat([header, cleanBuffer, Buffer.from([0])])
    : Buffer.concat([header, cleanBuffer]);
}

async function startServer() {
  const app = express();
  app.set("trust proxy", 2);
  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'realtor-3d-matcher' });
  });

  // Client configuration endpoint for Maps API key
  app.get('/api/config', (req, res) => {
    res.json({
      googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
    });
  });

  // Gemini TTS Natural Voice Narration Endpoint
  app.post('/api/gemini/tts', async (req, res) => {
    try {
      const { text, voiceName } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Text prompt is required for TTS' });
      }

      if (!process.env.GEMINI_API_KEY?.trim()) {
        return res.status(401).json({
          error: 'GEMINI_API_KEY is not configured in environment variables. Gemini TTS requires GEMINI_API_KEY.',
        });
      }

      const ai = getGenAI();

      // Available prebuilt voices: 'Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'
      const selectedVoice = voiceName || 'Kore';

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: text.trim() }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      let base64Audio: string | undefined;
      let audioMime = 'audio/wav';

      const parts = response.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.data) {
          base64Audio = part.inlineData.data;
          if (part.inlineData.mimeType) {
            audioMime = part.inlineData.mimeType;
          }
          break;
        }
      }

      if (!base64Audio) {
        throw new Error('No audio content returned from Gemini TTS model');
      }

      let finalAudioUrl: string;
      if (audioMime.includes('wav') || audioMime.includes('mp3') || audioMime.includes('ogg')) {
        finalAudioUrl = `data:${audioMime};base64,${base64Audio}`;
      } else {
        const rawPcmBuffer = Buffer.from(base64Audio, 'base64');
        const wavBuffer = pcmToWav(rawPcmBuffer, 24000, 1, 16);
        finalAudioUrl = `data:audio/wav;base64,${wavBuffer.toString('base64')}`;
      }

      res.json({
        audio: finalAudioUrl,
        mimeType: 'audio/wav',
        voice: selectedVoice,
        provider: 'Gemini TTS (gemini-3.1-flash-tts-preview)',
      });
    } catch (err: any) {
      const parsed = parseGeminiError(err);
      console.warn(`Gemini TTS notice (${parsed.statusCode}):`, parsed.message);
      res.status(parsed.statusCode).json({
        error: parsed.message,
      });
    }
  });

  // Gemini 3.8 + Gemini TTS: Personalized Realtor Summary & Voice Pitch Endpoint
  app.post('/api/gemini/realtor-summary-tts', async (req, res) => {
    const { candidate, buyerContext, voiceName } = req.body || {};

    if (!candidate) {
      return res.status(400).json({ error: 'Candidate home data is required' });
    }

    if (!process.env.GEMINI_API_KEY?.trim()) {
      return res.status(401).json({
        error: 'GEMINI_API_KEY is not configured in environment variables. Gemini TTS and summary generation require GEMINI_API_KEY.',
      });
    }

    const realtorName = candidate.realtorName || 'Mariana Vance';
    const realtorAgency = candidate.realtorAgency || 'Compass Real Estate';
    const selectedVoice = voiceName || (realtorName.toLowerCase().includes('mariana') ? 'Kore' : 'Puck');

    const { promptText, systemInstruction } = buildRealtorSummaryPrompt({
      candidate,
      buyerContext,
    });

    try {
      const ai = getGenAI();

      // Step 1: Ask Gemini 3.8 Flash to generate the conversational realtor summary script
      const summaryResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const generatedScript = summaryResponse.text?.trim();
      if (!generatedScript) {
        throw new Error('Gemini did not return text for the realtor summary');
      }

      // Step 2: Pass the generated script to Gemini TTS
      const ttsResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-tts-preview',
        contents: [{ parts: [{ text: generatedScript }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice },
            },
          },
        },
      });

      let base64Audio: string | undefined;
      let audioMime = 'audio/wav';

      const ttsParts = ttsResponse.candidates?.[0]?.content?.parts || [];
      for (const part of ttsParts) {
        if (part.inlineData?.data) {
          base64Audio = part.inlineData.data;
          if (part.inlineData.mimeType) {
            audioMime = part.inlineData.mimeType;
          }
          break;
        }
      }

      if (!base64Audio) {
        throw new Error('Gemini TTS did not return audio data');
      }

      let finalAudioUrl: string;
      if (audioMime.includes('wav') || audioMime.includes('mp3') || audioMime.includes('ogg')) {
        finalAudioUrl = `data:${audioMime};base64,${base64Audio}`;
      } else {
        const rawPcmBuffer = Buffer.from(base64Audio, 'base64');
        const wavBuffer = pcmToWav(rawPcmBuffer, 24000, 1, 16);
        finalAudioUrl = `data:audio/wav;base64,${wavBuffer.toString('base64')}`;
      }

      res.json({
        summaryScript: generatedScript,
        audio: finalAudioUrl,
        mimeType: 'audio/wav',
        voice: selectedVoice,
        realtorName,
        realtorAgency,
        modelUsedForScript: 'gemini-3.8-flash',
        modelUsedForTTS: 'gemini-3.1-flash-tts-preview',
        dataPassedToTTS: {
          text: generatedScript,
          voiceName: selectedVoice,
        },
        dataPassedToGemini38: {
          candidate,
          buyerContext,
        },
      });
    } catch (err: any) {
      const parsed = parseGeminiError(err);
      console.warn(`Gemini Realtor Summary TTS notice (${parsed.statusCode}):`, parsed.message);
      res.status(parsed.statusCode).json({
        error: parsed.message,
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      try {
        let html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
        const mapsApiKey = process.env.VITE_GOOGLE_MAPS_API_KEY || '';
        html = html.replace(
          '<head>',
          `<head>\n    <script>window.__GOOGLE_MAPS_API_KEY__ = ${JSON.stringify(mapsApiKey)};</script>`
        );
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
      } catch {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
