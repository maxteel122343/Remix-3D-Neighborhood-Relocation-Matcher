import { CandidateHome, CityMetro } from './types';

export const CITIES_METRO: CityMetro[] = [
  {
    id: 'san-francisco',
    name: 'San Francisco Bay Area',
    stateCountry: 'California, USA',
    flag: '🇺🇸',
    tagline: 'Iconic hills, vibrant tech corridors, and walkable neighborhood enclaves',
    center: { lat: 37.7749, lng: -122.4194, altitude: 120 },
    defaultRange: 3200,
    defaultTilt: 55,
    defaultHeading: 320,
    defaultWorkplaces: {
      partner1: {
        name: 'Financial District / Salesforce Tower',
        address: '415 Mission St, San Francisco, CA',
        lat: 37.7897,
        lng: -122.3972,
        preferredMode: 'transit'
      },
      partner2: {
        name: 'Mission Bay Biotech / UCSF Hub',
        address: '1675 Owens St, San Francisco, CA',
        lat: 37.7685,
        lng: -122.3918,
        preferredMode: 'transit'
      }
    },
    defaultCurrentHome: {
      address: '2450 California St, Pacific Heights',
      neighborhood: 'Pacific Heights',
      lat: 37.7891,
      lng: -122.4344,
      cityId: 'san-francisco'
    }
  },
  {
    id: 'new-york',
    name: 'New York Metro',
    stateCountry: 'New York, USA',
    flag: '🇺🇸',
    tagline: 'World-class culture, brownstone avenues, and premier express commutes',
    center: { lat: 40.7128, lng: -74.006, altitude: 140 },
    defaultRange: 3000,
    defaultTilt: 58,
    defaultHeading: 20,
    defaultWorkplaces: {
      partner1: {
        name: 'Midtown Manhattan (Hudson Yards / Grand Central)',
        address: '450 Lexington Ave, New York, NY',
        lat: 40.7527,
        lng: -73.9772,
        preferredMode: 'transit'
      },
      partner2: {
        name: 'Financial District / World Trade',
        address: '1 World Trade Center, New York, NY',
        lat: 40.7127,
        lng: -74.0134,
        preferredMode: 'transit'
      }
    },
    defaultCurrentHome: {
      address: '320 E 54th St, Midtown East',
      neighborhood: 'Midtown East',
      lat: 40.7571,
      lng: -73.9664,
      cityId: 'new-york'
    }
  },
  {
    id: 'seattle',
    name: 'Seattle Puget Sound',
    stateCountry: 'Washington, USA',
    flag: '🇺🇸',
    tagline: 'Lush evergreen hills, maritime shores, and leading technology campuses',
    center: { lat: 47.6062, lng: -122.3321, altitude: 120 },
    defaultRange: 3200,
    defaultTilt: 55,
    defaultHeading: 340,
    defaultWorkplaces: {
      partner1: {
        name: 'South Lake Union (Amazon / Tech)',
        address: '410 Terry Ave N, Seattle, WA',
        lat: 47.6225,
        lng: -122.3364,
        preferredMode: 'transit'
      },
      partner2: {
        name: 'Downtown Commercial Core',
        address: '1201 3rd Ave, Seattle, WA',
        lat: 47.6074,
        lng: -122.3368,
        preferredMode: 'transit'
      }
    },
    defaultCurrentHome: {
      address: '2200 1st Ave, Belltown',
      neighborhood: 'Belltown',
      lat: 47.6139,
      lng: -122.3458,
      cityId: 'seattle'
    }
  },
  {
    id: 'austin',
    name: 'Austin Metro',
    stateCountry: 'Texas, USA',
    flag: '🇺🇸',
    tagline: 'Live music energy, oak-shaded parks, and high-growth innovation districts',
    center: { lat: 30.2672, lng: -97.7431, altitude: 150 },
    defaultRange: 3400,
    defaultTilt: 52,
    defaultHeading: 10,
    defaultWorkplaces: {
      partner1: {
        name: 'Downtown Congress Tech Hub',
        address: '100 Congress Ave, Austin, TX',
        lat: 30.2642,
        lng: -97.7441,
        preferredMode: 'drive'
      },
      partner2: {
        name: 'The Domain North Tech Campus',
        address: '11410 Century Oaks Terrace, Austin, TX',
        lat: 30.4014,
        lng: -97.7258,
        preferredMode: 'drive'
      }
    },
    defaultCurrentHome: {
      address: '800 W 5th St, Market District',
      neighborhood: 'Downtown Austin',
      lat: 30.2701,
      lng: -97.7511,
      cityId: 'austin'
    }
  },
  {
    id: 'london',
    name: 'London Greater Metro',
    stateCountry: 'United Kingdom',
    flag: '🇬🇧',
    tagline: 'Regency garden squares, historic village high streets, and seamless Tube links',
    center: { lat: 51.5074, lng: -0.1278, altitude: 100 },
    defaultRange: 3000,
    defaultTilt: 55,
    defaultHeading: 45,
    defaultWorkplaces: {
      partner1: {
        name: 'City of London / Bank',
        address: '100 Bishopsgate, London',
        lat: 51.5161,
        lng: -0.0818,
        preferredMode: 'transit'
      },
      partner2: {
        name: 'Canary Wharf Financial District',
        address: '1 Canada Square, London',
        lat: 51.5048,
        lng: -0.0195,
        preferredMode: 'transit'
      }
    },
    defaultCurrentHome: {
      address: '22 Kensington High St',
      neighborhood: 'Kensington',
      lat: 51.5014,
      lng: -0.1915,
      cityId: 'london'
    }
  },
  {
    id: 'tokyo',
    name: 'Tokyo Central Metro',
    stateCountry: 'Japan',
    flag: '🇯🇵',
    tagline: 'Ultra-safe residential pockets, serene shrines, and high-frequency Yamanote lines',
    center: { lat: 35.6762, lng: 139.6503, altitude: 100 },
    defaultRange: 3000,
    defaultTilt: 55,
    defaultHeading: 90,
    defaultWorkplaces: {
      partner1: {
        name: 'Marunouchi / Tokyo Station Hub',
        address: '1-1 Marunouchi, Chiyoda-ku, Tokyo',
        lat: 35.6812,
        lng: 139.7671,
        preferredMode: 'transit'
      },
      partner2: {
        name: 'Roppongi Hills / Innovation Hub',
        address: '6-10-1 Roppongi, Minato-ku, Tokyo',
        lat: 35.6604,
        lng: 139.7292,
        preferredMode: 'transit'
      }
    },
    defaultCurrentHome: {
      address: '1-1 Shibuya, Shibuya-ku, Tokyo',
      neighborhood: 'Shibuya',
      lat: 35.658,
      lng: 139.7016,
      cityId: 'tokyo'
    }
  }
];

