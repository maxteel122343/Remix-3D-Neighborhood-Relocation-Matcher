import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'motion/react';
import {
  X,
  Heart,
  Star,
  RotateCcw,
  Compass,
  GraduationCap,
  Briefcase,
  Footprints,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  TrendingDown
} from 'lucide-react';
import { CandidateHome, BuyerPreferences } from '../types';

interface SwipeCardDeckProps {
  candidates: CandidateHome[];
  currentIndex: number;
  onSwipeLeft: (home: CandidateHome) => void;
  onSwipeRight: (home: CandidateHome) => void;
  onSuperMatch: (home: CandidateHome) => void;
  onRewind: () => void;
  canRewind: boolean;
  onLaunchTour: (home: CandidateHome) => void;
  onOpenPreferences: () => void;
  preferences: BuyerPreferences;
  onSelectCandidate?: (index: number) => void;
}

interface SwipeCardItemProps {
  home: CandidateHome;
  onSwipeLeft: (home: CandidateHome) => void;
  onSwipeRight: (home: CandidateHome) => void;
  onLaunchTour: (home: CandidateHome) => void;
  candidateNumber?: number;
  totalCandidates?: number;
  currentIndex?: number;
  onSelectCandidate?: (index: number) => void;
}

const SwipeCardItem: React.FC<SwipeCardItemProps> = ({
  home,
  onSwipeLeft,
  onSwipeRight,
  onLaunchTour,
  candidateNumber,
  totalCandidates = 8,
  currentIndex,
  onSelectCandidate
}) => {
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(false);

  // Fresh isolated motion values for this specific card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Derived rotation and stamp opacities
  const rotate = useTransform(x, [-250, 0, 250], [-20, 0, 20]);
  const opacityLike = useTransform(x, [30, 120], [0, 1]);
  const opacityPass = useTransform(x, [-120, -30], [1, 0]);

  // Ensure card starts strictly at 0 rotation and position
  useEffect(() => {
    x.set(0);
    y.set(0);
    setPhotoIndex(0);
  }, [home.id, x, y]);

  const handleDragEnd = async (_: any, info: any) => {
    const threshold = 110;
    const velocityThreshold = 400;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      // Fly out right
      await animate(x, 500, { duration: 0.18 });
      onSwipeRight(home);
    } else if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      // Fly out left
      await animate(x, -500, { duration: 0.18 });
      onSwipeLeft(home);
    } else {
      // Snap back to strictly upright center
      animate(x, 0, { type: 'spring', stiffness: 450, damping: 28 });
      animate(y, 0, { type: 'spring', stiffness: 450, damping: 28 });
    }
  };

  const gallery = home.galleryImages && home.galleryImages.length > 0
    ? home.galleryImages
    : [home.heroImage];

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % gallery.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <motion.div
      key={home.id}
      style={{ x, y, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="relative w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col cursor-grab active:cursor-grabbing text-slate-900 dark:text-white transition-colors"
      initial={{ scale: 0.95, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
    >
      {/* Bumble-like Swipe Stamp Badges */}
      <motion.div
        style={{ opacity: opacityLike }}
        className="absolute top-6 left-6 z-30 pointer-events-none px-4 py-1.5 rounded-xl bg-emerald-500/90 border-2 border-white text-white font-black text-xl tracking-wider uppercase rotate-[-12deg] shadow-lg shadow-emerald-500/50 flex items-center gap-1.5"
      >
        <Heart className="w-5 h-5 fill-white" />
        <span>MATCH</span>
      </motion.div>

      <motion.div
        style={{ opacity: opacityPass }}
        className="absolute top-6 right-6 z-30 pointer-events-none px-4 py-1.5 rounded-xl bg-rose-600/90 border-2 border-white text-white font-black text-xl tracking-wider uppercase rotate-[12deg] shadow-lg shadow-rose-600/50 flex items-center gap-1.5"
      >
        <X className="w-5 h-5 stroke-[3]" />
        <span>PASS</span>
      </motion.div>

      {/* Top Image Hero with Carousel - Responsive height for mobile/desktop */}
      <div className="relative w-full h-[190px] xs:h-[230px] sm:h-[300px] bg-slate-950 overflow-hidden shrink-0">
        <img
          src={gallery[photoIndex]}
          alt={home.title}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        {/* Top Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60" />

        {/* Candidate Selection Progress Indicators (Always shows all 8 candidates) */}
        <div
          id="candidate-deck-indicators"
          className="absolute top-2.5 inset-x-3 sm:inset-x-4 flex items-center gap-1 sm:gap-1.5 z-30"
        >
          {Array.from({ length: totalCandidates || 8 }).map((_, idx) => {
            const currentIdx = typeof currentIndex === 'number'
              ? currentIndex
              : (candidateNumber ? candidateNumber - 1 : 0);
            const isCurrent = idx === currentIdx;
            const isViewed = idx < currentIdx;
            return (
              <button
                key={idx}
                type="button"
                id={`candidate-deck-indicator-${idx}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCandidate?.(idx);
                }}
                title={`Candidate Home ${idx + 1} of ${totalCandidates || 8}`}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-400 ring-1 ring-amber-300 shadow-sm shadow-amber-400/80 scale-y-110'
                    : isViewed
                    ? 'bg-amber-400/80 hover:bg-amber-400'
                    : 'bg-white/25 hover:bg-white/40'
                }`}
                aria-label={`Jump to candidate ${idx + 1} of ${totalCandidates || 8}`}
              />
            );
          })}
        </div>

        {/* Photo Navigation Click Zones */}
        <button
          type="button"
          aria-label="Previous photo"
          onClick={handlePrevPhoto}
          className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-pointer flex items-center px-2 opacity-0 hover:opacity-100 focus:opacity-100 transition bg-transparent border-0"
        >
          <div className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center shadow-md">
            <ChevronLeft className="w-5 h-5" />
          </div>
        </button>

        <button
          type="button"
          aria-label="Next photo"
          onClick={handleNextPhoto}
          className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-pointer flex items-center justify-end px-2 opacity-0 hover:opacity-100 focus:opacity-100 transition bg-transparent border-0"
        >
          <div className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur text-white flex items-center justify-center shadow-md">
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>

        {/* Match Score Badge (Bumble Golden Glow) */}
        <div className="absolute top-6 left-3.5 sm:left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          <span>{home.matchScore}% Match</span>
        </div>

        {/* Top Right: Property Deck Index & Photo Counter */}
        <div className="absolute top-6 right-3.5 sm:right-4 z-20 flex items-center gap-1.5">
          {candidateNumber && totalCandidates && (
            <span className="px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur border border-slate-700/60 text-white text-[11px] font-bold shadow-md">
              Home {candidateNumber} of {totalCandidates}
            </span>
          )}
          {gallery.length > 1 && (
            <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/90 text-[10px] font-medium hidden sm:inline-block">
              Photo {photoIndex + 1}/{gallery.length}
            </span>
          )}
        </div>

        {/* Photo Dots Indicator inside Hero Image */}
        {gallery.length > 1 && (
          <div className="absolute bottom-14 inset-x-0 flex justify-center items-center gap-1.5 z-20 pointer-events-none">
            {gallery.map((_, pIdx) => (
              <span
                key={pIdx}
                className={`inline-block rounded-full transition-all duration-300 ${
                  pIdx === photoIndex
                    ? 'w-4 h-1.5 bg-white shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Price & Property Type Floating Badge */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {home.formattedPrice}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur text-white text-[11px] font-semibold">
                {home.propertyType}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
              <span>{home.beds} Beds</span>
              <span>•</span>
              <span>{home.baths} Baths</span>
              <span>•</span>
              <span>{home.sqft.toLocaleString()} sqft</span>
            </div>
          </div>

          {/* 3D Tour Direct Button */}
          <button
            type="button"
            aria-label={`Launch 3D camera tour for ${home.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onLaunchTour(home);
            }}
            className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-400/20 transition transform hover:scale-105 active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>3D Tour</span>
          </button>
        </div>
      </div>

      {/* Card Body & Match Criteria Breakdown */}
      <div className="p-3.5 sm:p-5 space-y-3 sm:space-y-4 max-h-[36vh] sm:max-h-[380px] overflow-y-auto scrollbar-thin">
        {/* Title & Neighborhood */}
        <div>
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>{home.neighborhood}, {home.cityName}</span>
          </div>
          <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
            {home.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{home.address}</p>

          {/* Mobile Quick Summary Pill & Collapse Details Toggle */}
          <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold truncate">
              <TrendingDown className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{home.dualCommute.savingsSummary}</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDetailsExpanded(!isDetailsExpanded);
              }}
              className="sm:hidden px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 text-[11px] font-bold flex items-center gap-1 transition shrink-0"
              aria-expanded={isDetailsExpanded}
              aria-label={isDetailsExpanded ? "Show fewer details" : "Show full details breakdown"}
            >
              <span>{isDetailsExpanded ? 'Less Info' : 'More Info'}</span>
              {isDetailsExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Collapsible Detailed Sections (Always visible on desktop sm:, collapsible on mobile) */}
        <div className={`${isDetailsExpanded ? 'block' : 'hidden sm:block'} space-y-3 sm:space-y-4 animate-in fade-in duration-200`}>
          {/* Neighborhood Vibe Banner */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Neighborhood Vibe</span>
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-200 font-semibold">
                {home.vibeLabel}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {home.vibeDescription}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {(home.vibeTags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Dual Workplace Commute Breakdown */}
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Dual Workplace Commute</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>{home.dualCommute.savingsSummary}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Partner 1 */}
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {home.dualCommute.partner1.workplaceLabel}
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-extrabold text-amber-600 dark:text-amber-300">
                    {home.dualCommute.partner1.durationMins}m
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    ({home.dualCommute.partner1.mode})
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {home.dualCommute.partner1.routeSummary}
                </div>
              </div>

              {/* Partner 2 */}
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {home.dualCommute.partner2.workplaceLabel}
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-base font-extrabold text-amber-600 dark:text-amber-300">
                    {home.dualCommute.partner2.durationMins}m
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    ({home.dualCommute.partner2.mode})
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {home.dualCommute.partner2.routeSummary}
                </div>
              </div>
            </div>
          </div>

          {/* School Rankings & 15-Min Walkability Quick Summary */}
          <div className="grid grid-cols-2 gap-2">
            {/* School Rating */}
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/20">
              <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 text-xs font-bold mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Schools {home.schoolScore}/10</span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                {home.schools[0]?.name} ({home.schools[0]?.type}) - {home.schools[0]?.distanceWalkMins} min walk
              </div>
            </div>

            {/* 15-Min Walkability */}
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20">
              <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-1">
                <Footprints className="w-3.5 h-3.5" />
                <span>Walk Score {home.walkScore}</span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
                {home.walkabilityHighlights[0] || '15-min walk circle to essentials'}
              </div>
            </div>
          </div>

          {/* Realtor Pitch Preview */}
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 flex items-start gap-3">
            <img
              src={home.realtor.avatar}
              alt={home.realtor.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-400/40 shrink-0"
            />
            <div className="flex-1 text-xs">
              <div className="font-bold text-slate-900 dark:text-slate-200">
                {home.realtor.name}
              </div>
              <div className="text-[10px] text-amber-700 dark:text-amber-300 font-medium">
                {home.realtor.agency}
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic text-[11px] mt-1 line-clamp-2">
                {home.realtor.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SwipeCardDeck: React.FC<SwipeCardDeckProps> = ({
  candidates,
  currentIndex,
  onSwipeLeft,
  onSwipeRight,
  onSuperMatch,
  onRewind,
  canRewind,
  onLaunchTour,
  onOpenPreferences,
  preferences,
  onSelectCandidate
}) => {
  const currentHome = candidates[currentIndex];
  const nextHome = candidates[currentIndex + 1];

  // Global keyboard shortcuts for accessible swiping (WCAG 2.1.1 Keyboard Navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs or dialogs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (!currentHome) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        onSwipeLeft(currentHome);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        onSwipeRight(currentHome);
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        onSuperMatch(currentHome);
      } else if ((e.key === 'Backspace' || e.key === 'z' || e.key === 'Z') && canRewind) {
        e.preventDefault();
        onRewind();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        onLaunchTour(currentHome);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentHome, canRewind, onSwipeLeft, onSwipeRight, onSuperMatch, onRewind, onLaunchTour]);

  if (!currentHome) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[580px] p-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-4 text-amber-300">
          <Sparkles className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">You've explored all matches!</h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          You have reviewed all candidate properties near your current home in <strong className="text-amber-300 font-semibold">{preferences.currentHome.neighborhood}</strong>. Adjust your criteria or change your current neighborhood to explore more matches.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          <button
            onClick={onRewind}
            disabled={!canRewind}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Rewind Last Card</span>
          </button>
          <button
            onClick={onOpenPreferences}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-lg shadow-amber-400/20 transition"
          >
            <span>Adjust Dual Commute / Filters</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-lg mx-auto h-full flex flex-col justify-between select-none py-2 px-3 sm:px-0">
      {/* Screen Reader Live Announcement (WCAG 4.1.3 Status Messages) */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {currentHome
          ? `Viewing property ${currentIndex + 1} of ${candidates.length}: ${currentHome.title}, ${currentHome.formattedPrice} in ${currentHome.neighborhood}, ${currentHome.cityName}. ${currentHome.matchScore} percent match.`
          : 'No more properties to display.'}
      </div>

      {/* Background Stacking Preview Card */}
      {nextHome && (
        <div
          className="absolute inset-x-3 sm:inset-x-0 top-3 bottom-20 rounded-3xl bg-slate-800/60 border border-slate-700/60 shadow-xl overflow-hidden pointer-events-none transform scale-[0.95] translate-y-3 opacity-60 -z-10"
        >
          <img
            src={nextHome.heroImage}
            alt={nextHome.title}
            className="w-full h-full object-cover filter blur-[1px]"
          />
        </div>
      )}

      {/* Main Swipeable Card with isolated instance per card ID */}
      <AnimatePresence mode="wait">
        <SwipeCardItem
          key={currentHome.id}
          home={currentHome}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          onLaunchTour={onLaunchTour}
          candidateNumber={currentIndex + 1}
          totalCandidates={candidates.length}
          currentIndex={currentIndex}
          onSelectCandidate={onSelectCandidate}
        />
      </AnimatePresence>

      {/* Bumble-style Floating Action Bar */}
      <div className="flex items-center justify-center gap-2.5 sm:gap-4 mt-2.5 sm:mt-3 z-30 px-2">
        {/* Rewind */}
        <button
          onClick={onRewind}
          disabled={!canRewind}
          aria-label="Rewind last property (Backspace or Z)"
          title="Rewind last property (Backspace or Z)"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-lg transition transform hover:scale-110 active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Pass (X) */}
        <button
          onClick={() => onSwipeLeft(currentHome)}
          aria-label="Pass on this property (Left Arrow or A)"
          title="Pass on this property (Left Arrow or A)"
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-2 border-rose-500/80 dark:border-rose-500/60 text-rose-500 dark:text-rose-400 flex items-center justify-center shadow-lg shadow-rose-500/10 transition transform hover:scale-110 active:scale-95"
        >
          <X className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>

        {/* Super Match (Star) */}
        <button
          onClick={() => onSuperMatch(currentHome)}
          aria-label="Super match this property (Up Arrow or W)"
          title="Super match this property (Up Arrow or W)"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-900 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border-2 border-cyan-500/80 dark:border-cyan-400/60 text-cyan-600 dark:text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-400/10 transition transform hover:scale-110 active:scale-95"
        >
          <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-cyan-400" />
        </button>

        {/* Like / Match (Heart) */}
        <button
          onClick={() => onSwipeRight(currentHome)}
          aria-label="Like and match property (Right Arrow or D)"
          title="Like and match property (Right Arrow or D)"
          className="w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/30 transition transform hover:scale-110 active:scale-95 font-bold"
        >
          <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950" />
        </button>

        {/* 3D Realtor Camera Tour */}
        <button
          onClick={() => onLaunchTour(currentHome)}
          aria-label="Launch 3D camera tour (T key)"
          title="Launch 3D camera tour (T key)"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-amber-500/60 dark:border-amber-400/60 text-amber-600 dark:text-amber-300 flex items-center justify-center shadow-lg transition transform hover:scale-110 active:scale-95"
        >
          <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Accessible Keyboard Control Hint */}
      <div className="text-center mt-2.5 mb-1 text-[10px] text-slate-600 dark:text-slate-400 block px-1">
        <span className="bg-slate-100 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm inline-block">
          Keyboard: <kbd className="text-amber-600 dark:text-amber-300 font-mono font-bold">← / A</kbd> Pass • <kbd className="text-amber-600 dark:text-amber-300 font-mono font-bold">→ / D</kbd> Match • <kbd className="text-cyan-600 dark:text-cyan-300 font-mono font-bold">↑ / W</kbd> Super Match • <kbd className="text-slate-700 dark:text-slate-300 font-mono font-bold">T</kbd> 3D Tour
        </span>
      </div>
    </div>
  );
};
