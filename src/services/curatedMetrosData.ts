/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnclaveConfig } from './globalCandidatePools';

export const NEW_YORK_ENCLAVES: EnclaveConfig[] = [
  {
    name: 'DUMBO',
    subLoc: 'Waterfront & Brooklyn Bridge Park',
    exactLat: 40.7033,
    exactLng: -73.9881,
    street: '65 Washington St',
    title: 'Historic Cobblestone Loft with Skyline Views',
    price: 2450000,
    beds: 3,
    baths: 2,
    sqft: 1820,
    type: 'Modern Loft',
    vibe: 'artisan-foodie',
    vibeLabel: 'Artisan Hub & Waterfront Skyline',
    vibeTags: ['WaterfrontPark', 'SubwayA_C_F', 'ArtisanCafes', 'ManhattanViews'],
    vibeDesc: 'Converted brick-and-beam loft with soaring 11ft timber ceilings, steps from Brooklyn Bridge Park and artisan coffee roasters.',
    school: {
      name: 'PS 8 Robert Fulton School',
      type: 'K-8',
      rating: 9.4,
      distanceWalkMins: 5,
      district: 'NYC District 13',
      highlights: ['Blue Ribbon School of Excellence', 'Arts & Design Focus', 'Top Reading Proficiency'],
      lat: 40.6995,
      lng: -73.9932,
      address: '37 Hicks St, Brooklyn, NY'
    },
    transit: {
      name: 'York St Subway Station (F Train)',
      lat: 40.7013,
      lng: -73.9868,
      walkMins: 3,
      address: 'York St & Jay St, Brooklyn, NY'
    },
    pois: [
      {
        name: 'York St (F Train) Subway',
        category: 'transit',
        lat: 40.7013,
        lng: -73.9868,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'One stop directly into Lower Manhattan (East Broadway / Delancey)',
        rating: 4.8
      },
      {
        name: 'PS 8 Robert Fulton',
        category: 'school',
        lat: 40.6995,
        lng: -73.9932,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Premier elementary academy with high parent involvement',
        rating: 4.9
      },
      {
        name: 'Devoción DUMBO Roastery',
        category: 'cafe',
        lat: 40.7038,
        lng: -73.9892,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Farm-to-cup Colombian coffee roasters with lush living plant wall',
        rating: 4.9
      },
      {
        name: 'Brooklyn Bridge Park (Pier 1)',
        category: 'park',
        lat: 40.7019,
        lng: -73.9968,
        walkMinutes: 4,
        distanceMeters: 310,
        description: '85-acre waterfront green park with expansive Manhattan harbor views',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Julian Vance',
      agency: 'Sotheby’s International Realty NYC',
      quote: 'DUMBO offers an unbeatable blend of scenic riverfront promenades and a 7-minute commute to Wall Street.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Brooklyn Heights',
    subLoc: 'The Promenade & Historic District',
    exactLat: 40.6960,
    exactLng: -73.9933,
    street: '142 Willow St',
    title: 'Graceful Brownstone Floor-Through with Private Garden',
    price: 2850000,
    beds: 3,
    baths: 2,
    sqft: 1950,
    type: 'Townhome',
    vibe: 'family-friendly',
    vibeLabel: 'Historic Brownstones & Tree-Lined Promenade',
    vibeTags: ['PromenadeViews', 'SubwayHub2_3_4_5', 'QuietCanopy', 'PremierPreschools'],
    vibeDesc: 'Idyllic, whisper-quiet gas-lamp street with classic red-brick townhouses, leading directly to the iconic Brooklyn Heights Promenade.',
    school: {
      name: 'Saint Ann’s School',
      type: 'Private',
      rating: 9.8,
      distanceWalkMins: 4,
      district: 'Independent / NAIS',
      highlights: ['Nationally Ranked Arts & Literature', 'Ivy League Matriculation', 'Historic Campus'],
      lat: 40.6948,
      lng: -73.9928,
      address: '129 Pierrepont St, Brooklyn, NY'
    },
    transit: {
      name: 'Clark St Subway Station (2/3 Lines)',
      lat: 40.6976,
      lng: -73.9934,
      walkMins: 2,
      address: 'Clark St & Henry St'
    },
    pois: [
      {
        name: 'Clark St (2/3) Station',
        category: 'transit',
        lat: 40.6976,
        lng: -73.9934,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Red Line subway express to Wall St (3 mins) and Midtown (12 mins)',
        rating: 4.8
      },
      {
        name: 'Saint Ann’s School',
        category: 'school',
        lat: 40.6948,
        lng: -73.9928,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Pre-eminent independent school fostering creative and scholarly depth',
        rating: 4.9
      },
      {
        name: 'Inness Cafe & Viennoiserie',
        category: 'cafe',
        lat: 40.6958,
        lng: -73.9942,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Artisan sourdough pastries, hand-poured single origins, and patio',
        rating: 4.9
      },
      {
        name: 'Brooklyn Heights Promenade',
        category: 'park',
        lat: 40.6971,
        lng: -73.9972,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Pedestrian esplanade overlooking the Statue of Liberty and Downtown Manhattan',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Julian Vance',
      agency: 'Sotheby’s International Realty NYC',
      quote: 'Brooklyn Heights is New York’s original historic suburb—peaceful, dignified, and minutes from the financial district.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'West Village',
    subLoc: 'Bank St & Bleecker Promenade',
    exactLat: 40.7358,
    exactLng: -74.0036,
    street: '88 Bank St',
    title: 'Cobblestone Classic with Sunlit Bay Windows',
    price: 3100000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    type: 'Townhome',
    vibe: 'artisan-foodie',
    vibeLabel: 'Boutique Bistros & Cobblestone Serenity',
    vibeTags: ['WestVillageCharm', 'HudsonRiverPark', 'ArtisanCafes', 'HistoricCanopy'],
    vibeDesc: 'Romantic leafy street surrounded by heritage townhouses, Michelin-rated pocket bistros, and third-wave cafes.',
    school: {
      name: 'PS 41 Greenwich Village School',
      type: 'Elementary',
      rating: 9.6,
      distanceWalkMins: 6,
      district: 'NYC District 2',
      highlights: ['Green Roof Science Lab', 'Enriched Arts Curriculum', 'State Assessment Leader'],
      lat: 40.7351,
      lng: -73.9984,
      address: '116 W 11th St, New York, NY'
    },
    transit: {
      name: 'Christopher St - Sheridan Sq (1 Train)',
      lat: 40.7334,
      lng: -74.0029,
      walkMins: 3,
      address: '7th Ave S & Christopher St'
    },
    pois: [
      {
        name: 'Christopher St Subway',
        category: 'transit',
        lat: 40.7334,
        lng: -74.0029,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Direct Broadway-7th Ave line into Midtown Manhattan',
        rating: 4.7
      },
      {
        name: 'PS 41 Greenwich Village',
        category: 'school',
        lat: 40.7351,
        lng: -73.9984,
        walkMinutes: 6,
        distanceMeters: 420,
        description: 'Top-tier elementary school with award-winning sustainability curriculum',
        rating: 4.8
      },
      {
        name: 'Buvette Gastrotheque',
        category: 'cafe',
        lat: 40.7328,
        lng: -74.0039,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Classic Parisian morning cafe with warm croissants and fresh preserves',
        rating: 4.9
      },
      {
        name: 'Hudson River Park & Pier 45',
        category: 'park',
        lat: 40.7339,
        lng: -74.0118,
        walkMinutes: 6,
        distanceMeters: 480,
        description: 'Riverfront boardwalk, sunning lawns, and sunset piers',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Claire Montgomery',
      agency: 'Compass West Village',
      quote: 'Living on Bank Street is the quintessential New York dream: quiet village atmosphere just minutes from Hudson River Park.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Williamsburg',
    subLoc: 'North Waterfront & Domino Park',
    exactLat: 40.7188,
    exactLng: -73.9632,
    street: '185 Wythe Ave',
    title: 'Architectural Penthouse with Private Skyline Terrace',
    price: 2200000,
    beds: 2,
    baths: 2,
    sqft: 1390,
    type: 'Condominium',
    vibe: 'vibrant-urban',
    vibeLabel: 'Creative High Street & Domino Park Waterfront',
    vibeTags: ['DominoPark', 'L_TrainSubway', 'NYC_Ferry', 'MichelinBistros'],
    vibeDesc: 'Floor-to-ceiling glass penthouse with direct water views, steps from Domino Park, boutique design shops, and the NYC Ferry.',
    school: {
      name: 'PS 84 Jose De Diego School',
      type: 'K-8',
      rating: 9.1,
      distanceWalkMins: 5,
      district: 'NYC District 14',
      highlights: ['Dual-Language Spanish & French', 'Greenhouse Science Program', 'Active Arts Community'],
      lat: 40.7135,
      lng: -73.9578,
      address: '250 Berry St, Brooklyn, NY'
    },
    transit: {
      name: 'Bedford Ave Subway Station (L Train)',
      lat: 40.7176,
      lng: -73.9568,
      walkMins: 4,
      address: 'Bedford Ave & N 7th St'
    },
    pois: [
      {
        name: 'Bedford Ave (L Train)',
        category: 'transit',
        lat: 40.7176,
        lng: -73.9568,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'Fast 1-stop link into Union Square Manhattan (6 mins)',
        rating: 4.8
      },
      {
        name: 'PS 84 Jose De Diego',
        category: 'school',
        lat: 40.7135,
        lng: -73.9578,
        walkMinutes: 5,
        distanceMeters: 410,
        description: 'Progressive immersion school with community greenhouse',
        rating: 4.8
      },
      {
        name: 'Partners Coffee Roasters',
        category: 'cafe',
        lat: 40.7179,
        lng: -73.9602,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Pioneering Brooklyn specialty roaster with warm atmosphere',
        rating: 4.9
      },
      {
        name: 'Domino Park',
        category: 'park',
        lat: 40.7145,
        lng: -73.9678,
        walkMinutes: 3,
        distanceMeters: 250,
        description: 'Modern 6-acre river park with elevated catwalk and bocce courts',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Claire Montgomery',
      agency: 'Compass West Village',
      quote: 'The North Williamsburg waterfront offers seamless Manhattan access via both the L train and NYC Ferry.'
    },
    hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Park Slope',
    subLoc: 'Prospect Park West & 3rd St',
    exactLat: 40.6725,
    exactLng: -73.9745,
    street: '112 8th Ave',
    title: 'Stately Limestone Residence Overlooking Prospect Park',
    price: 2950000,
    beds: 4,
    baths: 3,
    sqft: 2450,
    type: 'Single Family',
    vibe: 'family-friendly',
    vibeLabel: 'Prospect Park Haven & Stroller Boulevard',
    vibeTags: ['ProspectPark', 'TopPublicSchools', 'WideSidewalks', 'FoodCoop'],
    vibeDesc: 'Wide tree-shaded sidewalks, limestone facades, organic food cooperatives, and a 2-minute stroll to the Prospect Park meadow.',
    school: {
      name: 'PS 321 William Penn School',
      type: 'Elementary',
      rating: 9.7,
      distanceWalkMins: 3,
      district: 'NYC District 15',
      highlights: ['State Assessment Benchmark', 'Renowned Literacy Program', 'Chamber Music & Arts'],
      lat: 40.6718,
      lng: -73.9772,
      address: '180 7th Ave, Brooklyn, NY'
    },
    transit: {
      name: '7th Ave Station (B/Q Express Lines)',
      lat: 40.6775,
      lng: -73.9725,
      walkMins: 4,
      address: 'Flatbush Ave & 7th Ave'
    },
    pois: [
      {
        name: '7th Ave (B/Q) Station',
        category: 'transit',
        lat: 40.6775,
        lng: -73.9725,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Direct Midtown express subways arriving at 34th St Herald Sq in 18 mins',
        rating: 4.8
      },
      {
        name: 'PS 321 William Penn',
        category: 'school',
        lat: 40.6718,
        lng: -73.9772,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'One of the most acclaimed public elementary schools in the United States',
        rating: 4.9
      },
      {
        name: 'Colson Patisserie',
        category: 'cafe',
        lat: 40.6698,
        lng: -73.9802,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Belgian artisan bakery with signature waffles and organic espresso',
        rating: 4.9
      },
      {
        name: 'Prospect Park (Long Meadow)',
        category: 'park',
        lat: 40.6685,
        lng: -73.9712,
        walkMinutes: 2,
        distanceMeters: 170,
        description: '585-acre Olmsted masterpiece with zoo, botanical gardens, and dog beach',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Julian Vance',
      agency: 'Sotheby’s International Realty NYC',
      quote: 'Park Slope is New York’s gold standard for family living: unmatched public schools and Prospect Park at your front doorstep.'
    },
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Upper West Side',
    subLoc: 'West End Ave & 79th St',
    exactLat: 40.7851,
    exactLng: -73.9822,
    street: '345 West End Ave',
    title: 'Pre-War Classic Six with High Ceilings & French Doors',
    price: 2650000,
    beds: 3,
    baths: 3,
    sqft: 2050,
    type: 'Condominium',
    vibe: 'family-friendly',
    vibeLabel: 'Between Two Great Parks & Cultural Hub',
    vibeTags: ['CentralPark', 'RiversidePark', 'Subway1_2_3', 'PreWarElegance'],
    vibeDesc: 'Positioned gracefully between Riverside Park and Central Park, renowned museums, historic bakeries, and express subway trunk lines.',
    school: {
      name: 'The Anderson School (PS 334)',
      type: 'K-8',
      rating: 9.8,
      distanceWalkMins: 5,
      district: 'NYC Citywide Gifted & Talented',
      highlights: ['State-leading Math & Science', 'Music Conservatory Program', 'Championship Chess'],
      lat: 40.7818,
      lng: -73.9782,
      address: '100 W 77th St, New York, NY'
    },
    transit: {
      name: '79th St Subway Station (1 Train)',
      lat: 40.7838,
      lng: -73.9808,
      walkMins: 2,
      address: 'Broadway & W 79th St'
    },
    pois: [
      {
        name: '79th St (1) Subway Station',
        category: 'transit',
        lat: 40.7838,
        lng: -73.9808,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Direct Broadway subway line to Columbus Circle (5 mins) and Times Square (9 mins)',
        rating: 4.8
      },
      {
        name: 'The Anderson School (PS 334)',
        category: 'school',
        lat: 40.7818,
        lng: -73.9782,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Elite citywide gifted and talented school',
        rating: 4.9
      },
      {
        name: 'Zabar’s Epicurean Marketplace',
        category: 'grocery',
        lat: 40.7842,
        lng: -73.9798,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Legendary gourmet provisions, freshly roasted coffee, and artisan cheeses',
        rating: 4.9
      },
      {
        name: 'Riverside Park Promenade',
        category: 'park',
        lat: 40.7865,
        lng: -73.9855,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Hudson riverfront park with shaded cherry tree walks and playgrounds',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'David Chen',
      agency: 'Metropolitan Luxury Properties',
      quote: 'The Upper West Side combines timeless architectural proportion with seamless access to Central Park.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Chelsea',
    subLoc: 'The High Line & Gallery District',
    exactLat: 40.7465,
    exactLng: -74.0012,
    street: '520 W 22nd St',
    title: 'Architectural Gallery Loft with Sunset Terrace',
    price: 2750000,
    beds: 2,
    baths: 2,
    sqft: 1650,
    type: 'Modern Loft',
    vibe: 'transit-connected',
    vibeLabel: 'High Line Arts & Architectural Innovation',
    vibeTags: ['HighLineSteps', 'ChelseaMarket', 'GalleryDistrict', 'HudsonRiverPark'],
    vibeDesc: 'Overlooking contemporary art galleries and the High Line linear park, with floor-to-ceiling casement windows and private elevator.',
    school: {
      name: 'PS 11 William T. Harris',
      type: 'Elementary',
      rating: 9.3,
      distanceWalkMins: 4,
      district: 'NYC District 2',
      highlights: ['Visual & Performing Arts', 'Technology Integration', 'Active Community Garden'],
      lat: 40.7445,
      lng: -73.9985,
      address: '320 W 21st St, New York, NY'
    },
    transit: {
      name: '23rd St Subway Station (C/E Lines)',
      lat: 40.7459,
      lng: -73.9981,
      walkMins: 3,
      address: '8th Ave & W 23rd St'
    },
    pois: [
      {
        name: '23rd St (C/E) Subway',
        category: 'transit',
        lat: 40.7459,
        lng: -73.9981,
        walkMinutes: 3,
        distanceMeters: 260,
        description: '8th Ave line connecting to Penn Station (3 mins) and Port Authority',
        rating: 4.8
      },
      {
        name: 'PS 11 William T. Harris',
        category: 'school',
        lat: 40.7445,
        lng: -73.9985,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Comprehensive arts-focused community school',
        rating: 4.8
      },
      {
        name: 'Chelsea Market & Food Hall',
        category: 'cafe',
        lat: 40.7424,
        lng: -74.0062,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Historic biscuit factory turned global artisan food hall',
        rating: 4.9
      },
      {
        name: 'The High Line (23rd St Entrance)',
        category: 'park',
        lat: 40.7475,
        lng: -74.0048,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'World-renowned elevated linear garden with public sculpture',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'David Chen',
      agency: 'Metropolitan Luxury Properties',
      quote: 'Chelsea places you at the crossroads of world-class contemporary art and easy Midtown transit links.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Greenwich Village',
    subLoc: 'Washington Square Park & MacDougal Alley',
    exactLat: 40.7322,
    exactLng: -73.9975,
    street: '18 Washington Square N',
    title: 'Historic Greek Revival Residence on the Square',
    price: 3350000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    type: 'Townhome',
    vibe: 'historic-charming',
    vibeLabel: 'Literary Heritage & Washington Square Promenade',
    vibeTags: ['WashingtonSquarePark', 'SubwayTrunkLines', 'LiteraryHeritage', 'TreeLined'],
    vibeDesc: 'Facing Washington Square Park, boasting original 1830s plaster moldings, working wood-burning fireplaces, and quiet courtyard garden.',
    school: {
      name: 'PS 3 Charrette School',
      type: 'Elementary',
      rating: 9.4,
      distanceWalkMins: 5,
      district: 'NYC District 2',
      highlights: ['Child-Centered Philosophy', 'Studio Art & Music', 'Diverse Inclusive Community'],
      lat: 40.7328,
      lng: -74.0055,
      address: '490 Hudson St, New York, NY'
    },
    transit: {
      name: 'W 4th St - Washington Sq Station (A/C/E/B/D/F/M)',
      lat: 40.7312,
      lng: -74.0008,
      walkMins: 2,
      address: '6th Ave & W 4th St'
    },
    pois: [
      {
        name: 'W 4th St Transit Hub',
        category: 'transit',
        lat: 40.7312,
        lng: -74.0008,
        walkMinutes: 2,
        distanceMeters: 190,
        description: 'Major 7-line express subway junction with instantaneous service uptown/downtown',
        rating: 4.9
      },
      {
        name: 'PS 3 Charrette School',
        category: 'school',
        lat: 40.7328,
        lng: -74.0055,
        walkMinutes: 5,
        distanceMeters: 390,
        description: 'Progressive Greenwich Village elementary school',
        rating: 4.8
      },
      {
        name: 'Caffe Reggio',
        category: 'cafe',
        lat: 40.7302,
        lng: -74.0001,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Historic 1927 coffee house that introduced original espresso to NYC',
        rating: 4.8
      },
      {
        name: 'Washington Square Park',
        category: 'park',
        lat: 40.7308,
        lng: -73.9973,
        walkMinutes: 1,
        distanceMeters: 80,
        description: 'Iconic marble arch, fountain plaza, live acoustic music, and historic shade trees',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Claire Montgomery',
      agency: 'Compass West Village',
      quote: 'Living on Washington Square North is owning a piece of genuine American cultural and architectural history.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];
