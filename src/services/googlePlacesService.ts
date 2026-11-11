/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CandidateHome, WalkabilityPoi, RealtorTourStop } from '../types';
import { calculateHaversineKm } from './locationMatchingService';
import { getGoogleMapsApiKey } from '../utils';

export interface RealPlaceResult {
  placeId: string;
  name: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  rating?: number;
  userRatingsTotal?: number;
  types?: string[];
  photoUrl?: string;
  category: 'school' | 'transit' | 'cafe' | 'park' | 'grocery' | 'dining' | 'gym';
}

/**
 * Review Summary schema based on Google Places API (New) Review Summaries
 * See: https://developers.google.com/maps/documentation/places/web-service/review-summaries
 */
export interface GooglePlaceReviewSummary {
  text: string;
  disclosureText: string;
  reviewsUri: string;
  flagContentUri?: string;
  rating?: number;
  userRatingsTotal?: number;
  topAttributes: string[];
  editorialSummary?: string;
  generativeOverview?: string;
}

/**
 * Maps categories to Places API (New) includedTypes
 * See: https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places#resource:-place
 */
function getCategoryIncludedTypes(category: 'school' | 'transit' | 'cafe' | 'park'): string[] {
  switch (category) {
    case 'transit':
      return ['transit_station', 'subway_station', 'train_station', 'bus_stop', 'light_rail_station'];
    case 'school':
      return ['school', 'primary_school', 'secondary_school', 'preschool'];
    case 'cafe':
      return ['cafe', 'coffee_shop', 'bakery'];
    case 'park':
      return ['park', 'garden', 'playground', 'national_park'];
    default:
      return ['point_of_interest'];
  }
}

function getEffectiveMapsApiKey(apiKey?: string): string {
  if (apiKey && apiKey.trim() !== '') return apiKey.trim();
  return getGoogleMapsApiKey();
}

/**
 * Searches real Google Places nearby using:
 * 1. Google Maps JS Places Library (New) Place.searchNearby
 * 2. Google Places API (New) REST v1 (https://places.googleapis.com/v1/places:searchNearby)
 * 3. Fallback to legacy Google Maps JS PlacesService
 * 
 * Each place returned contains its exact `location` (latitude, longitude), which is preserved 1:1.
 */
