/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CandidateHome, BuyerPreferences, WalkabilityPoi, NearbySchool, RealtorProfile, RealtorTourStop, CommuteLeg, DualCommute } from '../types';

/**
 * Calculates real Haversine distance in kilometers
 */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface EnclaveConfig {
  name: string;
  subLoc: string;
  exactLat: number;
  exactLng: number;
  street: string;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  type: 'Condominium' | 'Single Family' | 'Townhome' | 'Victorian' | 'Modern Loft';
  vibe: any;
  vibeLabel: string;
  vibeTags: string[];
  vibeDesc: string;
  school: {
    name: string;
    type: 'Elementary' | 'Middle' | 'High' | 'Private' | 'K-8';
    rating: number;
    distanceWalkMins: number;
    district: string;
    highlights: string[];
    lat: number;
    lng: number;
    address: string;
  };
  transit: {
    name: string;
    lat: number;
    lng: number;
    walkMins: number;
    address: string;
  };
  pois: {
    name: string;
    category: 'transit' | 'school' | 'cafe' | 'park' | 'grocery';
    lat: number;
    lng: number;
    walkMinutes: number;
    distanceMeters: number;
    description: string;
    rating: number;
  }[];
  realtor: {
    name: string;
    agency: string;
    quote: string;
  };
  hero: string;
  gallery: string[];
}

/**
 * Builds candidate homes from enclave specifications
 */
