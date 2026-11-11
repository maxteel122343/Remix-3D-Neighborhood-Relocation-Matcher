export interface RealtorPromptContext {
  candidate: {
    title: string;
    address?: string;
    neighborhood?: string;
    propertyType?: string;
    beds?: number;
    baths?: number;
    sqft?: number;
    price?: string;
    vibeLabel?: string;
    vibeNarrative?: string;
    vibeTags?: string[];
    realtorName?: string;
    realtorAgency?: string;
    dualCommute?: {
      partner1?: {
        workplaceLabel?: string;
        destinationName?: string;
        driveMinutes?: number;
        transitMinutes?: number;
        deltaMinutesVsCurrent?: number;
      };
      partner2?: {
        workplaceLabel?: string;
        destinationName?: string;
        driveMinutes?: number;
        transitMinutes?: number;
        deltaMinutesVsCurrent?: number;
      };
      summaryText?: string;
      totalDailySavingsMinutes?: number;
    };
    hotspots?: Array<{
      title: string;
      category?: string;
      walkMinutes?: number;
    }>;
  };
  buyerContext?: {
    relocatingFrom?: string;
  };
}

export function buildRealtorSummaryPrompt(ctx: RealtorPromptContext): { promptText: string; systemInstruction: string } {
  const { candidate, buyerContext } = ctx;
  const realtorName = candidate.realtorName || 'Mariana Vance';
  const realtorAgency = candidate.realtorAgency || 'Compass Real Estate';

  const p1 = candidate.dualCommute?.partner1;
  const p2 = candidate.dualCommute?.partner2;
  const commuteDetails = [
    p1 ? `Partner 1 (${p1.workplaceLabel || p1.destinationName || 'Workplace'}): ${p1.driveMinutes || p1.transitMinutes || 20}m commute ${p1.deltaMinutesVsCurrent ? `(${p1.deltaMinutesVsCurrent > 0 ? '+' : ''}${p1.deltaMinutesVsCurrent}m vs current home)` : ''}` : null,
    p2 ? `Partner 2 (${p2.workplaceLabel || p2.destinationName || 'Workplace'}): ${p2.driveMinutes || p2.transitMinutes || 25}m commute ${p2.deltaMinutesVsCurrent ? `(${p2.deltaMinutesVsCurrent > 0 ? '+' : ''}${p2.deltaMinutesVsCurrent}m vs current home)` : ''}` : null,
    candidate.dualCommute?.summaryText ? `Commute Note: ${candidate.dualCommute.summaryText}` : null,
    candidate.dualCommute?.totalDailySavingsMinutes ? `Total Daily Savings: ${candidate.dualCommute.totalDailySavingsMinutes} mins saved daily` : null,
  ].filter(Boolean).join('. ');

  const hotspotList = (candidate.hotspots || [])
    .slice(0, 4)
    .map((h) => `${h.title} (${h.category || 'Hotspot'}, ${h.walkMinutes || 5} min walk)`)
    .join(', ');

  const promptText = `Generate an audio pitch from the realtor to the prospective buyer couple.

RAW CANDIDATE HOME DATA:
- Property: ${candidate.title} located at ${candidate.address || candidate.neighborhood}
- Type & Specs: ${candidate.propertyType || 'Home'}, ${candidate.beds} beds, ${candidate.baths} baths, ${candidate.sqft} sq ft, priced at ${candidate.price}
- Neighborhood Vibe & Character: "${candidate.vibeLabel || 'Vibrant & Connected'}" - ${candidate.vibeNarrative || 'An exceptional community with tree-lined streets and local culture'}
- Neighborhood Tags: ${(candidate.vibeTags || []).join(', ')}
- Dual Commute Setup: ${commuteDetails || 'Balanced commute times for both partners'}
- Nearby Pedestrian Hotspots: ${hotspotList || 'Walkable cafes, green parks, and rapid transit'}
- Buyer Relocation Origin: Relocating from ${buyerContext?.relocatingFrom || 'current neighborhood'}

REQUIREMENTS:
1. Role: Speak in the first person as ${realtorName} from ${realtorAgency} ("I chose this place for you...", "What makes this home such an outstanding match...").
2. Core message: Explain WHY this place is relevant as their new home destination.
3. Key elements to naturally weave in:
   - Highlight the dual commute advantages and how it creates balance for both partners' work destinations.
   - Convey the feeling of the neighborhood based on its vibe and pedestrian hotspots (like morning coffee steps away or weekend strolls in the park).
4. Tone: Warm, engaging, professional, and authentic—like a personal voice memo from an expert friend.
5. Strict Length: Exactly 3 to 4 spoken sentences (between 45 and 65 words).
6. DO NOT read raw data tables or recite numbers like a bot.
7. Return ONLY the spoken script with no quotation marks, no markdown headers, and no stage directions.`;

  const systemInstruction = `You are ${realtorName}, a top-tier local real estate advisor at ${realtorAgency}.
You write spoken audio scripts that sound effortless, conversational, and genuinely persuasive when synthesized with Text-to-Speech.
Avoid robotic reciting of stats. Focus on lifestyle benefits, dual commute advantages, and neighborhood character.`;

  return { promptText, systemInstruction };
}
