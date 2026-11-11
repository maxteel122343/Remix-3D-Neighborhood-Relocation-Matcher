import {
  CITIES,
  LANDMARKS_SAN_FRANCISCO,
  LANDMARKS_TOKYO,
  LANDMARKS_PARIS,
  LANDMARKS_ROME,
  LANDMARKS_NEW_YORK,
  LANDMARKS_LONDON,
  LANDMARKS_BARCELONA,
  LANDMARKS_SYDNEY,
  LANDMARKS_AMSTERDAM,
  LANDMARKS_SINGAPORE,
  LANDMARKS_VENICE,
  LANDMARKS_FLORENCE,
  LANDMARKS_RIO_DE_JANEIRO
} from './landmarksData';

export interface Landmark {
  id: string;
  name: string;
  placeId: string;
  lat: number;
  lng: number;
  altitude: number; // Camera focus target altitude in meters
  markerAltitude?: number; // Optional altitude offset above 3D mesh (defaults to 12m)
  altitudeCorrection?: number; // Legacy field
  heading: number; // Target heading
  tilt: number; // Target tilt
  camAltitude: number; // Camera elevation for optimal viewing (meters)
  camRange: number; // Camera range for optimal viewing (meters)
  camTilt: number; // Camera tilt (degrees)
  camHeading: number; // Camera heading (degrees)
  category: string;
  description: string;
  highlights: string[];
  iconName: string;
  pinColor?: string;
  glyph?: string;
  svgIcon?: string;
  altitudeMode?: 'RELATIVE_TO_GROUND' | 'RELATIVE_TO_MESH' | 'ABSOLUTE';
}

export interface CityConfig {
  id: string;
  name: string;
  country: string;
  flag: string;
  tagline: string;
  placeId: string;
  initialCam: {
    center: { lat: number; lng: number; altitude: number };
    range: number;
    tilt: number;
    heading: number;
  };
  initialCamMobile: {
    center: { lat: number; lng: number; altitude: number };
    range: number;
    tilt: number;
    heading: number;
  };
  landmarks: Landmark[];
}

// Default base altitude offset relative to the 3D mesh (meters)
export const DEFAULT_MESH_ALTITUDE = 12;
export const DEFAULT_GROUND_ALTITUDE = 40;

/**
 * Computes marker altitude.
 * - For RELATIVE_TO_MESH (default for landmarks atop 3D photorealistic building/terrain mesh):
 *   places marker cleanly right above the structure with a 10-15m clearance.
 * - For RELATIVE_TO_GROUND (e.g. Ferry Building):
 *   anchors marker at fixed elevation above ground level.
 */
export function getLandmarkMarkerAltitude(loc: Landmark): number {
  const isGround = loc.altitudeMode === 'RELATIVE_TO_GROUND' || loc.id === 'ferry-building';
  
  if (isGround) {
    if (loc.markerAltitude !== undefined) return loc.markerAltitude;
    if (loc.altitude !== undefined && loc.altitude > 0) return loc.altitude;
    return DEFAULT_GROUND_ALTITUDE;
  }

  // Mesh relative mode: place marker right above the top of the 3D structure/mesh
  if (loc.markerAltitude !== undefined) {
    return loc.markerAltitude;
  }
  return DEFAULT_MESH_ALTITUDE;
}

// Re-export landmarks & cities
export {
  CITIES,
  LANDMARKS_SAN_FRANCISCO,
  LANDMARKS_TOKYO,
  LANDMARKS_PARIS,
  LANDMARKS_ROME,
  LANDMARKS_NEW_YORK,
  LANDMARKS_LONDON,
  LANDMARKS_BARCELONA,
  LANDMARKS_SYDNEY,
  LANDMARKS_AMSTERDAM,
  LANDMARKS_SINGAPORE,
  LANDMARKS_VENICE,
  LANDMARKS_FLORENCE,
  LANDMARKS_RIO_DE_JANEIRO
};

export const DEFAULT_CITY_ID = 'san-francisco';

export function getCityConfig(cityId: string): CityConfig {
  const found = CITIES.find((c) => c.id === cityId);
  return found || CITIES[0];
}

// Backward-compatibility export
export const LANDMARKS = LANDMARKS_SAN_FRANCISCO;

