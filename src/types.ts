export type VibeType =
  | 'artisan-trendy'
  | 'quiet-residential'
  | 'family-friendly'
  | 'tech-modern'
  | 'historic-victorian'
  | 'coastal-scenic'
  | 'urban-vibrant'
  | 'vibrant-urban'
  | 'arts-culture'
  | 'leafy-suburban'
  | 'artisan-foodie'
  | 'transit-connected'
  | 'quiet-scenic'
  | 'historic-charming';

export type NeighborhoodVibe = VibeType;
export type CommuteMode = 'transit' | 'drive' | 'bike' | 'walk';


export interface WalkabilityPoi {
  id: string;
  name: string;
  category: 'cafe' | 'school' | 'park' | 'transit' | 'grocery' | 'dining' | 'gym';
  lat: number;
  lng: number;
  altitude?: number;
  walkMinutes: number;
  distanceMeters: number;
  description: string;
  placeId?: string;
  rating?: number;
  iconName?: string;
}

export interface NearbySchool {
  name: string;
  type: 'Elementary' | 'Middle' | 'High' | 'Private' | 'K-8';
  rating: number; // 1 - 10
  distanceWalkMins: number;
  district: string;
  highlights: string[];
  placeId?: string;
}

export interface CommuteLeg {
  destinationName: string;
  workplaceLabel: string; // e.g. "Partner 1 (Tech Campus)"
  durationMins: number;
  distanceKm: number;
  mode: 'transit' | 'drive' | 'bike' | 'walk';
  routeSummary: string;
  rushHourEstimateMins: number;
}

export interface DualCommute {
  partner1: CommuteLeg;
  partner2: CommuteLeg;
  combinedAverageMins: number;
  comparisonVsCurrentMins: number; // negative means minutes saved
  savingsSummary: string; // e.g. "Saves 18 mins daily vs current home"
}

export interface RealtorTourStop {
  id: string;
  title: string;
  subtitle: string;
  category: 'Home Base' | 'Top School' | 'Artisan Hub' | 'Transit Link' | 'Nature & Park' | 'Dining & Vibe';
  lat: number;
  lng: number;
  altitude: number;
  camRange: number;
  camTilt: number;
  camHeading: number;
  camAltitude?: number;
  walkMinutesFromHome: number;
  realtorPitch: string;
  highlights: string[];
  placeId?: string;
  icon: string;
}

export interface RealtorProfile {
  name: string;
  title: string;
  agency: string;
  avatar: string;
  quote: string;
  tourHeadline: string;
  tourStops: RealtorTourStop[];
}

export interface CandidateHome {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  cityId: string;
  cityName: string;
  price: number;
  formattedPrice: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: 'Single Family' | 'Townhome' | 'Condominium' | 'Victorian' | 'Modern Loft';
  yearBuilt: number;
  heroImage: string;
  galleryImages: string[];
  
  // Coordinates for 3D Photorealistic Camera Focus
  lat: number;
  lng: number;
  altitude: number;
  camRange: number;
  camTilt: number;
  camHeading: number;
  
  // Scoring & Criteria
  matchScore: number; // 0 - 100%
  vibe: VibeType;
  vibeLabel: string;
  vibeTags: string[];
  vibeDescription: string;
  
  // School Criteria
  schoolScore: number; // 1 - 10
  schoolSummary: string;
  schools: NearbySchool[];
  
  // Dual Workplace Commute
  dualCommute: DualCommute;
  
  // 15-Minute Walkability Circle & POIs
  walkScore: number; // 0 - 100
  fifteenMinRadiusMeters: number; // default ~1200m
  walkabilityHighlights: string[];
  walkabilityPois: WalkabilityPoi[];
  
  // Realtor Promotion & 3D Tour
  realtor: RealtorProfile;
}

export interface CurrentHomeLocation {
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  cityId: string;
}

export interface WorkplaceLocation {
  name: string;
  address: string;
  lat: number;
  lng: number;
  preferredMode: 'transit' | 'drive' | 'bike' | 'walk';
}

export interface BuyerPreferences {
  currentHome: CurrentHomeLocation;
  partner1Work: WorkplaceLocation;
  partner2Work: WorkplaceLocation;
  targetVibes: VibeType[];
  minSchoolScore: number;
  maxCommuteMinutes: number;
  minBeds: number;
  maxBudget: number;
  priorityWeights: {
    vibe: number;
    schools: number;
    commute: number;
    walkability: number;
  };
}

export interface CityMetro {
  id: string;
  name: string;
  stateCountry: string;
  flag: string;
  tagline: string;
  center: { lat: number; lng: number; altitude: number };
  defaultRange: number;
  defaultTilt: number;
  defaultHeading: number;
  defaultWorkplaces: {
    partner1: WorkplaceLocation;
    partner2: WorkplaceLocation;
  };
  defaultCurrentHome: CurrentHomeLocation;
}