export const CANDIDATE_HOMES: CandidateHome[] = [
  // -------------------------------------------------------------
  // SAN FRANCISCO BAY AREA HOMES
  // -------------------------------------------------------------
  {
    id: 'sf-noe-valley-victorian',
    title: 'Sunny 24th St Sunlit Victorian',
    address: '4128 24th Street, San Francisco, CA',
    neighborhood: 'Noe Valley',
    cityId: 'san-francisco',
    cityName: 'San Francisco',
    price: 2495000,
    formattedPrice: '$2,495,000',
    beds: 3,
    baths: 2.5,
    sqft: 2240,
    propertyType: 'Victorian',
    yearBuilt: 1908,
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 37.7516,
    lng: -122.4338,
    altitude: 72,
    camRange: 420,
    camTilt: 62,
    camHeading: 315,
    matchScore: 96,
    vibe: 'family-friendly',
    vibeLabel: 'Sun-Drenched Stroller Capital & Artisan Cafes',
    vibeTags: ['Village Vibe', 'Microclimate Sun', 'Top Public Schools', 'Boutique Bakeries'],
    vibeDescription:
      'Protected from coastal fog by Twin Peaks, Noe Valley offers a charming, flat village high street brimming with artisan coffee, farmer markets, and community playgrounds.',
    schoolScore: 9.4,
    schoolSummary: 'Top-tier public & independent schools within a 7-minute stroller walk.',
    schools: [
      {
        name: 'Alvarado Elementary School',
        type: 'Elementary',
        rating: 9,
        distanceWalkMins: 5,
        district: 'SFUSD (Spanish Dual Immersion)',
        highlights: ['Dual-Language Immersion', 'Active PTA Community', 'Science & Arts Garden'],
        placeId: 'ChIJV4UvK7p-j4AR8035Wk8aXp4'
      },
      {
        name: 'James Lick Middle School',
        type: 'Middle',
        rating: 8,
        distanceWalkMins: 11,
        district: 'SFUSD',
        highlights: ['Performing Arts Program', 'Robotics & STEM Lab'],
        placeId: 'ChIJg_Gz_Lt-j4ARb7E552f9iC8'
      },
      {
        name: 'St. Philip Catholic School',
        type: 'Private',
        rating: 9,
        distanceWalkMins: 6,
        district: 'Independent',
        highlights: ['National Blue Ribbon Nominee', 'Low Student-Teacher Ratio'],
        placeId: 'ChIJN9t1s7p-j4AR593L-w1w0v8'
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Salesforce Tower / Financial District',
        workplaceLabel: 'Partner 1 (FiDi Core)',
        durationMins: 16,
        distanceKm: 5.8,
        mode: 'transit',
        routeSummary: 'J-Church Light Rail direct to Montgomery Station',
        rushHourEstimateMins: 19
      },
      partner2: {
        destinationName: 'Mission Bay Biotech / UCSF',
        workplaceLabel: 'Partner 2 (Mission Bay)',
        durationMins: 14,
        distanceKm: 4.6,
        mode: 'bike',
        routeSummary: 'Cesar Chavez bike boulevard / 48-Quintara bus',
        rushHourEstimateMins: 16
      },
      combinedAverageMins: 15,
      comparisonVsCurrentMins: -14,
      savingsSummary: 'Saves 28 mins round-trip daily vs current Pacific Heights home'
    },
    walkScore: 94,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Whole Foods Market (4 min walk)',
      'Noe Valley Town Square & Farmers Market (3 min walk)',
      '24th Street Dining & Patisserie Corridor (2 min walk)',
      'J-Church Metro Station (5 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'noe-sq',
        name: 'Noe Valley Town Square',
        category: 'park',
        lat: 37.7517,
        lng: -122.4316,
        altitude: 68,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Vibrant public community plaza hosting Saturday farmer markets and live acoustic music.',
        rating: 4.8,
        placeId: 'ChIJi4G3Urt-j4ARz84Z-x5t8b8'
      },
      {
        id: 'noe-bakery',
        name: 'Noe Valley Bakery',
        category: 'cafe',
        lat: 37.7516,
        lng: -122.4328,
        altitude: 70,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Beloved neighborhood bakery famous for freshly baked sourdough, morning croissants, and tarts.',
        rating: 4.7,
        placeId: 'ChIJj7b7Vrt-j4AR8Z2y_j15aL0'
      },
      {
        id: 'noe-alvarado',
        name: 'Alvarado Elementary School',
        category: 'school',
        lat: 37.7533,
        lng: -122.4357,
        altitude: 76,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Highly acclaimed public elementary with Spanish Dual Immersion & beautiful play yards.',
        rating: 4.9,
        placeId: 'ChIJV4UvK7p-j4AR8035Wk8aXp4'
      },
      {
        id: 'noe-wholefoods',
        name: 'Whole Foods Market Noe Valley',
        category: 'grocery',
        lat: 37.7514,
        lng: -122.4294,
        altitude: 65,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'Full-service organic grocery store and prepared gourmet food market.',
        rating: 4.5,
        placeId: 'ChIJ7Y_aGbt-j4ARlHj-wFv090w'
      },
      {
        id: 'noe-jchurch',
        name: 'J-Church 24th St Metro Station',
        category: 'transit',
        lat: 37.7515,
        lng: -122.4286,
        altitude: 64,
        walkMinutes: 5,
        distanceMeters: 410,
        description: 'Direct light rail line whisking commuters straight to downtown Market St & Salesforce Hub.',
        rating: 4.6,
        placeId: 'ChIJ2-v1G7t-j4ARRwFm78e9bBw'
      }
    ],
    realtor: {
      name: 'Sarah Chen, CRS',
      title: 'Principal Realtor & Neighborhood Specialist',
      agency: 'Sotheby’s International Realty SF',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Noe Valley is the holy grail for dual-career families. You get the warmest microclimate in the city, top schools within walking distance, and a 16-minute transit commute to downtown.”',
      tourHeadline: 'Why 4128 24th St is your family’s forever match:',
      tourStops: [
        {
          id: 'stop-home',
          title: 'The Residence: 4128 24th St',
          subtitle: 'Restored 1908 Victorian with South-Facing Garden',
          category: 'Home Base',
          lat: 37.7516,
          lng: -122.4338,
          altitude: 72,
          camRange: 280,
          camTilt: 64,
          camHeading: 310,
          walkMinutesFromHome: 0,
          realtorPitch:
            'Welcome home! Notice the high 11-foot ceilings, period molding, and modern open-concept kitchen opening to a sun-drenched private deck.',
          highlights: ['Southern Exposure Sunlight', 'Deep Landscaped Lot', 'EV Garage & Solar Ready'],
          icon: 'home'
        },
        {
          id: 'stop-school',
          title: 'Alvarado Elementary & Playfields',
          subtitle: 'Top 5% Rated SFUSD Dual-Language Campus',
          category: 'Top School',
          lat: 37.7533,
          lng: -122.4357,
          altitude: 76,
          camRange: 350,
          camTilt: 58,
          camHeading: 280,
          walkMinutesFromHome: 5,
          realtorPitch:
            'Just 5 minutes on foot along tree-lined 24th St brings your kids safely to Alvarado Elementary. No school drop-off traffic jams!',
          highlights: ['Ranked 9/10 GreatSchools', 'Spanish Dual Immersion', 'Outdoor Arts Amphitheater'],
          icon: 'school'
        },
        {
          id: 'stop-vibe',
          title: '24th Street Artisan Corridor & Plaza',
          subtitle: 'The Vibrant Heart of the Neighborhood',
          category: 'Artisan Hub',
          lat: 37.7517,
          lng: -122.4316,
          altitude: 68,
          camRange: 340,
          camTilt: 56,
          camHeading: 70,
          walkMinutesFromHome: 3,
          realtorPitch:
            'Step out on Saturday morning for freshly roasted coffee at Ritual and hot pastries at Noe Valley Bakery, then stroll into the Town Square for the farmers market.',
          highlights: ['Over 40 Independent Cafes & Shops', 'Zero Chain Retail', 'Dog-Friendly Sidewalk Dining'],
          icon: 'cafe'
        },
        {
          id: 'stop-transit',
          title: 'J-Church Light Rail Arterial',
          subtitle: 'Express 16-Minute Downtown Connection',
          category: 'Transit Link',
          lat: 37.7515,
          lng: -122.4286,
          altitude: 64,
          camRange: 380,
          camTilt: 55,
          camHeading: 45,
          walkMinutesFromHome: 5,
          realtorPitch:
            'A flat 5-minute stroll to the J-Church platform gives you a one-seat ride into Montgomery / FiDi, saving Partner 1 over 25 minutes daily compared to driving.',
          highlights: ['Departures Every 8 Mins', 'Direct FiDi Route', 'Scenic Dolores Park Flyby'],
          icon: 'train'
        }
      ]
    }
  },
  {
    id: 'sf-marina-district-condo',
    title: 'Waterfront Panoramic Marina Boulevard Flat',
    address: '68 Marina Blvd, San Francisco, CA',
    neighborhood: 'Marina District',
    cityId: 'san-francisco',
    cityName: 'San Francisco',
    price: 2150000,
    formattedPrice: '$2,150,000',
    beds: 2,
    baths: 2,
    sqft: 1850,
    propertyType: 'Condominium',
    yearBuilt: 1936,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 37.8052,
    lng: -122.4361,
    altitude: 12,
    camRange: 450,
    camTilt: 60,
    camHeading: 350,
    matchScore: 91,
    vibe: 'coastal-scenic',
    vibeLabel: 'Golden Gate Vistas, Marina Green & Active Waterfront',
    vibeTags: ['Bay Views', 'Marina Green', 'Chestnut St Dining', 'High Energy Fitness'],
    vibeDescription:
      'Unrivaled views of the Golden Gate Bridge and Alcatraz, paired with a lively dining scene on Chestnut Street and miles of flat waterfront running paths.',
    schoolScore: 8.2,
    schoolSummary: 'Great private and public options including Claire Lilienthal nearby.',
    schools: [
      {
        name: 'Claire Lilienthal Alternative School (K-8)',
        type: 'K-8',
        rating: 9,
        distanceWalkMins: 14,
        district: 'SFUSD (Top Alternative Academy)',
        highlights: ['Korean Dual Language', 'Top 5% in California', 'Dedicated Arts Building'],
        placeId: 'ChIJj71bA0-BhYARa4i1nZ8f5c8'
      },
      {
        name: 'Sherman Elementary School',
        type: 'Elementary',
        rating: 8,
        distanceWalkMins: 12,
        district: 'SFUSD',
        highlights: ['STEM Enrichment', 'Active Parent Network'],
        placeId: 'ChIJv8G3GkuBhYAR-n9l2fLd6a4'
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Financial District / Salesforce Tower',
        workplaceLabel: 'Partner 1 (FiDi)',
        durationMins: 18,
        distanceKm: 4.8,
        mode: 'transit',
        routeSummary: '30X Marina Express or Muni 30-Stockton',
        rushHourEstimateMins: 22
      },
      partner2: {
        destinationName: 'Mission Bay Biotech Hub',
        workplaceLabel: 'Partner 2 (Mission Bay)',
        durationMins: 22,
        distanceKm: 6.9,
        mode: 'drive',
        routeSummary: 'Embarcadero waterfront boulevard drive / bike',
        rushHourEstimateMins: 28
      },
      combinedAverageMins: 20,
      comparisonVsCurrentMins: -8,
      savingsSummary: 'Saves 16 mins round-trip daily with express 30X Muni bus'
    },
    walkScore: 96,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Marina Green & Yacht Harbor (1 min walk across street)',
      'Chestnut Street Retail & Trattorias (6 min walk)',
      'Palace of Fine Arts (8 min walk)',
      'Fort Mason Center & Sunday Farmer Market (7 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'marina-green',
        name: 'Marina Green & Harbor',
        category: 'park',
        lat: 37.8066,
        lng: -122.4384,
        altitude: 10,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Iconic 74-acre waterfront park offering kite flying, running paths, and sweeping Golden Gate vistas.',
        rating: 4.9,
        placeId: 'ChIJbT619EqBhYARaD99m8F3978'
      },
      {
        id: 'marina-pofa',
        name: 'Palace of Fine Arts',
        category: 'park',
        lat: 37.8029,
        lng: -122.4484,
        altitude: 15,
        walkMinutes: 8,
        distanceMeters: 750,
        description: 'Monumental classical rotunda and serene swan lagoon built for the 1915 Panama-Pacific Expo.',
        rating: 4.8,
        placeId: 'ChIJl7x7zE6BhYARbXh87v32hX8'
      },
      {
        id: 'marina-chestnut',
        name: 'Chestnut Street Dining Corridor',
        category: 'dining',
        lat: 37.8008,
        lng: -122.4372,
        altitude: 18,
        walkMinutes: 6,
        distanceMeters: 450,
        description: 'Bustling avenue lined with premier trattorias, cocktail lounges, and specialty grocers.',
        rating: 4.7,
        placeId: 'ChIJRZg730yBhYARfA5o8B229x4'
      }
    ],
    realtor: {
      name: 'Marcus Sterling',
      title: 'Waterfront & Luxury Specialist',
      agency: 'Compass San Francisco',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      quote:
        '“The Marina is unmatched for outdoor lifestyle. Step out your front door directly onto the Marina Green, run along the water, and walk to dinner on Chestnut.”',
      tourHeadline: 'Waterfront luxury meets effortless transit:',
      tourStops: [
        {
          id: 'stop-marina-home',
          title: '68 Marina Boulevard',
          subtitle: 'Direct Front-Row Bay Views',
          category: 'Home Base',
          lat: 37.8052,
          lng: -122.4361,
          altitude: 12,
          camRange: 300,
          camTilt: 62,
          camHeading: 345,
          walkMinutesFromHome: 0,
          realtorPitch:
            'Floor-to-ceiling bay windows framing the Golden Gate Bridge, private elevator entrance, and deeded 2-car garage parking.',
          highlights: ['Unobstructed Water Views', '1930s Art Deco Details', 'Private Roof Terrace'],
          icon: 'home'
        },
        {
          id: 'stop-marina-green',
          title: 'Marina Green & San Francisco Bay',
          subtitle: 'Your Extended Front Lawn',
          category: 'Nature & Park',
          lat: 37.8066,
          lng: -122.4384,
          altitude: 10,
          camRange: 420,
          camTilt: 55,
          camHeading: 300,
          walkMinutesFromHome: 2,
          realtorPitch:
            'No need for a yard when you have 74 acres of manicured lawn and the world’s most scenic running path right across the street.',
          highlights: ['Sailing & Yacht Club Access', 'Off-Leash Dog Park Areas', 'Direct Wave Organ Path'],
          icon: 'tree'
        },
        {
          id: 'stop-chestnut',
          title: 'Chestnut Street Social District',
          subtitle: 'Endless Culinary & Boutique Escapes',
          category: 'Dining & Vibe',
          lat: 37.8008,
          lng: -122.4372,
          altitude: 18,
          camRange: 350,
          camTilt: 58,
          camHeading: 180,
          walkMinutesFromHome: 6,
          realtorPitch:
            'Chestnut Street is the social spine of the north waterfront. Enjoy brunch at Tacolicious or fresh sushi at Amami, just 6 minutes away.',
          highlights: ['Over 60 Restaurants & Bars', 'Apple Store & Equinox Club', 'Historic Presidio Theatre'],
          icon: 'dining'
        }
      ]
    }
  },
  {
    id: 'sf-inner-sunset-craftsman',
    title: 'Lush Garden Craftsman near Golden Gate Park',
    address: '1348 9th Avenue, San Francisco, CA',
    neighborhood: 'Inner Sunset',
    cityId: 'san-francisco',
    cityName: 'San Francisco',
    price: 1895000,
    formattedPrice: '$1,895,000',
    beds: 3,
    baths: 2,
    sqft: 2010,
    propertyType: 'Single Family',
    yearBuilt: 1922,
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 37.7628,
    lng: -122.4662,
    altitude: 85,
    camRange: 380,
    camTilt: 60,
    camHeading: 320,
    matchScore: 89,
    vibe: 'artisan-trendy',
    vibeLabel: 'Botanical Parklands, Asian Gastronomy & N-Judah Express',
    vibeTags: ['Golden Gate Park', 'N-Judah Direct', 'Irving St Foodie Hub', 'Community Gardens'],
    vibeDescription:
      'Steps from Golden Gate Park botanical gardens, de Young Museum, and the famous dumpling & noodle houses of Irving Street.',
    schoolScore: 8.8,
    schoolSummary: 'Clarendon Alternative and Alice Fong Yu nearby.',
    schools: [
      {
        name: 'Alice Fong Yu Alternative School',
        type: 'K-8',
        rating: 10,
        distanceWalkMins: 11,
        district: 'SFUSD (First Cantonese Immersion in US)',
        highlights: ['National Blue Ribbon Award', 'Ranked #1 Public School in SF'],
        placeId: 'ChIJV4UvK7p-j4AR8035Wk8aXp4_afy'
      },
      {
        name: 'Jefferson Elementary School',
        type: 'Elementary',
        rating: 8,
        distanceWalkMins: 8,
        district: 'SFUSD',
        highlights: ['Inclusive Garden Program', 'Strong Music Curriculum'],
        placeId: 'ChIJz8fG5KKBhYAR19y99h3d7e8'
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Financial District / Salesforce Tower',
        workplaceLabel: 'Partner 1 (FiDi)',
        durationMins: 21,
        distanceKm: 6.8,
        mode: 'transit',
        routeSummary: 'N-Judah Light Rail subway underground',
        rushHourEstimateMins: 24
      },
      partner2: {
        destinationName: 'Mission Bay Biotech Hub / UCSF',
        workplaceLabel: 'Partner 2 (UCSF / Mission Bay)',
        durationMins: 12,
        distanceKm: 2.1,
        mode: 'transit',
        routeSummary: 'Direct UCSF Parnassus shuttle or Muni 43/6',
        rushHourEstimateMins: 14
      },
      combinedAverageMins: 16.5,
      comparisonVsCurrentMins: -10,
      savingsSummary: 'Saves 20 mins daily commute with N-Judah subway access'
    },
    walkScore: 95,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Golden Gate Park & Botanical Gardens (3 min walk)',
      'Irving Street Gourmet Corridor (2 min walk)',
      'N-Judah 9th Ave Station (2 min walk)',
      'UCSF Parnassus Medical Campus (8 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'sunset-ggp',
        name: 'SF Botanical Garden & Arboretum',
        category: 'park',
        lat: 37.7667,
        lng: -122.4674,
        altitude: 80,
        walkMinutes: 4,
        distanceMeters: 350,
        description: '55 acres of extraordinary rare plants, magnolias, and tranquil redwood groves.',
        rating: 4.9,
        placeId: 'ChIJ3-dE86KBhYAR9oA098jL594'
      },
      {
        id: 'sunset-irving',
        name: 'Irving Street Artisan Dining',
        category: 'dining',
        lat: 37.7638,
        lng: -122.4665,
        altitude: 84,
        walkMinutes: 2,
        distanceMeters: 120,
        description: 'Celebrated culinary hub featuring San Tung wings, artisan tea rooms, and bakeries.',
        rating: 4.8,
        placeId: 'ChIJz-X196KBhYAR49aX9F38b8w'
      }
    ],
    realtor: {
      name: 'Elena Rostova',
      title: 'Sunset & Richmond Specialist',
      agency: 'Vanguard Properties',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Inner Sunset gives you the perfect balance of green space and world-class food. You walk across Lincoln straight into the Botanical Gardens.”',
      tourHeadline: 'Parkside tranquility with unbeatable N-Judah speed:',
      tourStops: [
        {
          id: 'stop-sunset-home',
          title: '1348 9th Avenue',
          subtitle: 'Craftsman Charm & Deep Backyard',
          category: 'Home Base',
          lat: 37.7628,
          lng: -122.4662,
          altitude: 85,
          camRange: 280,
          camTilt: 60,
          camHeading: 310,
          walkMinutesFromHome: 0,
          realtorPitch:
            'Original hardwood wainscoting, a renovated chef kitchen with Viking range, and a tranquil backyard sanctuary.',
          highlights: ['Garden Greenhouse', 'Bonus In-Law Suite', 'Finished Basement Office'],
          icon: 'home'
        },
        {
          id: 'stop-sunset-ggp',
          title: 'Golden Gate Park Gateway',
          subtitle: '1,017 Acres of Public Beauty',
          category: 'Nature & Park',
          lat: 37.7667,
          lng: -122.4674,
          altitude: 80,
          camRange: 400,
          camTilt: 55,
          camHeading: 350,
          walkMinutesFromHome: 4,
          realtorPitch:
            'Take your morning walk through the Japanese Tea Garden and de Young sculpture park without ever getting into a car.',
          highlights: ['Free Resident Admission', 'Miles of Paved Trails', 'Stow Lake Paddle Boating'],
          icon: 'tree'
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // NEW YORK METRO HOMES
  // -------------------------------------------------------------
  {
    id: 'nyc-park-slope-brownstone',
    title: 'Park Slope Historic Brownstone Triplex',
    address: '284 8th Avenue, Brooklyn, NY',
    neighborhood: 'Park Slope',
    cityId: 'new-york',
    cityName: 'New York',
    price: 3100000,
    formattedPrice: '$3,100,000',
    beds: 4,
    baths: 3,
    sqft: 2800,
    propertyType: 'Townhome',
    yearBuilt: 1899,
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 40.6698,
    lng: -73.9782,
    altitude: 45,
    camRange: 400,
    camTilt: 60,
    camHeading: 40,
    matchScore: 97,
    vibe: 'family-friendly',
    vibeLabel: 'Tree-Lined Brownstones, Prospect Park & PS 321 Top District',
    vibeTags: ['Prospect Park', 'PS 321 Ranked #1', '7th Ave Boutiques', 'Express B/Q Lines'],
    vibeDescription:
      'Arguably the premier family neighborhood in New York City, featuring magnificent limestone brownstones, Prospect Park, and the highest-ranked public schools in Brooklyn.',
    schoolScore: 9.8,
    schoolSummary: 'Zoned for PS 321 William Penn, consistently ranked among the top public schools in NY State.',
    schools: [
      {
        name: 'PS 321 William Penn',
        type: 'Elementary',
        rating: 10,
        distanceWalkMins: 4,
        district: 'NYC District 15 (Blue Ribbon)',
        highlights: ['Top 1% in New York State', 'Renowned Arts & Literacy Curriculum', 'Community-Funded Science Labs'],
        placeId: 'ChIJV4UvK7p-j4AR8035Wk8aXp4_ps321'
      },
      {
        name: 'MS 51 William Alexander',
        type: 'Middle',
        rating: 9,
        distanceWalkMins: 7,
        district: 'NYC District 15',
        highlights: ['Specialized Talent Programs', 'Math Olympiad Champions'],
        placeId: 'ChIJg_Gz_Lt-j4ARb7E552f9iC8_ms51'
      },
      {
        name: 'Berkeley Carroll School',
        type: 'Private',
        rating: 10,
        distanceWalkMins: 5,
        district: 'Independent K-12',
        highlights: ['Ivy League Feeder', 'State-of-the-Art Performing Arts Center'],
        placeId: 'ChIJN9t1s7p-j4AR593L-w1w0v8_bc'
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Midtown Manhattan (Grand Central)',
        workplaceLabel: 'Partner 1 (Midtown)',
        durationMins: 24,
        distanceKm: 11.2,
        mode: 'transit',
        routeSummary: 'Express B/Q or 2/3 Subway direct into Midtown',
        rushHourEstimateMins: 28
      },
      partner2: {
        destinationName: 'Financial District (World Trade)',
        workplaceLabel: 'Partner 2 (FiDi)',
        durationMins: 17,
        distanceKm: 6.4,
        mode: 'transit',
        routeSummary: 'R / 2 / 3 Subway 3 stops across East River',
        rushHourEstimateMins: 20
      },
      combinedAverageMins: 20.5,
      comparisonVsCurrentMins: -18,
      savingsSummary: 'Saves 36 mins round-trip daily with express Brooklyn subway lines'
    },
    walkScore: 98,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Prospect Park & Grand Army Plaza (2 min walk)',
      'PS 321 William Penn Elementary (4 min walk)',
      '7th Avenue & 5th Avenue Dining (1 min walk)',
      'Brooklyn Public Library Central & Botanic Garden (6 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'ps-prospect-park',
        name: 'Prospect Park & Long Meadow',
        category: 'park',
        lat: 40.6655,
        lng: -73.9712,
        altitude: 40,
        walkMinutes: 3,
        distanceMeters: 250,
        description: '526-acre masterpiece designed by Olmsted and Vaux featuring the historic Ravine, zoo, and bandshell.',
        rating: 4.9,
        placeId: 'ChIJ81aZ93FbwokRh6a1e9F4d8E'
      },
      {
        id: 'ps-321-school',
        name: 'PS 321 William Penn Elementary',
        category: 'school',
        lat: 40.6721,
        lng: -73.9798,
        altitude: 46,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Ranked among the very best elementary schools in New York City.',
        rating: 5.0,
        placeId: 'ChIJ3-dE86KBhYAR9oA098jL594_ps321'
      },
      {
        id: 'ps-7th-ave',
        name: '7th Avenue Artisan Market & Bakeries',
        category: 'dining',
        lat: 40.6711,
        lng: -73.9774,
        altitude: 44,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Bustling tree-canopied avenue packed with Italian delis, bookstores, and specialty coffee shops.',
        rating: 4.8,
        placeId: 'ChIJz-X196KBhYAR49aX9F38b8w_7th'
      }
    ],
    realtor: {
      name: 'Julian Montgomery',
      title: 'Brooklyn Brownstone Specialist',
      agency: 'Brown Harris Stevens Brooklyn',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Park Slope delivers everything New York families dream of: landmark brownstone charm, PS 321 schooling, and Prospect Park as your extended backyard.”',
      tourHeadline: 'The gold standard of Brooklyn family living:',
      tourStops: [
        {
          id: 'stop-ps-home',
          title: '284 8th Avenue',
          subtitle: 'Turn-of-the-Century Limestone Triplex',
          category: 'Home Base',
          lat: 40.6698,
          lng: -73.9782,
          altitude: 45,
          camRange: 320,
          camTilt: 60,
          camHeading: 35,
          walkMinutesFromHome: 0,
          realtorPitch:
            'Notice the ornate parlor plasterwork, gas fireplaces, and landscaped private English garden out back.',
          highlights: ['Private Bluestone Garden', 'Original Pocket Doors', 'Central AC & Smart Home'],
          icon: 'home'
        },
        {
          id: 'stop-ps-park',
          title: 'Prospect Park & Long Meadow',
          subtitle: '526 Acres of Urban Splendor',
          category: 'Nature & Park',
          lat: 40.6655,
          lng: -73.9712,
          altitude: 40,
          camRange: 500,
          camTilt: 52,
          camHeading: 120,
          walkMinutesFromHome: 3,
          realtorPitch:
            'Just a 3-minute stroll brings you into Long Meadow. Enjoy dog off-leash hours, winter ice skating at LeFrak Center, and summer Celebrate Brooklyn concerts.',
          highlights: ['Olmsted & Vaux Design', 'LeFrak Center Skating', 'Prospect Park Zoo'],
          icon: 'tree'
        },
        {
          id: 'stop-ps-school',
          title: 'PS 321 William Penn',
          subtitle: 'Ranked Top 1% in New York State',
          category: 'Top School',
          lat: 40.6721,
          lng: -73.9798,
          altitude: 46,
          camRange: 360,
          camTilt: 58,
          camHeading: 330,
          walkMinutesFromHome: 4,
          realtorPitch:
            'You are in the coveted PS 321 zone. Children walk 4 short blocks to one of the most celebrated public schools in America.',
          highlights: ['National Blue Ribbon Award', 'Parent Volunteer Network', 'STEM and Robotics Labs'],
          icon: 'school'
        }
      ]
    }
  },
  {
    id: 'nyc-west-village-loft',
    title: 'Cobblestone Historic West Village Corner Loft',
    address: '88 Perry Street, New York, NY',
    neighborhood: 'West Village',
    cityId: 'new-york',
    cityName: 'New York',
    price: 2850000,
    formattedPrice: '$2,850,000',
    beds: 2,
    baths: 2,
    sqft: 1650,
    propertyType: 'Modern Loft',
    yearBuilt: 1910,
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 40.7358,
    lng: -74.0049,
    altitude: 20,
    camRange: 360,
    camTilt: 62,
    camHeading: 50,
    matchScore: 92,
    vibe: 'historic-victorian',
    vibeLabel: 'Romantic Cobblestones, World-Class Gastronomy & High Line',
    vibeTags: ['Cobblestone Streets', 'Hudson River Park', 'Michelin Dining', 'Bohemian History'],
    vibeDescription:
      'New York’s most enchanting and cinematic residential enclave, wrapped in leafy streets, intimate speakeasies, and immediate access to the Hudson River waterfront.',
    schoolScore: 8.9,
    schoolSummary: 'PS 41 Greenwich Village and PS 3 nearby.',
    schools: [
      {
        name: 'PS 41 Greenwich Village School',
        type: 'Elementary',
        rating: 9,
        distanceWalkMins: 6,
        district: 'NYC District 2',
        highlights: ['Top District 2 School', 'Rooftop Green Science Garden'],
        placeId: 'ChIJV4UvK7p-j4AR8035Wk8aXp4_ps41'
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Midtown Manhattan (Grand Central)',
        workplaceLabel: 'Partner 1 (Midtown)',
        durationMins: 14,
        distanceKm: 3.8,
        mode: 'transit',
        routeSummary: '1/2/3 or A/C/E Subway 4 express stops',
        rushHourEstimateMins: 16
      },
      partner2: {
        destinationName: 'Financial District (World Trade)',
        workplaceLabel: 'Partner 2 (FiDi)',
        durationMins: 11,
        distanceKm: 2.8,
        mode: 'transit',
        routeSummary: 'Direct 1 train down 7th Ave',
        rushHourEstimateMins: 13
      },
      combinedAverageMins: 12.5,
      comparisonVsCurrentMins: -15,
      savingsSummary: 'Saves 30 mins daily with central Manhattan express subway hub'
    },
    walkScore: 99,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Hudson River Park Pier 51 (5 min walk)',
      'Bleecker Street & Perry St Boutiques (1 min walk)',
      'Christopher St Subway Station (3 min walk)',
      'The High Line & Whitney Museum (8 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'wv-hudson-park',
        name: 'Hudson River Park & Water Promenade',
        category: 'park',
        lat: 40.7348,
        lng: -74.0112,
        altitude: 12,
        walkMinutes: 5,
        distanceMeters: 450,
        description: 'Vast riverfront park with jogging paths, kayaking piers, and sunset vistas over New Jersey.',
        rating: 4.9,
        placeId: 'ChIJ81aZ93FbwokRh6a1e9F4d8E_hrp'
      },
      {
        id: 'wv-perry',
        name: 'Perry St Michelin Gastronomy',
        category: 'dining',
        lat: 40.7352,
        lng: -74.0084,
        altitude: 16,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Legendary restaurants including Perry St by Jean-Georges, I Sodi, and Via Carota.',
        rating: 4.8,
        placeId: 'ChIJz-X196KBhYAR49aX9F38b8w_perry'
      }
    ],
    realtor: {
      name: 'Chloe Davenport',
      title: 'West Village Historic Properties',
      agency: 'Douglas Elliman',
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
      quote:
        '“The West Village is timeless. You have the quietest cobblestone corners, yet you are 12 minutes from both Midtown and Wall Street.”',
      tourHeadline: 'Chic, romantic Village living with ultimate commute speed:',
      tourStops: [
        {
          id: 'stop-wv-home',
          title: '88 Perry Street',
          subtitle: 'Corner Loft on Famous Tree-Lined Perry St',
          category: 'Home Base',
          lat: 40.7358,
          lng: -74.0049,
          altitude: 20,
          camRange: 260,
          camTilt: 64,
          camHeading: 45,
          walkMinutesFromHome: 0,
          realtorPitch:
            'Triple exposures, exposed brick, original timber beams, and a wood-burning fireplace in an impeccably maintained landmark building.',
          highlights: ['12 Oversized Windows', 'Wood-Burning Fireplace', 'Deeded Storage Unit'],
          icon: 'home'
        },
        {
          id: 'stop-wv-waterfront',
          title: 'Hudson River Park Promenade',
          subtitle: 'River Sunsets & Waterfront Recreation',
          category: 'Nature & Park',
          lat: 40.7348,
          lng: -74.0112,
          altitude: 12,
          camRange: 380,
          camTilt: 55,
          camHeading: 280,
          walkMinutesFromHome: 5,
          realtorPitch:
            'Walk down Perry Street to Pier 51 playground or jog along the river esplanade all the way to Battery Park.',
          highlights: ['Miles of Car-Free Paths', 'Dog Runs & Tennis Courts', 'Waterfront Dining'],
          icon: 'tree'
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // SEATTLE PUGET SOUND HOMES
  // -------------------------------------------------------------
  {
    id: 'sea-queen-anne-craftsman',
    title: 'Historic Top-of-the-Hill Queen Anne View Estate',
    address: '1812 Bigelow Ave N, Seattle, WA',
    neighborhood: 'Queen Anne',
    cityId: 'seattle',
    cityName: 'Seattle',
    price: 1975000,
    formattedPrice: '$1,975,000',
    beds: 4,
    baths: 3,
    sqft: 2650,
    propertyType: 'Single Family',
    yearBuilt: 1916,
    heroImage: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 47.6364,
    lng: -122.3482,
    altitude: 110,
    camRange: 420,
    camTilt: 60,
    camHeading: 160,
    matchScore: 94,
    vibe: 'family-friendly',
    vibeLabel: 'Panoramic Skyline Views, Top Schools & Kerry Park',
    vibeTags: ['Space Needle Views', 'John Hay Elementary', 'Queen Anne Ave', 'Quiet Hilltop'],
    vibeDescription:
      'Perched high above downtown Seattle, Queen Anne blends regal architecture, award-winning public schools, and instant 10-minute access to South Lake Union tech offices.',
    schoolScore: 9.3,
    schoolSummary: 'Zoned for John Hay Elementary and McClure Middle, both rated top 5% in Seattle.',
    schools: [
      {
        name: 'John Hay Elementary School',
        type: 'Elementary',
        rating: 9,
        distanceWalkMins: 6,
        district: 'Seattle Public Schools',
        highlights: ['Top Rated in Central Seattle', 'Strong STEAM Curriculum'],
        placeId: 'ChIJV4UvK7p-j4AR8035Wk8aXp4_johnhay'
      },
      {
        name: 'McClure Middle School',
        type: 'Middle',
        rating: 8,
        distanceWalkMins: 9,
        district: 'Seattle Public Schools',
        highlights: ['Honors Math & Music Bands'],
        placeId: 'ChIJg_Gz_Lt-j4ARb7E552f9iC8_mcclure'
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'South Lake Union (Amazon HQ / Tech)',
        workplaceLabel: 'Partner 1 (SLU Campus)',
        durationMins: 9,
        distanceKm: 2.4,
        mode: 'transit',
        routeSummary: 'RapidBus or direct 8-min bike down Westlake corridor',
        rushHourEstimateMins: 12
      },
      partner2: {
        destinationName: 'Downtown Seattle Commercial Core',
        workplaceLabel: 'Partner 2 (Downtown Core)',
        durationMins: 14,
        distanceKm: 3.6,
        mode: 'transit',
        routeSummary: 'Direct Route 2 / 13 Muni Bus into 3rd Ave corridor',
        rushHourEstimateMins: 17
      },
      combinedAverageMins: 11.5,
      comparisonVsCurrentMins: -16,
      savingsSummary: 'Saves 32 mins daily commute vs suburban Eastside options'
    },
    walkScore: 91,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Queen Anne Avenue Boutiques & Dining (4 min walk)',
      'Kerry Park & Space Needle Overlook (8 min walk)',
      'John Hay Elementary School (6 min walk)',
      'Trader Joe’s & Safeway (5 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'qa-kerry-park',
        name: 'Kerry Park & Skyline Overlook',
        category: 'park',
        lat: 47.6295,
        lng: -122.3599,
        altitude: 105,
        walkMinutes: 8,
        distanceMeters: 750,
        description: 'World-famous viewpoint framing the Space Needle, downtown skyline, and Mount Rainier.',
        rating: 4.9,
        placeId: 'ChIJ81aZ93FbwokRh6a1e9F4d8E_kerry'
      },
      {
        id: 'qa-ave-shops',
        name: 'Queen Anne Ave Bakery & Cafe Row',
        category: 'cafe',
        lat: 47.6365,
        lng: -122.3568,
        altitude: 112,
        walkMinutes: 4,
        distanceMeters: 350,
        description: 'Charming pedestrian boulevard packed with independent bookshops, gelaterias, and bistro dining.',
        rating: 4.8,
        placeId: 'ChIJz-X196KBhYAR49aX9F38b8w_qa_ave'
      }
    ],
    realtor: {
      name: 'Derek Lindstrom',
      title: 'Seattle Luxury & Tech Relocation Lead',
      agency: 'Windermere Real Estate Seattle',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Queen Anne solves the impossible Seattle equation: historic charm and tree-lined parks on top of the hill, with a 9-minute commute down into Amazon and SLU.”',
      tourHeadline: 'Top-of-the-hill majesty with 9-minute tech commutes:',
      tourStops: [
        {
          id: 'stop-qa-home',
          title: '1812 Bigelow Ave N',
          subtitle: 'Restored Craftsman with Mount Rainier Views',
          category: 'Home Base',
          lat: 47.6364,
          lng: -122.3482,
          altitude: 110,
          camRange: 320,
          camTilt: 60,
          camHeading: 160,
          walkMinutesFromHome: 0,
          realtorPitch:
            'Enjoy panoramic views of Lake Union and the Cascades from your primary bedroom balcony, and entertain in the open-concept chef kitchen.',
          highlights: ['Lake Union & Mountain Views', 'Detached 2-Car Garage with DADU Potential', 'Private Wine Cellar'],
          icon: 'home'
        },
        {
          id: 'stop-qa-kerry',
          title: 'Kerry Park & Seattle Skyline',
          subtitle: 'The Postcard View of the Pacific Northwest',
          category: 'Nature & Park',
          lat: 47.6295,
          lng: -122.3599,
          altitude: 105,
          camRange: 460,
          camTilt: 55,
          camHeading: 140,
          walkMinutesFromHome: 8,
          realtorPitch:
            'Watch the city lights and ferries glide across Elliott Bay every evening from Kerry Park, just a scenic stroll from home.',
          highlights: ['Unrivaled Mount Rainier Vistas', 'Historic Highland Drive Mansions', 'Picnic Lawns'],
          icon: 'tree'
        }
      ]
    }
  },

  // -------------------------------------------------------------
  // AUSTIN METRO HOMES
  // -------------------------------------------------------------
  {
    id: 'atx-zilker-modern',
    title: 'Zilker Park Oak-Canopy Contemporary',
    address: '1604 Kinney Ave, Austin, TX',
    neighborhood: 'Zilker',
    cityId: 'austin',
    cityName: 'Austin',
    price: 1595000,
    formattedPrice: '$1,595,000',
    beds: 3,
    baths: 2.5,
    sqft: 2320,
    propertyType: 'Single Family',
    yearBuilt: 2021,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 30.2524,
    lng: -97.7711,
    altitude: 160,
    camRange: 380,
    camTilt: 60,
    camHeading: 35,
    matchScore: 95,
    vibe: 'arts-culture',
    vibeLabel: 'Barton Springs Oasis, South Lamar Dining & Live Music',
    vibeTags: ['Barton Springs Pool', 'Zilker Park', 'South Lamar Eateries', 'Live Music Culture'],
    vibeDescription:
      'The quintessential Austin dream: walk to Barton Springs spring-fed pool, Zilker Park, and the city’s top tacos and live music on South Lamar.',
    schoolScore: 9.1,
    schoolSummary: 'Zoned for exemplary Zilker Elementary and Austin High School.',
    schools: [
      {
        name: 'Zilker Elementary School',
        type: 'Elementary',
        rating: 9,
        distanceWalkMins: 5,
        district: 'Austin ISD',
        highlights: ['Exemplary TEA Rating', 'Organic Teaching Garden', 'High Parent Engagement'],
        placeId: 'ChIJV4UvK7p-j4AR8035Wk8aXp4_zilker'
      },
      {
        name: 'Austin High School (Cavaliers)',
        type: 'High',
        rating: 9,
        distanceWalkMins: 14,
        district: 'Austin ISD',
        highlights: ['Historic Texas High School', 'Premier AP & Honors Academies'],
        placeId: 'ChIJg_Gz_Lt-j4ARb7E552f9iC8_austinhigh'
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Downtown Congress Tech Corridor',
        workplaceLabel: 'Partner 1 (Downtown Hub)',
        durationMins: 8,
        distanceKm: 3.2,
        mode: 'bike',
        routeSummary: 'Direct Pfluger Pedestrian Bridge / Lady Bird Lake trail',
        rushHourEstimateMins: 11
      },
      partner2: {
        destinationName: 'The Domain North Tech Campus',
        workplaceLabel: 'Partner 2 (The Domain / North)',
        durationMins: 19,
        distanceKm: 18.5,
        mode: 'drive',
        routeSummary: 'Mopac Expressway (Loop 1) North Express Lanes',
        rushHourEstimateMins: 25
      },
      combinedAverageMins: 13.5,
      comparisonVsCurrentMins: -14,
      savingsSummary: 'Saves 28 mins daily with direct downtown bike trail access'
    },
    walkScore: 90,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Barton Springs Pool & Springs (7 min walk)',
      'Zilker Metropolitan Park & ACL Grounds (6 min walk)',
      'South Lamar Restaurant & Coffee Row (3 min walk)',
      'Lady Bird Lake Hike & Bike Trail (5 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'atx-barton-springs',
        name: 'Barton Springs Natural Pool',
        category: 'park',
        lat: 30.2638,
        lng: -97.7708,
        altitude: 148,
        walkMinutes: 7,
        distanceMeters: 620,
        description: 'Year-round 68-degree spring-fed natural limestone swimming pool and grassy hills.',
        rating: 4.9,
        placeId: 'ChIJ81aZ93FbwokRh6a1e9F4d8E_barton'
      },
      {
        id: 'atx-slamar',
        name: 'South Lamar Dining & Tacos',
        category: 'dining',
        lat: 30.2538,
        lng: -97.7658,
        altitude: 155,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Acclaimed dining scene featuring Uchi sushi, Loro Asian smokehouse, and local roasters.',
        rating: 4.8,
        placeId: 'ChIJz-X196KBhYAR49aX9F38b8w_slamar'
      }
    ],
    realtor: {
      name: 'Travis Sterling',
      title: 'Central Austin Luxury & Modern Architecture',
      agency: 'Moreland Properties Austin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Zilker is the soul of Austin living. You can bike across the lake to your downtown office in 8 minutes, and be swimming in Barton Springs by 5:15 PM.”',
      tourHeadline: 'Live the authentic Austin dream in 78704:',
      tourStops: [
        {
          id: 'stop-atx-home',
          title: '1604 Kinney Ave',
          subtitle: 'Architectural Masterpiece under Century-Old Live Oaks',
          category: 'Home Base',
          lat: 30.2524,
          lng: -97.7711,
          altitude: 160,
          camRange: 320,
          camTilt: 60,
          camHeading: 30,
          walkMinutesFromHome: 0,
          realtorPitch:
            'Notice the soaring ceilings, custom steel windows, spray foam insulation, and seamless indoor-outdoor screened entertaining porch with plunge pool.',
          highlights: ['Cocktail Pool & Outdoor Kitchen', 'Energy Star Certified', 'Zoned for Zilker Elementary'],
          icon: 'home'
        },
        {
          id: 'stop-atx-barton',
          title: 'Barton Springs Pool & Zilker Park',
          subtitle: 'The Crown Jewel of Texas Recreation',
          category: 'Nature & Park',
          lat: 30.2638,
          lng: -97.7708,
          altitude: 148,
          camRange: 450,
          camTilt: 55,
          camHeading: 10,
          walkMinutesFromHome: 7,
          realtorPitch:
            'A short shaded walk through tree-lined streets leads straight to Barton Springs. It’s an unbeatable lifestyle for swimmers, runners, and nature lovers.',
          highlights: ['Spring-Fed 68° Waters', '350-Acre Zilker Park', 'Direct Access to Greenbelt Trails'],
          icon: 'tree'
        }
      ]
    }
  },
  {
    id: 'sf-castro-eureka-valley-turnkey',
    title: 'Modernized Victorian Flat with Skyline Deck',
    address: '428 Eureka Street, San Francisco, CA',
    neighborhood: 'Eureka Valley / Castro',
    cityId: 'san-francisco',
    cityName: 'San Francisco',
    price: 2195000,
    formattedPrice: '$2,195,000',
    beds: 3,
    baths: 2,
    sqft: 1880,
    propertyType: 'Victorian',
    yearBuilt: 1912,
    heroImage: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 37.7584,
    lng: -122.4382,
    altitude: 88,
    camRange: 380,
    camTilt: 60,
    camHeading: 50,
    matchScore: 94,
    vibe: 'vibrant-urban',
    vibeLabel: 'Sunbelt Hillside, Historic Charm & Cafe Culture',
    vibeTags: ['SunnyMicroclimate', 'EurekaValley', 'RooftopDeck', 'TransitHub'],
    vibeDescription:
      'Perched on sunny Eureka Street, this home blends timeless turn-of-the-century architecture with an open chef kitchen, walkout view deck, and 5-minute stroll to Collingwood Park.',
    schoolScore: 9.1,
    schoolSummary: 'High-rated public magnet schools and neighborhood nursery schools close by.',
    schools: [
      {
        name: 'Harvey Milk Civil Rights Academy',
        type: 'Elementary',
        rating: 9,
        distanceWalkMins: 6,
        district: 'SFUSD',
        highlights: ['Arts Integration', 'Diverse Community', 'Small Class Sizes']
      },
      {
        name: 'Children’s Day School (CDS)',
        type: 'Private',
        rating: 9.5,
        distanceWalkMins: 10,
        district: 'Independent',
        highlights: ['Farm & Garden Science', 'Social Justice Focus', 'Early Childhood Campus']
      }
    ],
    walkScore: 96,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Castro Muni Underground Station (5 min walk)',
      'Collingwood Park & Tennis Courts (3 min walk)',
      'Spike’s Coffees & Teas (2 min walk)',
      'Mollie Stone’s Grand Central Market (5 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'poi-eureka-muni',
        name: 'Castro Muni Station (Subway)',
        category: 'transit',
        lat: 37.7628,
        lng: -122.4352,
        walkMinutes: 5,
        distanceMeters: 480,
        description: 'Underground K, L, M, T lines straight into Financial District in 12 mins.',
        rating: 4.8
      },
      {
        id: 'poi-eureka-park',
        name: 'Collingwood Park & Recreation Center',
        category: 'park',
        lat: 37.7597,
        lng: -122.4367,
        walkMinutes: 3,
        distanceMeters: 260,
        description: 'Recently updated playground, tennis courts, and dog run.',
        rating: 4.9
      },
      {
        id: 'poi-eureka-cafe',
        name: 'Spike’s Coffees & Teas',
        category: 'cafe',
        lat: 37.7592,
        lng: -122.4371,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Beloved neighborhood spot with house-roasted organic coffees and patio seating.',
        rating: 4.7
      },
      {
        id: 'poi-eureka-grocery',
        name: 'Mollie Stone’s Grand Central Market',
        category: 'grocery',
        lat: 37.7601,
        lng: -122.4351,
        walkMinutes: 5,
        distanceMeters: 420,
        description: 'Full-service gourmet grocery with organic produce and fresh deli.',
        rating: 4.6
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Salesforce Tower / FiDi',
        workplaceLabel: 'Partner 1 (Tech Hub)',
        durationMins: 16,
        distanceKm: 5.1,
        mode: 'transit',
        routeSummary: 'Muni Subway (Castro to Montgomery Station)',
        rushHourEstimateMins: 18
      },
      partner2: {
        destinationName: 'Mission Bay Biotech / UCSF',
        workplaceLabel: 'Partner 2 (Biotech)',
        durationMins: 19,
        distanceKm: 4.8,
        mode: 'bike',
        routeSummary: '17th St protected bike lane direct to Mission Bay',
        rushHourEstimateMins: 22
      },
      combinedAverageMins: 17.5,
      comparisonVsCurrentMins: -14,
      savingsSummary: 'Saves 14 mins daily vs current home'
    },
    realtor: {
      name: 'Julian Vance',
      title: 'Senior Partner, San Francisco Hillside Properties',
      agency: 'Sotheby’s International Realty SF',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Eureka Valley captures the best weather in the city. The backyard skyline views and quick Muni subway access make this a dream home for dual-career couples.”',
      tourHeadline: 'Explore Eureka Valley Hillside & Skyline Strolls:',
      tourStops: [
        {
          id: 'stop-eureka-home',
          title: '428 Eureka St',
          subtitle: 'Skyline Terrace & Modern Chef Kitchen',
          category: 'Home Base',
          lat: 37.7584,
          lng: -122.4382,
          altitude: 88,
          camRange: 340,
          camTilt: 60,
          camHeading: 50,
          walkMinutesFromHome: 0,
          realtorPitch: 'Step onto the upper walkout deck for protected panoramic city views toward downtown.',
          highlights: ['Panoramic Roof Deck', 'Radiant Heated Bathrooms', 'Private Rear Garden'],
          icon: 'home'
        },
        {
          id: 'stop-eureka-subway',
          title: 'Castro Subway Station',
          subtitle: 'One-Seat 12-Minute FiDi Ride',
          category: 'Transit Link',
          lat: 37.7628,
          lng: -122.4352,
          altitude: 70,
          camRange: 420,
          camTilt: 55,
          camHeading: 40,
          walkMinutesFromHome: 5,
          realtorPitch: 'Never worry about bridge traffic or parking meters: express subways depart every 4 minutes.',
          highlights: ['Frequent Subway Departures', 'Underground Protected Platform', 'Direct to FiDi'],
          icon: 'train'
        }
      ]
    }
  },
  {
    id: 'sf-glen-park-canyon-sanctuary',
    title: 'Mid-Century Sanctuary Overlooking Glen Canyon',
    address: '72 Berkeley Way, San Francisco, CA',
    neighborhood: 'Glen Park',
    cityId: 'san-francisco',
    cityName: 'San Francisco',
    price: 1985000,
    formattedPrice: '$1,985,000',
    beds: 3,
    baths: 2,
    sqft: 1950,
    propertyType: 'Single Family',
    yearBuilt: 1958,
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 37.7342,
    lng: -122.4398,
    altitude: 105,
    camRange: 400,
    camTilt: 58,
    camHeading: 320,
    matchScore: 92,
    vibe: 'quiet-residential',
    vibeLabel: 'Village Charm, 70-Acre Canyon & BART Hub',
    vibeTags: ['GlenCanyonTrails', 'BARTWalkable', 'VillageAtmosphere', 'QuietNook'],
    vibeDescription:
      'Known as San Francisco’s village, Glen Park offers peaceful canyon hiking trails, independent bookshops, artisan cheese stores, and rapid BART connection to downtown.',
    schoolScore: 8.9,
    schoolSummary: 'High family density with renowned language immersion & community schools.',
    schools: [
      {
        name: 'Glen Park Elementary',
        type: 'Elementary',
        rating: 9,
        distanceWalkMins: 5,
        district: 'SFUSD',
        highlights: ['Spanish Bilingual Program', 'Active Parent Network', 'On-Site After-Care']
      }
    ],
    walkScore: 90,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Glen Park BART Rapid Transit Station (6 min walk)',
      'Glen Canyon 70-Acre Nature Sanctuary (4 min walk)',
      'Canyon Market Gourmet Organic Grocer (6 min walk)',
      'Bird & Beckett Books & Jazz Hub (6 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'poi-glen-bart',
        name: 'Glen Park BART Station',
        category: 'transit',
        lat: 37.7331,
        lng: -122.4338,
        walkMinutes: 6,
        distanceMeters: 550,
        description: 'Direct 11-minute BART ride to Montgomery St and direct train to SFO Airport.',
        rating: 4.8
      },
      {
        id: 'poi-glen-canyon',
        name: 'Glen Canyon Park & Recreation Area',
        category: 'park',
        lat: 37.7385,
        lng: -122.4412,
        walkMinutes: 4,
        distanceMeters: 350,
        description: '70 acres of native wilderness, walking trails, climbing rocks, and modern gym.',
        rating: 5.0
      },
      {
        id: 'poi-glen-market',
        name: 'Canyon Market',
        category: 'grocery',
        lat: 37.7338,
        lng: -122.4344,
        walkMinutes: 6,
        distanceMeters: 520,
        description: 'Independent organic neighborhood grocer with artisan bakery and prepared foods.',
        rating: 4.7
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Salesforce Tower / FiDi',
        workplaceLabel: 'Partner 1 (FiDi)',
        durationMins: 14,
        distanceKm: 7.2,
        mode: 'transit',
        routeSummary: 'BART Yellow/Red Line direct to Montgomery Station',
        rushHourEstimateMins: 16
      },
      partner2: {
        destinationName: 'Mission Bay Biotech / UCSF',
        workplaceLabel: 'Partner 2 (Biotech)',
        durationMins: 18,
        distanceKm: 6.5,
        mode: 'drive',
        routeSummary: 'I-280 North express to Mariposa exit',
        rushHourEstimateMins: 24
      },
      combinedAverageMins: 16,
      comparisonVsCurrentMins: -18,
      savingsSummary: 'Saves 18 mins daily vs current home'
    },
    realtor: {
      name: 'Maya Chen',
      title: 'Glen Park & Bernal Heights Specialist',
      agency: 'Compass San Francisco',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Glen Park feels like a European mountain village tucked inside the city. You walk right into Glen Canyon for morning runs and take the BART anywhere in minutes.”',
      tourHeadline: 'Experience Canyon Living & Village Walkability:',
      tourStops: [
        {
          id: 'stop-glen-home',
          title: '72 Berkeley Way',
          subtitle: 'Floor-to-Ceiling Canyon Views',
          category: 'Home Base',
          lat: 37.7342,
          lng: -122.4398,
          altitude: 105,
          camRange: 360,
          camTilt: 58,
          camHeading: 320,
          walkMinutesFromHome: 0,
          realtorPitch: 'Floor-to-ceiling glass looks out directly onto the eucalyptus canopy of Glen Canyon.',
          highlights: ['Canyon Panorama', 'Mid-Century Open Plan', 'Quiet Cul-de-Sac'],
          icon: 'home'
        },
        {
          id: 'stop-glen-bart',
          title: 'Glen Park BART Station',
          subtitle: 'Rapid Transit Connector',
          category: 'Transit Link',
          lat: 37.7331,
          lng: -122.4338,
          altitude: 80,
          camRange: 380,
          camTilt: 55,
          camHeading: 60,
          walkMinutesFromHome: 6,
          realtorPitch: 'Skip the freeway congestion with seamless rapid transit into downtown FiDi.',
          highlights: ['Direct FiDi Line', 'Direct SFO Airport Line', 'Village Center Location'],
          icon: 'train'
        }
      ]
    }
  },
  {
    id: 'sf-bernal-heights-north-slope',
    title: 'North Slope Bernal Designer View Home',
    address: '315 Anderson Street, San Francisco, CA',
    neighborhood: 'Bernal Heights',
    cityId: 'san-francisco',
    cityName: 'San Francisco',
    price: 2350000,
    formattedPrice: '$2,350,000',
    beds: 3,
    baths: 3,
    sqft: 2120,
    propertyType: 'Single Family',
    yearBuilt: 2016,
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 37.7431,
    lng: -122.4168,
    altitude: 95,
    camRange: 420,
    camTilt: 60,
    camHeading: 340,
    matchScore: 93,
    vibe: 'family-friendly',
    vibeLabel: 'North Slope Sun, Bernal Park Views & Cortland Ave',
    vibeTags: ['NorthSlopeViews', 'DogParadise', 'CortlandVillage', 'SunnyMicroclimate'],
    vibeDescription:
      'Coveted North Slope location with unobstructed downtown skyline views, walking access to Bernal Hill 360° park, and the quaint village eateries along Cortland Avenue.',
    schoolScore: 9.0,
    schoolSummary: 'Top public and cooperative preschools in a warm, welcoming community.',
    schools: [
      {
        name: 'Leonard R. Flynn Elementary',
        type: 'Elementary',
        rating: 9,
        distanceWalkMins: 7,
        district: 'SFUSD',
        highlights: ['Bilingual Immersion', 'Outdoor Nature Classroom', 'Active Family Guild']
      }
    ],
    walkScore: 93,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Bernal Heights Summit 360° Park (4 min walk)',
      'The Good Life Neighborhood Grocery (5 min walk)',
      'Cortland Avenue Dining Corridor (5 min walk)',
      'Pinhole Specialty Coffee (6 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'poi-bernal-park',
        name: 'Bernal Heights Park',
        category: 'park',
        lat: 37.7439,
        lng: -122.4141,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'Iconic 360-degree hilltop park with views of Golden Gate, Bay Bridge, and downtown.',
        rating: 5.0
      },
      {
        id: 'poi-bernal-grocery',
        name: 'The Good Life Grocery',
        category: 'grocery',
        lat: 37.7391,
        lng: -122.4162,
        walkMinutes: 5,
        distanceMeters: 450,
        description: 'Long-standing community cooperative grocer with premium local goods.',
        rating: 4.8
      },
      {
        id: 'poi-bernal-cafe',
        name: 'Pinhole Coffee',
        category: 'cafe',
        lat: 37.7394,
        lng: -122.4184,
        walkMinutes: 6,
        distanceMeters: 500,
        description: 'Vibrant local specialty coffee bar celebrating local artists and community.',
        rating: 4.9
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Salesforce Tower / FiDi',
        workplaceLabel: 'Partner 1 (FiDi)',
        durationMins: 17,
        distanceKm: 5.8,
        mode: 'transit',
        routeSummary: 'Direct 14R Mission Rapid or 24th St BART to Montgomery',
        rushHourEstimateMins: 20
      },
      partner2: {
        destinationName: 'Mission Bay Biotech / UCSF',
        workplaceLabel: 'Partner 2 (Biotech)',
        durationMins: 15,
        distanceKm: 4.6,
        mode: 'bike',
        routeSummary: 'Cesar Chavez separated bike corridor direct to Mission Bay',
        rushHourEstimateMins: 18
      },
      combinedAverageMins: 16,
      comparisonVsCurrentMins: -15,
      savingsSummary: 'Saves 15 mins daily vs current home'
    },
    realtor: {
      name: 'Julian Vance',
      title: 'San Francisco Hillside Properties',
      agency: 'Sotheby’s International Realty SF',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      quote:
        '“North Slope Bernal gives you front-row seats to the glittering downtown skyline while preserving that peaceful, neighborly dog-friendly sanctuary feel.”',
      tourHeadline: 'Tour the North Slope & Iconic Bernal Summit:',
      tourStops: [
        {
          id: 'stop-bernal-home',
          title: '315 Anderson St',
          subtitle: 'Panoramic City Views from Every Level',
          category: 'Home Base',
          lat: 37.7431,
          lng: -122.4168,
          altitude: 95,
          camRange: 380,
          camTilt: 60,
          camHeading: 340,
          walkMinutesFromHome: 0,
          realtorPitch: 'Floor-to-ceiling multi-slide glass doors open to expansive outdoor entertaining patios.',
          highlights: ['Downtown Skyline Views', 'Solar + Powerwall', 'Quiet Residential Street'],
          icon: 'home'
        },
        {
          id: 'stop-bernal-summit',
          title: 'Bernal Heights Summit',
          subtitle: 'World-Famous 360° City & Bay Views',
          category: 'Nature & Park',
          lat: 37.7439,
          lng: -122.4141,
          altitude: 130,
          camRange: 460,
          camTilt: 55,
          camHeading: 0,
          walkMinutesFromHome: 4,
          realtorPitch: 'A 4-minute morning walk takes you to the summit rock where the entire Bay Area unfolds.',
          highlights: ['Panoramic Sunset Spot', 'Off-Leash Dog Haven', 'Wildflower Trails'],
          icon: 'tree'
        }
      ]
    }
  },
  {
    id: 'sf-hayes-valley-penthouse',
    title: 'Architectural Hayes Valley Penthouse with Private Terrace',
    address: '388 Fulton Street, San Francisco, CA',
    neighborhood: 'Hayes Valley',
    cityId: 'san-francisco',
    cityName: 'San Francisco',
    price: 1875000,
    formattedPrice: '$1,875,000',
    beds: 2,
    baths: 2,
    sqft: 1450,
    propertyType: 'Condominium',
    yearBuilt: 2019,
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80'
    ],
    lat: 37.7788,
    lng: -122.4239,
    altitude: 55,
    camRange: 320,
    camTilt: 62,
    camHeading: 85,
    matchScore: 95,
    vibe: 'artisan-trendy',
    vibeLabel: 'Design District, Opera & Michelin Dining Hub',
    vibeTags: ['HayesGreen', 'MichelinDining', 'CivicCenterArts', 'UltraWalkable'],
    vibeDescription:
      'Immerse in San Francisco’s most stylish enclave. Steps from the SF Symphony, SFJAZZ, Blue Bottle coffee kiosks, and open-air greenery of Patricia’s Green.',
    schoolScore: 8.8,
    schoolSummary: 'Walking distance to top arts and classical performing schools in Civic Center.',
    schools: [
      {
        name: 'San Francisco Friends School',
        type: 'Private',
        rating: 9.6,
        distanceWalkMins: 12,
        district: 'Independent',
        highlights: ['Quaker Values', 'Inquiry-Based Learning', 'Historic Levi Strauss Campus']
      }
    ],
    walkScore: 99,
    fifteenMinRadiusMeters: 1200,
    walkabilityHighlights: [
      'Patricia’s Green Public Park & Rotating Art (2 min walk)',
      'Civic Center Multi-Line Transit Hub (7 min walk)',
      'Hayes Street Designer Boutiques & Michelin Dining (1 min walk)',
      'Blue Bottle Coffee Historic Kiosk (3 min walk)'
    ],
    walkabilityPois: [
      {
        id: 'poi-hayes-green',
        name: 'Patricia’s Green in Hayes Valley',
        category: 'park',
        lat: 37.7766,
        lng: -122.4248,
        walkMinutes: 2,
        distanceMeters: 190,
        description: 'Community park featuring rotating Burning Man public art installations and seating.',
        rating: 4.8
      },
      {
        id: 'poi-hayes-civic',
        name: 'Civic Center Subway & BART Hub',
        category: 'transit',
        lat: 37.7797,
        lng: -122.4141,
        walkMinutes: 7,
        distanceMeters: 650,
        description: 'Quad-track subway hub connecting BART and all Muni metro lines.',
        rating: 4.7
      },
      {
        id: 'poi-hayes-cafe',
        name: 'Blue Bottle Coffee (Original Kiosk)',
        category: 'cafe',
        lat: 37.7762,
        lng: -122.4231,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Iconic Hayes Valley alleyway kiosk serving single-origin pour-overs.',
        rating: 4.8
      }
    ],
    dualCommute: {
      partner1: {
        destinationName: 'Salesforce Tower / FiDi',
        workplaceLabel: 'Partner 1 (Tech Hub)',
        durationMins: 12,
        distanceKm: 2.8,
        mode: 'transit',
        routeSummary: 'Direct Muni Metro underground (Van Ness to Montgomery)',
        rushHourEstimateMins: 14
      },
      partner2: {
        destinationName: 'Mission Bay Biotech / UCSF',
        workplaceLabel: 'Partner 2 (Biotech)',
        durationMins: 16,
        distanceKm: 3.2,
        mode: 'bike',
        routeSummary: 'Protected bike route via 8th St and Division to UCSF',
        rushHourEstimateMins: 18
      },
      combinedAverageMins: 14,
      comparisonVsCurrentMins: -19,
      savingsSummary: 'Saves 19 mins daily vs current home'
    },
    realtor: {
      name: 'Maya Chen',
      title: 'Hayes Valley & Downtown Luxury Advisor',
      agency: 'Compass San Francisco',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      quote:
        '“Hayes Valley is the cultural pulse of San Francisco. Having your private rooftop terrace with views of City Hall’s gilded dome is an extraordinary privilege.”',
      tourHeadline: 'Experience Arts, Architecture & Parkside Dining:',
      tourStops: [
        {
          id: 'stop-hayes-home',
          title: '388 Fulton St Penthouse',
          subtitle: 'Private Wrap-Around Sunset Deck',
          category: 'Home Base',
          lat: 37.7788,
          lng: -122.4239,
          altitude: 55,
          camRange: 280,
          camTilt: 62,
          camHeading: 85,
          walkMinutesFromHome: 0,
          realtorPitch: 'Floor-to-ceiling glass captures city lights and opens directly to your private terrace.',
          highlights: ['Private Terrace', 'LEED Platinum Certified', 'Concierge & Bike Storage'],
          icon: 'home'
        },
        {
          id: 'stop-hayes-green',
          title: 'Patricia’s Green',
          subtitle: 'The Heart of the Neighborhood',
          category: 'Nature & Park',
          lat: 37.7766,
          lng: -122.4248,
          altitude: 45,
          camRange: 320,
          camTilt: 55,
          camHeading: 200,
          walkMinutesFromHome: 2,
          realtorPitch: 'Stroll down Hayes Street for dinner at Rich Table, artisanal ice cream, and live jazz.',
          highlights: ['Public Art Exhibits', 'Outdoor Patios', 'Artisan High Street'],
          icon: 'tree'
        }
      ]
    }
  }
];

