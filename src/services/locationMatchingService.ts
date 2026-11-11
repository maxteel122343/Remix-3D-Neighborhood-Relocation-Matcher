/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CandidateHome, BuyerPreferences } from '../types';
import { EnclaveConfig, buildHomesFromEnclaves, haversineKm } from './globalCandidatePools';
import { NEW_YORK_ENCLAVES } from './curatedMetrosData';
import { LONDON_ENCLAVES } from './curatedLondonData';
import { SAO_PAULO_ENCLAVES } from './curatedSaoPauloData';
import { TOKYO_ENCLAVES, PARIS_ENCLAVES } from './curatedTokyoParisData';
import { AUSTIN_ENCLAVES, SEATTLE_ENCLAVES } from './curatedAustinSeattleData';
import { getGoogleMapsApiKey } from '../utils';

export interface LocationResolution {
  lat: number;
  lng: number;
  neighborhood: string;
  cityName: string;
  stateCountry: string;
  countryCode: string;
  currencySymbol: string;
  formattedAddress: string;
}

/**
 * Calculates real Haversine distance in kilometers
 */
export function calculateHaversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  return haversineKm(lat1, lon1, lat2, lon2);
}

// Built-in worldwide geographical catalog for instant, reliable zero-latency matching
export const GLOBAL_LOCATIONS_CATALOG: Record<string, LocationResolution> = {
  // --- BRAZIL ---
  'vila da saude': {
    lat: -23.6181,
    lng: -46.6394,
    neighborhood: 'Vila da Saúde',
    cityName: 'São Paulo',
    stateCountry: 'São Paulo, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Vila da Saúde, São Paulo - SP, Brazil'
  },
  'saude': {
    lat: -23.6181,
    lng: -46.6394,
    neighborhood: 'Saúde',
    cityName: 'São Paulo',
    stateCountry: 'São Paulo, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Saúde, São Paulo - SP, Brazil'
  },
  'vila mariana': {
    lat: -23.5888,
    lng: -46.6383,
    neighborhood: 'Vila Mariana',
    cityName: 'São Paulo',
    stateCountry: 'São Paulo, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Vila Mariana, São Paulo - SP, Brazil'
  },
  'moema': {
    lat: -23.6015,
    lng: -46.6667,
    neighborhood: 'Moema',
    cityName: 'São Paulo',
    stateCountry: 'São Paulo, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Moema, São Paulo - SP, Brazil'
  },
  'pinheiros': {
    lat: -23.5615,
    lng: -46.6923,
    neighborhood: 'Pinheiros',
    cityName: 'São Paulo',
    stateCountry: 'São Paulo, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Pinheiros, São Paulo - SP, Brazil'
  },
  'chacara klabin': {
    lat: -23.5931,
    lng: -46.6312,
    neighborhood: 'Chácara Klabin',
    cityName: 'São Paulo',
    stateCountry: 'São Paulo, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Chácara Klabin, São Paulo - SP, Brazil'
  },
  'sao paulo': {
    lat: -23.5505,
    lng: -46.6333,
    neighborhood: 'Centro / Jardins',
    cityName: 'São Paulo',
    stateCountry: 'São Paulo, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'São Paulo - SP, Brazil'
  },
  'ipanema': {
    lat: -22.9838,
    lng: -43.2045,
    neighborhood: 'Ipanema',
    cityName: 'Rio de Janeiro',
    stateCountry: 'Rio de Janeiro, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Ipanema, Rio de Janeiro - RJ, Brazil'
  },
  'rio de janeiro': {
    lat: -22.9068,
    lng: -43.1729,
    neighborhood: 'Zona Sul',
    cityName: 'Rio de Janeiro',
    stateCountry: 'Rio de Janeiro, Brazil',
    countryCode: 'BR',
    currencySymbol: 'R$',
    formattedAddress: 'Rio de Janeiro - RJ, Brazil'
  },

  // --- SAN FRANCISCO BAY AREA ---
  'pacific heights': {
    lat: 37.7891,
    lng: -122.4344,
    neighborhood: 'Pacific Heights',
    cityName: 'San Francisco',
    stateCountry: 'California, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Pacific Heights, San Francisco, CA, USA'
  },
  'noe valley': {
    lat: 37.7516,
    lng: -122.4338,
    neighborhood: 'Noe Valley',
    cityName: 'San Francisco',
    stateCountry: 'California, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Noe Valley, San Francisco, CA, USA'
  },
  'san francisco': {
    lat: 37.7749,
    lng: -122.4194,
    neighborhood: 'Pacific Heights',
    cityName: 'San Francisco',
    stateCountry: 'California, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'San Francisco, CA, USA'
  },
  'sf': {
    lat: 37.7749,
    lng: -122.4194,
    neighborhood: 'San Francisco',
    cityName: 'San Francisco',
    stateCountry: 'California, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'San Francisco, CA, USA'
  },

  // --- NEW YORK METRO ---
  'dumbo': {
    lat: 40.7033,
    lng: -73.9881,
    neighborhood: 'DUMBO',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'DUMBO, Brooklyn, NY, USA'
  },
  'midtown east': {
    lat: 40.7571,
    lng: -73.9664,
    neighborhood: 'Midtown East',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Midtown East, New York, NY, USA'
  },
  'brooklyn heights': {
    lat: 40.696,
    lng: -73.9933,
    neighborhood: 'Brooklyn Heights',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Brooklyn Heights, Brooklyn, NY, USA'
  },
  'west village': {
    lat: 40.7358,
    lng: -74.0049,
    neighborhood: 'West Village',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'West Village, New York, NY, USA'
  },
  'williamsburg': {
    lat: 40.7178,
    lng: -73.9571,
    neighborhood: 'Williamsburg',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Williamsburg, Brooklyn, NY, USA'
  },
  'new york': {
    lat: 40.7128,
    lng: -74.006,
    neighborhood: 'Manhattan',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'New York, NY, USA'
  },
  'nyc': {
    lat: 40.7128,
    lng: -74.006,
    neighborhood: 'Manhattan',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'New York, NY, USA'
  },
  'brooklyn': {
    lat: 40.6782,
    lng: -73.9442,
    neighborhood: 'Brooklyn Heights',
    cityName: 'New York',
    stateCountry: 'New York, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Brooklyn, NY, USA'
  },

  // --- LONDON ---
  'notting hill': {
    lat: 51.516,
    lng: -0.205,
    neighborhood: 'Notting Hill',
    cityName: 'London',
    stateCountry: 'England, UK',
    countryCode: 'GB',
    currencySymbol: '£',
    formattedAddress: 'Notting Hill, London, UK'
  },
  'richmond': {
    lat: 51.4613,
    lng: -0.3037,
    neighborhood: 'Richmond',
    cityName: 'London',
    stateCountry: 'England, UK',
    countryCode: 'GB',
    currencySymbol: '£',
    formattedAddress: 'Richmond upon Thames, London, UK'
  },
  'hampstead': {
    lat: 51.5564,
    lng: -0.1782,
    neighborhood: 'Hampstead',
    cityName: 'London',
    stateCountry: 'England, UK',
    countryCode: 'GB',
    currencySymbol: '£',
    formattedAddress: 'Hampstead, London, UK'
  },
  'kensington': {
    lat: 51.5014,
    lng: -0.1919,
    neighborhood: 'Kensington',
    cityName: 'London',
    stateCountry: 'England, UK',
    countryCode: 'GB',
    currencySymbol: '£',
    formattedAddress: 'Royal Borough of Kensington, London, UK'
  },
  'london': {
    lat: 51.5074,
    lng: -0.1278,
    neighborhood: 'Central London',
    cityName: 'London',
    stateCountry: 'England, UK',
    countryCode: 'GB',
    currencySymbol: '£',
    formattedAddress: 'London, UK'
  },

  // --- TOKYO ---
  'shibuya': {
    lat: 35.658,
    lng: 139.7016,
    neighborhood: 'Shibuya',
    cityName: 'Tokyo',
    stateCountry: 'Tokyo, Japan',
    countryCode: 'JP',
    currencySymbol: '¥',
    formattedAddress: 'Shibuya, Tokyo, Japan'
  },
  'daikanyama': {
    lat: 35.6485,
    lng: 139.7032,
    neighborhood: 'Daikanyama',
    cityName: 'Tokyo',
    stateCountry: 'Tokyo, Japan',
    countryCode: 'JP',
    currencySymbol: '¥',
    formattedAddress: 'Daikanyamacho, Shibuya, Tokyo, Japan'
  },
  'nakameguro': {
    lat: 35.6442,
    lng: 139.699,
    neighborhood: 'Nakameguro',
    cityName: 'Tokyo',
    stateCountry: 'Tokyo, Japan',
    countryCode: 'JP',
    currencySymbol: '¥',
    formattedAddress: 'Nakameguro, Meguro, Tokyo, Japan'
  },
  'tokyo': {
    lat: 35.6762,
    lng: 139.6503,
    neighborhood: 'Shibuya',
    cityName: 'Tokyo',
    stateCountry: 'Tokyo, Japan',
    countryCode: 'JP',
    currencySymbol: '¥',
    formattedAddress: 'Tokyo, Japan'
  },

  // --- PARIS ---
  'le marais': {
    lat: 48.8575,
    lng: 2.3592,
    neighborhood: 'Le Marais',
    cityName: 'Paris',
    stateCountry: 'Île-de-France, France',
    countryCode: 'FR',
    currencySymbol: '€',
    formattedAddress: 'Le Marais, Paris, France'
  },
  'saint-germain': {
    lat: 48.8539,
    lng: 2.3338,
    neighborhood: 'Saint-Germain-des-Prés',
    cityName: 'Paris',
    stateCountry: 'Île-de-France, France',
    countryCode: 'FR',
    currencySymbol: '€',
    formattedAddress: 'Saint-Germain-des-Prés, Paris, France'
  },
  'montmartre': {
    lat: 48.8867,
    lng: 2.3431,
    neighborhood: 'Montmartre',
    cityName: 'Paris',
    stateCountry: 'Île-de-France, France',
    countryCode: 'FR',
    currencySymbol: '€',
    formattedAddress: 'Montmartre, Paris, France'
  },
  'paris': {
    lat: 48.8566,
    lng: 2.3522,
    neighborhood: 'Le Marais',
    cityName: 'Paris',
    stateCountry: 'Île-de-France, France',
    countryCode: 'FR',
    currencySymbol: '€',
    formattedAddress: 'Paris, France'
  },

  // --- AUSTIN ---
  'austin': {
    lat: 30.2672,
    lng: -97.7431,
    neighborhood: 'Downtown Austin',
    cityName: 'Austin',
    stateCountry: 'Texas, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Austin, TX, USA'
  },
  'south congress': {
    lat: 30.2485,
    lng: -97.7495,
    neighborhood: 'South Congress',
    cityName: 'Austin',
    stateCountry: 'Texas, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'South Congress Ave, Austin, TX, USA'
  },
  'soco': {
    lat: 30.2485,
    lng: -97.7495,
    neighborhood: 'South Congress (SoCo)',
    cityName: 'Austin',
    stateCountry: 'Texas, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'South Congress, Austin, TX, USA'
  },
  'zilker': {
    lat: 30.2585,
    lng: -97.7695,
    neighborhood: 'Zilker',
    cityName: 'Austin',
    stateCountry: 'Texas, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Zilker, Austin, TX, USA'
  },
  'clarksville': {
    lat: 30.2785,
    lng: -97.7595,
    neighborhood: 'Clarksville',
    cityName: 'Austin',
    stateCountry: 'Texas, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Clarksville, Austin, TX, USA'
  },
  'east austin': {
    lat: 30.2695,
    lng: -97.7285,
    neighborhood: 'East Austin',
    cityName: 'Austin',
    stateCountry: 'Texas, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'East Austin, Austin, TX, USA'
  },
  'mueller': {
    lat: 30.2985,
    lng: -97.7055,
    neighborhood: 'Mueller',
    cityName: 'Austin',
    stateCountry: 'Texas, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Mueller, Austin, TX, USA'
  },

  // --- SEATTLE ---
  'seattle': {
    lat: 47.6062,
    lng: -122.3321,
    neighborhood: 'Queen Anne',
    cityName: 'Seattle',
    stateCountry: 'Washington, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Seattle, WA, USA'
  },
  'queen anne': {
    lat: 47.6355,
    lng: -122.3575,
    neighborhood: 'Queen Anne',
    cityName: 'Seattle',
    stateCountry: 'Washington, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Queen Anne, Seattle, WA, USA'
  },
  'capitol hill': {
    lat: 47.6285,
    lng: -122.3125,
    neighborhood: 'Capitol Hill',
    cityName: 'Seattle',
    stateCountry: 'Washington, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Capitol Hill, Seattle, WA, USA'
  },
  'ballard': {
    lat: 47.6685,
    lng: -122.3845,
    neighborhood: 'Ballard',
    cityName: 'Seattle',
    stateCountry: 'Washington, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Ballard, Seattle, WA, USA'
  },
  'fremont': {
    lat: 47.6515,
    lng: -122.3505,
    neighborhood: 'Fremont',
    cityName: 'Seattle',
    stateCountry: 'Washington, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Fremont, Seattle, WA, USA'
  },
  'belltown': {
    lat: 47.6165,
    lng: -122.3515,
    neighborhood: 'Belltown',
    cityName: 'Seattle',
    stateCountry: 'Washington, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Belltown, Seattle, WA, USA'
  },

  // --- OTHER GLOBAL HUBS ---
  'chicago': {
    lat: 41.8781,
    lng: -87.6298,
    neighborhood: 'Lincoln Park',
    cityName: 'Chicago',
    stateCountry: 'Illinois, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Chicago, IL, USA'
  },
  'los angeles': {
    lat: 34.0522,
    lng: -118.2437,
    neighborhood: 'Silver Lake',
    cityName: 'Los Angeles',
    stateCountry: 'California, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Los Angeles, CA, USA'
  },
  'miami': {
    lat: 25.7617,
    lng: -80.1918,
    neighborhood: 'Brickell',
    cityName: 'Miami',
    stateCountry: 'Florida, USA',
    countryCode: 'US',
    currencySymbol: '$',
    formattedAddress: 'Miami, FL, USA'
  },
  'toronto': {
    lat: 43.6532,
    lng: -79.3832,
    neighborhood: 'Yorkville',
    cityName: 'Toronto',
    stateCountry: 'Ontario, Canada',
    countryCode: 'CA',
    currencySymbol: 'C$',
    formattedAddress: 'Toronto, ON, Canada'
  },
  'sydney': {
    lat: -33.8688,
    lng: 151.2093,
    neighborhood: 'Surry Hills',
    cityName: 'Sydney',
    stateCountry: 'New South Wales, Australia',
    countryCode: 'AU',
    currencySymbol: 'A$',
    formattedAddress: 'Sydney, NSW, Australia'
  },
  'berlin': {
    lat: 52.52,
    lng: 13.405,
    neighborhood: 'Mitte',
    cityName: 'Berlin',
    stateCountry: 'Germany',
    countryCode: 'DE',
    currencySymbol: '€',
    formattedAddress: 'Berlin, Germany'
  },
  'amsterdam': {
    lat: 52.3676,
    lng: 4.9041,
    neighborhood: 'Jordaan',
    cityName: 'Amsterdam',
    stateCountry: 'Netherlands',
    countryCode: 'NL',
    currencySymbol: '€',
    formattedAddress: 'Amsterdam, Netherlands'
  }
};

