/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Search, Loader2, X, Building2, Compass, Check } from 'lucide-react';
import { getCityMetro } from '../neighborhoodData';

export interface SelectedPlaceDetails {
  name: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  neighborhood?: string;
  cityName?: string;
  stateCountry?: string;
  countryCode?: string;
  placeId?: string;
}

interface PlaceAutocompleteInputProps {
  id?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onPlaceSelect: (details: SelectedPlaceDetails) => void;
  typeBias?: 'neighborhood' | 'address' | 'workplace' | 'any';
  cityId?: string;
  centerBias?: { lat: number; lng: number };
  quickPresets?: { name: string; address: string; lat: number; lng: number }[];
  className?: string;
  inputClassName?: string;
}

interface SuggestionItem {
  id: string;
  mainText: string;
  secondaryText: string;
  fullText: string;
  placePrediction?: any; // Google Places (New) PlacePrediction
  presetData?: { name: string; address: string; lat: number; lng: number; neighborhood?: string };
  isPreset?: boolean;
}

export const PlaceAutocompleteInput: React.FC<PlaceAutocompleteInputProps> = ({
  id,
  value,
  placeholder = 'Search address or location...',
  onChange,
  onPlaceSelect,
  typeBias = 'any',
  cityId = 'san-francisco',
  centerBias,
  quickPresets = [],
  className = '',
  inputClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionTokenRef = useRef<any>(null);
  const debounceTimerRef = useRef<any>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Fetch Autocomplete Suggestions via Google Places API (New) or fallback presets
  const fetchSuggestions = useCallback(
    async (inputQuery: string) => {
      const trimmed = inputQuery.trim();
      if (!trimmed) {
        // Show presets if query is empty and presets exist
        if (quickPresets && quickPresets.length > 0) {
          const presetSuggestions: SuggestionItem[] = quickPresets.map((p, idx) => ({
            id: `preset-${idx}-${p.name}`,
            mainText: p.name,
            secondaryText: p.address,
            fullText: `${p.name}, ${p.address}`,
            presetData: p,
            isPreset: true
          }));
          setSuggestions(presetSuggestions);
        } else {
          setSuggestions([]);
        }
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const googleMaps = (window as any).google?.maps;
        if (googleMaps) {
          let placesLib: any = googleMaps.places;
          if (!placesLib?.AutocompleteSuggestion && typeof googleMaps.importLibrary === 'function') {
            try {
              placesLib = await googleMaps.importLibrary('places');
            } catch (err) {}
          }

          if (placesLib?.AutocompleteSuggestion && placesLib?.AutocompleteSessionToken) {
            if (!sessionTokenRef.current) {
              sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
            }

            const request: any = {
              input: trimmed,
              sessionToken: sessionTokenRef.current
            };

            // Only apply strict locationBias if centerBias is explicitly provided or typeBias is workplace
            if (centerBias || typeBias === 'workplace') {
              const city = getCityMetro(cityId);
              const center = centerBias || city.center;
              request.locationBias = {
                center: { lat: center.lat, lng: center.lng },
                radius: 40000
              };
            }

            if (typeBias === 'neighborhood') {
              request.includedPrimaryTypes = [
                'neighborhood',
                'sublocality',
                'sublocality_level_1',
                'administrative_area_level_3',
                'locality'
              ];
            } else if (typeBias === 'address') {
              request.includedPrimaryTypes = [
                'street_address',
                'premise',
                'route',
                'intersection',
                'subpremise'
              ];
            }

            const response = await placesLib.AutocompleteSuggestion.fetchAutocompleteSuggestions(request);
            if (response?.suggestions && response.suggestions.length > 0) {
              const formatted: SuggestionItem[] = response.suggestions
                .filter((s: any) => s.placePrediction)
                .map((s: any, idx: number) => {
                  const pred = s.placePrediction;
                  const main = pred.mainText?.text || pred.text?.text || trimmed;
                  const secondary = pred.secondaryText?.text || '';
                  return {
                    id: `gmp-${pred.placeId || idx}`,
                    mainText: main,
                    secondaryText: secondary,
                    fullText: pred.text?.text || `${main}${secondary ? ', ' + secondary : ''}`,
                    placePrediction: pred
                  };
                });

              setSuggestions(formatted);
              setIsLoading(false);
              return;
            }
          }
        }
      } catch (err: any) {
        if (err?.message?.includes('RESOURCE_EXHAUSTED') || err?.message?.includes('Quota') || err?.status === 429) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
        }
        console.warn('Places API Autocomplete (New) suggestion fetch error:', err);
      }

      // Fallback matching from quickPresets + local heuristics
      const matchedPresets: SuggestionItem[] = quickPresets
        .filter(
          (p) =>
            p.name.toLowerCase().includes(trimmed.toLowerCase()) ||
            p.address.toLowerCase().includes(trimmed.toLowerCase())
        )
        .map((p, idx) => ({
          id: `preset-match-${idx}`,
          mainText: p.name,
          secondaryText: p.address,
          fullText: `${p.name}, ${p.address}`,
          presetData: p,
          isPreset: true
        }));

      setSuggestions(matchedPresets);
      setIsLoading(false);
    },
    [quickPresets, cityId, centerBias, typeBias]
  );

  // Debounced input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    setIsOpen(true);
    setHighlightedIndex(-1);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(newVal);
    }, 250);
  };

  const handleSelectSuggestion = async (item: SuggestionItem) => {
    setIsLoading(true);
    setIsOpen(false);

    // If selected from preset
    if (item.presetData) {
      onChange(item.presetData.name);
      onPlaceSelect({
        name: item.presetData.name,
        formattedAddress: item.presetData.address,
        lat: item.presetData.lat,
        lng: item.presetData.lng,
        neighborhood: item.presetData.neighborhood || item.presetData.name
      });
      setIsLoading(false);
      return;
    }

    // If selected from Google Places (New) Prediction
    if (item.placePrediction) {
      try {
        const place = item.placePrediction.toPlace();
        await place.fetchFields({
          fields: ['displayName', 'formattedAddress', 'location', 'addressComponents']
        });

        // Reset session token after fetchFields to bundle into 1 session SKU
        sessionTokenRef.current = null;

        const displayName = place.displayName || item.mainText;
        const formattedAddress = place.formattedAddress || item.fullText;
        const lat = typeof place.location?.lat === 'function' ? place.location.lat() : place.location?.lat || 0;
        const lng = typeof place.location?.lng === 'function' ? place.location.lng() : place.location?.lng || 0;

        let neighborhoodName = '';
        let cityName = '';
        let stateCountry = '';
        let countryCode = 'US';

        if (place.addressComponents) {
          const nComponent = place.addressComponents.find(
            (c: any) =>
              c.types?.includes('neighborhood') ||
              c.types?.includes('sublocality') ||
              c.types?.includes('sublocality_level_1')
          );
          if (nComponent) {
            neighborhoodName = nComponent.longText || nComponent.shortText || '';
          }

          const cityComponent = place.addressComponents.find(
            (c: any) =>
              c.types?.includes('locality') ||
              c.types?.includes('postal_town') ||
              c.types?.includes('administrative_area_level_3')
          );
          if (cityComponent) {
            cityName = cityComponent.longText || cityComponent.shortText || '';
          }

          const stateComponent = place.addressComponents.find(
            (c: any) => c.types?.includes('administrative_area_level_1')
          );
          const countryComponent = place.addressComponents.find(
            (c: any) => c.types?.includes('country')
          );

          if (countryComponent) {
            countryCode = countryComponent.shortText || 'US';
            const countryName = countryComponent.longText || countryComponent.shortText || '';
            stateCountry = stateComponent
              ? `${stateComponent.longText || stateComponent.shortText}, ${countryName}`
              : countryName;
          }
        }

        const selectedText = typeBias === 'neighborhood' ? neighborhoodName || displayName : displayName;
        onChange(selectedText);

        onPlaceSelect({
          name: displayName,
          formattedAddress: formattedAddress,
          lat: lat,
          lng: lng,
          neighborhood: neighborhoodName || displayName,
          cityName: cityName,
          stateCountry: stateCountry,
          countryCode: countryCode,
          placeId: item.placePrediction.placeId
        });
      } catch (err: any) {
        if (err?.message?.includes('RESOURCE_EXHAUSTED') || err?.message?.includes('Quota') || err?.status === 429) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
        }
        console.error('Error fetching Place (New) details:', err);
        // Fallback with text
        onChange(item.mainText);
        onPlaceSelect({
          name: item.mainText,
          formattedAddress: item.fullText,
          lat: 0,
          lng: 0,
          neighborhood: item.mainText
        });
      }
    } else {
      onChange(item.mainText);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
        fetchSuggestions(value);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const listboxId = id ? `${id}-listbox` : 'places-autocomplete-listbox';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <input
          id={id}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={highlightedIndex >= 0 ? `${listboxId}-opt-${highlightedIndex}` : undefined}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            if (suggestions.length === 0) {
              fetchSuggestions(value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full min-h-[44px] pl-9 pr-10 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 focus:ring-1 focus:ring-amber-500/30 transition shadow-inner font-medium ${inputClassName}`}
        />

        {/* Leading icon */}
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none">
          {typeBias === 'workplace' ? (
            <Building2 className="w-4 h-4 text-amber-500 dark:text-amber-400/80" />
          ) : typeBias === 'neighborhood' ? (
            <Compass className="w-4 h-4 text-amber-500 dark:text-amber-400/80" />
          ) : (
            <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400/80" />
          )}
        </div>

        {/* Trailing actions: Spinner or Clear */}
        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
          {isLoading && <Loader2 className="w-4 h-4 text-amber-500 dark:text-amber-400 animate-spin mr-2" />}
          {value && !isLoading && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              aria-label="Clear location input"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Autocomplete Suggestions Popover */}
      {isOpen && (suggestions.length > 0 || isLoading) && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Location suggestions"
          className="absolute z-50 left-0 right-0 top-full mt-1.5 max-h-60 overflow-y-auto rounded-2xl bg-white dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/90 shadow-2xl divide-y divide-slate-100 dark:divide-slate-800/80 text-xs animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header indicator */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase border-b border-slate-100 dark:border-slate-800/60">
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-300">
              <Search className="w-2.5 h-2.5" />
              Places Autocomplete (New)
            </span>
            <span className="text-[9px] text-slate-400">Google Maps Platform</span>
          </div>

          {suggestions.map((item, index) => {
            const isHighlighted = index === highlightedIndex;
            return (
              <button
                key={item.id}
                id={`${listboxId}-opt-${index}`}
                role="option"
                aria-selected={isHighlighted}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full min-h-[44px] text-left px-3 py-2.5 flex items-start gap-2.5 transition ${
                  isHighlighted
                    ? 'bg-amber-50 dark:bg-amber-400/15 text-slate-900 dark:text-white'
                    : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div
                  className={`mt-0.5 p-1 rounded-lg shrink-0 ${
                    item.isPreset
                      ? 'bg-amber-100 dark:bg-amber-400/20 text-amber-600 dark:text-amber-300'
                      : isHighlighted
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.isPreset ? (
                    <Building2 className="w-3.5 h-3.5" />
                  ) : typeBias === 'neighborhood' ? (
                    <Compass className="w-3.5 h-3.5" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 truncate flex items-center gap-1.5">
                    <span>{item.mainText}</span>
                    {item.isPreset && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30">
                        Metro Hub
                      </span>
                    )}
                  </div>
                  {item.secondaryText && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight mt-0.5">
                      {item.secondaryText}
                    </div>
                  )}
                </div>

                {isHighlighted && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-1" />}
              </button>
            );
          })}

          {isLoading && suggestions.length === 0 && (
            <div className="p-4 text-center text-slate-400 flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span>Fetching verified places...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