export function buildHomesFromEnclaves(
  enclaves: EnclaveConfig[],
  cityId: string,
  cityName: string,
  currencySymbol: string,
  preferences?: BuyerPreferences
): CandidateHome[] {
  const p1 = preferences?.partner1Work || {
    name: `${cityName} Commercial Center`,
    address: `Downtown ${cityName}`,
    lat: enclaves[0]?.exactLat + 0.025 || 0,
    lng: enclaves[0]?.exactLng + 0.015 || 0,
    preferredMode: 'transit'
  };

  const p2 = preferences?.partner2Work || {
    name: `${cityName} Innovation District`,
    address: `Tech Corridor, ${cityName}`,
    lat: enclaves[0]?.exactLat - 0.02 || 0,
    lng: enclaves[0]?.exactLng - 0.02 || 0,
    preferredMode: 'transit'
  };

  return enclaves.map((item, idx) => {
    const homeLat = item.exactLat;
    const homeLng = item.exactLng;

    const distP1 = haversineKm(homeLat, homeLng, p1.lat || homeLat + 0.02, p1.lng || homeLng + 0.01);
    const distP2 = haversineKm(homeLat, homeLng, p2.lat || homeLat - 0.02, p2.lng || homeLng - 0.02);

    const durP1 = Math.max(8, Math.round(distP1 * 2.2 + 5));
    const durP2 = Math.max(8, Math.round(distP2 * 2.3 + 5));
    const combinedAvg = Math.round((durP1 + durP2) / 2);
    const baselineCurrent = 38;
    const savedMins = Math.max(3, baselineCurrent - combinedAvg);

    let formattedPrice = '';
    if (currencySymbol === 'R$') {
      formattedPrice = `R$ ${item.price.toLocaleString('pt-BR')}`;
    } else if (currencySymbol === '£') {
      formattedPrice = `£${item.price.toLocaleString('en-GB')}`;
    } else if (currencySymbol === '€') {
      formattedPrice = `€${item.price.toLocaleString('fr-FR')}`;
    } else if (currencySymbol === '¥') {
      formattedPrice = `¥${item.price.toLocaleString('ja-JP')}`;
    } else if (currencySymbol === 'C$') {
      formattedPrice = `C$${item.price.toLocaleString('en-CA')}`;
    } else if (currencySymbol === 'A$') {
      formattedPrice = `A$${item.price.toLocaleString('en-AU')}`;
    } else {
      formattedPrice = `$${item.price.toLocaleString('en-US')}`;
    }

    const walkabilityPois: WalkabilityPoi[] = item.pois.map((poi, pIdx) => ({
      id: `poi-${cityId}-${idx}-${pIdx}`,
      name: poi.name,
      category: poi.category,
      lat: poi.lat,
      lng: poi.lng,
      altitude: 30,
      walkMinutes: poi.walkMinutes || 3,
      distanceMeters: poi.distanceMeters || 200,
      description: poi.description,
      rating: poi.rating || 4.8
    }));

    const tourStops: RealtorTourStop[] = [
      {
        id: `stop-${cityId}-${idx}-home`,
        title: item.title,
        subtitle: `${item.street}, ${item.name}`,
        category: 'Home Base',
        lat: homeLat,
        lng: homeLng,
        altitude: 40,
        camRange: 260,
        camTilt: 55,
        camHeading: 315 + (idx * 20) % 360,
        walkMinutesFromHome: 0,
        realtorPitch: item.vibeDesc,
        highlights: item.vibeTags,
        icon: 'home'
      },
      {
        id: `stop-${cityId}-${idx}-school`,
        title: item.school.name,
        subtitle: `${item.school.address} • ${item.school.distanceWalkMins} min walk (Rating ${item.school.rating}/10)`,
        category: 'Top School',
        lat: item.school.lat,
        lng: item.school.lng,
        altitude: 45,
        camRange: 320,
        camTilt: 52,
        camHeading: 45,
        walkMinutesFromHome: item.school.distanceWalkMins,
        realtorPitch: `Top-rated campus with ${item.school.rating}/10 academic rating. Highlights: ${item.school.highlights.join(', ')}.`,
        highlights: item.school.highlights,
        icon: 'graduation-cap'
      },
      {
        id: `stop-${cityId}-${idx}-transit`,
        title: item.transit.name,
        subtitle: `${item.transit.address} • ${item.transit.walkMins} min walk • Express Corridor`,
        category: 'Transit Link',
        lat: item.transit.lat,
        lng: item.transit.lng,
        altitude: 45,
        camRange: 340,
        camTilt: 58,
        camHeading: 180,
        walkMinutesFromHome: item.transit.walkMins,
        realtorPitch: `Rapid express connectivity providing an easy ${combinedAvg}-minute dual household commute.`,
        highlights: ['Express Connection', 'Direct Metro Route', 'Sheltered Commuter Access'],
        icon: 'train'
      },
      {
        id: `stop-${cityId}-${idx}-park`,
        title: item.pois.find((p) => p.category === 'park')?.name || `${item.name} Parkside Green`,
        subtitle: `Steps from home • Community Nature & Trails`,
        category: 'Nature & Park',
        lat: item.pois.find((p) => p.category === 'park')?.lat || homeLat + 0.004,
        lng: item.pois.find((p) => p.category === 'park')?.lng || homeLng + 0.003,
        altitude: 50,
        camRange: 350,
        camTilt: 50,
        camHeading: 90,
        walkMinutesFromHome: 5,
        realtorPitch: `Peaceful tree canopy and open lawns perfect for morning runs, weekend walks, and fresh air.`,
        highlights: ['Open Green Spaces', 'Walking Paths', 'Dog Friendly'],
        icon: 'tree-pine'
      }
    ];

    const realtorProfile: RealtorProfile = {
      name: item.realtor.name,
      title: 'Senior Neighborhood Relocation Specialist',
      agency: item.realtor.agency,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      quote: item.realtor.quote,
      tourHeadline: `Discover ${item.name} - 3D Aerial Tour`,
      tourStops: tourStops
    };

    const dualCommute: DualCommute = {
      partner1: {
        destinationName: p1.name,
        workplaceLabel: `Partner 1 (${p1.name})`,
        durationMins: durP1,
        distanceKm: Math.round(distP1 * 10) / 10,
        mode: p1.preferredMode || 'transit',
        routeSummary: `Direct express link (${Math.round(distP1 * 10) / 10} km)`,
        rushHourEstimateMins: Math.round(durP1 * 1.2)
      },
      partner2: {
        destinationName: p2.name,
        workplaceLabel: `Partner 2 (${p2.name})`,
        durationMins: durP2,
        distanceKm: Math.round(distP2 * 10) / 10,
        mode: p2.preferredMode || 'transit',
        routeSummary: `Rapid transit line (${Math.round(distP2 * 10) / 10} km)`,
        rushHourEstimateMins: Math.round(durP2 * 1.15)
      },
      combinedAverageMins: combinedAvg,
      comparisonVsCurrentMins: -savedMins,
      savingsSummary: `Saves ~${savedMins * 2} min/day roundtrip vs current base`
    };

    return {
      id: `${cityId}-${idx}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: item.title,
      address: `${item.street}, ${item.name}`,
      neighborhood: item.name,
      cityId: cityId,
      cityName: cityName,
      price: item.price,
      formattedPrice: formattedPrice,
      beds: item.beds,
      baths: item.baths,
      sqft: item.sqft,
      propertyType: item.type,
      yearBuilt: 2021 + (idx % 4),
      heroImage: item.hero,
      galleryImages: item.gallery,
      lat: homeLat,
      lng: homeLng,
      altitude: 35,
      camRange: 270,
      camTilt: 55,
      camHeading: 320 + (idx * 25) % 360,
      matchScore: 93 + (idx % 6),
      vibe: item.vibe,
      vibeLabel: item.vibeLabel,
      vibeTags: item.vibeTags,
      vibeDescription: item.vibeDesc,
      schoolScore: Math.round(item.school.rating),
      schoolSummary: `${item.school.name} (${item.school.rating}/10) - ${item.school.distanceWalkMins} min walk`,
      schools: [item.school],
      dualCommute: dualCommute,
      walkScore: 92 + (idx % 7),
      fifteenMinRadiusMeters: 1200,
      walkabilityHighlights: [
        `${item.transit.walkMins} min walk to ${item.transit.name}`,
        `Top school ${item.school.name} is ${item.school.distanceWalkMins} min walk`,
        `Artisan bakeries and organic cafes right outside`
      ],
      walkabilityPois: walkabilityPois,
      realtor: realtorProfile
    };
  });
}