/**
 * Calculates the geodesic distance in kilometers between two lat/lng coordinates
 * using the Haversine formula.
 */
export function getHaversineDistance(
  lat1: any,
  lng1: any,
  lat2: any,
  lng2: any
): number {
  const getVal = (v: any): number => {
    if (typeof v === 'function') {
      try {
        return Number(v()) || 0;
      } catch (err) {
        return 0;
      }
    }
    const num = Number(v);
    return isNaN(num) ? 0 : num;
  };

  const l1 = getVal(lat1);
  const n1 = getVal(lng1);
  const l2 = getVal(lat2);
  const n2 = getVal(lng2);

  const R = 6371; // Earth's mean radius in km
  const dLat = ((l2 - l1) * Math.PI) / 180;
  const dLng = ((n2 - n1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((l1 * Math.PI) / 180) *
      Math.cos((l2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates flight duration in seconds based on distance (km) following
 * the user's custom duration constraints:
 * - Shorter (0.5km) -> 3.5-4 seconds
 * - Medium (1-2.5km) -> 5-6.5 seconds
 * - Longer (3-5km) -> 7-10 seconds
 */
export function getFlightDuration(distanceKm: number): {
  seconds: number;
  category: 'Short' | 'Medium' | 'Long';
  description: string;
} {
  // Defensive check for invalid distance inputs (such as NaN, null, undefined)
  if (typeof distanceKm !== 'number' || isNaN(distanceKm)) {
    return {
      seconds: 5.0,
      category: 'Medium',
      description: 'Fallback Transition duration'
    };
  }

  // If identical points / tiny nudge
  if (distanceKm < 0.1) {
    return { seconds: 2.0, category: 'Short', description: 'Immediate Transition' };
  }

  if (distanceKm < 0.75) {
    // Shorter flights (~0.5km) will take 3.5-4 seconds. Interpolate.
    // 0.1km -> 3.5s, 0.75km -> 4.0s
    const ratio = (distanceKm - 0.1) / 0.65;
    const seconds = 3.5 + Math.max(0, Math.min(0.5, ratio * 0.5));
    return {
      seconds: parseFloat(seconds.toFixed(2)),
      category: 'Short',
      description: 'Shorter range (0.5km scale) flight'
    };
  } else if (distanceKm >= 0.75 && distanceKm < 2.75) {
    // Medium flights (1-2.5km) 5-6.5 seconds
    // 0.75km -> 5.0s, 2.75km -> 6.5s
    const ratio = (distanceKm - 0.75) / 2.0;
    const seconds = 5.0 + Math.max(0, Math.min(1.5, ratio * 1.5));
    return {
      seconds: parseFloat(seconds.toFixed(2)),
      category: 'Medium',
      description: 'Medium range (1-2.5km scale) flight'
    };
  } else {
    // Longer ones (3-5km+) 7-10 seconds
    // 2.75km -> 7.0s, 5.0km -> 10.0s, cap or scale beyond
    const ratio = (distanceKm - 2.75) / 2.25;
    const seconds = 7.0 + Math.max(0, Math.min(3.0, ratio * 3.0));
    // If exceptionally long (e.g. 7km), keep it capped at 10.5 seconds to preserve visual flow
    const cappedSeconds = seconds > 10 ? 10 + Math.min(1.0, (seconds - 10) * 0.1) : seconds;
    return {
      seconds: parseFloat(cappedSeconds.toFixed(2)),
      category: 'Long',
      description: 'Long range (3-5km scale) flight'
    };
  }
}

// Global promise to prevent duplicate loading of Google Maps API script
let mapsLoadingPromise: Promise<any> | null = null;
let activeLoadedKey: string | null = null;

/**
 * Returns the active Google Maps API key from Vite environment, injected window global, or process.env.
 */
export function getGoogleMapsApiKey(): string {
  // 1. Direct Vite env variable (without optional chaining so Vite can perform compile-time string replacement)
  const viteKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (viteKey && typeof viteKey === 'string' && viteKey.trim() !== '' && !viteKey.startsWith('%')) {
    return viteKey.trim();
  }
  // 2. Global window object set by server / HTML transform
  if (typeof window !== 'undefined') {
    const winKey = (window as any).__GOOGLE_MAPS_API_KEY__;
    if (winKey && typeof winKey === 'string' && winKey.trim() !== '' && !winKey.startsWith('%')) {
      return winKey.trim();
    }
  }
  // 3. Fallback process.env if available
  if (typeof process !== 'undefined' && (process.env as any)?.VITE_GOOGLE_MAPS_API_KEY) {
    const procKey = (process.env as any).VITE_GOOGLE_MAPS_API_KEY;
    if (procKey && typeof procKey === 'string' && procKey.trim() !== '') {
      return procKey.trim();
    }
  }
  return '';
}

/**
 * Dynamically loads the Google Maps JavaScript API with maps3d library enabled.
 */
export async function loadGoogleMapsScript(apiKey?: string): Promise<any> {
  let effectiveKey = (apiKey && apiKey.trim() !== '') ? apiKey.trim() : getGoogleMapsApiKey();

  // If effectiveKey is not yet available, attempt to retrieve it from /api/config
  if (!effectiveKey && typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        if (data?.googleMapsApiKey && typeof data.googleMapsApiKey === 'string' && data.googleMapsApiKey.trim() !== '') {
          effectiveKey = data.googleMapsApiKey.trim();
          (window as any).__GOOGLE_MAPS_API_KEY__ = effectiveKey;
        }
      }
    } catch (e) {
      console.warn('Failed to fetch /api/config for Google Maps API key:', e);
    }
  }

  // Guard: NEVER load the Google Maps JavaScript API without an API key!
  // Loading without a key triggers MissingKeyMapError and renders the "Oops! Something went wrong" banner.
  if (!effectiveKey) {
    const missingErr = new Error('VITE_GOOGLE_MAPS_API_KEY is not available in environment secrets.');
    console.error('Google Maps Platform cannot load: VITE_GOOGLE_MAPS_API_KEY is missing.');
    return Promise.reject(missingErr);
  }

  // If already loaded with the same key
  if ((window as any).google?.maps && activeLoadedKey === effectiveKey) {
    return Promise.resolve((window as any).google);
  }

  // If loading promise exists for current key
  if (mapsLoadingPromise && activeLoadedKey === effectiveKey) {
    return mapsLoadingPromise;
  }

  // If key changed or previous script exists with different key, remove old script
  const existingScript = document.getElementById('google-maps-3d-script') as HTMLScriptElement | null;
  if (existingScript && activeLoadedKey !== effectiveKey) {
    try {
      existingScript.remove();
    } catch (e) {}
    mapsLoadingPromise = null;
  }

  activeLoadedKey = effectiveKey;

  mapsLoadingPromise = new Promise(async (resolve, reject) => {
    let isResolved = false;
    const finishLoading = async () => {
      if (isResolved) return;
      isResolved = true;
      try {
        const google = (window as any).google;
        if (google?.maps?.importLibrary) {
          try {
            await Promise.all([
              google.maps.importLibrary('maps3d'),
              google.maps.importLibrary('marker'),
              google.maps.importLibrary('places'),
              google.maps.importLibrary('maps')
            ]);
          } catch (libErr) {
            console.warn('Google Maps importLibrary notice:', libErr);
          }
        }
        if (typeof customElements !== 'undefined' && customElements.whenDefined) {
          try {
            await customElements.whenDefined('gmp-map-3d');
          } catch (e) {}
        }
        resolve((window as any).google);
      } catch (err) {
        resolve((window as any).google);
      }
    };

    // Setup callback
    (window as any).__googleMaps3DLoaded = finishLoading;

    const script = document.createElement('script');
    script.id = 'google-maps-3d-script';
    // Load Google Maps JavaScript API with beta channel for 3D maps, async loading, and internal_usage_attribution_ids
    const keyParam = `key=${encodeURIComponent(effectiveKey)}&`;
    script.src = `https://maps.googleapis.com/maps/api/js?${keyParam}v=beta&libraries=maps3d,places,marker,maps&loading=async&internal_usage_attribution_ids=gmp_mcp_codeassist_v1_aistudio&callback=__googleMaps3DLoaded`;
    script.async = true;
    script.defer = true;
    script.onload = finishLoading;
    script.onerror = (err) => {
      console.error("Google Maps 3D Script failed to load", err);
      mapsLoadingPromise = null; // Reset on failure so we can retry on next request
      reject(err);
    };
    document.head.appendChild(script);
  });

  return mapsLoadingPromise;
}
