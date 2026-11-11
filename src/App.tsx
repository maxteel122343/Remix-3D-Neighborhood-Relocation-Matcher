/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Heart,
  Compass,
  SlidersHorizontal,
  RotateCcw,
  Footprints,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  MapPin,
  X
} from 'lucide-react';
import { CandidateHome, BuyerPreferences } from './types';
import {
  DEFAULT_PREFERENCES,
  getCandidatesNearLocation
} from './neighborhoodData';
import { scoreAndSortCandidates } from './utils/matchingEngine';
import { loadGoogleMapsScript, getGoogleMapsApiKey } from './utils';

import { NavigationHeader } from './components/NavigationHeader';
import { SwipeCardDeck } from './components/SwipeCardDeck';
import { MatchedModal } from './components/MatchedModal';
import { Realtor3DTour } from './components/Realtor3DTour';
import { BuyerPreferencesModal } from './components/BuyerPreferencesModal';
import { MatchesShortlistDrawer } from './components/MatchesShortlistDrawer';
import { useTheme } from './utils/theme';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function loadStoredShortlist(): CandidateHome[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem('relomatch_matched_shortlist');
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    if (parsed && typeof parsed.savedAt === 'number' && Array.isArray(parsed.items)) {
      if (Date.now() - parsed.savedAt > THIRTY_DAYS_MS) {
        localStorage.removeItem('relomatch_matched_shortlist');
        return [];
      }
      return parsed.items;
    }
    return [];
  } catch {
    return [];
  }
}