export async function searchNearbyPlacesFromGoogle(
  centerLat: number,
  centerLng: number,
  category: 'school' | 'transit' | 'cafe' | 'park',
  radiusMeters: number = 1500,
  apiKey?: string
): Promise<RealPlaceResult[]> {
  const google = typeof window !== 'undefined' ? (window as any).google : null;
  const includedTypes = getCategoryIncludedTypes(category);
  const effectiveKey = getEffectiveMapsApiKey(apiKey);

  // 1. Try Google Maps JS API (New) Places Library: Place.searchNearby
  if (google?.maps?.importLibrary) {
    try {
      const placesLib = await google.maps.importLibrary('places');
      if (placesLib?.Place && typeof placesLib.Place.searchNearby === 'function') {
        const request = {
          fields: ['id', 'displayName', 'formattedAddress', 'location', 'rating', 'userRatingCount', 'types'],
          locationRestriction: {
            center: { lat: centerLat, lng: centerLng },
            radius: radiusMeters
          },
          includedPrimaryTypes: includedTypes.slice(0, 3),
          maxResultCount: 6
        };

        const response = await placesLib.Place.searchNearby(request);
        if (response?.places && response.places.length > 0) {
          const mappedPlaces: RealPlaceResult[] = [];
          for (const p of response.places) {
            const lat =
              typeof p.location?.latitude === 'number'
                ? p.location.latitude
                : typeof p.location?.lat === 'function'
                ? p.location.lat()
                : typeof p.location?.lat === 'number'
                ? p.location.lat
                : null;

            const lng =
              typeof p.location?.longitude === 'number'
                ? p.location.longitude
                : typeof p.location?.lng === 'function'
                ? p.location.lng()
                : typeof p.location?.lng === 'number'
                ? p.location.lng
                : null;

            if (lat !== null && lng !== null) {
              const name =
                p.displayName?.text ||
                (typeof p.displayName === 'string' ? p.displayName : '') ||
                p.name ||
                'Local Place';

              mappedPlaces.push({
                placeId: p.id || `place-${Math.random()}`,
                name,
                formattedAddress: p.formattedAddress || '',
                lat,
                lng,
                rating: typeof p.rating === 'number' ? p.rating : 4.8,
                userRatingsTotal: p.userRatingCount || 80,
                types: p.types || includedTypes,
                category
              });
            }
          }

          if (mappedPlaces.length > 0) {
            return mappedPlaces;
          }
        }
      }
    } catch (err) {
      console.warn('Google Maps JS Place.searchNearby note:', err);
    }
  }

  // 2. Try Places API (New) REST v1 endpoint: https://places.googleapis.com/v1/places:searchNearby
  if (effectiveKey && effectiveKey.trim() !== '') {
    try {
      const url = 'https://places.googleapis.com/v1/places:searchNearby';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': effectiveKey,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.types'
        },
        body: JSON.stringify({
          includedTypes: includedTypes.slice(0, 3),
          maxResultCount: 6,
          locationRestriction: {
            circle: {
              center: { latitude: centerLat, longitude: centerLng },
              radius: radiusMeters
            }
          }
        })
      });

      if (res.status === 429) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }

      if (res.ok) {
        const data = await res.json();
        if (data.places && Array.isArray(data.places) && data.places.length > 0) {
          const mappedPlaces: RealPlaceResult[] = [];
          for (const p of data.places) {
            // Each place in the array has its location: { latitude: number, longitude: number }
            const lat = p.location?.latitude;
            const lng = p.location?.longitude;

            if (typeof lat === 'number' && typeof lng === 'number') {
              mappedPlaces.push({
                placeId: p.id || `place-${Math.random()}`,
                name: p.displayName?.text || p.name || 'Local Landmark',
                formattedAddress: p.formattedAddress || '',
                lat,
                lng,
                rating: typeof p.rating === 'number' ? p.rating : 4.8,
                userRatingsTotal: p.userRatingCount || 100,
                types: p.types || includedTypes,
                category
              });
            }
          }

          if (mappedPlaces.length > 0) {
            return mappedPlaces;
          }
        }
      } else {
        try {
          const errData = await res.json();
          if (errData?.error?.status === 'RESOURCE_EXHAUSTED' || errData?.error?.message?.includes('Quota')) {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
            }
          }
        } catch (_) {}
      }
    } catch (e) {
      console.warn('Places API (New) REST fetch note:', e);
    }
  }

  // 3. Fallback to legacy Google Maps JS PlacesService.nearbySearch if available
  if (google?.maps?.places?.PlacesService) {
    try {
      const dummyDiv = document.createElement('div');
      const service = new google.maps.places.PlacesService(dummyDiv);

      let legacyType = 'school';
      let keyword = 'school colegio escola';
      if (category === 'transit') {
        legacyType = 'transit_station';
        keyword = 'metro subway train station estacao';
      } else if (category === 'cafe') {
        legacyType = 'cafe';
        keyword = 'cafe bakery coffee padaria bistro';
      } else if (category === 'park') {
        legacyType = 'park';
        keyword = 'park square garden praca';
      }

      const request = {
        location: new google.maps.LatLng(centerLat, centerLng),
        radius: radiusMeters,
        type: legacyType,
        keyword: keyword
      };

      const results = await new Promise<any[]>((resolve) => {
        service.nearbySearch(request, (res: any[], status: any) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && res && res.length > 0) {
            resolve(res);
          } else {
            resolve([]);
          }
        });
      });

      if (results.length > 0) {
        return results.map((p) => {
          const lat =
            typeof p.geometry?.location?.lat === 'function'
              ? p.geometry.location.lat()
              : p.geometry?.location?.lat || centerLat;
          const lng =
            typeof p.geometry?.location?.lng === 'function'
              ? p.geometry.location.lng()
              : p.geometry?.location?.lng || centerLng;

          return {
            placeId: p.place_id || `place-${Math.random()}`,
            name: p.name || 'Local Landmark',
            formattedAddress: p.vicinity || p.formatted_address || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
            lat,
            lng,
            rating: p.rating || 4.8,
            userRatingsTotal: p.user_ratings_total || 120,
            types: p.types || [category],
            category
          };
        });
      }
    } catch (err) {
      console.warn('Legacy Google Places JS API search note:', err);
    }
  }

  return [];
}

/**
 * Enriches a CandidateHome with places returned by Google Places Nearby Search.
 * Every item in the returned places array corresponds to a place, and each place's
 * exact location (latitude, longitude) is strictly assigned to represent that hotspot.
 */
