/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnclaveConfig } from './globalCandidatePools';

export const TOKYO_ENCLAVES: EnclaveConfig[] = [
  {
    name: 'Daikanyama',
    subLoc: 'T-Site & Kyu Asakura House',
    exactLat: 35.6485,
    exactLng: 139.7025,
    street: '17-5 Sarugakucho, Shibuya',
    title: 'Minimalist Architectural Residence in Green Hill',
    price: 185000000,
    beds: 3,
    baths: 2,
    sqft: 1480,
    type: 'Modern Loft',
    vibe: 'artisan-foodie',
    vibeLabel: 'Leafy Hillside, Tsutaya T-Site & Artisan Bakeries',
    vibeTags: ['TokyuToyokoLine', 'TSiteDaikanyama', 'QuietHillside', 'BoutiqueDesign'],
    vibeDesc: 'Known as the Beverly Hills of Tokyo, surrounded by modernist low-rise architecture, lush green gardens, artisanal patisseries, and independent design labels.',
    school: {
      name: 'The British School in Tokyo (Shibuya Campus)',
      type: 'Private',
      rating: 9.8,
      distanceWalkMins: 6,
      district: 'International Baccalaureate',
      highlights: ['British National Curriculum', 'Dual-Campus Innovation', 'Oxford/Cambridge Pathway'],
      lat: 35.6565,
      lng: 139.7032,
      address: '1-21-18 Shibuya, Tokyo'
    },
    transit: {
      name: 'Daikanyama Station (Tokyu Toyoko Line)',
      lat: 35.6482,
      lng: 139.7035,
      walkMins: 2,
      address: 'Daikanyamacho, Shibuya-ku, Tokyo'
    },
    pois: [
      {
        name: 'Daikanyama Station (Toyoko Line)',
        category: 'transit',
        lat: 35.6482,
        lng: 139.7035,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'One stop to Shibuya station with through-service to Fukutoshin Line',
        rating: 4.9
      },
      {
        name: 'The British School in Tokyo',
        category: 'school',
        lat: 35.6565,
        lng: 139.7032,
        walkMinutes: 6,
        distanceMeters: 450,
        description: 'Prestigious British international curriculum school',
        rating: 4.9
      },
      {
        name: 'Daikanyama T-Site & Ivy Place',
        category: 'cafe',
        lat: 35.6492,
        lng: 139.6998,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'World-famous bookstore complex, specialty bakery, and open terrace dining',
        rating: 5.0
      },
      {
        name: 'Saigoyama Park',
        category: 'park',
        lat: 35.6515,
        lng: 139.6955,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Elevated green park offering vistas of Mt. Fuji on clear winter mornings',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Daikanyama provides Tokyo’s most civilized residential ambiance: low-rise luxury and immediate Shibuya proximity.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Nakameguro',
    subLoc: 'Meguro River Promenade & Cherry Canopies',
    exactLat: 35.6442,
    exactLng: 139.6988,
    street: '2-12 Kamimeguro, Meguro-ku',
    title: 'Riverfront Terrace Residence along the Meguro River',
    price: 165000000,
    beds: 3,
    baths: 2,
    sqft: 1350,
    type: 'Condominium',
    vibe: 'quiet-scenic',
    vibeLabel: 'Canalside Cherry Blossoms, Third-Wave Cafes & Hibiya Line',
    vibeTags: ['MeguroRiverCanal', 'HibiyaLineMetro', 'CherryBlossoms', 'ArtisanRoasters'],
    vibeDesc: 'Idyllic residence directly overlooking the Meguro River cherry trees, a few minutes’ walk to riverside craft espresso shops and the Hibiya Line metro.',
    school: {
      name: 'Meguro International Preschool & Academy',
      type: 'Elementary',
      rating: 9.5,
      distanceWalkMins: 4,
      district: 'Meguro Ward',
      highlights: ['Reggio Emilia Approach', 'Japanese & English Bilingualism', 'Nature Focus'],
      lat: 35.6415,
      lng: 139.6965,
      address: '3-8-4 Nakameguro, Meguro-ku'
    },
    transit: {
      name: 'Nakameguro Station (Hibiya Line & Toyoko Line)',
      lat: 35.6445,
      lng: 139.6985,
      walkMins: 2,
      address: 'Kamimeguro 3-chome'
    },
    pois: [
      {
        name: 'Nakameguro Station Hub',
        category: 'transit',
        lat: 35.6445,
        lng: 139.6985,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Terminal of Tokyo Metro Hibiya Line (direct to Roppongi, Ginza) and Toyoko Line',
        rating: 4.9
      },
      {
        name: 'Meguro Academy',
        category: 'school',
        lat: 35.6415,
        lng: 139.6965,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Bilingual international school with lush play garden',
        rating: 4.8
      },
      {
        name: 'Starbucks Reserve Roastery Tokyo',
        category: 'cafe',
        lat: 35.6492,
        lng: 139.6925,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Kengo Kuma designed four-story architectural masterpiece along the river',
        rating: 4.9
      },
      {
        name: 'Meguro River Cherry Blossom Esplanade',
        category: 'park',
        lat: 35.6438,
        lng: 139.6995,
        walkMinutes: 1,
        distanceMeters: 50,
        description: 'Iconic 3.8 km waterside walking corridor flanked by 800 cherry trees',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Nakameguro offers Tokyo’s most romantic waterside lifestyle with immediate Hibiya Line trains into Roppongi.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Kichijoji',
    subLoc: 'Inokashira Park & Sun Road',
    exactLat: 35.7022,
    exactLng: 139.5802,
    street: '1-8 Kichijoji Minamicho',
    title: 'Modern Detached Residence by Inokashira Lake',
    price: 148000000,
    beds: 4,
    baths: 2,
    sqft: 1650,
    type: 'Single Family',
    vibe: 'family-friendly',
    vibeLabel: 'Inokashira Swan Lake, Green Woodland & Chuo Rapid',
    vibeTags: ['InokashiraPark', 'JRChuoRapidLine', 'GhibliMuseum', 'HarmonicaYokocho'],
    vibeDesc: 'Consistently voted Tokyo’s most desirable neighborhood to live in: immense park with swan boats, historic retro alleyways, and 14-min rapid train to Shinjuku.',
    school: {
      name: 'Musashino Municipal Daini Elementary',
      type: 'Elementary',
      rating: 9.6,
      distanceWalkMins: 4,
      district: 'Musashino City',
      highlights: ['Green School Certified', 'Music Band Program', 'Model Public Education'],
      lat: 35.7045,
      lng: 139.5785,
      address: '2-13 Kichijoji Honcho'
    },
    transit: {
      name: 'Kichijoji Station (JR Chuo Rapid & Keio Inokashira Line)',
      lat: 35.7032,
      lng: 139.5798,
      walkMins: 3,
      address: 'Kichijoji Minamicho'
    },
    pois: [
      {
        name: 'Kichijoji Station',
        category: 'transit',
        lat: 35.7032,
        lng: 139.5798,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Chuo Line express to Shinjuku (14 mins) and Tokyo Station (28 mins)',
        rating: 4.9
      },
      {
        name: 'Musashino Daini School',
        category: 'school',
        lat: 35.7045,
        lng: 139.5785,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Exemplary public elementary in Musashino City',
        rating: 4.8
      },
      {
        name: 'Chai Break & Spiced Teahouse',
        category: 'cafe',
        lat: 35.7005,
        lng: 139.5788,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Morning masala chai, fresh muffins, and Inokashira park views',
        rating: 4.8
      },
      {
        name: 'Inokashira Onshi Park',
        category: 'park',
        lat: 35.6985,
        lng: 139.5755,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Celebrated public park with boating lake, zoo, ancient cedar trees, and Ghibli Museum',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Kichijoji is the undisputed champion of Tokyo living quality: magnificent green parkland and rapid rail.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Omotesando',
    subLoc: 'Zenkoji & Cat Street Promenade',
    exactLat: 35.6668,
    exactLng: 139.7095,
    street: '4-12 Jingumae, Shibuya-ku',
    title: 'Zelkova Boulevard Penthouse with Rooftop Zen Garden',
    price: 260000000,
    beds: 3,
    baths: 2,
    sqft: 1820,
    type: 'Modern Loft',
    vibe: 'vibrant-urban',
    vibeLabel: 'Zelkova Avenues, Architectural Boutiques & Meiji Shrine',
    vibeTags: ['ChiyodaGinzaMetro', 'OmotesandoHills', 'MeijiShrineForest', 'PritzkerArchitecture'],
    vibeDesc: 'Tokyo’s architectural runway: lined with majestic zelkova trees, Tadao Ando designs, and private residential cul-de-sacs bordering Meiji Shrine forest.',
    school: {
      name: 'Jingumae International Exchange School',
      type: 'Elementary',
      rating: 9.7,
      distanceWalkMins: 4,
      district: 'Shibuya Ward',
      highlights: ['Trilingual Language Track', 'STEAM Innovation Wing', 'Cultural Heritage'],
      lat: 35.6695,
      lng: 139.7075,
      address: '4-20 Jingumae, Shibuya'
    },
    transit: {
      name: 'Omotesando Station (Ginza, Chiyoda & Hanzomon Lines)',
      lat: 35.6652,
      lng: 139.7122,
      walkMins: 2,
      address: 'Kita-Aoyama 3-chome'
    },
    pois: [
      {
        name: 'Omotesando Station Hub',
        category: 'transit',
        lat: 35.6652,
        lng: 139.7122,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Cross-platform transfer across Ginza, Chiyoda, and Hanzomon metro trunk lines',
        rating: 4.9
      },
      {
        name: 'Jingumae International School',
        category: 'school',
        lat: 35.6695,
        lng: 139.7075,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Global exchange curriculum with innovative pedagogy',
        rating: 4.9
      },
      {
        name: 'Shozo Coffee Store & Bakery',
        category: 'cafe',
        lat: 35.6648,
        lng: 139.7135,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Charming wooden cabin coffee shop with fresh scones and hand dripped coffee',
        rating: 4.9
      },
      {
        name: 'Meiji Jingu Shrine & Yoyogi Park',
        category: 'park',
        lat: 35.6715,
        lng: 139.7015,
        walkMinutes: 6,
        distanceMeters: 480,
        description: '170 acres of sacred ancient evergreen forest and expansive civic lawns',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Omotesando represents Tokyo’s highest standard of architectural prestige and central convenience.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Ebisu',
    subLoc: 'Yebisu Garden Place & Hiroo Border',
    exactLat: 35.6465,
    exactLng: 139.7135,
    street: '4-20 Ebisu, Shibuya-ku',
    title: 'High-Floor Luxury Residence overlooking Yebisu Garden',
    price: 195000000,
    beds: 3,
    baths: 2,
    sqft: 1520,
    type: 'Condominium',
    vibe: 'transit-connected',
    vibeLabel: 'Epicurean Bistros, Yebisu Garden Place & Yamanote Line',
    vibeTags: ['JRYamanoteLine', 'YebisuGardenPlace', 'MichelinDining', 'YamanoteLoop'],
    vibeDesc: 'One of Tokyo’s premier dining districts, featuring European-style brick plazas, world-class gastronomy, and seamless Yamanote loop train access.',
    school: {
      name: 'Kakezuka Elementary School',
      type: 'Elementary',
      rating: 9.4,
      distanceWalkMins: 3,
      district: 'Shibuya Ward',
      highlights: ['Centennial Tradition', 'Active PTA Community', 'Advanced IT Classrooms'],
      lat: 35.6445,
      lng: 139.7145,
      address: '4-9-22 Ebisu, Shibuya'
    },
    transit: {
      name: 'Ebisu Station (JR Yamanote & Saikyo Lines)',
      lat: 35.6468,
      lng: 139.7102,
      walkMins: 3,
      address: 'Ebisu Minami 1-chome'
    },
    pois: [
      {
        name: 'Ebisu Station Hub',
        category: 'transit',
        lat: 35.6468,
        lng: 139.7102,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'JR Yamanote circular line + direct Shonan-Shinjuku and Saikyo express lines',
        rating: 4.9
      },
      {
        name: 'Kakezuka School',
        category: 'school',
        lat: 35.6445,
        lng: 139.7145,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Distinguished local school with over 100 years of academic history',
        rating: 4.8
      },
      {
        name: 'Sarutahiko Coffee Ebisu Flagship',
        category: 'cafe',
        lat: 35.6475,
        lng: 139.7092,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Renowned third-wave specialty roasters founded in Ebisu',
        rating: 4.9
      },
      {
        name: 'Yebisu Garden Place Central Square',
        category: 'park',
        lat: 35.6425,
        lng: 139.7138,
        walkMinutes: 3,
        distanceMeters: 250,
        description: 'European architectural promenade, chateau dining, and open courtyards',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Ebisu offers the ultimate blend of Yamanote Line commute ease and Tokyo’s top dining scene.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Roppongi Hills & Motoazabu',
    subLoc: 'Motoazabu Hills & Arisugawa Park',
    exactLat: 35.6555,
    exactLng: 139.7315,
    street: '1-3 Motoazabu, Minato-ku',
    title: 'Prestigious Azabu Hillside Villa with Tokyo Tower Views',
    price: 320000000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Diplomatic Enclave, Arisugawa Park & Tokyo Tower Views',
    vibeTags: ['TokyoTowerViews', 'ArisugawaPark', 'DiplomaticQuarter', 'NishiazabuDining'],
    vibeDesc: 'Tokyo’s most exclusive residential address: quiet hilltop streets lined with foreign embassies, Arisugawa park greenery, and panoramic views of Tokyo Tower.',
    school: {
      name: 'The American School in Japan (Early Learning Center)',
      type: 'Private',
      rating: 9.8,
      distanceWalkMins: 4,
      district: 'WASC Accredited',
      highlights: ['US College Prep', 'Play-Based Inquiry', 'Expansive Campus'],
      lat: 35.6535,
      lng: 139.7328,
      address: '6-16-5 Roppongi, Minato-ku'
    },
    transit: {
      name: 'Roppongi Station (Hibiya & Oedo Subway Lines)',
      lat: 35.6628,
      lng: 139.7312,
      walkMins: 5,
      address: 'Roppongi 6-chome'
    },
    pois: [
      {
        name: 'Roppongi Station',
        category: 'transit',
        lat: 35.6628,
        lng: 139.7312,
        walkMinutes: 5,
        distanceMeters: 410,
        description: 'Direct lines to Shinjuku, Ginza, and Kasumigaseki government center',
        rating: 4.8
      },
      {
        name: 'ASIJ Early Learning Center',
        category: 'school',
        lat: 35.6535,
        lng: 139.7328,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Elite American international school campus',
        rating: 4.9
      },
      {
        name: 'Buvette Tokyo & Bakery',
        category: 'cafe',
        lat: 35.6598,
        lng: 139.7295,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'European-style artisanal cafe and terrace in Roppongi Hills',
        rating: 4.8
      },
      {
        name: 'Arisugawa-no-miya Memorial Park',
        category: 'park',
        lat: 35.6522,
        lng: 139.7268,
        walkMinutes: 4,
        distanceMeters: 340,
        description: 'Historic hillside park with duck pond, waterfalls, and Tokyo Metropolitan Library',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Motoazabu is the pinnacle of quiet residential prestige in the heart of Tokyo.'
    },
    hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Shibuya Upper Shoto',
    subLoc: 'Shoto 1-chome & Nabeshima Shoto Park',
    exactLat: 35.6598,
    exactLng: 139.6912,
    street: '1-14 Shoto, Shibuya-ku',
    title: 'Architectural Gated Estate in Aristocratic Shoto',
    price: 290000000,
    beds: 4,
    baths: 3,
    sqft: 2300,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Gated Luxury Mansions, Nabeshima Park & Bunkamura',
    vibeTags: ['ShotoMansions', 'NabeshimaPark', 'BunkamuraArts', 'PrivateCourtyards'],
    vibeDesc: 'Historic enclave of large gated mansions, mature pine trees, Nabeshima water park, and the Bunkamura arts complex, just 8 mins from Shibuya station.',
    school: {
      name: 'Shoto Junior High & Elementary Academy',
      type: 'K-8',
      rating: 9.6,
      distanceWalkMins: 4,
      district: 'Shibuya Ward',
      highlights: ['Art Education Leader', 'Elite High School Progression', 'Small Class Sizes'],
      lat: 35.6612,
      lng: 139.6895,
      address: '1-20-4 Shoto, Shibuya'
    },
    transit: {
      name: 'Shinya-Shibuya Station (JR, Tokyo Metro & Keio Lines)',
      lat: 35.6585,
      lng: 139.7015,
      walkMins: 7,
      address: 'Dogenzaka / Shibuya Crossing'
    },
    pois: [
      {
        name: 'Shibuya Station Junction',
        category: 'transit',
        lat: 35.6585,
        lng: 139.7015,
        walkMinutes: 7,
        distanceMeters: 550,
        description: 'World’s most connected multi-rail hub with 9 transit lines',
        rating: 4.9
      },
      {
        name: 'Shoto Academy',
        category: 'school',
        lat: 35.6612,
        lng: 139.6895,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Elite neighborhood public school with high academic honors',
        rating: 4.8
      },
      {
        name: 'Shoto Cafe & Chiffon Bakery',
        category: 'cafe',
        lat: 35.6592,
        lng: 139.6925,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Famous toasted chiffon cake, single-origin coffees, and quiet salon',
        rating: 4.8
      },
      {
        name: 'Nabeshima Shoto Park',
        category: 'park',
        lat: 35.6625,
        lng: 139.6918,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Secluded former samurai estate park with spring-fed pond and watermill',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Shoto is Tokyo’s most aristocratic residential address, offering pure tranquility moments from Shibuya.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Minami-Aoyama',
    subLoc: 'Nezu Museum & Kotto-dori',
    exactLat: 35.6615,
    exactLng: 139.7185,
    street: '6-5 Minami-Aoyama, Minato-ku',
    title: 'Kengo Kuma Inspired Low-Rise Courtyard Residence',
    price: 245000000,
    beds: 3,
    baths: 2,
    sqft: 1680,
    type: 'Condominium',
    vibe: 'artisan-foodie',
    vibeLabel: 'Antique Avenues, Nezu Bamboo Gardens & Gourmet Bistros',
    vibeTags: ['NezuMuseum', 'KottoDori', 'QuietLuxury', 'AoyamaGourmet'],
    vibeDesc: 'Refined sanctuary on antique street Kotto-dori, directly bordering the bamboo gardens of the Nezu Museum and world-class patisseries.',
    school: {
      name: 'Aoyama Elementary School',
      type: 'Elementary',
      rating: 9.6,
      distanceWalkMins: 4,
      district: 'Minato Ward',
      highlights: ['Japanese Tea Ceremony & Arts', 'Bilingual English Program', 'Historic Campus'],
      lat: 35.6645,
      lng: 139.7212,
      address: '2-21-27 Kita-Aoyama'
    },
    transit: {
      name: 'Omotesando / Aoyama-Itchome Metro Station',
      lat: 35.6652,
      lng: 139.7122,
      walkMins: 4,
      address: 'Minato-ku, Tokyo'
    },
    pois: [
      {
        name: 'Omotesando Station',
        category: 'transit',
        lat: 35.6652,
        lng: 139.7122,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Triple line subway hub connecting to Ginza and Otemachi business districts',
        rating: 4.9
      },
      {
        name: 'Aoyama Elementary',
        category: 'school',
        lat: 35.6645,
        lng: 139.7212,
        walkMinutes: 4,
        distanceMeters: 330,
        description: 'One of Minato Ward’s flagship public schools',
        rating: 4.8
      },
      {
        name: 'Pierre Hermé Paris Aoyama',
        category: 'cafe',
        lat: 35.6635,
        lng: 139.7145,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Flagship boutique with seasonal haute patisserie and chocolate bar',
        rating: 4.9
      },
      {
        name: 'Nezu Museum Traditional Japanese Garden',
        category: 'park',
        lat: 35.6625,
        lng: 139.7198,
        walkMinutes: 2,
        distanceMeters: 120,
        description: '17,000 sq m traditional stroll garden with teahouses, moss paths, and streams',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Kenji Takahashi',
      agency: 'Tokyo Mori Living & Global',
      quote: 'Minami-Aoyama combines timeless Japanese garden aesthetic with the finest culinary addresses in the capital.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export const PARIS_ENCLAVES: EnclaveConfig[] = [
  {
    name: 'Le Marais',
    subLoc: 'Place des Vosges & Rue des Francs-Bourgeois',
    exactLat: 48.8555,
    exactLng: 2.3655,
    street: '14 Place des Vosges, 4e',
    title: 'Hôtel Particulier Apartment with Soaring Stone Arches',
    price: 2350000,
    beds: 3,
    baths: 2,
    sqft: 1550,
    type: 'Townhome',
    vibe: 'artisan-foodie',
    vibeLabel: 'Royal Arcades, Art Galleries & Historic Courtyards',
    vibeTags: ['PlaceDesVosges', 'MetroSaintPaul', 'ArtisanBoulangeries', 'HistoricMarais'],
    vibeDesc: 'Directly overlooking the 17th-century brick-and-limestone pavilions of Place des Vosges, original Versailles parquet floors, and private cobbled courtyard.',
    school: {
      name: 'École Élémentaire Publique Neuve-Saint-Pierre',
      type: 'Elementary',
      rating: 9.5,
      distanceWalkMins: 4,
      district: 'Académie de Paris (4e)',
      highlights: ['Art History & Architecture', 'Active Parent Association', 'Bilingual Support'],
      lat: 48.8535,
      lng: 2.3638,
      address: '9 Rue Neuve-Saint-Pierre, 75004'
    },
    transit: {
      name: 'Saint-Paul Metro Station (Line 1)',
      lat: 48.8552,
      lng: 2.3598,
      walkMins: 3,
      address: 'Rue de Rivoli, 75004'
    },
    pois: [
      {
        name: 'Saint-Paul (Ligne 1) Metro',
        category: 'transit',
        lat: 48.8552,
        lng: 2.3598,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Direct automated Line 1 through Châtelet, Louvre, Concorde, and La Défense',
        rating: 4.9
      },
      {
        name: 'École Neuve-Saint-Pierre',
        category: 'school',
        lat: 48.8535,
        lng: 2.3638,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Highly rated Marais elementary school',
        rating: 4.8
      },
      {
        name: 'Carette Place des Vosges',
        category: 'cafe',
        lat: 48.8562,
        lng: 2.3648,
        walkMinutes: 1,
        distanceMeters: 80,
        description: 'Legendary thick hot chocolate, fresh raspberry macarons, and vaulted terrace',
        rating: 4.9
      },
      {
        name: 'Place des Vosges Square',
        category: 'park',
        lat: 48.8556,
        lng: 2.3656,
        walkMinutes: 1,
        distanceMeters: 50,
        description: 'Oldest planned square in Paris with linden trees, central fountains, and shaded lawns',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Living on Place des Vosges is waking up inside the architectural heart of European Renaissance history.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Saint-Germain-des-Prés',
    subLoc: 'Rue de Seine & Jardin du Luxembourg',
    exactLat: 48.8535,
    exactLng: 2.3355,
    street: '26 Rue de Seine, 6e',
    title: 'Haussmannian Noble Floor with Wrought-Iron Balconies',
    price: 2950000,
    beds: 3,
    baths: 3,
    sqft: 1850,
    type: 'Townhome',
    vibe: 'historic-charming',
    vibeLabel: 'Literary Cafes, Luxembourg Gardens & Antique Gallerists',
    vibeTags: ['JardinDuLuxembourg', 'CafeDeFlore', 'MetroSaintGermain', 'HaussmannianParquet'],
    vibeDesc: 'Classic 2e étage noble floor with 3.4-meter ceilings, marble fireplaces, Hungarian-point oak parquet, steps from Cafe de Flore and Luxembourg Gardens.',
    school: {
      name: 'École Alsacienne',
      type: 'Private',
      rating: 9.8,
      distanceWalkMins: 6,
      district: 'Académie de Paris (6e)',
      highlights: ['Elite French Baccalaureate', 'Bilingual English Section', 'Historic Intellectual Heritage'],
      lat: 48.8415,
      lng: 2.3325,
      address: '109 Rue Notre-Dame-des-Champs, 75006'
    },
    transit: {
      name: 'Saint-Germain-des-Prés Station (Line 4)',
      lat: 48.8538,
      lng: 2.3332,
      walkMins: 2,
      address: 'Boulevard Saint-Germain, 75006'
    },
    pois: [
      {
        name: 'Saint-Germain (Ligne 4) Metro',
        category: 'transit',
        lat: 48.8538,
        lng: 2.3332,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Direct Line 4 linking Montparnasse (5 mins), Châtelet (4 mins), and Gare du Nord',
        rating: 4.8
      },
      {
        name: 'École Alsacienne',
        category: 'school',
        lat: 48.8415,
        lng: 2.3325,
        walkMinutes: 6,
        distanceMeters: 460,
        description: 'France’s foremost independent humanist school',
        rating: 4.9
      },
      {
        name: 'Café de Flore & Les Deux Magots',
        category: 'cafe',
        lat: 48.8542,
        lng: 2.3328,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Legendary literary salon where Sartre, Beauvoir, and Hemingway wrote',
        rating: 4.8
      },
      {
        name: 'Jardin du Luxembourg',
        category: 'park',
        lat: 48.8462,
        lng: 2.3372,
        walkMinutes: 4,
        distanceMeters: 310,
        description: '55 acres of tree-lined promenades, Medici fountain, tennis courts, and vintage toy sailboats',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Saint-Germain-des-Prés remains the universal gold standard of Parisian intellectual elegance.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Canal Saint-Martin',
    subLoc: 'Quai de Valmy & Rue Bichat',
    exactLat: 48.8725,
    exactLng: 2.3645,
    street: '68 Quai de Jemmapes, 10e',
    title: 'Former Industrial Atelier Loft with Canal Balcony',
    price: 1650000,
    beds: 2,
    baths: 2,
    sqft: 1380,
    type: 'Modern Loft',
    vibe: 'vibrant-urban',
    vibeLabel: 'Canalside Iron Bridges, Natural Wine Bars & Sourdough Bakeries',
    vibeTags: ['CanalSaintMartin', 'MetroJacquesBonsergent', 'ArtisanCoffee', 'IronFootbridges'],
    vibeDesc: 'Spectacular glass-and-steel loft facing the canal and arched footbridges, surrounded by artisan coffee bars, organic markets, and waterside dining.',
    school: {
      name: 'École Élémentaire Récollets',
      type: 'Elementary',
      rating: 9.3,
      distanceWalkMins: 3,
      district: 'Académie de Paris (10e)',
      highlights: ['Visual Arts Studio', 'Green School Initiative', 'Inclusive Pedagogical Team'],
      lat: 48.8745,
      lng: 2.3618,
      address: '19 Rue des Récollets, 75010'
    },
    transit: {
      name: 'Jacques Bonsergent Metro Station (Line 5)',
      lat: 48.8712,
      lng: 2.3605,
      walkMins: 3,
      address: 'Boulevard de Magenta, 75010'
    },
    pois: [
      {
        name: 'Jacques Bonsergent Metro',
        category: 'transit',
        lat: 48.8712,
        lng: 2.3605,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Line 5 directly to Gare du Nord (2 mins) and Bastille (6 mins)',
        rating: 4.8
      },
      {
        name: 'École Récollets',
        category: 'school',
        lat: 48.8745,
        lng: 2.3618,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Creative canal community school',
        rating: 4.7
      },
      {
        name: 'Du Pain et des Idées',
        category: 'cafe',
        lat: 48.8718,
        lng: 2.3622,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Historic 1875 boulangerie famous for the Escargot Chocolat Pistache',
        rating: 5.0
      },
      {
        name: 'Canal Saint-Martin Promenade & Shaded Quays',
        category: 'park',
        lat: 48.8722,
        lng: 2.3648,
        walkMinutes: 1,
        distanceMeters: 50,
        description: 'Shaded waterside quays, century-old chestnut trees, and arched iron footbridges',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Canal Saint-Martin is Paris’s most creative and lively neighborhood for contemporary loft living.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Passy & Trocadéro',
    subLoc: 'Rue de Passy & Jardins du Ranelagh',
    exactLat: 48.8585,
    exactLng: 2.2785,
    street: '32 Rue de l’Annonciation, 16e',
    title: 'Prestigious Family Residence by Ranelagh Gardens',
    price: 2650000,
    beds: 4,
    baths: 3,
    sqft: 2100,
    type: 'Townhome',
    vibe: 'family-friendly',
    vibeLabel: 'Village de Passy, Elite Lycées & Eiffel Tower Vistas',
    vibeTags: ['JardinDuRanelagh', 'MetroPassy', 'LycéeJansonDeSailly', 'FamilyElegance'],
    vibeDesc: 'Pedestrian cobblestone market street, refined village atmosphere, walking distance to Paris’s top public lycées and the gardens of Trocadéro.',
    school: {
      name: 'Lycée Janson-de-Sailly',
      type: 'K-8',
      rating: 9.7,
      distanceWalkMins: 5,
      district: 'Académie de Paris (16e)',
      highlights: ['Prepa Grandes Écoles Leader', 'International Section', 'Olympic-standard Sports'],
      lat: 48.8645,
      lng: 2.2795,
      address: '106 Rue de la Pompe, 75116'
    },
    transit: {
      name: 'Passy Metro Station (Line 6)',
      lat: 48.8575,
      lng: 2.2805,
      walkMins: 2,
      address: 'Rue de l’Alboni, 75016'
    },
    pois: [
      {
        name: 'Passy (Ligne 6) Metro',
        category: 'transit',
        lat: 48.8575,
        lng: 2.2805,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Viaduct metro line crossing the Seine with unforgettable Eiffel Tower panorama',
        rating: 4.9
      },
      {
        name: 'Lycée Janson-de-Sailly',
        category: 'school',
        lat: 48.8645,
        lng: 2.2795,
        walkMinutes: 5,
        distanceMeters: 390,
        description: 'One of the most prestigious academic institutions in France',
        rating: 4.9
      },
      {
        name: 'Aux Merveilleux de Fred - Passy',
        category: 'cafe',
        lat: 48.8582,
        lng: 2.2792,
        walkMinutes: 2,
        distanceMeters: 130,
        description: 'Artisanal brioches, speculoos meringues, and espresso on market street',
        rating: 4.9
      },
      {
        name: 'Jardin du Ranelagh',
        category: 'park',
        lat: 48.8565,
        lng: 2.2715,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'English-style park with historic carousel, puppet theatre, and centuries-old trees',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Passy delivers the quintessential high-bourgeois family lifestyle: top schools, green parks, and safety.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Montmartre',
    subLoc: 'Place du Tertre & Vignes de Montmartre',
    exactLat: 48.8875,
    exactLng: 2.3415,
    street: '18 Rue de l’Abreuvoir, 18e',
    title: 'Picturesque Artist Maisonette with Sacré-Cœur Panorama',
    price: 1850000,
    beds: 3,
    baths: 2,
    sqft: 1420,
    type: 'Single Family',
    vibe: 'historic-charming',
    vibeLabel: 'Cobblestone Stairs, Vineyard Vistas & Sacré-Cœur',
    vibeTags: ['SacreCoeurViews', 'RueDeLAbreuvoir', 'MetroLamarck', 'ArtisticHeritage'],
    vibeDesc: 'Often celebrated as Paris’s most charming street: ivy-draped stone facade overlooking the historic hillside vineyard and Sacré-Cœur basilica dome.',
    school: {
      name: 'École Élémentaire Mont Cenis',
      type: 'Elementary',
      rating: 9.3,
      distanceWalkMins: 4,
      district: 'Académie de Paris (18e)',
      highlights: ['Outdoor Cultural Walks', 'Music Academy Partnerships', 'Welcoming Neighborhood'],
      lat: 48.8895,
      lng: 2.3435,
      address: '27 Rue du Mont Cenis'
    },
    transit: {
      name: 'Lamarck - Caulaincourt Metro Station (Line 12)',
      lat: 48.8898,
      lng: 2.3388,
      walkMins: 3,
      address: 'Rue Lamarck, 75018'
    },
    pois: [
      {
        name: 'Lamarck - Caulaincourt Metro',
        category: 'transit',
        lat: 48.8898,
        lng: 2.3388,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Line 12 connecting to Saint-Lazare (8 mins) and Concorde (12 mins)',
        rating: 4.8
      },
      {
        name: 'École Mont Cenis',
        category: 'school',
        lat: 48.8895,
        lng: 2.3435,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Charming hillside elementary school',
        rating: 4.7
      },
      {
        name: 'La Maison Rose Cafe',
        category: 'cafe',
        lat: 48.8872,
        lng: 2.3402,
        walkMinutes: 1,
        distanceMeters: 70,
        description: 'Iconic pink-stucco corner bistrot visited by Picasso and Modigliani',
        rating: 4.8
      },
      {
        name: 'Square Marcel-Bleustein-Blanchet',
        category: 'park',
        lat: 48.8878,
        lng: 2.3442,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Terraced park with wisteria pergolas directly facing the back of Sacré-Cœur',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Montmartre has preserved its authentic village spirit perched high above the rest of Paris.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Batignolles',
    subLoc: 'Square des Batignolles & Parc Martin Luther King',
    exactLat: 48.8885,
    exactLng: 2.3165,
    street: '45 Rue des Dames, 17e',
    title: 'Contemporary Sustainable Residence by the Eco-Park',
    price: 1780000,
    beds: 3,
    baths: 2,
    sqft: 1420,
    type: 'Condominium',
    vibe: 'family-friendly',
    vibeLabel: 'Eco-District, Organic Farmers Markets & Metro 14',
    vibeTags: ['Metro14Automated', 'ParcMartinLutherKing', 'MarcheBio', 'FamilyFriendly'],
    vibeDesc: 'One of the most family-friendly enclaves in Paris: historic 19th-century village square on one side, 10-hectare modern sustainable eco-park and rapid Metro 14 on the other.',
    school: {
      name: 'École Élémentaire Brochant',
      type: 'Elementary',
      rating: 9.4,
      distanceWalkMins: 3,
      district: 'Académie de Paris (17e)',
      highlights: ['Robotics & Digital Lab', 'Active Arts Workshops', 'Multilingual Environment'],
      lat: 48.8912,
      lng: 2.3188,
      address: '28 Rue Brochant, 75017'
    },
    transit: {
      name: 'Pont Cardinet Station (Metro 14 & Transilien L)',
      lat: 48.8872,
      lng: 2.3135,
      walkMins: 3,
      address: 'Rue Cardinet, 75017'
    },
    pois: [
      {
        name: 'Pont Cardinet (Ligne 14 Express)',
        category: 'transit',
        lat: 48.8872,
        lng: 2.3135,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Automated Line 14 reaching Madeleine (4 mins), Châtelet (7 mins), and Gare de Lyon (11 mins)',
        rating: 4.9
      },
      {
        name: 'École Brochant',
        category: 'school',
        lat: 48.8912,
        lng: 2.3188,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Modern public school in the heart of Batignolles',
        rating: 4.8
      },
      {
        name: 'Dose Dealer de Cafe',
        category: 'cafe',
        lat: 48.8868,
        lng: 2.3195,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Specialty micro-roaster, avocado toast, and sunny terrace',
        rating: 4.8
      },
      {
        name: 'Parc Clichy-Batignolles Martin Luther King',
        category: 'park',
        lat: 48.8925,
        lng: 2.3145,
        walkMinutes: 3,
        distanceMeters: 250,
        description: '25-acre modern eco-park with reed beds, skateparks, and vast play lawns',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Batignolles represents modern Paris at its best: eco-parks, top markets, and rapid Line 14.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Bastille & Faubourg Saint-Antoine',
    subLoc: 'Cour Damoye & Port de l’Arsenal',
    exactLat: 48.8525,
    exactLng: 2.3712,
    street: '12 Cour Damoye, 11e',
    title: 'Secret Cobblestone Courtyard Loft with Terrace',
    price: 1950000,
    beds: 3,
    baths: 2,
    sqft: 1540,
    type: 'Modern Loft',
    vibe: 'transit-connected',
    vibeLabel: 'Historic Cabinetmaker Courtyards & Port de l’Arsenal Marina',
    vibeTags: ['CourDamoye', 'PortDeLArsenal', 'MetroBastilleHub', 'ArtisanGuilds'],
    vibeDesc: 'Hidden behind carriage doors in the 18th-century Cour Damoye: peaceful cobblestone alley lined with craftsmen workshops, ivy, and sunlit artist lofts.',
    school: {
      name: 'École Élémentaire Keller',
      type: 'Elementary',
      rating: 9.3,
      distanceWalkMins: 4,
      district: 'Académie de Paris (11e)',
      highlights: ['Creative Workshops', 'Multidisciplinary Library', 'High Parent Engagement'],
      lat: 48.8545,
      lng: 2.3735,
      address: '15 Rue Keller, 75011'
    },
    transit: {
      name: 'Bastille Metro Hub (Lines 1, 5 & 8)',
      lat: 48.8532,
      lng: 2.3695,
      walkMins: 2,
      address: 'Place de la Bastille, 75011'
    },
    pois: [
      {
        name: 'Bastille Station Junction',
        category: 'transit',
        lat: 48.8532,
        lng: 2.3695,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Major triple-line subway junction (Lines 1, 5, 8) spanning the city in minutes',
        rating: 4.8
      },
      {
        name: 'École Keller',
        category: 'school',
        lat: 48.8545,
        lng: 2.3735,
        walkMinutes: 4,
        distanceMeters: 280,
        description: 'Dynamic neighborhood school near artisan studios',
        rating: 4.7
      },
      {
        name: 'Ten Belles Bread Bakery & Coffee',
        category: 'cafe',
        lat: 48.8548,
        lng: 2.3708,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Sourdough bakery, savory focaccia, and specialty roasted espresso',
        rating: 4.9
      },
      {
        name: 'Port de l’Arsenal Marina & Gardens',
        category: 'park',
        lat: 48.8505,
        lng: 2.3678,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Pleasure boat harbor connecting Seine to canals with rose pergolas and lawns',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Cour Damoye is an authentic secret sanctuary right in the pulsating heart of Paris.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Latin Quarter',
    subLoc: 'Panthéon & Rue Mouffetard',
    exactLat: 48.8465,
    exactLng: 2.3485,
    street: '15 Rue de l’Estrapade, 5e',
    title: 'Historic Stone Residence overlooking Place de l’Estrapade',
    price: 2450000,
    beds: 3,
    baths: 2,
    sqft: 1620,
    type: 'Townhome',
    vibe: 'historic-charming',
    vibeLabel: 'Scholarly Heritage, Sorbonne & Rue Mouffetard Market',
    vibeTags: ['PantheonSquare', 'RueMouffetard', 'MetroCardinalLemoine', 'JardinDesPlantes'],
    vibeDesc: 'Picturesque square famous for its stone fountain, minutes from the Panthéon dome, the historic Sorbonne university, and Rue Mouffetard open market.',
    school: {
      name: 'Lycée Henri-IV',
      type: 'K-8',
      rating: 9.9,
      distanceWalkMins: 3,
      district: 'Académie de Paris (5e)',
      highlights: ['France’s Top Academic Ranking', 'Historic Cloister Campus', 'Exceptional Science & Humanities'],
      lat: 48.8458,
      lng: 2.3482,
      address: '23 Rue Clovis, 75005'
    },
    transit: {
      name: 'Cardinal Lemoine Station (Line 10)',
      lat: 48.8475,
      lng: 2.3512,
      walkMins: 3,
      address: 'Rue Monge, 75005'
    },
    pois: [
      {
        name: 'Cardinal Lemoine Metro',
        category: 'transit',
        lat: 48.8475,
        lng: 2.3512,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Line 10 connecting across the Left Bank directly to Sèvres-Babylone',
        rating: 4.8
      },
      {
        name: 'Lycée Henri-IV',
        category: 'school',
        lat: 48.8458,
        lng: 2.3482,
        walkMinutes: 3,
        distanceMeters: 180,
        description: 'One of the most prestigious and demanding lycées in France',
        rating: 5.0
      },
      {
        name: 'Boulangerie Moderne Mouffetard',
        category: 'cafe',
        lat: 48.8462,
        lng: 2.3495,
        walkMinutes: 2,
        distanceMeters: 120,
        description: 'Artisanal pain au chocolat, fresh baguettes, and outdoor terrace on the square',
        rating: 4.9
      },
      {
        name: 'Jardin des Plantes & Arènes de Lutèce',
        category: 'park',
        lat: 48.8435,
        lng: 2.3565,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Historic Roman amphitheater ruins and 70-acre national botanical gardens',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Camille Delacroix',
      agency: 'Daniel Féau Marais & Rive Gauche',
      quote: 'Living by Place de l’Estrapade gives access to France’s finest educational institutions.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];
