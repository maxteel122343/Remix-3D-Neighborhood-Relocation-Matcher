import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Heart,
  Compass,
  Briefcase,
  GraduationCap,
  Footprints,
  ArrowRight,
  X
} from 'lucide-react';
import { CandidateHome, BuyerPreferences } from '../types';

interface MatchedModalProps {
  matchedHome: CandidateHome | null;
  onClose: () => void;
  onLaunchTour: (home: CandidateHome) => void;
  preferences: BuyerPreferences;
}

export const MatchedModal: React.FC<MatchedModalProps> = ({
  matchedHome,
  onClose,
  onLaunchTour,
  preferences
}) => {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchedHome) {
      // Auto-focus primary CTA for keyboard users (WCAG 2.4.3 Focus Order)
      setTimeout(() => {
        primaryButtonRef.current?.focus();
      }, 50);

      // Fire vibrant Bumble-style golden confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#10B981', '#38BDF8']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [matchedHome]);

  // Handle Escape key & trap focus inside dialog
  useEffect(() => {
    if (!matchedHome) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [matchedHome, onClose]);

  if (!matchedHome) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="matched-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md max-h-[90dvh] my-auto overflow-y-auto scrollbar-thin rounded-3xl bg-white dark:bg-slate-900 border border-amber-400 dark:border-amber-500/40 shadow-2xl shadow-amber-500/20 text-slate-900 dark:text-white flex flex-col transition-colors"
      >
        {/* Close button with 44x44px target */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close match dialog"
          className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white flex items-center justify-center transition border border-slate-200 dark:border-slate-700/60"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="relative p-6 pt-8 text-center bg-gradient-to-b from-amber-500/20 via-amber-500/5 to-transparent flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 mb-3 animate-bounce">
            <Heart className="w-8 h-8 fill-slate-950 stroke-slate-950" />
          </div>

          <span className="text-[11px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 mb-2">
            Match Found!
          </span>

          <h2 id="matched-modal-title" className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            It's a Neighborhood Match!
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xs">
            {matchedHome.neighborhood} aligns {matchedHome.matchScore}% with your dual-commute and family criteria.
          </p>
        </div>

        {/* Property & Neighborhood Match Card */}
        <div className="px-6 space-y-3.5">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 bg-slate-950 h-36">
            <img
              src={matchedHome.heroImage}
              alt={matchedHome.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                  {matchedHome.neighborhood}
                </span>
                <h4 className="text-sm font-bold text-white leading-tight truncate">
                  {matchedHome.title}
                </h4>
              </div>
              <span className="text-sm font-black text-white px-2 py-0.5 rounded-lg bg-slate-950/70 backdrop-blur border border-white/20">
                {matchedHome.formattedPrice}
              </span>
            </div>
          </div>

          {/* Key Match Highlights */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Commute */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Dual Commute</div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {matchedHome.dualCommute.combinedAverageMins}m avg
              </div>
            </div>

            {/* Schools */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
              <div className="text-[10px] text-slate-500 dark:text-slate-400">School Rating</div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-300 mt-0.5">
                {matchedHome.schoolScore}/10 Top
              </div>
            </div>

            {/* Walkability */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <Footprints className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <div className="text-[10px] text-slate-500 dark:text-slate-400">15-Min Walk</div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-300 mt-0.5">
                Score {matchedHome.walkScore}
              </div>
            </div>
          </div>

          {/* Savings Notice */}
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{matchedHome.dualCommute.savingsSummary}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-5 space-y-2.5">
          <button
            ref={primaryButtonRef}
            type="button"
            onClick={() => {
              onLaunchTour(matchedHome);
              onClose();
            }}
            className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 transition transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Compass className="w-4 h-4" />
            <span>Launch 3D Realtor Tour</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition"
          >
            Keep Swiping More Homes
          </button>
        </div>
      </div>
    </div>
  );
};