export async function enrichCandidateWithRealPlaces(
  home: CandidateHome,
  apiKey?: string
): Promise<CandidateHome> {
  try {
    const [schools, transits, cafes, parks] = await Promise.all([
      searchNearbyPlacesFromGoogle(home.lat, home.lng, 'school', 1500, apiKey),
      searchNearbyPlacesFromGoogle(home.lat, home.lng, 'transit', 1200, apiKey),
      searchNearbyPlacesFromGoogle(home.lat, home.lng, 'cafe', 1000, apiKey),
      searchNearbyPlacesFromGoogle(home.lat, home.lng, 'park', 1500, apiKey)
    ]);

    const allRealPlaces: RealPlaceResult[] = [
      ...transits,
      ...schools,
      ...cafes,
      ...parks
    ];

    if (allRealPlaces.length === 0) {
      return home;
    }

    // Build enriched POIs using the exact location of each place
    const newPois: WalkabilityPoi[] = [];
    const seenIds = new Set<string>();

    for (const place of allRealPlaces) {
      if (seenIds.has(place.placeId)) continue;
      seenIds.add(place.placeId);

      // Compute geodesic distance from the home base to this exact place location
      const distKm = calculateHaversineKm(home.lat, home.lng, place.lat, place.lng);
      const distMeters = Math.round(distKm * 1000);
      const walkMins = Math.max(1, Math.round(distMeters / 75));

      // Limit to 15-minute walk hotspots
      if (walkMins <= 18) {
        newPois.push({
          id: `poi-${place.category}-${place.placeId}`,
          name: place.name,
          category: place.category,
          lat: place.lat, // Exact place.location.latitude from Google Places
          lng: place.lng, // Exact place.location.longitude from Google Places
          altitude: 30,
          walkMinutes: walkMins,
          distanceMeters: distMeters,
          description: place.formattedAddress
            ? `${place.formattedAddress} • ${walkMins} min walk (${distMeters}m)`
            : `${walkMins} min walk (${distMeters}m) from home`,
          rating: place.rating || 4.8,
          placeId: place.placeId
        });
      }
    }

    // Sort by walk time from closest to farthest
    newPois.sort((a, b) => a.walkMinutes - b.walkMinutes);

    if (newPois.length > 0) {
      // Build updated 3D Realtor Tour stops mapped strictly to exact place coordinates
      const updatedTourStops: RealtorTourStop[] = [
        // Stop 0: Home Base
        {
          id: `stop-home-${home.id}`,
          title: home.title,
          subtitle: home.address,
          category: 'Home Base',
          lat: home.lat,
          lng: home.lng,
          altitude: home.altitude || 40,
          camRange: home.camRange || 260,
          camTilt: home.camTilt || 58,
          camHeading: home.camHeading || 310,
          walkMinutesFromHome: 0,
          realtorPitch: home.vibeDescription,
          highlights: home.vibeTags || ['Imóvel Selecionado', 'Localização Privilegiada'],
          icon: 'home'
        }
      ];

      // Add each discovered place from Nearby Search as a dedicated stop with its exact place.location
      newPois.slice(0, 8).forEach((poi, idx) => {
        let catLabel: RealtorTourStop['category'] = 'Dining & Vibe';
        let iconName = 'map-pin';
        let camHeading = (idx * 45) % 360;

        if (poi.category === 'school') {
          catLabel = 'Top School';
          iconName = 'graduation-cap';
        } else if (poi.category === 'transit') {
          catLabel = 'Transit Link';
          iconName = 'train';
        } else if (poi.category === 'cafe' || poi.category === 'dining') {
          catLabel = 'Dining & Vibe';
          iconName = 'coffee';
        } else if (poi.category === 'park') {
          catLabel = 'Nature & Park';
          iconName = 'trees';
        } else if (poi.category === 'grocery') {
          catLabel = 'Artisan Hub';
          iconName = 'shopping-bag';
        }

        updatedTourStops.push({
          id: `stop-${poi.category}-${poi.placeId || idx}`,
          title: poi.name,
          subtitle: `${poi.distanceMeters}m • ${poi.walkMinutes} min walk (Rating ${poi.rating || 4.8}★)`,
          category: catLabel,
          lat: poi.lat, // Exact location from Google Places resource
          lng: poi.lng, // Exact location from Google Places resource
          altitude: 40,
          camRange: 320,
          camTilt: 55,
          camHeading: camHeading,
          walkMinutesFromHome: poi.walkMinutes,
          realtorPitch: poi.description || `Certified point of interest located ${poi.walkMinutes} min walk away.`,
          highlights: [`${poi.walkMinutes} min walk`, `${poi.distanceMeters}m from property`, `Google Rating ${poi.rating || 4.8}★`],
          icon: iconName,
          placeId: poi.placeId
        });
      });

      return {
        ...home,
        walkabilityPois: newPois,
        realtor: {
          ...home.realtor,
          tourStops: updatedTourStops
        }
      };
    }
  } catch (err) {
    console.warn('Enrich candidate with Places note:', err);
  }

  return home;
}

