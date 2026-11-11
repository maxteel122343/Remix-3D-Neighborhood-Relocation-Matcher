/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnclaveConfig } from './globalCandidatePools';

export const LONDON_ENCLAVES: EnclaveConfig[] = [
  {
    name: 'Notting Hill',
    subLoc: 'Westbourne Grove & Portobello Road',
    exactLat: 51.5160,
    exactLng: -0.2050,
    street: '42 Westbourne Grove',
    title: 'Victorian Stucco Villa with Private Garden Access',
    price: 2450000,
    beds: 3,
    baths: 2,
    sqft: 1780,
    type: 'Townhome',
    vibe: 'artisan-foodie',
    vibeLabel: 'Pastel Facades, Artisan Boutiques & Portobello',
    vibeTags: ['CommunalGardens', 'CentralLineTube', 'ArtisanBakeries', 'PortobelloMarket'],
    vibeDesc: 'Classical white-stucco Victorian facade on a cherry-blossom street, moments from organic farm-to-table grocers, boutiques, and private garden square.',
    school: {
      name: 'Fox Primary School',
      type: 'Elementary',
      rating: 9.7,
      distanceWalkMins: 4,
      district: 'Kensington and Chelsea LEA',
      highlights: ['Ofsted Outstanding', 'National Teaching School Benchmark', 'Music & Drama Excellence'],
      lat: 51.5075,
      lng: -0.1985,
      address: 'Kensington Place, London W8'
    },
    transit: {
      name: 'Notting Hill Gate Underground Station (Central/District/Circle)',
      lat: 51.5091,
      lng: -0.1961,
      walkMins: 3,
      address: 'Notting Hill Gate, London W11'
    },
    pois: [
      {
        name: 'Notting Hill Gate Underground',
        category: 'transit',
        lat: 51.5091,
        lng: -0.1961,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Direct Central Line tube to Bond St (8 mins) and Bank/City (16 mins)',
        rating: 4.8
      },
      {
        name: 'Fox Primary School',
        category: 'school',
        lat: 51.5075,
        lng: -0.1985,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Top-ranked primary school in Central London with Ofsted Outstanding status',
        rating: 4.9
      },
      {
        name: 'Daylesford Organic Farmshop & Cafe',
        category: 'cafe',
        lat: 51.5175,
        lng: -0.2012,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Pasture-fed dairy, fresh sourdough bakery, and artisan kitchen',
        rating: 4.9
      },
      {
        name: 'Holland Park & Kyoto Garden',
        category: 'park',
        lat: 51.5025,
        lng: -0.2035,
        walkMinutes: 6,
        distanceMeters: 450,
        description: '54 acres of tranquil woodland, peacocks, Japanese water garden, and playgrounds',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Alistair Sterling',
      agency: 'Knight Frank Mayfair & Notting Hill',
      quote: 'Notting Hill offers world-renowned village charm with lightning-fast Central Line access into the City.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'South Kensington',
    subLoc: 'Exhibition Road & Queen’s Gate',
    exactLat: 51.4950,
    exactLng: -0.1740,
    street: '28 Queen’s Gate Mews',
    title: 'Cobblestone Mews House with Double Reception',
    price: 2850000,
    beds: 3,
    baths: 3,
    sqft: 1890,
    type: 'Townhome',
    vibe: 'family-friendly',
    vibeLabel: 'Museum Quarter, Royal Parks & World Schools',
    vibeTags: ['HydeParkSteps', 'MuseumQuarter', 'PiccadillyLine', 'BilingualSchools'],
    vibeDesc: 'Historic mews lane steps from Hyde Park, Imperial College, and the V&A Museum, offering tranquil residential seclusion.',
    school: {
      name: 'Lycée Français Charles de Gaulle',
      type: 'Private',
      rating: 9.8,
      distanceWalkMins: 4,
      district: 'AEFE / French Curriculum',
      highlights: ['Bilingual International Baccalaureate', 'Grandes Écoles Placement', 'Historic Campus'],
      lat: 51.4965,
      lng: -0.1762,
      address: '35 Cromwell Rd, London SW7'
    },
    transit: {
      name: 'South Kensington Underground (Piccadilly/District/Circle)',
      lat: 51.4941,
      lng: -0.1738,
      walkMins: 2,
      address: 'Pelham St, London SW7'
    },
    pois: [
      {
        name: 'South Kensington Underground',
        category: 'transit',
        lat: 51.4941,
        lng: -0.1738,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Triple-line underground station with direct trains to Heathrow and the West End',
        rating: 4.8
      },
      {
        name: 'Lycée Français Charles de Gaulle',
        category: 'school',
        lat: 51.4965,
        lng: -0.1762,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'World-renowned bilingual French and international academy',
        rating: 4.9
      },
      {
        name: 'Maitre Choux South Kensington',
        category: 'cafe',
        lat: 51.4935,
        lng: -0.1768,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Three Michelin star pastry chef bakery specializing in choux and espresso',
        rating: 4.9
      },
      {
        name: 'Kensington Gardens & Hyde Park',
        category: 'park',
        lat: 51.5015,
        lng: -0.1795,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Expansive royal gardens, Albert Memorial, Serpentine lake, and palace walks',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Alistair Sterling',
      agency: 'Knight Frank Mayfair & Notting Hill',
      quote: 'South Kensington combines unmatched museum culture with immediate access to London’s greatest Royal Parks.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Hampstead',
    subLoc: 'Hampstead Village & The Heath',
    exactLat: 51.5558,
    exactLng: -0.1778,
    street: '14 Church Row',
    title: 'Georgian Red-Brick Residence by the Heath',
    price: 3200000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Heathland Panoramas & Georgian Heritage',
    vibeTags: ['HampsteadHeath', 'NorthernLineTube', 'VillageHighStreet', 'PanoramicViews'],
    vibeDesc: 'Historic cobblestone lane of 18th-century Georgian homes, directly bordering the 800-acre wild woodlands and swimming ponds of Hampstead Heath.',
    school: {
      name: 'University College School (UCS Junior)',
      type: 'Private',
      rating: 9.8,
      distanceWalkMins: 5,
      district: 'HMC Independent',
      highlights: ['Ivy League & Oxbridge Feeder', 'State-of-the-art Science Wing', 'Scholarly Tradition'],
      lat: 51.5528,
      lng: -0.1835,
      address: '11 Holly Hill, London NW3'
    },
    transit: {
      name: 'Hampstead Underground (Northern Line)',
      lat: 51.5565,
      lng: -0.1782,
      walkMins: 2,
      address: 'Heath St, London NW3'
    },
    pois: [
      {
        name: 'Hampstead Northern Line Tube',
        category: 'transit',
        lat: 51.5565,
        lng: -0.1782,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Direct Northern Line train to King’s Cross (10 mins) and Bank/City (18 mins)',
        rating: 4.8
      },
      {
        name: 'UCS Hampstead',
        category: 'school',
        lat: 51.5528,
        lng: -0.1835,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Premier independent day school with centuries of academic excellence',
        rating: 4.9
      },
      {
        name: 'La Crêperie de Hampstead',
        category: 'cafe',
        lat: 51.5562,
        lng: -0.1775,
        walkMinutes: 1,
        distanceMeters: 70,
        description: 'Legendary village creperie and artisan coffee bar',
        rating: 4.8
      },
      {
        name: 'Hampstead Heath (Parliament Hill)',
        category: 'park',
        lat: 51.5605,
        lng: -0.1585,
        walkMinutes: 5,
        distanceMeters: 420,
        description: '800 acres of ancient forest, bathing ponds, and panoramic London skyline view',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Alistair Sterling',
      agency: 'Knight Frank Mayfair & Notting Hill',
      quote: 'Hampstead feels like a tranquil countryside enclave while being just 15 minutes on the tube from Central London.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Shoreditch',
    subLoc: 'Redchurch St & Boundary Quarter',
    exactLat: 51.5260,
    exactLng: -0.0780,
    street: '68 Redchurch St',
    title: 'Industrial Warehouse Conversion with Private Atrium',
    price: 1850000,
    beds: 2,
    baths: 2,
    sqft: 1450,
    type: 'Modern Loft',
    vibe: 'vibrant-urban',
    vibeLabel: 'Creative Corridor, Design Studios & Overground',
    vibeTags: ['OvergroundLinks', 'ArtisanRoasteries', 'DesignBoutiques', 'TechCityHub'],
    vibeDesc: 'Exposed brickwork, reclaimed timber boards, and industrial ironwork on vibrant Redchurch Street, minutes from the Silicon Roundabout.',
    school: {
      name: 'Virginia Primary School',
      type: 'Elementary',
      rating: 9.3,
      distanceWalkMins: 4,
      district: 'Tower Hamlets LEA',
      highlights: ['Ofsted Outstanding', 'Community Arts Integration', 'Dedicated STEM Lab'],
      lat: 51.5275,
      lng: -0.0745,
      address: 'Virginia Rd, London E2'
    },
    transit: {
      name: 'Shoreditch High Street Overground Station',
      lat: 51.5235,
      lng: -0.0755,
      walkMins: 3,
      address: 'Braithwaite St, London E1'
    },
    pois: [
      {
        name: 'Shoreditch High Street Station',
        category: 'transit',
        lat: 51.5235,
        lng: -0.0755,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Direct Overground connection to Canada Water, Highbury & Islington, and Crossrail',
        rating: 4.8
      },
      {
        name: 'Virginia Primary School',
        category: 'school',
        lat: 51.5275,
        lng: -0.0745,
        walkMinutes: 4,
        distanceMeters: 290,
        description: 'Outstanding primary school with creative focus',
        rating: 4.8
      },
      {
        name: 'Allpress Espresso Roastery',
        category: 'cafe',
        lat: 51.5268,
        lng: -0.0742,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Flagship roastery with hot pressed sandwiches and courtyard',
        rating: 4.9
      },
      {
        name: 'Boundary Gardens & Arnold Circus',
        category: 'park',
        lat: 51.5255,
        lng: -0.0735,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Historic circular raised bandstand park framed by brick Victorian mansion blocks',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Eleanor Bennett',
      agency: 'Savills East London',
      quote: 'Shoreditch offers cutting-edge design living with a 10-minute walk into the heart of the City of London.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Richmond',
    subLoc: 'Richmond Green & River Thames',
    exactLat: 51.4613,
    exactLng: -0.3037,
    street: '15 The Green',
    title: 'Georgian Manor Townhouse Overlooking the Cricket Green',
    price: 2950000,
    beds: 4,
    baths: 3,
    sqft: 2350,
    type: 'Single Family',
    vibe: 'family-friendly',
    vibeLabel: 'Royal Deer Park, Riverside Rowing & Historic Green',
    vibeTags: ['RichmondPark', 'DistrictLineTube', 'RiversidePromenade', 'TopGrammarSchools'],
    vibeDesc: 'Prime Georgian facade directly fronting Richmond Green, a short walk to riverside rowing clubs, deer park meadows, and express trains into Waterloo.',
    school: {
      name: 'The King’s Church of England Primary',
      type: 'Elementary',
      rating: 9.6,
      distanceWalkMins: 4,
      district: 'Richmond upon Thames LEA',
      highlights: ['Ofsted Outstanding', 'National Music Curriculum', 'Riverside Sports Fields'],
      lat: 51.4655,
      lng: -0.2985,
      address: 'Queens Rd, Richmond TW10'
    },
    transit: {
      name: 'Richmond Station (District Line & Fast National Rail)',
      lat: 51.4632,
      lng: -0.3015,
      walkMins: 3,
      address: 'Kew Rd, Richmond TW9'
    },
    pois: [
      {
        name: 'Richmond Station Hub',
        category: 'transit',
        lat: 51.4632,
        lng: -0.3015,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Fast direct trains to London Waterloo in 18 minutes + District Line tube',
        rating: 4.9
      },
      {
        name: 'The King’s School',
        category: 'school',
        lat: 51.4655,
        lng: -0.2985,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Exemplary primary school in a royal borough setting',
        rating: 4.8
      },
      {
        name: 'Petersham Nurseries Teahouse',
        category: 'cafe',
        lat: 51.4485,
        lng: -0.3055,
        walkMinutes: 8,
        distanceMeters: 620,
        description: 'Botanical greenhouse cafe with seasonal cakes and garden terrace',
        rating: 4.9
      },
      {
        name: 'Richmond Riverside & Richmond Park',
        category: 'park',
        lat: 51.4585,
        lng: -0.3085,
        walkMinutes: 3,
        distanceMeters: 250,
        description: '2,500 acres of protected royal parkland with wild red and fallow deer herds',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Alistair Sterling',
      agency: 'Knight Frank Mayfair & Notting Hill',
      quote: 'Richmond offers an idyllic riverside and royal park lifestyle with an 18-minute express train into Central London.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Islington',
    subLoc: 'Upper Street & Camden Passage',
    exactLat: 51.5390,
    exactLng: -0.1020,
    street: '22 Camden Passage',
    title: 'Restored Georgian Terrace with Secluded Walled Garden',
    price: 2150000,
    beds: 3,
    baths: 2,
    sqft: 1620,
    type: 'Townhome',
    vibe: 'artisan-foodie',
    vibeLabel: 'Antique Quarters, Upper St Bistros & Victoria Line',
    vibeTags: ['VictoriaLineTube', 'CamdenPassage', 'RegentsCanal', 'Gastropubs'],
    vibeDesc: 'Pedestrian cobblestone passage filled with antique jewellers, independent bookshops, and artisanal coffee roasters, leading down to Regent’s Canal.',
    school: {
      name: 'William Tyndale Primary School',
      type: 'Elementary',
      rating: 9.5,
      distanceWalkMins: 4,
      district: 'Islington LEA',
      highlights: ['Ofsted Outstanding', 'French Immersion Program', 'Performing Arts Center'],
      lat: 51.5425,
      lng: -0.1045,
      address: 'Upper St, London N1'
    },
    transit: {
      name: 'Angel Underground Station (Northern Line)',
      lat: 51.5325,
      lng: -0.1058,
      walkMins: 3,
      address: 'Islington High St, London N1'
    },
    pois: [
      {
        name: 'Angel Underground Station',
        category: 'transit',
        lat: 51.5325,
        lng: -0.1058,
        walkMinutes: 3,
        distanceMeters: 250,
        description: 'Northern Line Bank branch directly to Moorgate (4 mins) and Bank (6 mins)',
        rating: 4.8
      },
      {
        name: 'William Tyndale Primary',
        category: 'school',
        lat: 51.5425,
        lng: -0.1045,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Highly sought-after community school with strong academic record',
        rating: 4.8
      },
      {
        name: 'Kipferl Austrian Coffeehouse',
        category: 'cafe',
        lat: 51.5365,
        lng: -0.1025,
        walkMinutes: 2,
        distanceMeters: 140,
        description: 'Traditional Viennese Sachertorte, Melange coffee, and terrace',
        rating: 4.9
      },
      {
        name: 'Regent’s Canal Walkway',
        category: 'park',
        lat: 51.5345,
        lng: -0.0985,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Canalside towpath connecting Angel to Victoria Park and Coal Drops Yard',
        rating: 4.8
      }
    ],
    realtor: {
      name: 'Eleanor Bennett',
      agency: 'Savills East London',
      quote: 'Islington offers London’s best concentration of culinary dining and swift Victoria/Northern line connections.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Chelsea',
    subLoc: 'King’s Road & Duke of York Square',
    exactLat: 51.4875,
    exactLng: -0.1687,
    street: '45 Cheyne Walk',
    title: 'Waterfront Queen Anne Mansion with Thames Views',
    price: 3600000,
    beds: 4,
    baths: 3,
    sqft: 2550,
    type: 'Townhome',
    vibe: 'historic-charming',
    vibeLabel: 'Royal Borough Elegance & King’s Road Promenade',
    vibeTags: ['CheyneWalk', 'SloaneSquareTube', 'SaatchiGallery', 'RiverThames'],
    vibeDesc: 'Historic riverside street once home to Turner, Whistler, and Rossetti, featuring wrought-iron gates, classical portico, and Thames water views.',
    school: {
      name: 'The Hampshire School Chelsea',
      type: 'Private',
      rating: 9.7,
      distanceWalkMins: 4,
      district: 'Independent Pre-Prep',
      highlights: ['Individualized Tutorial System', 'Performing Arts', 'Top Senior School Entry'],
      lat: 51.4862,
      lng: -0.1712,
      address: '15 Manresa Rd, London SW3'
    },
    transit: {
      name: 'Sloane Square Underground (District & Circle Lines)',
      lat: 51.4925,
      lng: -0.1565,
      walkMins: 6,
      address: 'Sloane Sq, London SW1W'
    },
    pois: [
      {
        name: 'Sloane Square Tube',
        category: 'transit',
        lat: 51.4925,
        lng: -0.1565,
        walkMinutes: 6,
        distanceMeters: 480,
        description: 'District/Circle lines into Westminster (5 mins) and the City',
        rating: 4.8
      },
      {
        name: 'The Hampshire School',
        category: 'school',
        lat: 51.4862,
        lng: -0.1712,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Prestigious preparatory school in historic Chelsea campus',
        rating: 4.9
      },
      {
        name: 'Chelsea Physic Garden Cafe',
        category: 'cafe',
        lat: 51.4848,
        lng: -0.1635,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'London’s oldest botanical apothecary garden with organic afternoon tea',
        rating: 5.0
      },
      {
        name: 'Battersea Park (across Albert Bridge)',
        category: 'park',
        lat: 51.4795,
        lng: -0.1585,
        walkMinutes: 5,
        distanceMeters: 410,
        description: '200-acre Victorian park with peace pagoda, boating lake, and riverside tracks',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Alistair Sterling',
      agency: 'Knight Frank Mayfair & Notting Hill',
      quote: 'Living on Cheyne Walk is one of the most prestigious London residential addresses.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Marylebone',
    subLoc: 'Marylebone High Street & Regent’s Park',
    exactLat: 51.5188,
    exactLng: -0.1555,
    street: '34 Marylebone High St',
    title: 'Classic Red-Brick Mansions Apartment with Balcony',
    price: 2550000,
    beds: 3,
    baths: 2,
    sqft: 1720,
    type: 'Condominium',
    vibe: 'artisan-foodie',
    vibeLabel: 'High Street Village, The Wallace Collection & Regent’s Park',
    vibeTags: ['MaryleboneHighSt', 'BakerStSubwayHub', 'RegentsPark', 'FarmerMarket'],
    vibeDesc: 'Village atmosphere in the absolute center of London: independent bookshops, artisan cheesemongers, French bakeries, and Regent’s Park rose gardens.',
    school: {
      name: 'St Vincent’s Catholic Primary School',
      type: 'Elementary',
      rating: 9.5,
      distanceWalkMins: 3,
      district: 'Westminster LEA',
      highlights: ['Ofsted Outstanding', 'Choral Excellence', 'Central London Campus'],
      lat: 51.5195,
      lng: -0.1535,
      address: 'St Vincent St, London W1'
    },
    transit: {
      name: 'Baker Street Underground Station (5 Tube Lines)',
      lat: 51.5231,
      lng: -0.1569,
      walkMins: 3,
      address: 'Marylebone Rd, London NW1'
    },
    pois: [
      {
        name: 'Baker Street Station Hub',
        category: 'transit',
        lat: 51.5231,
        lng: -0.1569,
        walkMinutes: 3,
        distanceMeters: 260,
        description: 'Major interchange (Jubilee, Bakerloo, Metropolitan, Circle, Hammersmith & City)',
        rating: 4.9
      },
      {
        name: 'St Vincent’s School',
        category: 'school',
        lat: 51.5195,
        lng: -0.1535,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Ofsted Outstanding central primary school',
        rating: 4.8
      },
      {
        name: 'The Monocle Cafe & Bakery',
        category: 'cafe',
        lat: 51.5182,
        lng: -0.1562,
        walkMinutes: 2,
        distanceMeters: 130,
        description: 'Swedish cardamom buns, seasonal pour-overs, and international publications',
        rating: 4.9
      },
      {
        name: 'Regent’s Park (Queen Mary’s Gardens)',
        category: 'park',
        lat: 51.5275,
        lng: -0.1535,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Royal park featuring 12,000 blooming roses, open air theatre, and boating lake',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Alistair Sterling',
      agency: 'Knight Frank Mayfair & Notting Hill',
      quote: 'Marylebone High Street provides the ultimate European village lifestyle in the core of London.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];
