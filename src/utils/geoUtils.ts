import { WalkabilityPoi } from '../types';

/**
 * Computes geodesic distance in kilometers between two lat/lng coordinates.
 */
export function getHaversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Generates an array of LatLng coordinates forming a 15-minute walk boundary circle.
 * Average walking speed: 4.8 km/h = 80 m/min -> 15 min = 1,200 meters.
 * Returns an array of `{ lat, lng, altitude }` for Google Maps 3D polygon.
 */
export function generateWalkabilityCircle(
  centerLat: number,
  centerLng: number,
  radiusMeters: number = 1200,
  pointsCount: number = 48,
  altitude: number = 5
): Array<{ lat: number; lng: number; altitude: number }> {
  const coordinates: Array<{ lat: number; lng: number; altitude: number }> = [];
  const earthRadius = 6378137; // in meters

  for (let i = 0; i <= pointsCount; i++) {
    const angle = (i * 2 * Math.PI) / pointsCount;
    // Slight organic variation (+-3%) to simulate natural city walk isochrone
    const organicRadius = radiusMeters * (1 + 0.04 * Math.sin(angle * 3) + 0.02 * Math.cos(angle * 5));
    const dLat = (organicRadius * Math.cos(angle)) / earthRadius;
    const dLng =
      (organicRadius * Math.sin(angle)) /
      (earthRadius * Math.cos((centerLat * Math.PI) / 180));

    const lat = centerLat + (dLat * 180) / Math.PI;
    const lng = centerLng + (dLng * 180) / Math.PI;

    coordinates.push({ lat, lng, altitude });
  }

  return coordinates;
}

/**
 * Calculates realistic commute travel time in minutes based on distance and mode.
 */
export function estimateCommuteDuration(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  mode: 'transit' | 'drive' | 'bike' | 'walk' = 'transit'
): { durationMins: number; distanceKm: number; routeSummary: string } {
  const directDistanceKm = getHaversineDistanceKm(originLat, originLng, destLat, destLng);
  // Urban detour coefficient (typically 1.25x - 1.4x straight line)
  const urbanDistanceKm = directDistanceKm * 1.32;

  let speedKmH = 28; // Default transit speed
  let baseWaitTransferMins = 3;
  let summary = 'Direct City Transit Route';

  switch (mode) {
    case 'transit':
      speedKmH = 26;
      baseWaitTransferMins = directDistanceKm > 4 ? 6 : 3;
      summary = directDistanceKm > 6 ? 'Metro Express + Short Walk' : 'Rapid Bus / Light Rail';
      break;
    case 'drive':
      speedKmH = directDistanceKm > 8 ? 42 : 24;
      baseWaitTransferMins = 2; // parking / signals
      summary = directDistanceKm > 8 ? 'Arterial Highway / Expressway' : 'City Boulevards';
      break;
    case 'bike':
      speedKmH = 16;
      baseWaitTransferMins = 1;
      summary = 'Designated Bike Corridors & Greenways';
      break;
    case 'walk':
      speedKmH = 4.8;
      baseWaitTransferMins = 0;
      summary = 'Pedestrian Sidewalks';
      break;
  }

  const travelMins = Math.round((urbanDistanceKm / speedKmH) * 60 + baseWaitTransferMins);

  return {
    durationMins: Math.max(4, travelMins),
    distanceKm: parseFloat(urbanDistanceKm.toFixed(1)),
    routeSummary: summary
  };
}

/**
 * Format walking time into human-friendly string.
 */
export function formatWalkTime(mins: number): string {
  if (mins <= 1) return '1 min walk';
  return `${mins} min walk`;
}

/**
 * Category color and icon map for walkability POIs
 */
export function getCategoryStyle(category: WalkabilityPoi['category']): {
  bg: string;
  text: string;
  border: string;
  pinColor: string;
  icon: string;
} {
  switch (category) {
    case 'cafe':
      return {
        bg: 'bg-amber-500/15',
        text: 'text-amber-300',
        border: 'border-amber-500/30',
        pinColor: '#F59E0B',
        icon: '☕'
      };
    case 'school':
      return {
        bg: 'bg-blue-500/15',
        text: 'text-blue-300',
        border: 'border-blue-500/30',
        pinColor: '#3B82F6',
        icon: '🎓'
      };
    case 'park':
      return {
        bg: 'bg-emerald-500/15',
        text: 'text-emerald-300',
        border: 'border-emerald-500/30',
        pinColor: '#10B981',
        icon: '🌲'
      };
    case 'transit':
      return {
        bg: 'bg-purple-500/15',
        text: 'text-purple-300',
        border: 'border-purple-500/30',
        pinColor: '#A855F7',
        icon: '🚆'
      };
    case 'grocery':
      return {
        bg: 'bg-rose-500/15',
        text: 'text-rose-300',
        border: 'border-rose-500/30',
        pinColor: '#F43F5E',
        icon: '🛒'
      };
    case 'dining':
      return {
        bg: 'bg-orange-500/15',
        text: 'text-orange-300',
        border: 'border-orange-500/30',
        pinColor: '#FB923C',
        icon: '🍽️'
      };
    default:
      return {
        bg: 'bg-slate-500/15',
        text: 'text-slate-300',
        border: 'border-slate-500/30',
        pinColor: '#94A3B8',
        icon: '📍'
      };
  }
}