export default function App() {
  // 1. API Key State from Environment (Secrets: VITE_GOOGLE_MAPS_API_KEY)
  const [apiKey, setApiKey] = useState<string>(getGoogleMapsApiKey);
  const [mapsLoaded, setMapsLoaded] = useState<boolean>(false);
  const [quotaExceeded, setQuotaExceeded] = useState<boolean>(false);

  // Listen for Google Maps Platform quota exceeded limits
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Sync API key from backend config to guarantee VITE_GOOGLE_MAPS_API_KEY is active
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data?.googleMapsApiKey && typeof data.googleMapsApiKey === 'string' && data.googleMapsApiKey.trim() !== '') {
          const key = data.googleMapsApiKey.trim();
          setApiKey(key);
          if (typeof window !== 'undefined') {
            (window as any).__GOOGLE_MAPS_API_KEY__ = key;
          }
        }
      })
      .catch(() => {});
  }, []);

  // 2. Preferences State (Current Home & Dual Commute criteria)
  const [preferences, setPreferences] = useState<BuyerPreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('relomatch_buyer_preferences');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return DEFAULT_PREFERENCES;
  });

  // Theme Management (Light / Dark mode as per user preference / device)
  const { effectiveTheme, toggleTheme } = useTheme();

  // 3. Navigation Tab Mode
  const [currentTab, setCurrentTab] = useState<'swipe' | 'shortlist' | 'tour'>('swipe');

  // 4. Candidate Properties strictly based on Current Neighborhood / User Location
  const candidateHomes = useMemo(() => {
    return getCandidatesNearLocation(preferences.currentHome, preferences);
  }, [
    preferences.currentHome.lat,
    preferences.currentHome.lng,
    preferences.currentHome.neighborhood,
    preferences.currentHome.address,
    preferences.currentHome.cityId,
    preferences
  ]);

  const scoredCandidates = useMemo(() => {
    return scoreAndSortCandidates(candidateHomes, preferences);
  }, [candidateHomes, preferences]);

  const currentCityId = useMemo(() => {
    return preferences.currentHome.cityId || scoredCandidates[0]?.cityId || 'san-francisco';
  }, [preferences.currentHome.cityId, scoredCandidates]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [swipedHistory, setSwipedHistory] = useState<{ home: CandidateHome; action: 'pass' | 'match' | 'supermatch' }[]>([]);
  
  // 5. Matched Shortlist - lazy loaded with 30-day TTL check
  const [matchedHomes, setMatchedHomes] = useState<CandidateHome[]>(loadStoredShortlist);

  // 6. Active Modals & 3D Tour Target
  const [celebrationMatch, setCelebrationMatch] = useState<CandidateHome | null>(null);
  const [activeTourHome, setActiveTourHome] = useState<CandidateHome>(() => scoredCandidates[0]);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);

  // Persist matched shortlist to localStorage with 30-day TTL timestamp
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'relomatch_matched_shortlist',
        JSON.stringify({
          savedAt: Date.now(),
          items: matchedHomes,
        })
      );
    }
  }, [matchedHomes]);

  // Persist preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('relomatch_buyer_preferences', JSON.stringify(preferences));
    }
  }, [preferences]);

  // Keep activeTourHome synced with candidate list when relocation criteria changes
  useEffect(() => {
    if (scoredCandidates.length > 0) {
      const exists = scoredCandidates.some((c) => c.id === activeTourHome?.id);
      if (!exists || !activeTourHome) {
        setActiveTourHome(scoredCandidates[0]);
      }
    }
  }, [scoredCandidates, activeTourHome]);

  // Load Google Maps Platform 3D scripts
  useEffect(() => {
    const effectiveKey = apiKey || getGoogleMapsApiKey();
    if (effectiveKey) {
      loadGoogleMapsScript(effectiveKey)
        .then(() => setMapsLoaded(true))
        .catch((err) => {
          console.warn("Maps loader note:", err);
        });
    }
  }, [apiKey]);

  // Swiping Actions
  const handleSwipeLeft = useCallback((home: CandidateHome) => {
    setSwipedHistory((prev) => [...prev, { home, action: 'pass' }]);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleSwipeRight = useCallback((home: CandidateHome) => {
    setSwipedHistory((prev) => [...prev, { home, action: 'match' }]);
    setMatchedHomes((prev) => {
      if (prev.some((h) => h.id === home.id)) return prev;
      return [home, ...prev];
    });
    setCelebrationMatch(home);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleSuperMatch = useCallback((home: CandidateHome) => {
    setSwipedHistory((prev) => [...prev, { home, action: 'supermatch' }]);
    setMatchedHomes((prev) => {
      if (prev.some((h) => h.id === home.id)) return prev;
      return [home, ...prev];
    });
    setCelebrationMatch(home);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleRewind = useCallback(() => {
    if (swipedHistory.length === 0 || currentIndex === 0) return;
    const last = swipedHistory[swipedHistory.length - 1];
    setSwipedHistory((prev) => prev.slice(0, -1));
    setCurrentIndex((prev) => Math.max(0, prev - 1));

    // If it was a match, remove it from matched shortlist
    if (last && (last.action === 'match' || last.action === 'supermatch')) {
      setMatchedHomes((prev) => prev.filter((h) => h.id !== last.home.id));
    }
  }, [swipedHistory, currentIndex]);

  // Launch 3D Tour for a specific Candidate Home
  const handleLaunch3DTour = useCallback((home: CandidateHome) => {
    setActiveTourHome(home);
    setCurrentTab('tour');
  }, []);

  // Remove single match from shortlist
  const handleRemoveMatch = useCallback((homeId: string) => {
    setMatchedHomes((prev) => prev.filter((h) => h.id !== homeId));
  }, []);

  // Clear all matches
  const handleClearAllMatches = useCallback(() => {
    setMatchedHomes([]);
  }, []);

  // Save new preferences and re-evaluate matches based on user's current location
  const handleSavePreferences = async (updated: BuyerPreferences) => {
    const textChanged =
      (updated.currentHome.neighborhood || '').trim().toLowerCase() !==
        (preferences.currentHome.neighborhood || '').trim().toLowerCase() ||
      (updated.currentHome.address || '').trim().toLowerCase() !==
        (preferences.currentHome.address || '').trim().toLowerCase();

    const coordinatesMissing = !updated.currentHome.lat || !updated.currentHome.lng;
    const coordinatesUnchangedWithTextChanged =
      textChanged &&
      updated.currentHome.lat === preferences.currentHome.lat &&
      updated.currentHome.lng === preferences.currentHome.lng;

    // If coordinates missing OR neighborhood was modified without updating coords, resolve with global location service
    if (coordinatesMissing || coordinatesUnchangedWithTextChanged) {
      const { resolveLocation } = await import('./services/locationMatchingService');
      const resolved = await resolveLocation(updated.currentHome, apiKey);
      const computedCityId = (resolved.cityName || resolved.neighborhood || 'global')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-');

      updated = {
        ...updated,
        currentHome: {
          ...updated.currentHome,
          lat: resolved.lat,
          lng: resolved.lng,
          neighborhood: updated.currentHome.neighborhood || resolved.neighborhood,
          cityId: computedCityId
        }
      };
    }

    const neighborhoodChanged =
      textChanged ||
      updated.currentHome.lat !== preferences.currentHome.lat ||
      updated.currentHome.lng !== preferences.currentHome.lng;

    setPreferences(updated);

    if (neighborhoodChanged) {
      setCurrentIndex(0);
      setSwipedHistory([]);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 border border-slate-200 dark:border-slate-800/60 transition-colors ${
      currentTab === 'tour' ? 'h-screen h-[100dvh] max-h-[100dvh] overflow-hidden' : ''
    }`}>
      {/* Quota Exceeded Sticky Top Notice */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_aistudio_relocationmatcher_v1.0.0#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* 1. Header with Bumble-style Navigation Tabs & Current Neighborhood Location */}
      <NavigationHeader
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentNeighborhood={preferences.currentHome.neighborhood || preferences.currentHome.address}
        matchCount={matchedHomes.length}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        effectiveTheme={effectiveTheme}
        onToggleTheme={toggleTheme}
      />

      {/* 2. Main Viewport Content according to selected Tab */}
      <main className={`flex-1 flex flex-col relative min-h-0 ${
        currentTab === 'tour'
          ? 'overflow-hidden pb-[calc(56px+max(env(safe-area-inset-bottom),8px))] md:pb-0'
          : 'overflow-y-auto pb-24 md:pb-2'
      }`}>
        {currentTab === 'swipe' && (
          <div className="flex-1 flex flex-col justify-start sm:justify-center py-2 sm:py-4 px-2 sm:px-4 min-h-0">
            {/* Quick Context Bar for Buyer */}
            <div className="max-w-lg mx-auto w-full px-3 mb-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                <span className="truncate">
                  Relocating from: <strong className="text-slate-800 dark:text-slate-200">{preferences.currentHome.neighborhood}</strong>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[10px]">
                  {scoredCandidates.length} candidate homes
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsPreferencesOpen(true)}
                aria-label="Edit buyer relocation criteria"
                className="min-h-[44px] inline-flex items-center px-2 text-amber-600 dark:text-amber-400 hover:text-amber-500 font-semibold underline underline-offset-2 shrink-0 ml-2"
              >
                Edit Criteria
              </button>
            </div>

            {/* Swipe Deck */}
            <SwipeCardDeck
              candidates={scoredCandidates}
              currentIndex={currentIndex}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              onSuperMatch={handleSuperMatch}
              onRewind={handleRewind}
              canRewind={swipedHistory.length > 0 && currentIndex > 0}
              onLaunchTour={handleLaunch3DTour}
              onOpenPreferences={() => setIsPreferencesOpen(true)}
              preferences={preferences}
              onSelectCandidate={(index) => setCurrentIndex(index)}
            />
          </div>
        )}

        {currentTab === 'shortlist' && (
          <div className="flex-1 overflow-y-auto">
            <MatchesShortlistDrawer
              matches={matchedHomes}
              onSelectHomeForTour={handleLaunch3DTour}
              onRemoveMatch={handleRemoveMatch}
              onClearAllMatches={handleClearAllMatches}
              onGoToSwipe={() => setCurrentTab('swipe')}
            />
          </div>
        )}

        {/* Persistent 3D Realtor Tour - Retains WebGL and map canvas across tab switches */}
        <div className={`flex-1 w-full h-full min-h-0 relative overflow-hidden ${currentTab === 'tour' ? 'flex flex-col' : 'hidden'}`}>
          <Realtor3DTour
            home={activeTourHome || scoredCandidates[0]}
            onBackToSwipe={() => setCurrentTab('swipe')}
            apiKey={apiKey}
            preferences={preferences}
            isActive={currentTab === 'tour'}
          />
        </div>
      </main>

      {/* 3. Match Celebration Modal (Confetti + Commute Savings + 3D Tour CTA) */}
      <MatchedModal
        matchedHome={celebrationMatch}
        onClose={() => setCelebrationMatch(null)}
        onLaunchTour={handleLaunch3DTour}
        preferences={preferences}
      />

      {/* 4. Dual Commute & Criteria Customization Modal */}
      <BuyerPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onSavePreferences={handleSavePreferences}
        selectedCityId={currentCityId}
      />
    </div>
  );
}