export const WORKPLACES_BY_METRO: Record<string, { name: string; address: string; lat: number; lng: number }[]> = {
  'san-francisco': [
    { name: 'Salesforce Tower / FiDi', address: '415 Mission St, San Francisco, CA', lat: 37.7897, lng: -122.3972 },
    { name: 'Mission Bay Biotech / UCSF', address: '1675 Owens St, San Francisco, CA', lat: 37.7685, lng: -122.3918 },
    { name: 'SoMa Tech District / Stripe Hub', address: '510 Townsend St, San Francisco, CA', lat: 37.7712, lng: -122.4034 },
    { name: 'Presidio Trust & Innovation Campus', address: '103 Montgomery St, San Francisco, CA', lat: 37.7989, lng: -122.4582 },
    { name: 'Silicon Valley Campus (Palo Alto / Stanford)', address: '450 Serra Mall, Stanford, CA', lat: 37.4275, lng: -122.1697 }
  ],
  'new-york': [
    { name: 'Midtown Manhattan (Grand Central / Chrysler)', address: '405 Lexington Ave, New York, NY', lat: 40.7516, lng: -73.9754 },
    { name: 'Hudson Yards Tech & Media Hub', address: '50 Hudson Yards, New York, NY', lat: 40.7545, lng: -74.0003 },
    { name: 'Financial District / One World Trade', address: '285 Fulton St, New York, NY', lat: 40.7127, lng: -74.0134 },
    { name: 'Flatiron / Silicon Alley', address: '175 5th Ave, New York, NY', lat: 40.7411, lng: -73.9897 },
    { name: 'DUMBO Brooklyn Tech Enclave', address: '55 Water St, Brooklyn, NY', lat: 40.7037, lng: -73.9928 }
  ],
  'london': [
    { name: 'The City of London (Bank / Liverpool St)', address: '100 Bishopsgate, London, UK', lat: 51.5155, lng: -0.0818 },
    { name: 'Canary Wharf Financial District', address: 'One Canada Square, London, UK', lat: 51.5048, lng: -0.0195 },
    { name: 'King’s Cross Knowledge Quarter (Google HQ)', address: '6 Pancras Sq, London, UK', lat: 51.5348, lng: -0.1256 },
    { name: 'West End & Mayfair Corporate Hub', address: '1 Curzon St, London, UK', lat: 51.5074, lng: -0.1492 }
  ],
  'tokyo': [
    { name: 'Marunouchi / Tokyo Central Station', address: '1-1 Marunouchi, Chiyoda, Tokyo', lat: 35.6812, lng: 139.7671 },
    { name: 'Roppongi Hills Tech & Finance Tower', address: '6-10-1 Roppongi, Minato, Tokyo', lat: 35.6604, lng: 139.7292 },
    { name: 'Shibuya Stream / IT Innovation Corridor', address: '3-21-3 Shibuya, Shibuya, Tokyo', lat: 35.658, lng: 139.7016 },
    { name: 'Shinagawa Global Business Link', address: '2-16-1 Konan, Minato, Tokyo', lat: 35.6284, lng: 139.7387 }
  ],
  'paris': [
    { name: 'La Défense Grand Arche Business District', address: '1 Parvis de la Défense, Puteaux, France', lat: 48.8926, lng: 2.2361 },
    { name: 'Paris Bourse / Central 2nd Arrondissement', address: '28 Place de la Bourse, Paris, France', lat: 48.8689, lng: 2.3411 },
    { name: 'Station F / 13th Tech Startup Campus', address: '55 Bd Vincent Auriol, Paris, France', lat: 48.8348, lng: 2.3705 },
    { name: 'Opera & Haussmann Headquarters', address: '8 Rue Scribe, Paris, France', lat: 48.8718, lng: 2.3314 }
  ],
  'austin': [
    { name: 'Downtown Austin Tech High-Rise Corridor', address: '401 Congress Ave, Austin, TX', lat: 30.2662, lng: -97.7431 },
    { name: 'The Domain North Tech Campus (Apple / Amazon)', address: '11410 Century Oaks Terrace, Austin, TX', lat: 30.4022, lng: -97.7258 },
    { name: 'East Austin Creative & Design Hub', address: '1200 E 6th St, Austin, TX', lat: 30.2635, lng: -97.7292 }
  ]
};

