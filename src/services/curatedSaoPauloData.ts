/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EnclaveConfig } from './globalCandidatePools';

export const SAO_PAULO_ENCLAVES: EnclaveConfig[] = [
  {
    name: 'Vila da Saúde',
    subLoc: 'Praça da Árvore & Metrô Saúde',
    exactLat: -23.6181,
    exactLng: -46.6394,
    street: 'Rua Carneiro da Cunha, 450',
    title: 'Residencial Parque & Árvore Saúde',
    price: 1380000,
    beds: 3,
    baths: 2,
    sqft: 1220,
    type: 'Condominium',
    vibe: 'artisan-foodie',
    vibeLabel: 'Polo Gastronômico & Metrô Saúde',
    vibeTags: ['MetroSaude', 'PadariasArtesanais', 'PracaDaArvore', 'LinhaAzul'],
    vibeDesc: 'Localização privilegiada na Vila da Saúde, a 2 minutos a pé da Estação de Metrô Saúde, cercado por padarias tradicionais e feiras de rua.',
    school: {
      name: 'Colégio Santa Amália - Saúde',
      type: 'K-8',
      rating: 9.4,
      distanceWalkMins: 4,
      district: 'Saúde',
      highlights: ['Bilingue Internacional', 'Robótica & Inovação', 'Infraestrutura Completa'],
      lat: -23.6162,
      lng: -46.6369,
      address: 'Av. Jabaquara, 1673, Saúde'
    },
    transit: {
      name: 'Estação Saúde - Metrô Linha 1-Azul',
      lat: -23.6186,
      lng: -46.6393,
      walkMins: 2,
      address: 'Av. Jabaquara / Rua do Estilo Barroco'
    },
    pois: [
      {
        name: 'Estação Saúde - Metrô Linha 1-Azul',
        category: 'transit',
        lat: -23.6186,
        lng: -46.6393,
        walkMinutes: 2,
        distanceMeters: 160,
        description: 'Linha direta para Av. Paulista, Sé e Conexão Linha Verde',
        rating: 4.8
      },
      {
        name: 'Colégio Santa Amália',
        category: 'school',
        lat: -23.6162,
        lng: -46.6369,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Colégio de referência com ensino bilíngue e tradição',
        rating: 4.7
      },
      {
        name: 'Padaria Monte Rei & Café Artesanal',
        category: 'cafe',
        lat: -23.6174,
        lng: -46.6412,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Pães artesanais de fermentação natural, café espresso e confeitaria',
        rating: 4.9
      },
      {
        name: 'Praça Bento de Camargo Barros',
        category: 'park',
        lat: -23.6148,
        lng: -46.6419,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Praça arborizada com área de caminhada e espaço pet',
        rating: 4.6
      }
    ],
    realtor: {
      name: 'Luciana Prado',
      agency: 'Prado & Associados Imóveis Nobres',
      quote: 'A Vila da Saúde é um dos bairros mais práticos e valorizados de São Paulo, combinando metrô rápido e vida de bairro.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Vila Mariana',
    subLoc: 'Junto ao Parque Ibirapuera e Polo Gastronômico',
    exactLat: -23.5895,
    exactLng: -46.6385,
    street: 'Rua Loefgren, 1420',
    title: 'Loft Contemporâneo Vila Mariana Verde',
    price: 1480000,
    beds: 3,
    baths: 2,
    sqft: 1280,
    type: 'Condominium',
    vibe: 'artisan-foodie',
    vibeLabel: 'Polo Gastronômico & Café Cultural',
    vibeTags: ['MetroSantaCruz', 'ParqueIbirapuera', 'PadariasArtesanais', 'VidaCultural'],
    vibeDesc: 'Ruas arborizadas, proximidade imediata ao Parque Ibirapuera, padarias artesanais e excelentes bistrôs a poucos passos.',
    school: {
      name: 'Colégio Arquidiocesano de São Paulo',
      type: 'K-8',
      rating: 9.5,
      distanceWalkMins: 5,
      district: 'Vila Mariana',
      highlights: ['Tradição Marista', 'Campus com Parque Arborizado', 'Excelência Acadêmica'],
      lat: -23.5932,
      lng: -46.6375,
      address: 'Rua Domingos de Morais, 2565'
    },
    transit: {
      name: 'Estação Santa Cruz - Linhas 1-Azul & 5-Lilás',
      lat: -23.5991,
      lng: -46.6368,
      walkMins: 3,
      address: 'Rua Domingos de Morais, 2564'
    },
    pois: [
      {
        name: 'Estação Santa Cruz (Integração Azul / Lilás)',
        category: 'transit',
        lat: -23.5991,
        lng: -46.6368,
        walkMinutes: 3,
        distanceMeters: 260,
        description: 'Hub central com shopping integrado e acesso às principais zonas de São Paulo',
        rating: 4.8
      },
      {
        name: 'Colégio Arquidiocesano',
        category: 'school',
        lat: -23.5932,
        lng: -46.6375,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Instituição centenária com ampla área esportiva e cultural',
        rating: 4.8
      },
      {
        name: 'Bistrô & Café Cultura Mariana',
        category: 'cafe',
        lat: -23.5898,
        lng: -46.6412,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Cafés premiados, brunches aos finais de semana e ambiente acolhedor',
        rating: 4.9
      },
      {
        name: 'Parque das Bicicletas / Ibirapuera',
        category: 'park',
        lat: -23.5975,
        lng: -46.6575,
        walkMinutes: 10,
        distanceMeters: 800,
        description: 'Ciclovias dedicadas, pistas de caminhada e áreas verdes preservadas',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Marcelo Siqueira',
      agency: 'Siqueira Prime Realty SP',
      quote: 'A Vila Mariana é o equilíbrio perfeito entre agilidade no transporte e qualidade de vida familiar.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Moema Pássaros',
    subLoc: 'Fora da Rota, Al. dos Arapanés',
    exactLat: -23.6025,
    exactLng: -46.6645,
    street: 'Alameda dos Arapanés, 920',
    title: 'Residencial Terraço Gourmet Moema',
    price: 2150000,
    beds: 3,
    baths: 3,
    sqft: 1560,
    type: 'Condominium',
    vibe: 'family-friendly',
    vibeLabel: 'Familiar, Plano & Stroller Friendly',
    vibeTags: ['MoemaPassaros', 'CaminhadasPlanas', 'EscolasInternacionais', 'Segurança24h'],
    vibeDesc: 'Bairro totalmente plano ideal para caminhar com carrinhos de bebê, cafés charmosos e proximidade de 5 min ao Parque Ibirapuera.',
    school: {
      name: 'Escola Móbile',
      type: 'K-8',
      rating: 9.6,
      distanceWalkMins: 6,
      district: 'Moema',
      highlights: ['Top ENEM São Paulo', 'Infraestrutura Esportiva', 'Formação Humanista'],
      lat: -23.6012,
      lng: -46.6678,
      address: 'Rua Diogo Jácome, 848, Moema'
    },
    transit: {
      name: 'Estação Moema - Metrô Linha 5-Lilás',
      lat: -23.6041,
      lng: -46.6622,
      walkMins: 3,
      address: 'Av. Ibirapuera / Av. Jamaris'
    },
    pois: [
      {
        name: 'Estação Moema - Metrô Linha 5-Lilás',
        category: 'transit',
        lat: -23.6041,
        lng: -46.6622,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Conexão direta com a Linha 9-Esmeralda e Linha 1-Azul',
        rating: 4.9
      },
      {
        name: 'Escola Móbile',
        category: 'school',
        lat: -23.6012,
        lng: -46.6678,
        walkMinutes: 6,
        distanceMeters: 450,
        description: 'Uma das instituições de ensino mais prestigiadas do país',
        rating: 4.9
      },
      {
        name: 'Santo Grão Moema',
        category: 'cafe',
        lat: -23.6018,
        lng: -46.6655,
        walkMinutes: 2,
        distanceMeters: 180,
        description: 'Cafés especiais, brunch e ambiente sofisticado',
        rating: 4.8
      },
      {
        name: 'Parque Ibirapuera (Portão 7)',
        category: 'park',
        lat: -23.5874,
        lng: -46.6576,
        walkMinutes: 12,
        distanceMeters: 950,
        description: 'O maior parque urbano de São Paulo com lagos e museus',
        rating: 5.0
      }
    ],
    realtor: {
      name: 'Marcelo Siqueira',
      agency: 'Siqueira Prime Realty SP',
      quote: 'Moema Pássaros é a joia da Zona Sul: tudo plano, seguro, repleto de conveniências a menos de 500 metros.'
    },
    hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Chácara Klabin',
    subLoc: 'Jardim Klabin & Praça Giordano Bruno',
    exactLat: -23.5935,
    exactLng: -46.6285,
    street: 'Rua Vergueiro, 3800',
    title: 'Edifício Jardim Klabin com Vista Panorâmica',
    price: 1650000,
    beds: 3,
    baths: 2,
    sqft: 1350,
    type: 'Condominium',
    vibe: 'quiet-scenic',
    vibeLabel: 'Bairro Jardim Tranquilo & Duplo Metrô',
    vibeTags: ['LinhaVerde', 'ParqueKlabin', 'PracaGiordanoBruno', 'RuasTranquilas'],
    vibeDesc: 'Enclave estritamente residencial com árvores frondosas, praças floridas e estação de metrô que integra a Linha 2-Verde (Paulista) e Linha 5-Lilás.',
    school: {
      name: 'Liceu Pasteur',
      type: 'Private',
      rating: 9.5,
      distanceWalkMins: 5,
      district: 'Chácara Klabin',
      highlights: ['Currículo Franco-Brasileiro', 'Bilinguismo Nativo', 'Tradição Pedagógica'],
      lat: -23.5955,
      lng: -46.6315,
      address: 'Rua Mairinque, 256'
    },
    transit: {
      name: 'Estação Chácara Klabin - Linhas 2-Verde & 5-Lilás',
      lat: -23.5928,
      lng: -46.6268,
      walkMins: 2,
      address: 'Rua Vergueiro, 3600'
    },
    pois: [
      {
        name: 'Estação Chácara Klabin (Verde / Lilás)',
        category: 'transit',
        lat: -23.5928,
        lng: -46.6268,
        walkMinutes: 2,
        distanceMeters: 170,
        description: 'Apenas 3 paradas da Av. Paulista e conexão direta com a Faria Lima',
        rating: 4.9
      },
      {
        name: 'Liceu Pasteur',
        category: 'school',
        lat: -23.5955,
        lng: -46.6315,
        walkMinutes: 5,
        distanceMeters: 360,
        description: 'Excelência em educação internacional francesa e brasileira',
        rating: 4.8
      },
      {
        name: 'St. Etienne Padaria Gourmet & Empório',
        category: 'cafe',
        lat: -23.5942,
        lng: -46.6275,
        walkMinutes: 3,
        distanceMeters: 210,
        description: 'Padaria 24 horas com confeitaria refinada e opções saudáveis',
        rating: 4.8
      },
      {
        name: 'Praça Giordano Bruno',
        category: 'park',
        lat: -23.5915,
        lng: -46.6292,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Praça arborizada com playground infantil e segurança comunitária',
        rating: 4.7
      }
    ],
    realtor: {
      name: 'Luciana Prado',
      agency: 'Prado & Associados Imóveis Nobres',
      quote: 'A Chácara Klabin é um refúgio arborizado que coloca você na Avenida Paulista em menos de 8 minutos.'
    },
    hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Mirandópolis',
    subLoc: 'Praça da Árvore / Mirandópolis Residencial',
    exactLat: -23.6085,
    exactLng: -46.6432,
    street: 'Rua das Rosas, 310',
    title: 'Casa de Vila Charmosa com Quintal Privativo',
    price: 1250000,
    beds: 3,
    baths: 2,
    sqft: 1400,
    type: 'Townhome',
    vibe: 'historic-charming',
    vibeLabel: 'Vila Fechada, Tranquilidade & Metrô Praça da Árvore',
    vibeTags: ['CasaDeVila', 'MetroPracaDaArvore', 'SilencioTotal', 'QuintalVerde'],
    vibeDesc: 'Casa em vila fechada com portão eletrônico e segurança, quintal ensolarado para churrasqueira e horta orgânica, a 5 minutos a pé do Metrô Praça da Árvore.',
    school: {
      name: 'Colégio Nova Cachoeirinha / Mirandópolis',
      type: 'K-8',
      rating: 9.2,
      distanceWalkMins: 4,
      district: 'Mirandópolis',
      highlights: ['Ambiente Acolhedor', 'Artes Plásticas', 'Projetos Sustentáveis'],
      lat: -23.6065,
      lng: -46.6415,
      address: 'Rua Luís Góis, 1120'
    },
    transit: {
      name: 'Estação Praça da Árvore - Metrô Linha 1-Azul',
      lat: -23.6105,
      lng: -46.6385,
      walkMins: 4,
      address: 'Praça da Árvore / Rua Guiratinga'
    },
    pois: [
      {
        name: 'Estação Praça da Árvore',
        category: 'transit',
        lat: -23.6105,
        lng: -46.6385,
        walkMinutes: 4,
        distanceMeters: 320,
        description: 'Linha Azul conectando diretamente a Paulista e Centro Histórico',
        rating: 4.8
      },
      {
        name: 'Colégio Nova Cachoeirinha',
        category: 'school',
        lat: -23.6065,
        lng: -46.6415,
        walkMinutes: 4,
        distanceMeters: 280,
        description: 'Ensino integral focado no desenvolvimento socioemocional',
        rating: 4.7
      },
      {
        name: 'Café & Confeitaria Flor de Mirandópolis',
        category: 'cafe',
        lat: -23.6078,
        lng: -46.6425,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Ambiente aconchegante com bolos caseiros e café coado na hora',
        rating: 4.8
      },
      {
        name: 'Praça Rosa Alves da Silva',
        category: 'park',
        lat: -23.6052,
        lng: -46.6455,
        walkMinutes: 5,
        distanceMeters: 380,
        description: 'Espaço com horta comunitária, feira orgânica e pista de cooper',
        rating: 4.7
      }
    ],
    realtor: {
      name: 'Luciana Prado',
      agency: 'Prado & Associados Imóveis Nobres',
      quote: 'Viver em uma vila em Mirandópolis é ter a tranquilidade do interior a passos do metrô.'
    },
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Planalto Paulista',
    subLoc: 'Av. Indianópolis & Alameda dos Guaramomis',
    exactLat: -23.6125,
    exactLng: -46.6512,
    street: 'Alameda dos Guaiases, 510',
    title: 'Residência Térrea Arborizada com Piscina',
    price: 1980000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    type: 'Single Family',
    vibe: 'quiet-scenic',
    vibeLabel: 'Casas com Jardim, Ruas Largas & Arborização',
    vibeTags: ['CasasTérreas', 'RuasArborizadas', 'PiscinaPrivativa', 'ZoneamentoZ1'],
    vibeDesc: 'Bairro jardim com zoneamento estritamente residencial (Z1), casas amplas com recuos generosos, garagens espaçosas e tranquilidade absoluta.',
    school: {
      name: 'Colégio Objetivo Integrado Indianópolis',
      type: 'K-8',
      rating: 9.3,
      distanceWalkMins: 6,
      district: 'Planalto Paulista',
      highlights: ['Olimpíadas Científicas', 'Corpo Docente Especializado', 'Amplo Pátio Esportivo'],
      lat: -23.6145,
      lng: -46.6535,
      address: 'Av. Indianópolis, 1580'
    },
    transit: {
      name: 'Corredor Express Indianópolis & Conexão Metrô',
      lat: -23.6138,
      lng: -46.6522,
      walkMins: 3,
      address: 'Av. Indianópolis / Alameda dos Guatas'
    },
    pois: [
      {
        name: 'Corredor Expresso Indianópolis',
        category: 'transit',
        lat: -23.6138,
        lng: -46.6522,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Faixa rápida conectando ao Parque Ibirapuera, Moema e Metrô Linha Azul',
        rating: 4.7
      },
      {
        name: 'Colégio Objetivo Indianópolis',
        category: 'school',
        lat: -23.6145,
        lng: -46.6535,
        walkMinutes: 6,
        distanceMeters: 420,
        description: 'Forte tradição acadêmica e preparação para vestibulares nacionais',
        rating: 4.8
      },
      {
        name: 'Boulangerie Planalto & Delícias',
        category: 'cafe',
        lat: -23.6118,
        lng: -46.6495,
        walkMinutes: 3,
        distanceMeters: 240,
        description: 'Croissants crocantes, pães rústicos e brunch aos domingos',
        rating: 4.8
      },
      {
        name: 'Clube Sírio & Praça dos Guainumbis',
        category: 'park',
        lat: -23.6095,
        lng: -46.6542,
        walkMinutes: 4,
        distanceMeters: 280,
        description: 'Grande área verde sombreada para caminhadas matinais',
        rating: 4.7
      }
    ],
    realtor: {
      name: 'Luciana Prado',
      agency: 'Prado & Associados Imóveis Nobres',
      quote: 'O Planalto Paulista preserva o encanto de viver em uma casa espaçosa no coração da metrópole.'
    },
    hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Brooklin Novo',
    subLoc: 'Próximo à Av. Eng. Luís Carlos Berrini',
    exactLat: -23.6195,
    exactLng: -46.6895,
    street: 'Rua Laplace, 340',
    title: 'High-Rise Moderno Berrini Tech Hub',
    price: 1750000,
    beds: 2,
    baths: 2,
    sqft: 1150,
    type: 'Modern Loft',
    vibe: 'transit-connected',
    vibeLabel: 'Conexão Corporativa & Design Urbano',
    vibeTags: ['BerriniHub', 'Linha9Esmeralda', 'VarandaGourmet', 'DesignAssinado'],
    vibeDesc: 'Andar alto com vista livre, a 4 minutos a pé dos principais centros empresariais da Berrini e da Linha Esmeralda.',
    school: {
      name: 'Chapel School (Escola Maria Imaculada)',
      type: 'K-8',
      rating: 9.4,
      distanceWalkMins: 10,
      district: 'Brooklin',
      highlights: ['International Baccalaureate', 'Campus Internacional', 'Tradição Americana'],
      lat: -23.6425,
      lng: -46.6925,
      address: 'Rua Vigário João de Pontes, 537'
    },
    transit: {
      name: 'Estação Berrini - Linha 9-Esmeralda',
      lat: -23.6082,
      lng: -46.6975,
      walkMins: 4,
      address: 'Av. das Nações Unidas, 12901'
    },
    pois: [
      {
        name: 'Estação Berrini - Linha 9-Esmeralda',
        category: 'transit',
        lat: -23.6082,
        lng: -46.6975,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Linha direta para Pinheiros, Shopping Morumbi e conexão Linha Amarela',
        rating: 4.8
      },
      {
        name: 'Chapel School',
        category: 'school',
        lat: -23.6425,
        lng: -46.6925,
        walkMinutes: 10,
        distanceMeters: 750,
        description: 'Currículo americano internacional de excelência',
        rating: 4.9
      },
      {
        name: 'The Coffee Berrini & Bakery',
        category: 'cafe',
        lat: -23.6188,
        lng: -46.6888,
        walkMinutes: 2,
        distanceMeters: 150,
        description: 'Cafés especiais estilo minimalista japonês e viennoiseries',
        rating: 4.8
      },
      {
        name: 'Parque do Povo / Ciclovia Marginal',
        category: 'park',
        lat: -23.5935,
        lng: -46.6912,
        walkMinutes: 12,
        distanceMeters: 900,
        description: 'Parque arborizado com quadras e pista de corrida',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Marcelo Siqueira',
      agency: 'Siqueira Prime Realty SP',
      quote: 'Ideal para executivos e profissionais que desejam zerar o tempo de trânsito diário.'
    },
    hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    name: 'Pinheiros',
    subLoc: 'Praça Benedito Calixto & Polo Gastronômico',
    exactLat: -23.5615,
    exactLng: -46.6835,
    street: 'Rua dos Pinheiros, 780',
    title: 'Edifício Design Assinado Pinheiros Contemporâneo',
    price: 1890000,
    beds: 2,
    baths: 2,
    sqft: 1180,
    type: 'Modern Loft',
    vibe: 'artisan-foodie',
    vibeLabel: 'Polo Cultural, Feira de Antiguidades & Metrô Fradique',
    vibeTags: ['MetroFradiqueCoutinho', 'RuaDosPinheiros', 'BeneditoCalixto', 'VidaNoturna'],
    vibeDesc: 'Localização consagrada na Rua dos Pinheiros, repleto de restaurantes autorais, livrarias independentes e a 3 minutos do Metrô Fradique Coutinho.',
    school: {
      name: 'Colégio Stella Maris - Pinheiros',
      type: 'K-8',
      rating: 9.4,
      distanceWalkMins: 5,
      district: 'Pinheiros',
      highlights: ['Pedagogia Humanista', 'Teatro & Artes Visuais', 'Laboratórios de Ciências'],
      lat: -23.5645,
      lng: -46.6855,
      address: 'Rua Artur de Azevedo, 1450'
    },
    transit: {
      name: 'Estação Fradique Coutinho - Metrô Linha 4-Amarela',
      lat: -23.5662,
      lng: -46.6845,
      walkMins: 3,
      address: 'Rua Fradique Coutinho / Rua dos Pinheiros'
    },
    pois: [
      {
        name: 'Estação Fradique Coutinho (Linha Amarela)',
        category: 'transit',
        lat: -23.5662,
        lng: -46.6845,
        walkMinutes: 3,
        distanceMeters: 230,
        description: 'Linha direta para a Av. Paulista (3 mins), Faria Lima (2 mins) e República',
        rating: 4.9
      },
      {
        name: 'Colégio Stella Maris',
        category: 'school',
        lat: -23.5645,
        lng: -46.6855,
        walkMinutes: 5,
        distanceMeters: 350,
        description: 'Educação humanista de destaque em Pinheiros',
        rating: 4.8
      },
      {
        name: 'Coffee Lab & Padaria Artesanal',
        category: 'cafe',
        lat: -23.5605,
        lng: -46.6865,
        walkMinutes: 3,
        distanceMeters: 220,
        description: 'Laboratório premiado de degustação de cafés especiais brasileiros',
        rating: 4.9
      },
      {
        name: 'Praça Benedito Calixto',
        category: 'park',
        lat: -23.5582,
        lng: -46.6815,
        walkMinutes: 4,
        distanceMeters: 310,
        description: 'Famosa feira de antiguidades, chorinho ao vivo e feira de artesanato aos sábados',
        rating: 4.9
      }
    ],
    realtor: {
      name: 'Luciana Prado',
      agency: 'Prado & Associados Imóveis Nobres',
      quote: 'Pinheiros é o epicentro cultural e gastronômico de São Paulo, com mobilidade ímpar pela Linha Amarela.'
    },
    hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];
