export interface Product {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  price: number;
  category: "fish" | "amphibians" | "supplies";
  subcategory: string;
  image?: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  careLevel?: "beginner" | "intermediate" | "expert";
  tankSize?: string;
  temperature?: string;
  temperament?: "peaceful" | "semi-aggressive" | "aggressive";
}

// Product images - using accurate representations only
// TODO: Replace with client-provided product photos

export const products: Product[] = [
  // FISH - Freshwater
  {
    id: "fw-001",
    name: "Neon Tetra",
    scientificName: "Paracheirodon innesi",
    description: "Vibrant schooling fish with iridescent blue and red stripes. Perfect for community tanks.",
    price: 3.99,
    category: "fish",
    subcategory: "freshwater",
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    tags: ["schooling", "community", "colorful"],
    careLevel: "beginner",
    tankSize: "10+ gallons",
    temperature: "72-76°F",
    temperament: "peaceful",
  },
  {
    id: "fw-002",
    name: "Betta Splendens",
    scientificName: "Betta splendens",
    description: "Stunning male betta with flowing fins. Each one unique. Solo housing recommended.",
    price: 15.99,
    category: "fish",
    subcategory: "freshwater",
    inStock: true,
    rating: 4.9,
    reviewCount: 256,
    tags: ["showpiece", "solo", "colorful"],
    careLevel: "beginner",
    tankSize: "5+ gallons",
    temperature: "76-82°F",
    temperament: "aggressive",
  },
  {
    id: "fw-003",
    name: "Discus",
    scientificName: "Symphysodon discus",
    description: "The king of freshwater aquariums. Brilliant colors and graceful swimming.",
    price: 89.99,
    category: "fish",
    subcategory: "freshwater",
    inStock: true,
    rating: 4.7,
    reviewCount: 48,
    tags: ["showpiece", "advanced", "colorful"],
    careLevel: "expert",
    tankSize: "55+ gallons",
    temperature: "82-86°F",
    temperament: "peaceful",
  },
  {
    id: "fw-004",
    name: "German Blue Ram",
    scientificName: "Mikrogeophagus ramirezi",
    description: "Small colorful cichlid with electric blue and gold markings. Great personality.",
    price: 12.99,
    category: "fish",
    subcategory: "freshwater",
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
    tags: ["cichlid", "colorful", "personality"],
    careLevel: "intermediate",
    tankSize: "20+ gallons",
    temperature: "78-85°F",
    temperament: "peaceful",
  },
  
  // FISH - Saltwater
  {
    id: "sw-001",
    name: "Ocellaris Clownfish",
    scientificName: "Amphiprion ocellaris",
    description: "The iconic reef fish. Hardy and perfect for beginners entering saltwater.",
    price: 24.99,
    category: "fish",
    subcategory: "saltwater",
    inStock: true,
    rating: 4.9,
    reviewCount: 312,
    tags: ["reef-safe", "beginner", "iconic"],
    careLevel: "beginner",
    tankSize: "20+ gallons",
    temperature: "75-82°F",
    temperament: "peaceful",
  },
  {
    id: "sw-002",
    name: "Mandarin Dragonet",
    scientificName: "Synchiropus splendidus",
    description: "Exquisite patterns in blue, green, and orange. Requires established tank.",
    price: 69.99,
    category: "fish",
    subcategory: "saltwater",
    inStock: true,
    rating: 4.5,
    reviewCount: 67,
    tags: ["reef-safe", "exotic", "advanced"],
    careLevel: "expert",
    tankSize: "30+ gallons",
    temperature: "72-78°F",
    temperament: "peaceful",
  },
  {
    id: "sw-003",
    name: "Blue Tang",
    scientificName: "Paracanthurus hepatus",
    description: "Vibrant blue surgeonfish. Active swimmer that needs plenty of space.",
    price: 79.99,
    category: "fish",
    subcategory: "saltwater",
    inStock: true,
    rating: 4.7,
    reviewCount: 143,
    tags: ["reef-safe", "active", "iconic"],
    careLevel: "intermediate",
    tankSize: "75+ gallons",
    temperature: "75-82°F",
    temperament: "semi-aggressive",
  },

  // AMPHIBIANS - Frogs
  {
    id: "amp-001",
    name: "Blue Azureus Dart Frog",
    scientificName: "Dendrobates tinctorius 'Azureus'",
    description: "Stunning electric blue poison dart frog. Captive bred, perfectly safe. Requires humid vivarium.",
    price: 59.99,
    category: "amphibians",
    subcategory: "frogs",
    inStock: true,
    rating: 4.8,
    reviewCount: 92,
    tags: ["colorful", "vivarium", "exotic"],
    careLevel: "intermediate",
  },
  {
    id: "amp-002",
    name: "Fire-Bellied Toad",
    scientificName: "Bombina orientalis",
    description: "Small aquatic toad with vibrant orange-red belly warning coloration. Semi-aquatic setup.",
    price: 14.99,
    category: "amphibians",
    subcategory: "toads",
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    tags: ["colorful", "aquatic", "beginner-friendly"],
    careLevel: "beginner",
  },
  {
    id: "amp-003",
    name: "White's Tree Frog",
    scientificName: "Litoria caerulea",
    description: "Chubby, docile tree frog with bright green coloration. Excellent beginner amphibian.",
    price: 24.99,
    category: "amphibians",
    subcategory: "frogs",
    inStock: true,
    rating: 4.9,
    reviewCount: 203,
    tags: ["docile", "handleable", "beginner"],
    careLevel: "beginner",
  },
  {
    id: "amp-004",
    name: "Albino Pacman Frog",
    scientificName: "Ceratophrys cranwelli",
    description: "The mouth that walks. Sits and waits for food like a living bumper car. Burrowing species.",
    price: 29.99,
    category: "amphibians",
    subcategory: "frogs",
    inStock: true,
    rating: 4.6,
    reviewCount: 67,
    tags: ["unique", "character", "easy-feeder"],
    careLevel: "beginner",
  },
  {
    id: "amp-005",
    name: "Red-Eyed Tree Frog",
    scientificName: "Agalychnis callidryas",
    description: "Iconic rainforest frog with ruby eyes and blue-yellow stripes. Arboreal and nocturnal.",
    price: 44.99,
    category: "amphibians",
    subcategory: "frogs",
    inStock: false,
    rating: 4.8,
    reviewCount: 112,
    tags: ["iconic", "nocturnal", "arboreal"],
    careLevel: "intermediate",
  },
  
  // AMPHIBIANS - Salamanders
  {
    id: "amp-006",
    name: "Leucistic Axolotl",
    scientificName: "Ambystoma mexicanum",
    description: "The eternal juvenile salamander. Pink with feathery external gills. Fully aquatic.",
    price: 39.99,
    category: "amphibians",
    subcategory: "salamanders",
    inStock: true,
    rating: 4.9,
    reviewCount: 234,
    tags: ["unique", "aquatic", "trending"],
    careLevel: "intermediate",
  },
  {
    id: "amp-007",
    name: "Tiger Salamander",
    scientificName: "Ambystoma tigrinum",
    description: "Large terrestrial salamander with bold yellow-black banding. Burrowing species.",
    price: 34.99,
    category: "amphibians",
    subcategory: "salamanders",
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
    tags: ["terrestrial", "bold", "long-lived"],
    careLevel: "intermediate",
  },

  // AMPHIBIANS - Newts
  {
    id: "amp-008",
    name: "Eastern Newt",
    scientificName: "Notophthalmus viridescens",
    description: "Aquatic adult with bright orange belly. Hardy and active swimmer.",
    price: 12.99,
    category: "amphibians",
    subcategory: "newts",
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
    tags: ["aquatic", "hardy", "active"],
    careLevel: "beginner",
  },

  // SUPPLIES
  {
    id: "sup-001",
    name: "Ultum Nature Systems 5N",
    description: "Ultra-clear rimless nano tank. Perfect for bettas or shrimp.",
    price: 59.99,
    category: "supplies",
    subcategory: "tanks",
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ["rimless", "nano", "high-quality"],
  },
  {
    id: "sup-002",
    name: "Fluval 407 Canister Filter",
    description: "Professional-grade filtration for tanks up to 100 gallons. Whisper quiet.",
    price: 299.99,
    category: "supplies",
    subcategory: "filtration",
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ["professional", "quiet", "high-capacity"],
  },
  {
    id: "sup-003",
    name: "Kessil A360X LED",
    description: "Dense Matrix LED with spectral tuning. Reef-grade lighting.",
    price: 449.99,
    category: "supplies",
    subcategory: "lighting",
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    tags: ["reef-grade", "adjustable", "premium"],
  },
  {
    id: "sup-004",
    name: "BioDude Terra Fauna",
    description: "Bioactive substrate blend for tropical amphibian vivariums.",
    price: 34.99,
    category: "supplies",
    subcategory: "substrate",
    inStock: true,
    rating: 4.7,
    reviewCount: 203,
    tags: ["bioactive", "natural", "humid"],
  },
  {
    id: "sup-005",
    name: "Repashy Calcium Plus",
    description: "Complete diet and calcium supplement for frogs and salamanders.",
    price: 12.99,
    category: "supplies",
    subcategory: "food",
    inStock: true,
    rating: 4.8,
    reviewCount: 445,
    tags: ["nutritious", "essential", "powder"],
  },
  {
    id: "sup-006",
    name: "Exo Terra Glass Terrarium",
    description: "Front-opening terrarium with ventilation. Ideal for amphibians.",
    price: 89.99,
    category: "supplies",
    subcategory: "enclosures",
    inStock: true,
    rating: 4.8,
    reviewCount: 312,
    tags: ["front-opening", "ventilated", "amphibian-safe"],
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(count: number = 6): Product[] {
  return products
    .filter((p) => p.inStock && p.rating >= 4.8)
    .slice(0, count);
}
