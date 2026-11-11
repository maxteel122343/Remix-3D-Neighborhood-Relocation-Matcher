import React from 'react';
import {
  Heart,
  Compass,
  Briefcase,
  GraduationCap,
  Footprints,
  Sparkles,
  Trash2,
  ArrowRight,
  MapPin,
  TrendingDown
} from 'lucide-react';
import { CandidateHome } from '../types';

interface MatchesShortlistDrawerProps {
  matches: CandidateHome[];
  onSelectHomeForTour: (home: CandidateHome) => void;
  onRemoveMatch: (homeId: string) => void;
  onClearAllMatches: () => void;
  onGoToSwipe: () => void;
}

export const MatchesShortlistDrawer: React.FC<MatchesShortlistDrawerProps> = ({
  matches,
  onSelectHomeForTour,
  onRemoveMatch,
  onClearAllMatches,
  onGoToSwipe
}) => {
  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] p-6 text-center max-w-md mx-auto text-slate-800 dark:text-white">
        <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-500 dark:text-amber-300">
          <Heart className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">No matches saved yet</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          Swipe right on candidate homes in the discovery deck to save them to your matched relocation shortlist.
        </p>
        <button
          type="button"
          onClick={onGoToSwipe}
          className="min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg shadow-amber-400/20 transition"
        >
          <Sparkles className="w-4 h-4" />
          <span>Start Swiping Neighborhoods</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 text-slate-900 dark:text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Your Matched Neighborhood Shortlist
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs">
              {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare dual commute times, school rankings, and jump into 3D Realtor tours
          </p>
        </div>

        <button
          type="button"
          onClick={onClearAllMatches}
          aria-label="Clear all matches from shortlist"
          className="min-h-[44px] self-start sm:self-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear Shortlist</span>
        </button>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {matches.map((home) => (
          <div
            key={home.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 shadow-xl overflow-hidden flex flex-col transition group"
          >
            {/* Property Image & Badges */}
            <div className="relative h-48 bg-slate-950 overflow-hidden">
              <img
                src={home.heroImage}
                alt={home.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />

              {/* Match Score */}
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                <span>{home.matchScore}% Match</span>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => onRemoveMatch(home.id)}
                className="absolute top-2.5 right-2.5 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur transition border border-slate-700/60 shadow-lg"
                aria-label={`Remove ${home.title} from shortlist`}
                title={`Remove ${home.title} from shortlist`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Price & Neighborhood */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide">
                    {home.neighborhood}
                  </span>
                  <div className="text-lg font-black text-white leading-tight">
                    {home.formattedPrice}
                  </div>
                </div>
                <span className="text-[11px] text-slate-200 px-2 py-0.5 rounded bg-slate-950/70 backdrop-blur">
                  {home.beds}b • {home.baths}ba • {home.sqft} sqft
                </span>
              </div>
            </div>

            {/* Match Metrics Content */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight line-clamp-1">
                  {home.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-500 dark:text-amber-400 shrink-0" />
                  <span className="truncate">{home.address}</span>
                </p>

                {/* Commute Summary */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                      <span>Dual Commute</span>
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {home.dualCommute.combinedAverageMins}m avg
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] text-slate-700 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-700/60">
                    <div>P1: {home.dualCommute.partner1.durationMins}m ({home.dualCommute.partner1.mode})</div>
                    <div>P2: {home.dualCommute.partner2.durationMins}m ({home.dualCommute.partner2.mode})</div>
                  </div>
                </div>

                {/* Schools & Walkability Badges */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20 text-center">
                    <div className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold flex items-center justify-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      <span>Schools</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                      {home.schoolScore}/10 Rating
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-center">
                    <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-center gap-1">
                      <Footprints className="w-3 h-3" />
                      <span>Walk Score</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                      {home.walkScore} / 100
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button: Fly into 3D Tour */}
              <button
                type="button"
                onClick={() => onSelectHomeForTour(home)}
                aria-label={`Fly 3D Realtor Tour for ${home.title}`}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20 transition mt-3"
              >
                <Compass className="w-4 h-4" />
                <span>Fly 3D Realtor Tour</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