export const CANDIDATE_HOMES_DATA: Record<string, CandidateHome[]> = {
  'san-francisco': CANDIDATE_HOMES.filter((h) => h.cityId === 'san-francisco'),
  'new-york': CANDIDATE_HOMES.filter((h) => h.cityId === 'new-york'),
  'london': CANDIDATE_HOMES.filter((h) => h.cityId === 'london'),
  'tokyo': CANDIDATE_HOMES.filter((h) => h.cityId === 'tokyo'),
  'paris': CANDIDATE_HOMES.filter((h) => h.cityId === 'paris'),
  'austin': CANDIDATE_HOMES.filter((h) => h.cityId === 'austin')
};

export const DEFAULT_PREFERENCES = {
  currentHome: {
    address: '2450 California St, Pacific Heights',
    neighborhood: 'Pacific Heights',
    lat: 37.7891,
    lng: -122.4344,
    cityId: 'san-francisco'
  },
  partner1Work: {
    name: 'Salesforce Tower / FiDi',
    address: '415 Mission St, San Francisco, CA',
    lat: 37.7897,
    lng: -122.3972,
    preferredMode: 'transit' as const
  },
  partner2Work: {
    name: 'Mission Bay Biotech / UCSF',
    address: '1675 Owens St, San Francisco, CA',
    lat: 37.7685,
    lng: -122.3918,
    preferredMode: 'transit' as const
  },
  targetVibes: ['family-friendly', 'artisan-foodie', 'transit-connected'] as any,
  minSchoolScore: 7,
  maxCommuteMinutes: 35,
  priorityWeights: {
    vibe: 0.25,
    schools: 0.25,
    commute: 0.35,
    walkability: 0.15
  }
};

