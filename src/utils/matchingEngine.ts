import { CandidateHome, BuyerPreferences, DualCommute } from '../types';
import { estimateCommuteDuration } from './geoUtils';

/**
 * Calculates dynamically adjusted match score and dual commute based on buyer preferences.
 */
export function recalculateCandidateMatch(
  home: CandidateHome,
  preferences: BuyerPreferences
): CandidateHome {
  // 1. Calculate commute to Partner 1 Workplace
  const p1Commute = estimateCommuteDuration(
    home.lat,
    home.lng,
    preferences.partner1Work.lat,
    preferences.partner1Work.lng,
    preferences.partner1Work.preferredMode
  );

  // 2. Calculate commute to Partner 2 Workplace
  const p2Commute = estimateCommuteDuration(
    home.lat,
    home.lng,
    preferences.partner2Work.lat,
    preferences.partner2Work.lng,
    preferences.partner2Work.preferredMode
  );

  // 3. Calculate baseline commute from CURRENT HOME to both workplaces for delta comparison
  const currentP1 = estimateCommuteDuration(
    preferences.currentHome.lat,
    preferences.currentHome.lng,
    preferences.partner1Work.lat,
    preferences.partner1Work.lng,
    preferences.partner1Work.preferredMode
  );
  const currentP2 = estimateCommuteDuration(
    preferences.currentHome.lat,
    preferences.currentHome.lng,
    preferences.partner2Work.lat,
    preferences.partner2Work.lng,
    preferences.partner2Work.preferredMode
  );

  const newCombinedAvg = Math.round((p1Commute.durationMins + p2Commute.durationMins) / 2);
  const currentCombinedAvg = Math.round((currentP1.durationMins + currentP2.durationMins) / 2);
  const deltaVsCurrent = (newCombinedAvg - currentCombinedAvg) * 2; // Total round trip daily delta

  const savingsSummary =
    deltaVsCurrent <= 0
      ? `Saves ${Math.abs(deltaVsCurrent)} mins round-trip daily vs current ${preferences.currentHome.neighborhood} home`
      : `+${deltaVsCurrent} mins daily commute vs current home`;

  const updatedDualCommute: DualCommute = {
    partner1: {
      destinationName: preferences.partner1Work.name,
      workplaceLabel: `Partner 1 (${preferences.partner1Work.name})`,
      durationMins: p1Commute.durationMins,
      distanceKm: p1Commute.distanceKm,
      mode: preferences.partner1Work.preferredMode,
      routeSummary: p1Commute.routeSummary,
      rushHourEstimateMins: Math.round(p1Commute.durationMins * 1.2)
    },
    partner2: {
      destinationName: preferences.partner2Work.name,
      workplaceLabel: `Partner 2 (${preferences.partner2Work.name})`,
      durationMins: p2Commute.durationMins,
      distanceKm: p2Commute.distanceKm,
      mode: preferences.partner2Work.preferredMode,
      routeSummary: p2Commute.routeSummary,
      rushHourEstimateMins: Math.round(p2Commute.durationMins * 1.2)
    },
    combinedAverageMins: newCombinedAvg,
    comparisonVsCurrentMins: deltaVsCurrent,
    savingsSummary
  };

  // 4. Calculate Scoring Components (0 to 100)
  // A. Commute Score: Ideal is <20 mins, penalized above maxCommuteMinutes
  let commuteScore = 100;
  if (newCombinedAvg > 20) {
    const penalty = ((newCombinedAvg - 20) / Math.max(15, preferences.maxCommuteMinutes - 20)) * 40;
    commuteScore = Math.max(30, 100 - penalty);
  }
  if (deltaVsCurrent < 0) {
    commuteScore = Math.min(100, commuteScore + Math.abs(deltaVsCurrent) * 1.2);
  }

  // B. School Score: Based on school rating vs minSchoolScore
  let schoolSubScore = (home.schoolScore / 10) * 100;
  if (home.schoolScore < preferences.minSchoolScore) {
    schoolSubScore = Math.max(40, schoolSubScore - 25);
  }

  // C. Vibe Match Score
  const isVibeMatched = preferences.targetVibes.includes(home.vibe);
  const vibeScore = isVibeMatched ? 98 : 75;

  // D. Walkability Score
  const walkScore = home.walkScore;

  // Weighted Total
  const weights = preferences.priorityWeights;
  const totalWeight = weights.vibe + weights.schools + weights.commute + weights.walkability;
  const rawWeightedScore =
    totalWeight > 0
      ? (vibeScore * weights.vibe +
          schoolSubScore * weights.schools +
          commuteScore * weights.commute +
          walkScore * weights.walkability) /
        totalWeight
      : 80;

  const finalMatchScore = Math.min(99, Math.max(65, Math.round(rawWeightedScore)));

  return {
    ...home,
    dualCommute: updatedDualCommute,
    matchScore: finalMatchScore
  };
}

/**
 * Re-scores and sorts candidate homes from highest to lowest match score.
 */
export function scoreAndSortCandidates(
  homes: CandidateHome[],
  preferences: BuyerPreferences
): CandidateHome[] {
  return homes
    .map((home) => recalculateCandidateMatch(home, preferences))
    .sort((a, b) => b.matchScore - a.matchScore);
}
