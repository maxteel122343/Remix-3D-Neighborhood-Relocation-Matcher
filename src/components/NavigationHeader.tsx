import React from 'react';
import {
  Sparkles,
  Heart,
  Compass,
  SlidersHorizontal,
  MapPin,
  Sun,
  Moon
} from 'lucide-react';

interface NavigationHeaderProps {
  currentTab: 'swipe' | 'shortlist' | 'tour';
  onSelectTab: (tab: 'swipe' | 'shortlist' | 'tour') => void;
  currentNeighborhood: string;
  matchCount: number;
  onOpenPreferences: () => void;
  effectiveTheme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentTab,
  onSelectTab,
  currentNeighborhood,
  matchCount,
  onOpenPreferences,
  effectiveTheme = 'dark',
  onToggleTheme
}) => {
  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-2.5 sm:px-4 py-2 sm:py-2.5 transition-colors overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Brand Logo & Base Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-lg shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-amber-500 dark:text-amber-300 shrink-0">
              ReloMatch
            </span>

            {/* Current User Neighborhood Location Indicator - Desktop / Tablet view */}
            <button
              type="button"
              onClick={onOpenPreferences}
              aria-haspopup="dialog"
              aria-label={`Change current base neighborhood, currently set to ${currentNeighborhood || 'Pacific Heights'}`}
              className="hidden md:flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1.5 lg:py-2 min-h-[38px] lg:min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-amber-400/60 transition group text-left cursor-pointer ml-1 lg:ml-2 shrink-0 max-w-[140px] lg:max-w-[220px]"
              title="Click to change your Current Neighborhood criteria"
            >
              <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-lg bg-amber-400/20 text-amber-500 dark:text-amber-300 flex items-center justify-center border border-amber-400/30 group-hover:scale-105 transition-transform shrink-0">
                <MapPin className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              </div>
              <div className="flex flex-col min-w-0 pr-0.5">
                <span className="text-[8px] lg:text-[9px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold leading-tight">
                  Current Base
                </span>
                <div className="flex items-center gap-1 leading-tight">
                  <span className="text-[11px] lg:text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-300 transition truncate max-w-[75px] lg:max-w-[140px]">
                    {currentNeighborhood || 'Pacific Heights'}
                  </span>
                  <span className="text-[9px] lg:text-[10px] text-amber-500 dark:text-amber-400 font-semibold underline underline-offset-2 shrink-0">
                    Edit
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Center Mode Switcher Tabs (Tablet & Desktop, scaled to prevent overflow) */}
          <div role="tablist" aria-label="Main Navigation Modes" className="hidden md:flex items-center bg-slate-100 dark:bg-slate-950/80 p-0.5 lg:p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 gap-0.5">
            <button
              role="tab"
              aria-selected={currentTab === 'swipe'}
              id="tab-swipe"
              onClick={() => onSelectTab('swipe')}
              className={`flex items-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-1.5 lg:py-2 min-h-[36px] lg:min-h-[44px] rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'swipe'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">Swipe Discovery</span>
              <span className="xl:hidden">Swipe</span>
            </button>

            <button
              role="tab"
              aria-selected={currentTab === 'shortlist'}
              id="tab-shortlist"
              onClick={() => onSelectTab('shortlist')}
              className={`flex items-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-1.5 lg:py-2 min-h-[36px] lg:min-h-[44px] rounded-lg text-xs font-semibold transition-all relative ${
                currentTab === 'shortlist'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
              }`}
              title="Your saved match shortlist"
              aria-label={`Saved matches shortlist, ${matchCount} properties`}
            >
              <Heart className="w-3.5 h-3.5 shrink-0" />
              <span>Matches</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                currentTab === 'shortlist'
                  ? 'bg-slate-950 text-amber-300'
                  : matchCount > 0
                  ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/50'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {matchCount}
              </span>
            </button>

            <button
              role="tab"
              aria-selected={currentTab === 'tour'}
              id="tab-tour"
              onClick={() => onSelectTab('tour')}
              className={`flex items-center gap-1 lg:gap-1.5 px-2 lg:px-3 py-1.5 lg:py-2 min-h-[36px] lg:min-h-[44px] rounded-lg text-xs font-semibold transition-all ${
                currentTab === 'tour'
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xl:inline">3D Realtor Tour</span>
              <span className="xl:hidden">3D Tour</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Compact Current Base Chip */}
            <button
              type="button"
              onClick={onOpenPreferences}
              aria-haspopup="dialog"
              aria-label={`Change current base neighborhood, currently set to ${currentNeighborhood || 'Pacific Heights'}`}
              className="md:hidden flex items-center gap-1.5 px-2 py-1.5 min-h-[38px] rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 hover:border-amber-400/60 text-slate-700 dark:text-slate-200 transition text-left"
              title="Change your current neighborhood base"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
              <div className="flex flex-col min-w-0 max-w-[80px] xs:max-w-[110px]">
                <span className="text-[8px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold leading-none">Base</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 truncate leading-tight">{currentNeighborhood || 'Pacific Heights'}</span>
              </div>
            </button>

            {/* Criteria / Preferences Button (Scaled text to guarantee NO horizontal overflow on tablet portrait) */}
            <button
              type="button"
              onClick={onOpenPreferences}
              aria-haspopup="dialog"
              aria-label="Configure Dual Commute and Matching Criteria"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 lg:py-2 min-h-[38px] lg:min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-300 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition shrink-0"
              title="Configure Commute & Matching Criteria"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
              <span className="hidden xl:inline">Dual Commute & Criteria</span>
              <span className="hidden lg:inline xl:hidden">Commute & Criteria</span>
              <span className="hidden md:inline lg:hidden">Criteria</span>
            </button>

            {/* Theme Toggle Button (Light / Dark Mode) */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Current theme: ${effectiveTheme}. Click to toggle light or dark theme.`}
                title={`Switch theme (Current: ${effectiveTheme === 'dark' ? 'Dark' : 'Light'})`}
                className="flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 min-h-[38px] lg:min-h-[44px] rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-slate-700 transition active:scale-95 shrink-0"
              >
                {effectiveTheme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Persistent Bottom Navigation Bar (Bumble / App Style, with safe padding to prevent bottom text cutoff) */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800/90 pb-[max(env(safe-area-inset-bottom),8px)] pt-1 shadow-2xl transition-colors"
      >
        <div role="tablist" aria-label="Mobile Navigation Modes" className="grid grid-cols-3 h-14 items-center px-1">
          <button
            role="tab"
            type="button"
            aria-selected={currentTab === 'swipe'}
            id="mobile-tab-swipe"
            onClick={() => onSelectTab('swipe')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-all ${
              currentTab === 'swipe'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${currentTab === 'swipe' ? 'bg-amber-400/20' : ''}`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight leading-tight pb-0.5">Discovery</span>
          </button>

          <button
            role="tab"
            type="button"
            aria-selected={currentTab === 'shortlist'}
            id="mobile-tab-shortlist"
            onClick={() => onSelectTab('shortlist')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-all relative ${
              currentTab === 'shortlist'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
            aria-label={`Matches shortlist, ${matchCount} properties`}
          >
            <div className={`p-1 rounded-lg transition-colors relative ${currentTab === 'shortlist' ? 'bg-amber-400/20' : ''}`}>
              <Heart className="w-4 h-4" />
              {matchCount > 0 && (
                <span className="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black bg-amber-400 text-slate-950 shadow-sm">
                  {matchCount}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight leading-tight pb-0.5">Matches</span>
          </button>

          <button
            role="tab"
            type="button"
            aria-selected={currentTab === 'tour'}
            id="mobile-tab-tour"
            onClick={() => onSelectTab('tour')}
            className={`flex flex-col items-center justify-center gap-0.5 py-1 transition-all ${
              currentTab === 'tour'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${currentTab === 'tour' ? 'bg-amber-400/20' : ''}`}>
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-[10px] tracking-tight leading-tight pb-0.5">3D Tour</span>
          </button>
        </div>
      </nav>
    </>
  );
};