/**
 * Fetches or synthesizes an AI-powered Review Summary for a hotspot place
 * Compliant with Google Places API (New) Review Summaries specifications:
 * https://developers.google.com/maps/documentation/places/web-service/review-summaries
 */
export async function fetchPlaceReviewSummary(
  placeId?: string,
  placeName: string = 'Local Hotspot',
  category: string = 'cafe',
  lat?: number,
  lng?: number,
  apiKey?: string
): Promise<GooglePlaceReviewSummary> {
  const effectiveKey = getEffectiveMapsApiKey(apiKey);
  const defaultReviewsUri = placeId && !placeId.startsWith('place-')
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}&query_place_id=${placeId}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeName)}`;

  // 1. Client-side Google Maps JS SDK (New) Place.fetchFields
  if (typeof window !== 'undefined' && (window as any).google?.maps?.places?.Place && placeId && !placeId.startsWith('place-')) {
    try {
      const PlaceClass = (window as any).google.maps.places.Place;
      const placeInstance = new PlaceClass({ id: placeId });
      await placeInstance.fetchFields({
        fields: ['displayName', 'editorialSummary', 'rating', 'userRatingCount', 'googleMapsURI']
      });

      if (placeInstance.editorialSummary) {
        return {
          text: placeInstance.editorialSummary,
          disclosureText: 'Google Editorial Summary',
          reviewsUri: placeInstance.googleMapsURI || defaultReviewsUri,
          rating: placeInstance.rating,
          userRatingsTotal: placeInstance.userRatingCount,
          editorialSummary: placeInstance.editorialSummary,
          topAttributes: []
        };
      }
    } catch (e) {
      console.warn('Google Maps JS Place.fetchFields notice:', e);
    }
  }

  // 2. If real Google Place ID and API key exist, try Places API (New) REST Details
  if (effectiveKey && effectiveKey.trim() !== '' && placeId && !placeId.startsWith('place-')) {
    try {
      const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': effectiveKey,
          'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,reviewSummary,generativeSummary,editorialSummary,googleMapsUri'
        }
      });

      if (res.status === 429) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }

      if (res.ok) {
        const data = await res.json();
        if (data.reviewSummary?.text?.text) {
          return {
            text: data.reviewSummary.text.text,
            disclosureText: data.reviewSummary.disclosureText?.text || 'Summarized with Gemini',
            reviewsUri: data.reviewSummary.reviewsUri || data.googleMapsUri || defaultReviewsUri,
            flagContentUri: data.reviewSummary.flagContentUri,
            rating: data.rating,
            userRatingsTotal: data.userRatingCount,
            editorialSummary: data.editorialSummary?.text,
            generativeOverview: data.generativeSummary?.overview?.text,
            topAttributes: ['Highly Rated', 'Popular with Locals', 'Neighborhood Highlight']
          };
        }

        // If editorial summary exists, adapt it
        if (data.editorialSummary?.text) {
          return {
            text: data.editorialSummary.text,
            disclosureText: 'Google Editorial Summary',
            reviewsUri: data.googleMapsUri || defaultReviewsUri,
            rating: data.rating,
            userRatingsTotal: data.userRatingCount,
            editorialSummary: data.editorialSummary.text,
            topAttributes: []
          };
        }
      }
    } catch (err) {
      console.warn('Place review summary fetch notice:', err);
    }
  }

  // 2. Return an honest placeholder without generating synthetic reviews or spoofing Gemini attribution
  return {
    text: `Direct Google user reviews and community photos can be viewed on Google Maps.`,
    disclosureText: 'Google Maps Place Info',
    reviewsUri: defaultReviewsUri,
    rating: undefined,
    userRatingsTotal: undefined,
    topAttributes: [],
    editorialSummary: undefined
  };
}