import {
  generateCandidatesAroundLocation,
  GLOBAL_LOCATIONS_CATALOG,
  LocationResolution
} from './services/locationMatchingService';

export function getCandidatesNearLocation(
  currentHome: {
    lat?: number;
    lng?: number;
    neighborhood?: string;
    address?: string;
    cityId?: string;
  },
  preferences?: any
): CandidateHome[] {
  const sfCandidates = CANDIDATE_HOMES.filter((h) => h.cityId === 'san-francisco');
  const prefs = preferences || DEFAULT_PREFERENCES;
  const normQuery = `${currentHome.neighborhood || ''} ${currentHome.address || ''} ${currentHome.cityId || ''}`.toLowerCase().trim();

  // 1. Text match with GLOBAL_LOCATIONS_CATALOG first if query matches a known global metro
  if (normQuery) {
    for (const [key, loc] of Object.entries(GLOBAL_LOCATIONS_CATALOG)) {
      if (normQuery === key || normQuery.includes(key) || (key.length > 3 && key.includes(normQuery))) {
        const resolvedLoc: LocationResolution = {
          ...loc,
          ...(currentHome.lat && currentHome.lng && (currentHome.lat !== 0 || currentHome.lng !== 0)
            ? { lat: currentHome.lat, lng: currentHome.lng }
            : {})
        };
        return generateCandidatesAroundLocation(resolvedLoc, prefs, sfCandidates);
      }
    }
  }

  // 2. If valid coordinates are provided, generate candidates around those coordinates
  if (
    typeof currentHome.lat === 'number' &&
    typeof currentHome.lng === 'number' &&
    (currentHome.lat !== 0 || currentHome.lng !== 0)
  ) {
    const isBrazil =
      (currentHome.lat < 5 && currentHome.lat > -34 && currentHome.lng > -74 && currentHome.lng < -34) ||
      normQuery.includes('brazil') ||
      normQuery.includes('brasil');

    const isEurope = currentHome.lat > 35 && currentHome.lat < 70 && currentHome.lng > -10 && currentHome.lng < 35;
    const isUK = currentHome.lat > 50 && currentHome.lat < 59 && currentHome.lng > -8 && currentHome.lng < 2;
    const isJapan = currentHome.lat > 30 && currentHome.lat < 46 && currentHome.lng > 128 && currentHome.lng < 146;

    let currency = '$';
    let country = 'USA';
    let countryCode = 'US';
    let city = currentHome.neighborhood || 'Local Metro';

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
      country = 'France';
      countryCode = 'FR';
      city = 'Paris';
    } else if (isJapan) {
      currency = '¥';
      country = 'Japan';
      countryCode = 'JP';
      city = 'Tokyo';
    }

    const locInfo: LocationResolution = {
      lat: currentHome.lat,
      lng: currentHome.lng,
      neighborhood: currentHome.neighborhood || 'Local Enclave',
      cityName: city,
      stateCountry: country,
      countryCode: countryCode,
      currencySymbol: currency,
      formattedAddress: currentHome.address || `${currentHome.neighborhood || 'Local Enclave'}, ${city}`
    };

    return generateCandidatesAroundLocation(locInfo, prefs, sfCandidates);
  }

  // 3. Fallback: Default to San Francisco
  return sfCandidates;
}

export function getCandidatesForCity(cityId: string): CandidateHome[] {
  const filtered = CANDIDATE_HOMES.filter((h) => h.cityId === cityId);
  return filtered.length > 0 ? filtered : CANDIDATE_HOMES.filter((h) => h.cityId === 'san-francisco');
}

export function getCandidateById(id: string): CandidateHome | undefined {
  return CANDIDATE_HOMES.find((h) => h.id === id) || CANDIDATE_HOMES[0];
}

export function getCityMetro(cityId: string): CityMetro {
  const found = CITIES_METRO.find((c) => c.id === cityId);
  return found || CITIES_METRO[0];
}


