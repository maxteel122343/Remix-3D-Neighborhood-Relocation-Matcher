import React, { useState, useEffect, useRef } from 'react';
import {
  SlidersHorizontal,
  X,
  Briefcase,
  Home,
  GraduationCap,
  Sparkles,
  Footprints,
  Car,
  Train,
  Bike,
  Check,
  RotateCcw
} from 'lucide-react';
import { BuyerPreferences, CommuteMode, NeighborhoodVibe } from '../types';
import { WORKPLACES_BY_METRO } from '../neighborhoodData';
import { PlaceAutocompleteInput } from './PlaceAutocompleteInput';

interface BuyerPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: BuyerPreferences;
  onSavePreferences: (updated: BuyerPreferences) => void;
  selectedCityId: string;
}

export const BuyerPreferencesModal: React.FC<BuyerPreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
  selectedCityId
}) => {
  const [formData, setFormData] = useState<BuyerPreferences>(preferences);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData(preferences);
  }, [preferences, isOpen]);

  // Escape key & focus trapping (WCAG 2.1.2 & 2.4.3)
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const metroWorkplaces = WORKPLACES_BY_METRO[selectedCityId] || WORKPLACES_BY_METRO['san-francisco'];

  const handleToggleVibe = (vibe: NeighborhoodVibe) => {
    setFormData((prev) => {
      const exists = prev.targetVibes.includes(vibe);
      const updatedVibes = exists
        ? prev.targetVibes.filter((v) => v !== vibe)
        : [...prev.targetVibes, vibe];
      return {
        ...prev,
        targetVibes: updatedVibes.length > 0 ? updatedVibes : [vibe]
      };
    });
  };

  const handlePartner1WorkSelect = (details: { name: string; formattedAddress: string; lat: number; lng: number }) => {
    setFormData((prev) => ({
      ...prev,
      partner1Work: {
        ...prev.partner1Work,
        name: details.name,
        address: details.formattedAddress,
        lat: details.lat || prev.partner1Work.lat,
        lng: details.lng || prev.partner1Work.lng
      }
    }));
  };

  const handlePartner2WorkSelect = (details: { name: string; formattedAddress: string; lat: number; lng: number }) => {
    setFormData((prev) => ({
      ...prev,
      partner2Work: {
        ...prev.partner2Work,
        name: details.name,
        address: details.formattedAddress,
        lat: details.lat || prev.partner2Work.lat,
        lng: details.lng || prev.partner2Work.lng
      }
    }));
  };

  const handleSave = () => {
    onSavePreferences(formData);
    onClose();
  };

  const allVibes: { vibe: NeighborhoodVibe; label: string; desc: string }[] = [
    { vibe: 'family-friendly', label: 'Family & Stroller Friendly', desc: 'Parks, playgrounds, top-rated schools & stroller cafes' },
    { vibe: 'artisan-foodie', label: 'Artisan & Foodie Culture', desc: 'Third-wave bakeries, organic grocers & weekend markets' },
    { vibe: 'transit-connected', label: 'Ultra Transit Connected', desc: 'Steps to light rail, subways & express commuter lines' },
    { vibe: 'quiet-scenic', label: 'Scenic, Green & Quiet', desc: 'Panoramic hill vistas, green parks & peaceful tree-lined streets' },
    { vibe: 'historic-charming', label: 'Historic Architectural Charm', desc: 'Classic architecture, Victorian detail & rich heritage' },
    { vibe: 'vibrant-urban', label: 'Vibrant Urban Energy', desc: 'Nightlife, music venues, coffee spots & culinary dining' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="buyer-preferences-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 dark:bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden text-slate-900 dark:text-white flex flex-col transition-colors"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 id="buyer-preferences-title" className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Matching & Commute Criteria
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalize your household's commute, school standards, and vibe preferences
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close criteria dialog"
            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition border border-slate-200 dark:border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* 1. Current Home (Base comparison) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-bold mb-2">
              <Home className="w-4 h-4" />
              <span>Current Home (Commute Savings Baseline)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Current Neighborhood</label>
                <PlaceAutocompleteInput
                  id="current-neighborhood-input"
                  value={formData.currentHome.neighborhood}
                  placeholder="e.g. Pacific Heights, DUMBO, Notting Hill, Vila da Saúde..."
                  typeBias="neighborhood"
                  cityId={selectedCityId}
                  onChange={(val) =>
                    setFormData((prev) => {
                      const textChanged = val.trim().toLowerCase() !== (preferences.currentHome.neighborhood || '').trim().toLowerCase();
                      return {
                        ...prev,
                        currentHome: {
                          ...prev.currentHome,
                          neighborhood: val,
                          // If neighborhood text was altered from original, reset coordinates so geocoder will re-resolve the new location
                          ...(textChanged ? { lat: 0, lng: 0 } : {})
                        }
                      };
                    })
                  }
                  onPlaceSelect={(details) => {
                    const cId = details.cityName ? details.cityName.toLowerCase().replace(/\s+/g, '-') : undefined;
                    setFormData((prev) => ({
                      ...prev,
                      currentHome: {
                        ...prev.currentHome,
                        neighborhood: details.neighborhood || details.name,
                        address: details.formattedAddress || prev.currentHome.address,
                        lat: details.lat,
                        lng: details.lng,
                        cityName: details.cityName,
                        cityId: cId || prev.currentHome.cityId
                      }
                    }));
                  }}
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Address or Cross Street</label>
                <PlaceAutocompleteInput
                  id="current-address-input"
                  value={formData.currentHome.address}
                  placeholder="e.g. 2450 California St or 5th Ave & 42nd St"
                  typeBias="address"
                  cityId={selectedCityId}
                  onChange={(val) =>
                    setFormData((prev) => ({
                      ...prev,
                      currentHome: { ...prev.currentHome, address: val }
                    }))
                  }
                  onPlaceSelect={(details) => {
                    setFormData((prev) => ({
                      ...prev,
                      currentHome: {
                        ...prev.currentHome,
                        address: details.formattedAddress || details.name,
                        neighborhood: details.neighborhood || prev.currentHome.neighborhood,
                        ...(details.lat && details.lng ? { lat: details.lat, lng: details.lng } : {})
                      }
                    }));
                  }}
                />
              </div>
            </div>
          </div>

          {/* 2. Dual-Workplace Commute Configuration */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-bold mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Dual-Workplace Setup (Places Autocomplete)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Partner 1 */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="font-bold text-slate-800 dark:text-slate-200">Partner 1 Workplace</div>
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Office / Destination</label>
                  <PlaceAutocompleteInput
                    id="partner1-workplace-input"
                    value={formData.partner1Work.name}
                    placeholder="Search building, company or address..."
                    typeBias="workplace"
                    cityId={selectedCityId}
                    quickPresets={metroWorkplaces}
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        partner1Work: { ...prev.partner1Work, name: val }
                      }))
                    }
                    onPlaceSelect={handlePartner1WorkSelect}
                  />
                  {formData.partner1Work.address && (
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
                      {formData.partner1Work.address}
                    </div>
                  )}
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Commute Mode</span>
                  <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Partner 1 commute mode">
                    {(['transit', 'drive', 'bike', 'walk'] as CommuteMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        aria-pressed={formData.partner1Work.preferredMode === mode}
                        aria-label={`Partner 1 commute mode: ${mode}`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            partner1Work: { ...prev.partner1Work, preferredMode: mode }
                          }))
                        }
                        className={`min-h-[44px] py-2 px-2 rounded-lg text-xs font-bold capitalize flex items-center justify-center gap-1 border transition ${
                          formData.partner1Work.preferredMode === mode
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:text-white'
                        }`}
                      >
                        {mode === 'transit' && <Train className="w-3.5 h-3.5" />}
                        {mode === 'drive' && <Car className="w-3.5 h-3.5" />}
                        {mode === 'bike' && <Bike className="w-3.5 h-3.5" />}
                        {mode === 'walk' && <Footprints className="w-3.5 h-3.5" />}
                        <span>{mode}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Partner 2 */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="font-bold text-slate-800 dark:text-slate-200">Partner 2 Workplace</div>
                <div>
                  <label htmlFor="partner2-workplace-input" className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Office / Destination</label>
                  <PlaceAutocompleteInput
                    id="partner2-workplace-input"
                    value={formData.partner2Work.name}
                    placeholder="Search building, company or address..."
                    typeBias="workplace"
                    cityId={selectedCityId}
                    quickPresets={metroWorkplaces}
                    onChange={(val) =>
                      setFormData((prev) => ({
                        ...prev,
                        partner2Work: { ...prev.partner2Work, name: val }
                      }))
                    }
                    onPlaceSelect={handlePartner2WorkSelect}
                  />
                  {formData.partner2Work.address && (
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-1">
                      {formData.partner2Work.address}
                    </div>
                  )}
                </div>
                <div>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">Commute Mode</span>
                  <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Partner 2 commute mode">
                    {(['transit', 'drive', 'bike', 'walk'] as CommuteMode[]).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        aria-pressed={formData.partner2Work.preferredMode === mode}
                        aria-label={`Partner 2 commute mode: ${mode}`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            partner2Work: { ...prev.partner2Work, preferredMode: mode }
                          }))
                        }
                        className={`min-h-[44px] py-2 px-2 rounded-lg text-xs font-bold capitalize flex items-center justify-center gap-1 border transition ${
                          formData.partner2Work.preferredMode === mode
                            ? 'bg-amber-400 text-slate-950 border-amber-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:text-white'
                        }`}
                      >
                        {mode === 'transit' && <Train className="w-3.5 h-3.5" />}
                        {mode === 'drive' && <Car className="w-3.5 h-3.5" />}
                        {mode === 'bike' && <Bike className="w-3.5 h-3.5" />}
                        {mode === 'walk' && <Footprints className="w-3.5 h-3.5" />}
                        <span>{mode}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Neighborhood Vibes Selection */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300 font-bold mb-2.5">
              <Sparkles className="w-4 h-4" />
              <span>Target Neighborhood Vibes</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="group" aria-label="Neighborhood vibes selection">
              {allVibes.map((item) => {
                const isSelected = formData.targetVibes.includes(item.vibe);
                return (
                  <button
                    key={item.vibe}
                    type="button"
                    role="checkbox"
                    aria-checked={isSelected}
                    onClick={() => handleToggleVibe(item.vibe)}
                    className={`min-h-[48px] p-3 rounded-xl border transition cursor-pointer flex items-start text-left gap-2.5 ${
                      isSelected
                        ? 'bg-amber-50 dark:bg-amber-500/15 border-amber-500 dark:border-amber-400/80 text-slate-900 dark:text-white'
                        : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-400 border-amber-400 text-slate-950'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs">{item.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Sliders: Min School Rating & Max Commute */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center justify-between text-blue-600 dark:text-blue-300 font-bold mb-2">
                <label htmlFor="min-school-slider" className="flex items-center gap-1.5 cursor-pointer">
                  <GraduationCap className="w-4 h-4" />
                  <span>Min School Ranking</span>
                </label>
                <span className="text-sm font-black bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-lg border border-blue-200 dark:border-blue-500/30">
                  {formData.minSchoolScore}/10
                </span>
              </div>
              <input
                id="min-school-slider"
                type="range"
                aria-label="Minimum school ranking out of 10"
                aria-valuemin={5}
                aria-valuemax={10}
                aria-valuenow={formData.minSchoolScore}
                min="5"
                max="10"
                step="1"
                value={formData.minSchoolScore}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minSchoolScore: parseInt(e.target.value)
                  }))
                }
                className="w-full accent-blue-500 dark:accent-blue-400 cursor-pointer min-h-[32px]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                <span>5 (Good)</span>
                <span>8 (Top Tier)</span>
                <span>10 (Elite)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center justify-between text-amber-600 dark:text-amber-300 font-bold mb-2">
                <label htmlFor="max-commute-slider" className="flex items-center gap-1.5 cursor-pointer">
                  <Footprints className="w-4 h-4" />
                  <span>Max Combined Commute</span>
                </label>
                <span className="text-sm font-black bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-500/30">
                  {formData.maxCommuteMinutes} mins
                </span>
              </div>
              <input
                id="max-commute-slider"
                type="range"
                aria-label="Maximum combined commute in minutes"
                aria-valuemin={15}
                aria-valuemax={60}
                aria-valuenow={formData.maxCommuteMinutes}
                min="15"
                max="60"
                step="5"
                value={formData.maxCommuteMinutes}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxCommuteMinutes: parseInt(e.target.value)
                  }))
                }
                className="w-full accent-amber-500 dark:accent-amber-400 cursor-pointer min-h-[32px]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                <span>15 mins</span>
                <span>35 mins</span>
                <span>60 mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-950/80 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setFormData(preferences)}
            aria-label="Reset preferences to defaults"
            className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition text-xs font-semibold"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg shadow-amber-400/20 transition"
            >
              Apply & Re-Score Matches
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
