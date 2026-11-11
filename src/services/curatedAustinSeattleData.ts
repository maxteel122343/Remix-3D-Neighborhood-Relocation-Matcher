/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnclaveConfig } from './globalCandidatePools';

export const AUSTIN_ENCLAVES: EnclaveConfig[] = [
  {
    name: 'South Congress (SoCo)',
    subLoc: 'Music Lane & South Congress Promenade',
    exactLat: 30.2485,
    exactLng: -97.7495,
    street: '1410 S Congress Ave',
    title: 'Modern Heritage Townhome behind Music Lane',
    price: 1850000,
    beds: 3,
    baths: 3,
    sqft: 2150,
    type: 'Townhome',
    vibe: 'artisan-foodie',
    vibeLabel: 'Iconic Live Music, Heritage Oaks & Artisan Dining',
    vibeTags: ['SoCoMusicLane', 'LadyBirdLake', 'DowntownViews', 'HeritageOaks'],
    vibeDesc: 'Steps from South Congress live music venues, artisanal breakfast tacos, boutique fashion, and a 10-minute walk to Lady Bird Lake boardwalk.',
    school: {
      name: 'Travis Heights Elementary School',
      type: 'Elementary',
      rating: 9.4,
      distanceWalkMins: 5,
      district: 'Austin ISD',
      highlights: ['Dual-Language Spanish Immersion', 'Blended Learning Model', 'Outdoor Learning Gardens'],
      lat: 30.2475,
      lng: -97.7425,
      address: '2010 Alameda Dr, Austin, TX'
    },
    transit: {
      name: 'CapMetro Rapid South Congress Station',
      lat: 30.2492,
      lng: -97.7498,
      walkMins: 2,
      address: 'S Congress & Gibson St'
    },
    pois: [
      {
        name: 'CapMetro 801 Rapid Transit',
        category: 'transit',
        lat: 30.2492,
        lng: -97.7498,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Dedicated transit line into Downtown Austin (4 mins) and UT Austin (10 mins)',
        rating: 4.8
      },
      {
        name: 'Travis Heights Elementary',
        category: 'school',
        lat: 30.2475,
        lng: -97.7425,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'First in-district charter with progressive community learning',
        rating: 4.9
      },
      {
        name: 'Jo’s Coffee & Hot Licks Bakery',
        category: 'cafe',
        lat: 30.2505,
        lng: -97.7492,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Home of the famous I Love You So Much mural, cold brew, and morning tacos',
        rating: 4.9
      },
      {
        name: 'Little Stacy Park & Blunn Creek Greenbelt',
        category: 'park',
        lat: 30.2455,
        lng: -97.7435,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Lush natural canyon park with wading pool, shaded trails, and giant live oaks',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'South Congress gives you Austin’s most vibrant cultural heartbeat right at your doorstep.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Zilker',
    subLoc: 'Barton Springs & Zilker Park Entrance',
    exactLat: 30.2585,
    exactLng: -97.7695,
    street: '1804 Kinney Ave',
    title: 'Custom Architectural Farmhouse by Barton Springs',
    price: 2150000,
    beds: 4,
    baths: 3,
    sqft: 2550,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Natural Springs, Greenbelt Trails & Zilker Park',
    vibeTags: ['BartonSpringsPool', 'ZilkerPark', 'TopPublicSchools', 'HikeAndBikeTrail'],
    vibeDesc: '3-minute walk to the natural 68-degree Barton Springs pool and 350-acre Zilker Park, with high ceilings, private screened porch, and pool.',
    school: {
      name: 'Zilker Elementary School',
      type: 'Elementary',
      rating: 9.7,
      distanceWalkMins: 4,
      district: 'Austin ISD',
      highlights: ['Exemplary Accountability Rating', 'Environmental Science Focus', 'Active Community'],
      lat: 30.2565,
      lng: -97.7682,
      address: '1900 Bluebonnet Ln, Austin, TX'
    },
    transit: {
      name: 'Barton Springs Rapid Transit Stop',
      lat: 30.2612,
      lng: -97.7655,
      walkMins: 3,
      address: 'Barton Springs Rd & Kinney Ave'
    },
    pois: [
      {
        name: 'Barton Springs Rapid Transit',
        category: 'transit',
        lat: 30.2612,
        lng: -97.7655,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Direct route into Downtown 2nd St District in 5 minutes',
        rating: 4.8
      },
      {
        name: 'Zilker Elementary',
        category: 'school',
        lat: 30.2565,
        lng: -97.7682,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Top-tier neighborhood school with strong academic achievement',
        rating: 4.9
      },
      {
        name: 'Barton Springs Saloon & Cafe',
        category: 'cafe',
        lat: 30.2608,
        lng: -97.7628,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Local neighborhood meeting spot with patio and fresh roast coffee',
        rating: 4.8
      },
      {
        name: 'Barton Springs Pool & Zilker Park',
        category: 'park',
        lat: 30.2638,
        lng: -97.7712,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Spring-fed 3-acre swimming pool, botanical gardens, and sprawling open lawns',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'Living in Zilker offers a morning swim in Barton Springs before an easy 7-minute commute downtown.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Clarksville',
    subLoc: 'Historic West Austin & Enfield',
    exactLat: 30.2785,
    exactLng: -97.7595,
    street: '1208 Waterston Ave',
    title: 'Historic Victorian Craftsman with Private Pool & Cottage',
    price: 2450000,
    beds: 4,
    baths: 3,
    sqft: 2650,
    type: 'Single Family',
    vibe: 'historic-charming',
    vibeLabel: 'Historic Craftsman, Jeffrey’s Dining & Downtown Proximity',
    vibeTags: ['HistoricClarksville', 'MathewsElementary', 'FineDiningJeffreys', 'DowntownMinutes'],
    vibeDesc: 'Austin’s most historic and prestigious core neighborhood: mature pecan trees, wrap-around cedar porches, and walking distance to acclaimed neighborhood bistros.',
    school: {
      name: 'Mathews Elementary School',
      type: 'Elementary',
      rating: 9.8,
      distanceWalkMins: 4,
      district: 'Austin ISD',
      highlights: ['Austin’s Oldest Elementary', 'National Blue Ribbon Candidate', 'Inquiry-Based Learning'],
      lat: 30.2745,
      lng: -97.7558,
      address: '906 W Lynn St, Austin, TX'
    },
    transit: {
      name: 'W Lynn Commuter Route (Line 18)',
      lat: 30.2778,
      lng: -97.7592,
      walkMins: 2,
      address: 'W Lynn St & Waterston Ave'
    },
    pois: [
      {
        name: 'W Lynn Transit Link',
        category: 'transit',
        lat: 30.2778,
        lng: -97.7592,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Direct transit link into West 6th St and the Capitol Complex in 5 minutes',
        rating: 4.8
      },
      {
        name: 'Mathews Elementary School',
        category: 'school',
        lat: 30.2745,
        lng: -97.7558,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'One of the most cherished and top-rated elementary schools in Central Texas',
        rating: 4.9
      },
      {
        name: 'Caffé Medici Clarksville',
        category: 'cafe',
        lat: 30.2792,
        lng: -97.7588,
        walkMinutes: 2,
        distanceMeters: 130,
        description: 'Specialty pour-overs, handmade croissants, and shaded craftsman front porch',
        rating: 4.9
      },
      {
        name: 'Mary Frances Baylor Clarksville Park',
        category: 'park',
        lat: 30.2782,
        lng: -97.7615,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Community park with splash pad, historic bandstand, and heritage live oaks',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'Clarksville offers timeless Old Austin elegance just three minutes from the downtown skyline.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'East Austin',
    subLoc: 'East 11th St Arts & Culinary Corridor',
    exactLat: 30.2695,
    exactLng: -97.7285,
    street: '1204 E 11th St',
    title: 'Modern Architectural Compound with Guest Studio',
    price: 1550000,
    beds: 3,
    baths: 3,
    sqft: 2050,
    type: 'Single Family',
    vibe: 'vibrant-urban',
    vibeLabel: 'East 11th Culinary Corridor, Live Arts & Bike Commutes',
    vibeTags: ['East11thDining', 'FranklinBBQ', 'PlazaSaltilloMetro', 'BikeFriendly'],
    vibeDesc: 'Contemporary architectural design with blackened steel, cedar accents, and private courtyard, surrounded by James Beard award-winning restaurants and microbreweries.',
    school: {
      name: 'Blackshear Elementary Fine Arts Academy',
      type: 'Elementary',
      rating: 9.2,
      distanceWalkMins: 4,
      district: 'Austin ISD',
      highlights: ['Fine Arts & Music Magnet', 'Dance & Theatre Studios', 'Community Garden'],
      lat: 30.2682,
      lng: -97.7225,
      address: '1712 E 11th St, Austin, TX'
    },
    transit: {
      name: 'Plaza Saltillo MetroRail Station (Red Line)',
      lat: 30.2618,
      lng: -97.7268,
      walkMins: 5,
      address: '412 Comal St, Austin, TX'
    },
    pois: [
      {
        name: 'Plaza Saltillo MetroRail',
        category: 'transit',
        lat: 30.2618,
        lng: -97.7268,
        walkMinutes: 5,
        distanceMeters: 410,
        description: 'Direct commuter rail link to Downtown Convention Center (2 mins) and North Tech Hubs',
        rating: 4.8
      },
      {
        name: 'Blackshear Fine Arts Academy',
        category: 'school',
        lat: 30.2682,
        lng: -97.7225,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'First elementary fine arts academy in Austin ISD',
        rating: 4.7
      },
      {
        name: 'Figure 8 Coffee Purveyors',
        category: 'cafe',
        lat: 30.2645,
        lng: -97.7238,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Third-wave espresso roaster with record collection and sunny patio',
        rating: 4.9
      },
      {
        name: 'Pan American Neighborhood Park',
        category: 'park',
        lat: 30.2625,
        lng: -97.7198,
        walkMinutes: 5,
        distanceMeters: 390,
        description: 'Historic park with hillside outdoor amphitheater, splash pad, and ball courts',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'East Austin represents the city’s creative renaissance, where culinary innovation thrives.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Mueller',
    subLoc: 'Mueller Lake Park & Aldrich Street Town Center',
    exactLat: 30.2985,
    exactLng: -97.7055,
    street: '1904 Simond Ave',
    title: 'LEED Platinum Rowhome facing Mueller Lake Park',
    price: 1350000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    type: 'Townhome',
    vibe: 'family-friendly',
    vibeLabel: 'Sustainable Master-Planned, Lake Park & Farmers Market',
    vibeTags: ['MuellerLakePark', 'LEEDPlatinum', 'SundayFarmersMarket', 'DellChildrens'],
    vibeDesc: 'Award-winning sustainable master-planned community: 140 acres of public greenways, weekly Sunday farmers market, neighborhood pools, and shaded porches.',
    school: {
      name: 'Maplewood Elementary School',
      type: 'Elementary',
      rating: 9.4,
      distanceWalkMins: 6,
      district: 'Austin ISD',
      highlights: ['Peace Education Curriculum', 'Multicultural Arts Focus', 'Strong PTA'],
      lat: 30.2935,
      lng: -97.7125,
      address: '3808 Maplewood Ave, Austin, TX'
    },
    transit: {
      name: 'Aldrich St Transit Corridor (Line 37 & Rapid)',
      lat: 30.2995,
      lng: -97.7068,
      walkMins: 2,
      address: 'Aldrich St & Simond Ave'
    },
    pois: [
      {
        name: 'Aldrich Transit Corridor',
        category: 'transit',
        lat: 30.2995,
        lng: -97.7068,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Direct transit line connecting Mueller into UT Austin and Downtown in 12 mins',
        rating: 4.8
      },
      {
        name: 'Maplewood Elementary',
        category: 'school',
        lat: 30.2935,
        lng: -97.7125,
        walkMinutes: 6,
        distanceMeters: 460,
        description: 'Exemplary neighborhood elementary school',
        rating: 4.8
      },
      {
        name: 'Halcyon Coffee & Bar Mueller',
        category: 'cafe',
        lat: 30.2992,
        lng: -97.7082,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Lakeside coffeehouse with tableside s’mores and artisan pour-overs',
        rating: 4.8
      },
      {
        name: 'Mueller Lake Park & Amphitheater',
        category: 'park',
        lat: 30.2975,
        lng: -97.7042,
        walkMinutes: 1,
        distanceMeters: 80,
        description: '30-acre park featuring fishing lake, open air hangar for farmers market, and trails',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'Mueller is the gold standard of modern walkable and family-friendly sustainable living.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Downtown Austin',
    subLoc: '2nd Street District & Lady Bird Lake',
    exactLat: 30.2655,
    exactLng: -97.7475,
    street: '200 Willie Nelson Blvd',
    title: 'High-Rise Corner Sky Residence with Lake & Hill Country Views',
    price: 2650000,
    beds: 3,
    baths: 3,
    sqft: 2250,
    type: 'Condominium',
    vibe: 'transit-connected',
    vibeLabel: '2nd St District, Lady Bird Boardwalk & Zero-Commute',
    vibeTags: ['2ndStDistrict', 'LadyBirdLakeWalk', 'ZeroCommute', 'PanoramicViews'],
    vibeDesc: 'Soaring high-rise above the 2nd Street District, panoramic views of the Hill Country sunset and Lady Bird Lake, with direct elevator access to gourmet groceries and dining.',
    school: {
      name: 'The Girls’ School of Austin',
      type: 'Private',
      rating: 9.8,
      distanceWalkMins: 8,
      district: 'Independent / NAIS',
      highlights: ['Leadership & STEM Focus', 'Arts Integration', '100% College Placement'],
      lat: 30.2855,
      lng: -97.7565,
      address: '2007 Bert Ave, Austin, TX'
    },
    transit: {
      name: 'Downtown MetroRail Station',
      lat: 30.2638,
      lng: -97.7398,
      walkMins: 4,
      address: '400 E 4th St, Austin, TX'
    },
    pois: [
      {
        name: 'Downtown MetroRail Hub',
        category: 'transit',
        lat: 30.2638,
        lng: -97.7398,
        walkMinutes: 4,
        distanceMeters: 340,
        description: 'Terminus of commuter rail connecting to Domain tech center',
        rating: 4.8
      },
      {
        name: 'The Girls’ School of Austin',
        category: 'school',
        lat: 30.2855,
        lng: -97.7565,
        walkMinutes: 8,
        distanceMeters: 650,
        description: 'Pre-eminent independent academy',
        rating: 4.9
      },
      {
        name: 'Mañana Coffee & Bakeshop',
        category: 'cafe',
        lat: 30.2642,
        lng: -97.7468,
        walkMinutes: 2,
        distanceMeters: 130,
        description: 'Specialty coffee, lavender lattes, and housemade kouign-amann',
        rating: 4.9
      },
      {
        name: 'Ann and Roy Butler Hike-and-Bike Trail',
        category: 'park',
        lat: 30.2628,
        lng: -97.7485,
        walkMinutes: 1,
        distanceMeters: 90,
        description: '10 miles of uninterrupted scenic waterfront crushed-granite trail encircling the lake',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'Live above it all in the 2nd Street District with Lady Bird Lake as your front lawn.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Barton Hills',
    subLoc: 'Barton Creek Greenbelt & Homedale',
    exactLat: 30.2488,
    exactLng: -97.7812,
    street: '2208 Barton Hills Dr',
    title: 'Mid-Century Modern Hillside Haven by Greenbelt Trails',
    price: 1950000,
    beds: 4,
    baths: 3,
    sqft: 2480,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Limestone Bluffs, Barton Creek Greenbelt & Mid-Century Design',
    vibeTags: ['BartonCreekGreenbelt', 'MidCenturyModern', 'QuietCanopy', 'TopSchools'],
    vibeDesc: 'Perched along the rim of the Barton Creek Greenbelt with limestone bluffs, private pool, and trailhead access directly behind the backyard.',
    school: {
      name: 'Barton Hills Elementary School',
      type: 'Elementary',
      rating: 9.7,
      distanceWalkMins: 4,
      district: 'Austin ISD',
      highlights: ['Famous Barton Hills Choir', 'Greenbelt Science Curriculum', 'Exemplary Campus'],
      lat: 30.2465,
      lng: -97.7835,
      address: '2108 Barton Hills Dr, Austin, TX'
    },
    transit: {
      name: 'S Lamar Rapid Transit Corridor',
      lat: 30.2498,
      lng: -97.7715,
      walkMins: 5,
      address: 'S Lamar Blvd & Barton Skyway'
    },
    pois: [
      {
        name: 'S Lamar Transit Hub',
        category: 'transit',
        lat: 30.2498,
        lng: -97.7715,
        walkMinutes: 5,
        distanceMeters: 420,
        description: 'Rapid bus lane into Downtown Austin in under 7 minutes',
        rating: 4.8
      },
      {
        name: 'Barton Hills Elementary',
        category: 'school',
        lat: 30.2465,
        lng: -97.7835,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Beloved neighborhood school celebrated for music and academic honors',
        rating: 4.9
      },
      {
        name: 'Radio Coffee & Beer (S Lamar)',
        category: 'cafe',
        lat: 30.2415,
        lng: -97.7845,
        walkMinutes: 6,
        distanceMeters: 480,
        description: 'Oak-shaded patio with Veracruz All Natural breakfast tacos and craft espresso',
        rating: 4.9
      },
      {
        name: 'Barton Creek Greenbelt Trailhead',
        category: 'park',
        lat: 30.2475,
        lng: -97.7802,
        walkMinutes: 2,
        distanceMeters: 140,
        description: '12 miles of limestone cliffs, natural swimming holes (Campbell’s Hole), and shaded bike paths',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'Barton Hills is the quintessential natural sanctuary of Austin: greenbelt trails in your backyard.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Travis Heights',
    subLoc: 'Stacy Park & Blunn Creek',
    exactLat: 30.2445,
    exactLng: -97.7385,
    street: '1106 Travis Heights Blvd',
    title: 'Historic Rolling Hillside Bungalow with Swimming Pool',
    price: 1780000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    type: 'Single Family',
    vibe: 'family-friendly',
    vibeLabel: 'Rolling Hills, Historic Trees & Stacy Pool',
    vibeTags: ['BigStacyPool', 'BlunnCreekNature', 'QuietHillside', 'SoCoWalkable'],
    vibeDesc: 'Winding streets under massive historic live oaks, rolling topography, walking distance to Big Stacy naturally heated pool and South Congress.',
    school: {
      name: 'Travis Heights Elementary',
      type: 'Elementary',
      rating: 9.4,
      distanceWalkMins: 4,
      district: 'Austin ISD',
      highlights: ['Dual-Language Immersion', 'Arts & Music Integration', 'Outdoor Garden'],
      lat: 30.2475,
      lng: -97.7425,
      address: '2010 Alameda Dr, Austin, TX'
    },
    transit: {
      name: 'Riverside Commuter Route',
      lat: 30.2482,
      lng: -97.7345,
      walkMins: 4,
      address: 'E Riverside Dr & Travis Heights Blvd'
    },
    pois: [
      {
        name: 'Riverside Transit Link',
        category: 'transit',
        lat: 30.2482,
        lng: -97.7345,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Direct transit line to Congress Ave bridge into Downtown in 5 mins',
        rating: 4.8
      },
      {
        name: 'Travis Heights School',
        category: 'school',
        lat: 30.2475,
        lng: -97.7425,
        walkMinutes: 4,
        distanceMeters: 280,
        description: 'Celebrated neighborhood school with active parents',
        rating: 4.8
      },
      {
        name: 'Summer Moon Coffee Bar',
        category: 'cafe',
        lat: 30.2425,
        lng: -97.7512,
        walkMinutes: 6,
        distanceMeters: 450,
        description: 'Wood-fired roasted coffee beans with signature moon milk',
        rating: 4.8
      },
      {
        name: 'Big Stacy Park & Heated Spring Pool',
        category: 'park',
        lat: 30.2418,
        lng: -97.7412,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Geothermally heated spring-fed pool open free year-round, shaded park, and tennis courts',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Wyatt Sterling',
      agency: 'Austin Urban Real Estate Group',
      quote: 'Travis Heights offers unique hilly topography and neighborhood warmth just across the bridge from Downtown.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export const SEATTLE_ENCLAVES: EnclaveConfig[] = [
  {
    name: 'Queen Anne',
    subLoc: 'Upper Queen Anne Hill & Kerry Park',
    exactLat: 47.6355,
    exactLng: -122.3575,
    street: '1420 3rd Ave W',
    title: 'Stately Queen Anne Craftsman with Puget Sound & Olympic Views',
    price: 2250000,
    beds: 4,
    baths: 3,
    sqft: 2750,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Kerry Park Vistas, Upper Avenue Cafes & Olympic Mountains',
    vibeTags: ['KerryParkViews', 'UpperQueenAnne', 'TopPublicSchools', 'SoundPanoramas'],
    vibeDesc: 'Historic Queen Anne hill avenue with panoramic views of Puget Sound and the Space Needle from Kerry Park, quiet tree-lined streets, and bakeries.',
    school: {
      name: 'Coe Elementary School',
      type: 'Elementary',
      rating: 9.8,
      distanceWalkMins: 4,
      district: 'Seattle Public Schools',
      highlights: ['State Academic Excellence Award', 'Dedicated STEM & Arts', 'Highly Active Community'],
      lat: 30.6385,
      lng: -122.3555,
      address: '2424 7th Ave W, Seattle, WA'
    },
    transit: {
      name: 'Queen Anne Ave RapidRide Line (D Line & Bus 13)',
      lat: 47.6362,
      lng: -122.3568,
      walkMins: 2,
      address: 'Queen Anne Ave N & McGraw St'
    },
    pois: [
      {
        name: 'RapidRide Commuter Transit',
        category: 'transit',
        lat: 47.6362,
        lng: -122.3568,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Direct express bus into Downtown Seattle (8 mins) and South Lake Union tech hub',
        rating: 4.8
      },
      {
        name: 'Coe Elementary School',
        category: 'school',
        lat: 47.6385,
        lng: -122.3555,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Consistently rated among Washington State’s finest elementary schools',
        rating: 4.9
      },
      {
        name: 'Macrina Bakery & Cafe Queen Anne',
        category: 'cafe',
        lat: 47.6375,
        lng: -122.3572,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Beloved local bakery famous for artisan sourdough, brioche, and espresso',
        rating: 4.9
      },
      {
        name: 'Kerry Park & Marshall Park',
        category: 'park',
        lat: 47.6295,
        lng: -122.3598,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'Seattle’s iconic postcard vista: Space Needle, downtown skyline, and Mount Rainier',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'Queen Anne offers Seattle’s most celebrated hilltop neighborhood feel and spectacular sound views.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Capitol Hill',
    subLoc: 'Volunteer Park & 15th Ave E Enclave',
    exactLat: 47.6285,
    exactLng: -122.3125,
    street: '1218 16th Ave E',
    title: 'Historic Turn-of-the-Century Craftsman by Volunteer Park',
    price: 2100000,
    beds: 4,
    baths: 3,
    sqft: 2600,
    type: 'Single Family',
    vibe: 'artisan-foodie',
    vibeLabel: 'Volunteer Park Conservatory, Asian Art Museum & Light Rail',
    vibeTags: ['VolunteerPark', 'SoundTransitLightRail', '15thAveDining', 'AsianArtMuseum'],
    vibeDesc: 'Steps from Volunteer Park’s botanical conservatory and Seattle Asian Art Museum, tranquil residential enclave with wrap-around porch and mature Douglas firs.',
    school: {
      name: 'Stevens Elementary School',
      type: 'Elementary',
      rating: 9.5,
      distanceWalkMins: 4,
      district: 'Seattle Public Schools',
      highlights: ['Dual Immersion Programs', 'STEAM Laboratory', 'Arts Leadership'],
      lat: 47.6315,
      lng: -122.3085,
      address: '1242 18th Ave E, Seattle, WA'
    },
    transit: {
      name: 'Capitol Hill Light Rail Station (1 Line)',
      lat: 47.6185,
      lng: -122.3212,
      walkMins: 6,
      address: 'Broadway & E John St'
    },
    pois: [
      {
        name: 'Capitol Hill Light Rail',
        category: 'transit',
        lat: 47.6185,
        lng: -122.3212,
        walkMinutes: 6,
        distanceMeters: 480,
        description: 'Direct light rail to Downtown Westlake (3 mins), UW (4 mins), and Sea-Tac Airport',
        rating: 4.9
      },
      {
        name: 'Stevens Elementary',
        category: 'school',
        lat: 47.6315,
        lng: -122.3085,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Exemplary neighborhood elementary with high academic marks',
        rating: 4.8
      },
      {
        name: 'Bakery Nouveau 15th Ave',
        category: 'cafe',
        lat: 47.6248,
        lng: -122.3125,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'World champion bakery with award-winning twice-baked almond croissants',
        rating: 5.0
      },
      {
        name: 'Volunteer Park & Conservatory',
        category: 'park',
        lat: 47.6305,
        lng: -122.3155,
        walkMinutes: 2,
        distanceMeters: 170,
        description: '48-acre Olmsted Brothers park with historic conservatory, dahlia gardens, and water tower',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'The north slope of Capitol Hill combines Olmsted park elegance with effortless transit access.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Ballard',
    subLoc: 'Old Ballard & Salmon Bay Locks',
    exactLat: 47.6685,
    exactLng: -122.3845,
    street: '5318 Ballard Ave NW',
    title: 'Historic Brick & Timber Loft on Ballard Avenue',
    price: 1550000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    type: 'Modern Loft',
    vibe: 'artisan-foodie',
    vibeLabel: 'Ballard Locks, Historic Brick Avenue & Craft Breweries',
    vibeTags: ['BallardLocks', 'BallardFarmersMarket', 'CraftBrewingDistrict', 'GoldenGardensBeach'],
    vibeDesc: 'Historic landmark street of brick turn-of-the-century architecture, acclaimed Scandinavian bakeries, Sunday farmers market, and minutes from the Ballard Locks and Golden Gardens beach.',
    school: {
      name: 'Ballard High School',
      type: 'High',
      rating: 9.6,
      distanceWalkMins: 6,
      district: 'Seattle Public Schools',
      highlights: ['Biotechnology Academy', 'Award-Winning Video Production', 'Top AP Pass Rates'],
      lat: 47.6715,
      lng: -122.3785,
      address: '1418 NW 65th St, Seattle, WA'
    },
    transit: {
      name: 'RapidRide D Line Ballard Hub',
      lat: 47.6672,
      lng: -122.3828,
      walkMins: 3,
      address: '15th Ave NW & NW Market St'
    },
    pois: [
      {
        name: 'RapidRide D Line',
        category: 'transit',
        lat: 47.6672,
        lng: -122.3828,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Frequent express bus linking directly to Downtown Seattle in 15 mins',
        rating: 4.8
      },
      {
        name: 'Ballard High School',
        category: 'school',
        lat: 47.6715,
        lng: -122.3785,
        walkMinutes: 6,
        distanceMeters: 450,
        description: 'One of Washington’s flagship public high schools',
        rating: 4.8
      },
      {
        name: 'Macleod’s & Ballard Sourdough Cafe',
        category: 'cafe',
        lat: 47.6668,
        lng: -122.3842,
        walkMinutes: 1,
        distanceMeters: 80,
        description: 'Artisan sourdough pastries, Scandinavian cardamom braids, and espresso',
        rating: 4.9
      },
      {
        name: 'Hiram M. Chittenden Locks (Ballard Locks)',
        category: 'park',
        lat: 47.6655,
        lng: -122.3975,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Working ship locks connecting Lake Washington to Puget Sound, salmon ladder, and botanical gardens',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'Ballard combines authentic maritime history with Seattle’s most exciting culinary street.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Fremont',
    subLoc: 'Canal Promenade & Center of the Universe',
    exactLat: 47.6515,
    exactLng: -122.3505,
    street: '3421 Fremont Ave N',
    title: 'Modern Waterfront Townhome along the Ship Canal',
    price: 1480000,
    beds: 3,
    baths: 3,
    sqft: 1920,
    type: 'Townhome',
    vibe: 'vibrant-urban',
    vibeLabel: 'Burke-Gilman Trail, Canalside Tech Hub & Fremont Troll',
    vibeTags: ['BurkeGilmanTrail', 'CanalPromenade', 'GoogleTableauCampus', 'FremontTroll'],
    vibeDesc: 'Direct access to the 27-mile Burke-Gilman Trail along the Lake Washington Ship Canal, walking distance to Google, Tableau, and artisan chocolate roasters.',
    school: {
      name: 'B.F. Day Elementary School',
      type: 'Elementary',
      rating: 9.4,
      distanceWalkMins: 4,
      district: 'Seattle Public Schools',
      highlights: ['Longest Continuously Operating Seattle School', 'Active Family Community', 'Green School'],
      lat: 47.6555,
      lng: -122.3535,
      address: '3921 Linden Ave N, Seattle, WA'
    },
    transit: {
      name: 'Fremont Transit Corridor (Route 40 & 62)',
      lat: 47.6518,
      lng: -122.3498,
      walkMins: 2,
      address: 'Fremont Ave N & N 34th St'
    },
    pois: [
      {
        name: 'Fremont Transit Hub',
        category: 'transit',
        lat: 47.6518,
        lng: -122.3498,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Direct transit line to South Lake Union (8 mins) and Downtown Seattle (12 mins)',
        rating: 4.8
      },
      {
        name: 'B.F. Day Elementary',
        category: 'school',
        lat: 47.6555,
        lng: -122.3535,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Historic and innovative neighborhood community school',
        rating: 4.8
      },
      {
        name: 'Theo Chocolate Factory & Cafe',
        category: 'cafe',
        lat: 47.6508,
        lng: -122.3538,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Fair-trade organic chocolate factory, hot drinking chocolate, and espresso',
        rating: 4.9
      },
      {
        name: 'Gas Works Park & Burke-Gilman Trail',
        category: 'park',
        lat: 47.6455,
        lng: -122.3345,
        walkMinutes: 6,
        distanceMeters: 480,
        description: '19-acre rolling green park on Lake Union with panoramic downtown skyline views and kite hill',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'Fremont is Seattle’s most energetic creative neighborhood, perfectly situated on the Ship Canal.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Madison Park',
    subLoc: 'Lake Washington Beach & Broadmoor',
    exactLat: 47.6358,
    exactLng: -122.2785,
    street: '1912 42nd Ave E',
    title: 'Nantucket Shingle Residence by Lake Washington Beach',
    price: 2850000,
    beds: 4,
    baths: 4,
    sqft: 3100,
    type: 'Single Family',
    vibe: 'family-friendly',
    vibeLabel: 'Lake Washington Sandy Beach, Village High St & Broadmoor',
    vibeTags: ['LakeWashingtonBeach', 'BroadmoorGreenery', 'VillageBakery', 'QuietCanopy'],
    vibeDesc: 'Lakeside sanctuary with swimming beach, community bathhouse, gourmet markets, tennis courts, and leafy streets leading to Broadmoor.',
    school: {
      name: 'McGilvra Elementary School',
      type: 'Elementary',
      rating: 9.8,
      distanceWalkMins: 3,
      district: 'Seattle Public Schools',
      highlights: ['State Assessment Benchmark Leader', 'Art & Music Mastery', 'Lakeside Campus'],
      lat: 47.6335,
      lng: -122.2825,
      address: '1617 38th Ave E, Seattle, WA'
    },
    transit: {
      name: 'Madison St Transit Route (Line 11 & RapidRide G Line)',
      lat: 47.6348,
      lng: -122.2798,
      walkMins: 2,
      address: 'E Madison St & 42nd Ave E'
    },
    pois: [
      {
        name: 'Madison St Transit Corridor',
        category: 'transit',
        lat: 47.6348,
        lng: -122.2798,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Direct RapidRide transit down Madison St into Downtown Seattle in 14 mins',
        rating: 4.8
      },
      {
        name: 'McGilvra Elementary',
        category: 'school',
        lat: 47.6335,
        lng: -122.2825,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Consistently one of Seattle’s highest-performing public elementary schools',
        rating: 5.0
      },
      {
        name: 'Madison Park Bakery & Cafe',
        category: 'cafe',
        lat: 47.6352,
        lng: -122.2795,
        walkMinutes: 1,
        distanceMeters: 80,
        description: 'Neighborhood bakery serving cinnamon rolls and espresso since 1929',
        rating: 4.9
      },
      {
        name: 'Madison Park Beach & Bathhouse',
        category: 'park',
        lat: 47.6368,
        lng: -122.2765,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Sandy swimming beach on Lake Washington with diving boards and Mount Rainier views',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'Madison Park feels like a private lakeside resort town tucked inside the city boundaries.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'South Lake Union',
    subLoc: 'Lake Union Park & Tech Campus Core',
    exactLat: 47.6245,
    exactLng: -122.3385,
    street: '333 Boren Ave N',
    title: 'High-Rise Architectural Sky Home with Lake Union Floatplane Views',
    price: 1850000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    type: 'Condominium',
    vibe: 'transit-connected',
    vibeLabel: 'South Lake Union Streetcar, Tech Campuses & Floatplanes',
    vibeTags: ['SLUStreetcar', 'LakeUnionPark', 'AmazonTechHQ', 'FloatplaneViews'],
    vibeDesc: 'Adjacent to Lake Union Park and Amazon headquarters: panoramic views of floatplanes taking off on the lake, streetcar stop, and kayak docks.',
    school: {
      name: 'Seattle World School / Cascade Academy',
      type: 'Elementary',
      rating: 9.3,
      distanceWalkMins: 5,
      district: 'Seattle Public Schools',
      highlights: ['International Language Center', 'Technology Mentorships', 'Modern Facility'],
      lat: 47.6215,
      lng: -122.3315,
      address: '1700 E Thomas St, Seattle, WA'
    },
    transit: {
      name: 'South Lake Union Streetcar (Lake Union Park Stop)',
      lat: 47.6258,
      lng: -122.3378,
      walkMins: 2,
      address: 'Terry Ave N & Mercer St'
    },
    pois: [
      {
        name: 'SLU Streetcar Hub',
        category: 'transit',
        lat: 47.6258,
        lng: -122.3378,
        walkMinutes: 2,
        distanceMeters: 130,
        description: 'Streetcar connecting Lake Union Park to Westlake Light Rail Center in 5 minutes',
        rating: 4.8
      },
      {
        name: 'Cascade Academy',
        category: 'school',
        lat: 47.6215,
        lng: -122.3315,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Innovative multicultural urban academy',
        rating: 4.7
      },
      {
        name: 'Espresso Vivace & Bakery',
        category: 'cafe',
        lat: 47.6228,
        lng: -122.3365,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Seattle coffee legend credited with pioneering espresso latte art',
        rating: 4.9
      },
      {
        name: 'Lake Union Park & MOHAI Museum',
        category: 'park',
        lat: 47.6275,
        lng: -122.3368,
        walkMinutes: 2,
        distanceMeters: 150,
        description: '12-acre waterfront park, historic wooden boats, kayak launch, and museum',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'South Lake Union puts you at the global center of technology with the lake as your retreat.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Belltown',
    subLoc: 'Olympic Sculpture Park & Waterfront',
    exactLat: 47.6165,
    exactLng: -122.3515,
    street: '2800 Western Ave',
    title: 'Waterfront Penthouse by Olympic Sculpture Park',
    price: 2150000,
    beds: 2,
    baths: 2,
    sqft: 1680,
    type: 'Modern Loft',
    vibe: 'vibrant-urban',
    vibeLabel: 'Olympic Sculpture Park, Puget Sound Ferries & Pike Place',
    vibeTags: ['OlympicSculpturePark', 'PugetSoundFerries', 'PikePlaceMarket', 'WalkToWork'],
    vibeDesc: 'Directly bordering the 9-acre Olympic Sculpture Park on Elliott Bay, breathtaking sunset views across Puget Sound to the Olympic Mountains, walking distance to Pike Place Market.',
    school: {
      name: 'The Center School',
      type: 'High',
      rating: 9.4,
      distanceWalkMins: 6,
      district: 'Seattle Public Schools',
      highlights: ['Arts & Civic Engagement', 'Seattle Center Campus', 'Interdisciplinary Focus'],
      lat: 47.6215,
      lng: -122.3512,
      address: '305 Harrison St, Seattle, WA'
    },
    transit: {
      name: 'Seattle Center Monorail & 3rd Ave Transit Spine',
      lat: 47.6178,
      lng: -122.3485,
      walkMins: 3,
      address: '3rd Ave & Broad St'
    },
    pois: [
      {
        name: '3rd Ave Transit Corridor',
        category: 'transit',
        lat: 47.6178,
        lng: -122.3485,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Direct transit spine into financial district in 4 minutes',
        rating: 4.8
      },
      {
        name: 'The Center School',
        category: 'school',
        lat: 47.6215,
        lng: -122.3512,
        walkMinutes: 6,
        distanceMeters: 450,
        description: 'Acclaimed public arts high school located on Seattle Center campus',
        rating: 4.8
      },
      {
        name: 'Macrina Bakery & Belltown Cafe',
        category: 'cafe',
        lat: 47.6148,
        lng: -122.3495,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Original Macrina flagship bakery serving artisan pastries and coffee',
        rating: 4.9
      },
      {
        name: 'Olympic Sculpture Park & Myrtle Edwards',
        category: 'park',
        lat: 47.6168,
        lng: -122.3555,
        walkMinutes: 2,
        distanceMeters: 110,
        description: 'Seattle Art Museum’s 9-acre waterfront park with Calder sculptures and beach',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'Belltown delivers pure waterfront urban excitement with the Olympic Sculpture Park at your feet.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'West Seattle (Alki Beach)',
    subLoc: 'Alki Point & Elliott Bay Water Taxi',
    exactLat: 47.5785,
    exactLng: -122.4085,
    street: '2610 Alki Ave SW',
    title: 'Modern Waterfront Beach Home with Skyline & Sound Views',
    price: 1980000,
    beds: 3,
    baths: 3,
    sqft: 2350,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Sandy Alki Beach, Elliott Bay Water Taxi & Skyline Panoramas',
    vibeTags: ['AlkiBeachWaterfront', 'WaterTaxiToDowntown', 'OlympicViews', 'BeachBoardwalk'],
    vibeDesc: 'Directly facing sandy Alki Beach: watch ferries glide across Elliott Bay, bicycle along the waterfront boardwalk, and take the 12-minute scenic water taxi into Downtown Seattle.',
    school: {
      name: 'Alki Elementary School',
      type: 'Elementary',
      rating: 9.6,
      distanceWalkMins: 4,
      district: 'Seattle Public Schools',
      highlights: ['Marine Science Education', 'Brand New Modern Campus', 'Community Spirit'],
      lat: 47.5765,
      lng: -122.4045,
      address: '3010 59th Ave SW, Seattle, WA'
    },
    transit: {
      name: 'West Seattle Water Taxi (Seacrest Dock)',
      lat: 47.5885,
      lng: -122.3785,
      walkMins: 8,
      address: '1660 Harbor Ave SW'
    },
    pois: [
      {
        name: 'Elliott Bay Water Taxi',
        category: 'transit',
        lat: 47.5885,
        lng: -122.3785,
        walkMinutes: 8,
        distanceMeters: 650,
        description: 'Scenic 12-minute passenger ferry crossing directly to Pier 50 Downtown Seattle',
        rating: 5.0
      },
      {
        name: 'Alki Elementary School',
        category: 'school',
        lat: 47.5765,
        lng: -122.4045,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Brand new state-of-the-art beach community school',
        rating: 4.8
      },
      {
        name: 'Spud Fish & Chips / Ampersand Cafe',
        category: 'cafe',
        lat: 47.5788,
        lng: -122.4072,
        walkMinutes: 1,
        distanceMeters: 80,
        description: 'Lakeside espresso, fresh morning cinnamon rolls, and beach seating',
        rating: 4.8
      },
      {
        name: 'Alki Beach Promenade & Park',
        category: 'park',
        lat: 47.5792,
        lng: -122.4098,
        walkMinutes: 1,
        distanceMeters: 50,
        description: '2.5 miles of saltwater sandy beach, fire pits, volleyball courts, and lighthouse',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcus Lindqvist',
      agency: 'Windermere Real Estate Seattle',
      quote: 'Living on Alki Beach gives you a California coastal lifestyle with Seattle’s skyline across the bay.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];