/**
 * Resolves location using Google Maps Geocoding API or Places or local global catalog
 */
export async function resolveLocation(
  query: { neighborhood?: string; address?: string; lat?: number; lng?: number },
  apiKey?: string
): Promise<LocationResolution> {
  const effectiveKey = (apiKey && apiKey.trim() !== '')
    ? apiKey.trim()
    : getGoogleMapsApiKey();
  const normQueryText = `${query.neighborhood || ''} ${query.address || ''}`.toLowerCase().trim();

  // 1. Text lookup in global catalog first (exact / full-word / qualified prefix match)
  if (normQueryText) {
    for (const [key, loc] of Object.entries(GLOBAL_LOCATIONS_CATALOG)) {
      // Prevent false-positive substring matching (e.g. "st" matching "austin")
      const matchesKey =
        normQueryText === key ||
        normQueryText.includes(key) ||
        (normQueryText.length >= 5 && key.startsWith(normQueryText));

      if (matchesKey) {
        return {
          ...loc,
          // Preserve query coordinates if already provided and valid
          ...(query.lat && query.lng && (query.lat !== 0 || query.lng !== 0)
            ? { lat: query.lat, lng: query.lng }
            : {}),
          neighborhood: query.neighborhood || loc.neighborhood,
          formattedAddress: query.address || loc.formattedAddress
        };
      }
    }
  }

  // 2. If valid coordinates are provided, check geographic proximity or heuristics
  if (
    typeof query.lat === 'number' &&
    typeof query.lng === 'number' &&
    (query.lat !== 0 || query.lng !== 0)
  ) {
    // Check proximity to any catalog item within 50km
    for (const loc of Object.values(GLOBAL_LOCATIONS_CATALOG)) {
      const dist = haversineKm(query.lat, query.lng, loc.lat, loc.lng);
      if (dist <= 50) {
        return {
          ...loc,
          lat: query.lat,
          lng: query.lng,
          neighborhood: query.neighborhood || loc.neighborhood,
          formattedAddress: query.address || `${query.neighborhood || loc.neighborhood}, ${loc.cityName}`
        };
      }
    }

    // Determine country & currency from latitude/longitude heuristics
    const isBrazil = query.lat < 5 && query.lat > -34 && query.lng > -74 && query.lng < -34;
    const isEurope = query.lat > 35 && query.lat < 70 && query.lng > -10 && query.lng < 35;
    const isUK = query.lat > 50 && query.lat < 59 && query.lng > -8 && query.lng < 2;
    const isJapan = query.lat > 30 && query.lat < 46 && query.lng > 128 && query.lng < 146;
    const isAustralia = query.lat < -10 && query.lat > -44 && query.lng > 112 && query.lng < 155;
    const isCanada = query.lat > 44 && query.lat < 75 && query.lng > -141 && query.lng < -52;

    let currency = '$';
    let country = 'USA';
    let countryCode = 'US';
    let city = query.neighborhood || 'Local Metro';

    if (isBrazil) {
      currency = 'R$';
      country = 'Brazil';
      countryCode = 'BR';
      city = 'São Paulo';
    } else if (isUK) {
      currency = '£';
      country = 'United Kingdom';
      countryCode = 'GB';
      city = 'London';
    } else if (isEurope) {
      currency = '€';
      country = 'Europe';
      countryCode = 'FR';
      city = 'Paris';
    } else if (isJapan) {
      currency = '¥';
      country = 'Japan';
      countryCode = 'JP';
      city = 'Tokyo';
    } else if (isAustralia) {
      currency = 'A$';
      country = 'Australia';
      countryCode = 'AU';
      city = 'Sydney';
    } else if (isCanada) {
      currency = 'C$';
      country = 'Canada';
      countryCode = 'CA';
      city = 'Toronto';
    }

    return {
      lat: query.lat,
      lng: query.lng,
      neighborhood: query.neighborhood || 'Local Enclave',
      cityName: city,
      stateCountry: country,
      countryCode: countryCode,
      currencySymbol: currency,
      formattedAddress: query.address || `${query.neighborhood || 'Local Enclave'}, ${city}`
    };
  }

  // 3. Try Google Maps JS Geocoder SDK in browser to avoid CORS restrictions, or REST fallback
  if (normQueryText) {
    try {
      let result: any = null;

      // Prefer client-side Geocoder SDK
      if (typeof window !== 'undefined' && (window as any).google?.maps?.Geocoder) {
        const geocoder = new (window as any).google.maps.Geocoder();
        const geocodeRes = await geocoder.geocode({ address: normQueryText });
        if (geocodeRes.results && geocodeRes.results[0]) {
          result = geocodeRes.results[0];
        }
      } else if (effectiveKey) {
        // Fallback for non-browser / direct REST
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          normQueryText
        )}&key=${effectiveKey}&internal_usage_attribution_ids=gmp_mcp_codeassist_v1_aistudio`;
        const res = await fetch(url);
        if (res.status === 429) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
        }
        const data = await res.json();
        if (data.status === 'OVER_QUERY_LIMIT' || data.error_message?.includes('Quota')) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
          }
        }
        if (data.status === 'OK' && data.results && data.results[0]) {
          result = data.results[0];
        }
      }

      if (result) {
        const lat =
          typeof result.geometry?.location?.lat === 'function'
            ? result.geometry.location.lat()
            : result.geometry?.location?.lat;
        const lng =
          typeof result.geometry?.location?.lng === 'function'
            ? result.geometry.location.lng()
            : result.geometry?.location?.lng;

        let neighborhood = query.neighborhood || '';
        let city = '';
        let country = '';
        let countryCode = 'US';

        for (const comp of result.address_components || []) {
          if (comp.types.includes('neighborhood') || comp.types.includes('sublocality')) {
            neighborhood = neighborhood || comp.long_name;
          }
          if (comp.types.includes('locality')) {
            city = comp.long_name;
          }
          if (comp.types.includes('country')) {
            country = comp.long_name;
            countryCode = comp.short_name;
          }
        }

        const isBRL = countryCode === 'BR';
        const isGBP = countryCode === 'GB';
        const isEUR = ['FR', 'DE', 'IT', 'ES', 'NL', 'PT', 'BE', 'AT', 'IE'].includes(countryCode);
        const isJPY = countryCode === 'JP';
        const isCAD = countryCode === 'CA';
        const isAUD = countryCode === 'AU';

        const currencySymbol = isBRL
          ? 'R$'
          : isGBP
          ? '£'
          : isEUR
          ? '€'
          : isJPY
          ? '¥'
          : isCAD
          ? 'C$'
          : isAUD
          ? 'A$'
          : '$';

        return {
          lat,
          lng,
          neighborhood: neighborhood || city || query.neighborhood || 'Local Area',
          cityName: city || neighborhood || 'Metropolitan Area',
          stateCountry: country || 'Global',
          countryCode,
          currencySymbol,
          formattedAddress: result.formatted_address
        };
      }
    } catch (e) {
      console.warn('Geocoding resolution notice:', e);
    }
  }

  // 4. Smart fallback based on text tokens
  if (normQueryText.includes('saude') || normQueryText.includes('saúde') || normQueryText.includes('brazil') || normQueryText.includes('brasil')) {
    return GLOBAL_LOCATIONS_CATALOG['vila da saude'];
  }
  if (normQueryText.includes('austin') || normQueryText.includes('texas')) {
    return GLOBAL_LOCATIONS_CATALOG['austin'];
  }
  if (normQueryText.includes('seattle') || normQueryText.includes('washington')) {
    return GLOBAL_LOCATIONS_CATALOG['seattle'];
  }
  if (normQueryText.includes('york') || normQueryText.includes('nyc') || normQueryText.includes('manhattan') || normQueryText.includes('brooklyn')) {
    return GLOBAL_LOCATIONS_CATALOG['new york'];
  }
  if (normQueryText.includes('london') || normQueryText.includes('uk') || normQueryText.includes('england')) {
    return GLOBAL_LOCATIONS_CATALOG['london'];
  }
  if (normQueryText.includes('tokyo') || normQueryText.includes('japan')) {
    return GLOBAL_LOCATIONS_CATALOG['tokyo'];
  }
  if (normQueryText.includes('paris') || normQueryText.includes('france')) {
    return GLOBAL_LOCATIONS_CATALOG['paris'];
  }

  // Default to San Francisco
  return GLOBAL_LOCATIONS_CATALOG['pacific heights'];
}

/**
 * Universal generator for ANY arbitrary location on Earth.
 * Creates 8 rich, distinct, realistic candidate homes around the user's coordinates.
 */
function generateUniversalGlobalEnclaves(
  loc: LocationResolution,
  preferences?: BuyerPreferences
): CandidateHome[] {
  const { lat, lng, neighborhood, cityName, stateCountry, currencySymbol } = loc;
  const baseName = neighborhood || cityName || 'Metropolitan';

  // Realistic price base depending on currency
  let basePrice = 1850000;
  if (currencySymbol === 'R$') {
    basePrice = 1650000;
  } else if (currencySymbol === '£') {
    basePrice = 1450000;
  } else if (currencySymbol === '€') {
    basePrice = 1650000;
  } else if (currencySymbol === '¥') {
    basePrice = 145000000;
  }

  // 8 distinct compass offsets and archetypes
  const offsets = [
    { dLat: 0.0075, dLng: 0.005, dir: 'North', vibe: 'family-friendly' as const, label: 'Parkside Green & Family Promenade', tag: 'TopSchools', type: 'Single Family' as const, beds: 4, baths: 3, sqft: 2450 },
    { dLat: 0.004, dLng: 0.009, dir: 'East', vibe: 'artisan-foodie' as const, label: 'Artisan Cafes & Organic Market Corridor', tag: 'ArtisanBakeries', type: 'Townhome' as const, beds: 3, baths: 2.5, sqft: 1950 },
    { dLat: -0.005, dLng: 0.007, dir: 'Southeast', vibe: 'transit-connected' as const, label: 'Rapid Transit Line & Zero-Commute Hub', tag: 'ExpressTransit', type: 'Condominium' as const, beds: 2, baths: 2, sqft: 1420 },
    { dLat: -0.008, dLng: -0.004, dir: 'South', vibe: 'quiet-scenic' as const, label: 'Canopy Hillside, Trails & Panoramic Vistas', tag: 'ScenicViews', type: 'Single Family' as const, beds: 4, baths: 3.5, sqft: 2680 },
    { dLat: -0.004, dLng: -0.009, dir: 'Southwest', vibe: 'historic-charming' as const, label: 'Heritage Architecture & Stately Charm', tag: 'HistoricCharm', type: 'Single Family' as const, beds: 4, baths: 3, sqft: 2550 },
    { dLat: 0.003, dLng: -0.008, dir: 'West', vibe: 'vibrant-urban' as const, label: 'Cultural Waterfront & Dining District', tag: 'LiveCulture', type: 'Modern Loft' as const, beds: 3, baths: 2, sqft: 1820 },
    { dLat: 0.009, dLng: -0.003, dir: 'Northwest', vibe: 'family-friendly' as const, label: 'Tree-Lined Avenues & Stroller Enclave', tag: 'CommunityPark', type: 'Single Family' as const, beds: 4, baths: 3, sqft: 2350 },
    { dLat: 0.001, dLng: 0.002, dir: 'Central', vibe: 'transit-connected' as const, label: 'Skyline Terrace & Core City Living', tag: 'PenthouseLiving', type: 'Condominium' as const, beds: 2, baths: 2, sqft: 1540 }
  ];

  const genericImages = [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
  ];

  const enclaves: EnclaveConfig[] = offsets.map((o, idx) => {
    const eLat = lat + o.dLat;
    const eLng = lng + o.dLng;
    const districtName = `${baseName} ${o.dir}`;
    const priceMult = 1 + ((idx % 5) - 2) * 0.08;
    const finalPrice = Math.round(basePrice * priceMult / 10000) * 10000;

    return {
      name: districtName,
      subLoc: `${o.dir} Quarter, ${cityName}`,
      exactLat: eLat,
      exactLng: eLng,
      street: `${100 + idx * 18} Grand Promenade`,
      title: `${o.type} with Private Terrace in ${districtName}`,
      price: finalPrice,
      beds: o.beds,
      baths: o.baths,
      sqft: o.sqft,
      type: o.type,
      vibe: o.vibe,
      vibeLabel: o.label,
      vibeTags: [o.tag, `${baseName}Enclave`, 'TreeLined', 'Walkable'],
      vibeDesc: `Exceptional residential sanctuary in ${districtName}: minutes from neighborhood parks, artisan bakeries, and seamless commuter connections.`,
      school: {
        name: `${districtName} Academy of Arts & Sciences`,
        type: 'Elementary',
        rating: 9.2 + (idx % 8) * 0.1,
        distanceWalkMins: 4 + (idx % 3),
        district: `${cityName} Public School District`,
        highlights: ['Exemplary Rating', 'Bilingual Immersion', 'STEAM Center'],
        lat: eLat + 0.002,
        lng: eLng + 0.002,
        address: `${districtName} Campus Way`
      },
      transit: {
        name: `${districtName} Express Transit Station`,
        lat: eLat + 0.001,
        lng: eLng - 0.002,
        walkMins: 2 + (idx % 3),
        address: `${districtName} Plaza & Transit Way`
      },
      pois: [
        {
          name: `${districtName} Express Transit`,
          category: 'transit',
          lat: eLat + 0.001,
          lng: eLng - 0.002,
          walkMinutes: 2 + (idx % 3),
          distanceMeters: 180,
          description: 'Rapid express connection into commercial hubs',
          rating: 4.8
        },
        {
          name: `${districtName} Academy`,
          category: 'school',
          lat: eLat + 0.002,
          lng: eLng + 0.002,
          walkMinutes: 4 + (idx % 3),
          distanceMeters: 320,
          description: 'Top-tier neighborhood academy with active community',
          rating: 4.9
        },
        {
          name: `Artisan Roasters & Bakeshop`,
          category: 'cafe',
          lat: eLat - 0.001,
          lng: eLng + 0.001,
          walkMinutes: 2,
          distanceMeters: 140,
          description: 'Local coffeehouse, freshly baked pastries, and sunny patio',
          rating: 4.9
        },
        {
          name: `${districtName} Community Park`,
          category: 'park',
          lat: eLat + 0.003,
          lng: eLng - 0.001,
          walkMinutes: 3,
          distanceMeters: 230,
          description: 'Public green park with mature canopy trees, lawns, and walking paths',
          rating: 4.8
        }
      ],
      realtor: {
        name: 'Julian Vance',
        agency: `${cityName} Relocation Specialists`,
        quote: `A stellar balance of neighborhood calm and direct dual-corridor transit access.`
      },
      hero: genericImages[idx % genericImages.length],
      gallery: [
        genericImages[idx % genericImages.length],
        genericImages[(idx + 1) % genericImages.length]
      ]
    };
  });

  const cityId = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return buildHomesFromEnclaves(enclaves, cityId, cityName, currencySymbol, preferences);
}

/**
 * Generates rich localized candidate properties directly around the user's location
 */
export function generateCandidatesAroundLocation(
  loc: LocationResolution,
  preferences?: BuyerPreferences,
  sfFallback?: CandidateHome[]
): CandidateHome[] {
  const normCity = (loc.cityName || '').toLowerCase();
  const normNeigh = (loc.neighborhood || '').toLowerCase();
  const normCountry = (loc.stateCountry || '').toLowerCase();
  const { lat, lng, countryCode, currencySymbol } = loc;

  // 1. San Francisco Bay Area (lat ~37.2 to 38.2, lng ~-122.8 to -122.0)
  const isSF =
    (lat >= 37.0 && lat <= 38.3 && lng >= -123.0 && lng <= -121.7) ||
    normCity.includes('san francisco') ||
    normCity === 'sf' ||
    normNeigh.includes('pacific heights') ||
    normNeigh.includes('noe valley') ||
    normNeigh.includes('marina') ||
    normNeigh.includes('mission dolores') ||
    normNeigh.includes('presidio heights');

  if (isSF && sfFallback && sfFallback.length > 0) {
    return sfFallback;
  }

  // 2. New York Metro (lat ~40.4 to 41.1, lng ~-74.3 to -73.6)
  const isNYC =
    (lat >= 40.4 && lat <= 41.1 && lng >= -74.3 && lng <= -73.6) ||
    normCity.includes('new york') ||
    normCity.includes('nyc') ||
    normCity.includes('brooklyn') ||
    normCity.includes('manhattan') ||
    normNeigh.includes('dumbo') ||
    normNeigh.includes('brooklyn heights') ||
    normNeigh.includes('williamsburg') ||
    normNeigh.includes('west village') ||
    normNeigh.includes('park slope');

  if (isNYC) {
    return buildHomesFromEnclaves(NEW_YORK_ENCLAVES, 'new-york', 'New York', '$', preferences);
  }

  // 3. London / UK (lat ~51.2 to 51.8, lng ~-0.6 to 0.4)
  const isLondon =
    (lat >= 51.2 && lat <= 51.8 && lng >= -0.6 && lng <= 0.4) ||
    countryCode === 'GB' ||
    currencySymbol === '£' ||
    normCity.includes('london') ||
    normNeigh.includes('notting hill') ||
    normNeigh.includes('richmond') ||
    normNeigh.includes('hampstead') ||
    normNeigh.includes('kensington') ||
    normNeigh.includes('marylebone') ||
    normNeigh.includes('islington');

  if (isLondon) {
    return buildHomesFromEnclaves(LONDON_ENCLAVES, 'london', 'London', '£', preferences);
  }

  // 4. São Paulo / Brazil
  const isSaoPaulo =
    (lat >= -24.2 && lat <= -23.0 && lng >= -47.2 && lng <= -46.0) ||
    countryCode === 'BR' ||
    currencySymbol === 'R$' ||
    normCountry.includes('brazil') ||
    normCountry.includes('brasil') ||
    normCity.includes('são paulo') ||
    normCity.includes('sao paulo') ||
    normNeigh.includes('saude') ||
    normNeigh.includes('saúde') ||
    normNeigh.includes('vila mariana') ||
    normNeigh.includes('moema') ||
    normNeigh.includes('pinheiros') ||
    normNeigh.includes('klabin') ||
    normNeigh.includes('jardins');

  if (isSaoPaulo) {
    return buildHomesFromEnclaves(SAO_PAULO_ENCLAVES, 'sao-paulo', 'São Paulo', 'R$', preferences);
  }

  // 5. Tokyo / Japan
  const isTokyo =
    (lat >= 35.2 && lat <= 36.2 && lng >= 139.2 && lng <= 140.2) ||
    countryCode === 'JP' ||
    currencySymbol === '¥' ||
    normCountry.includes('japan') ||
    normCity.includes('tokyo') ||
    normNeigh.includes('shibuya') ||
    normNeigh.includes('daikanyama') ||
    normNeigh.includes('nakameguro') ||
    normNeigh.includes('kichijoji') ||
    normNeigh.includes('omotesando') ||
    normNeigh.includes('yoyogi');

  if (isTokyo) {
    return buildHomesFromEnclaves(TOKYO_ENCLAVES, 'tokyo', 'Tokyo', '¥', preferences);
  }

  // 6. Paris / France
  const isParis =
    (lat >= 48.6 && lat <= 49.1 && lng >= 2.1 && lng <= 2.6) ||
    (countryCode === 'FR' && normCity.includes('paris')) ||
    normCity.includes('paris') ||
    normNeigh.includes('marais') ||
    normNeigh.includes('germain') ||
    normNeigh.includes('montmartre') ||
    normNeigh.includes('passy') ||
    normNeigh.includes('batignolles');

  if (isParis) {
    return buildHomesFromEnclaves(PARIS_ENCLAVES, 'paris', 'Paris', '€', preferences);
  }

  // 7. Austin / Texas
  const isAustin =
    (lat >= 30.0 && lat <= 30.6 && lng >= -98.0 && lng <= -97.4) ||
    normCity.includes('austin') ||
    normNeigh.includes('south congress') ||
    normNeigh.includes('soco') ||
    normNeigh.includes('zilker') ||
    normNeigh.includes('clarksville') ||
    normNeigh.includes('barton hills') ||
    normNeigh.includes('mueller') ||
    normNeigh.includes('travis heights');

  if (isAustin) {
    return buildHomesFromEnclaves(AUSTIN_ENCLAVES, 'austin', 'Austin', '$', preferences);
  }

  // 8. Seattle / Washington
  const isSeattle =
    (lat >= 47.3 && lat <= 47.9 && lng >= -122.6 && lng <= -122.1) ||
    normCity.includes('seattle') ||
    normNeigh.includes('queen anne') ||
    normNeigh.includes('capitol hill') ||
    normNeigh.includes('ballard') ||
    normNeigh.includes('fremont') ||
    normNeigh.includes('belltown') ||
    normNeigh.includes('madison park') ||
    normNeigh.includes('alki');

  if (isSeattle) {
    return buildHomesFromEnclaves(SEATTLE_ENCLAVES, 'seattle', 'Seattle', '$', preferences);
  }

  // 9. Universal dynamic generation for any location in the world
  return generateUniversalGlobalEnclaves(loc, preferences);
}
