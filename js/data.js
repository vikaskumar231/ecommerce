/**
 * AuraResin Studio - Initial Product Catalog & System Data
 * Handcrafted Resin Art & Customized Creations
 */

const INITIAL_CATEGORIES = [
  {
    id: "all",
    name: "All Collections",
    icon: "sparkles",
    count: 36,
    tagline: "Explore our entire handcrafted repertoire"
  },
  {
    id: "earrings",
    name: "Earrings",
    icon: "gem",
    count: 4,
    image: "images/earrings.svg",
    description: "Ultra-lightweight hypoallergenic earrings with real pressed botanicals and 24K gold foil."
  },
  {
    id: "wall-clock",
    name: "Wall Clock",
    icon: "clock",
    count: 4,
    image: "images/wall-clock.svg",
    description: "Statement geode resin wall clocks with genuine quartz crystals and silent sweep mechanisms."
  },
  {
    id: "book-mark",
    name: "Book Mark",
    icon: "bookmark",
    count: 4,
    image: "images/book-mark.svg",
    description: "Delicate crystal-clear resin bookmarks with preserved wildflowers, gold dust, and silk tassels."
  },
  {
    id: "key-chains",
    name: "Key Chains",
    icon: "key",
    count: 4,
    image: "images/key-chains.svg",
    description: "Personalized alphabet monogram keychains, Spotify scannable codes, and keepsake keyrings."
  },
  {
    id: "toran",
    name: "Toran",
    icon: "flower-2",
    count: 4,
    image: "images/toran.svg",
    description: "Handcrafted auspicious festive resin door hangings with lotus motifs, marigolds, and brass bells."
  },
  {
    id: "shubh-labh",
    name: "Shubh Labh",
    icon: "sun",
    count: 4,
    image: "images/shubh-labh.svg",
    description: "Traditional auspicious entrance charms crafted in high-gloss resin with metallic gold lettering."
  },
  {
    id: "name-plates",
    name: "Name Plates",
    icon: "home",
    count: 4,
    image: "images/name-plates.svg",
    description: "Luxury custom home entrance nameplates blending cured river resin, teak wood, and 3D acrylic."
  },
  {
    id: "coasters",
    name: "Coasters",
    icon: "disc",
    count: 4,
    image: "images/coasters.svg",
    description: "Hand-poured agate geode and ocean surf drink coasters with gilded metallic rim accents."
  },
  {
    id: "customized-gifts",
    name: "Customized Gifts",
    icon: "gift",
    count: 4,
    image: "images/customized-gifts.svg",
    description: "Wedding varmala garland flower preservation blocks, baby birth keepsake cubes, and custom photo frames."
  }
];


const INITIAL_PRODUCTS = [
  // --- EARRINGS ---
  {
    id: "prod-ear-01",
    name: "Ocean Serenade Gold Flake Resin Drop Earrings",
    category: "earrings",
    categoryName: "Earrings",
    price: 699,
    originalPrice: 999,
    rating: 4.9,
    reviewCount: 42,
    badge: "Bestseller",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 15,
    curingTimeDays: "2-3 business days",
    dimensions: "5.5 cm length, 1.8 cm width",
    weight: "8 grams (ultra light)",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611591475734-7a4c4e7fb2fb?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience coastal elegance with our Ocean Serenade drop earrings. Featuring genuine 24K gold foil flakes swirling through translucent sea-glass teal resin, finished with hypoallergenic surgical steel hooks.",
    features: [
      "Non-toxic, UV-resistant crystal epoxy resin",
      "Real 24K gold leaf inclusions",
      "Hypoallergenic 316L surgical steel hooks (anti-tarnish)",
      "Featherweight comfort for all-day wear",
      "Waterproof and shatter-resistant"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Ocean Teal & Gold", hex: "#0a9396", extraPrice: 0 },
        { name: "Blush Rose & Silver", hex: "#e5989b", extraPrice: 0 },
        { name: "Emerald Green & Gold", hex: "#2d6a4f", extraPrice: 50 },
        { name: "Amethyst Purple & Gold", hex: "#7209b7", extraPrice: 50 }
      ],
      foilTypes: ["24K Gold Flakes", "Sterling Silver Flakes", "Rose Gold Shimmer", "None"],
      hookTypes: ["Surgical Steel Hooks", "18K Gold Plated Studs (+₹99)", "Clip-on (Non-pierced)"],
      sizes: ["Standard Drop (5.5cm)", "Mini Dainty Drop (4.0cm)"],
      allowCustomText: false
    }
  },
  {
    id: "prod-ear-02",
    name: "Real Pressed Hydrangea Blossom Dangle Studs",
    category: "earrings",
    categoryName: "Earrings",
    price: 799,
    originalPrice: 1199,
    rating: 4.8,
    reviewCount: 38,
    badge: "New Arrival",
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 12,
    curingTimeDays: "3 business days",
    dimensions: "4.0 cm x 2.2 cm",
    weight: "6 grams",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Each petal is delicately harvested, naturally pressed, and eternally sealed in optical-grade clear resin with a touch of holographic fairy dust.",
    features: [
      "Hand-picked and preserved natural hydrangea petals",
      "Crystal clear diamond-gloss resin",
      "Nickel-free and lead-free posts",
      "Comes in a luxury velvet jewelry keepsake pouch"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Cornflower Blue", hex: "#64dfdf", extraPrice: 0 },
        { name: "Sakura Pink", hex: "#ffb5a7", extraPrice: 0 },
        { name: "Pure White & Gold", hex: "#f8edeb", extraPrice: 0 },
        { name: "Lilac Violet", hex: "#c77dff", extraPrice: 0 }
      ],
      foilTypes: ["Fine Gold Dust", "Silver Shimmer", "No Foil"],
      hookTypes: ["Stud Backing", "French Wire Hooks"],
      sizes: ["Standard", "Dainty"],
      allowCustomText: false
    }
  },
  {
    id: "prod-ear-03",
    name: "Emerald Geode Raw Crystal Rimmed Earrings",
    category: "earrings",
    categoryName: "Earrings",
    price: 849,
    originalPrice: 1299,
    rating: 5.0,
    reviewCount: 19,
    badge: "Artisan Pick",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 9,
    curingTimeDays: "3-4 business days",
    dimensions: "4.8 cm length",
    weight: "9 grams",
    images: [
      "https://images.unsplash.com/photo-1611591475734-7a4c4e7fb2fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Inspired by raw geode geodes, these statement earrings feature an intricate crystalline core surrounded by deep emerald resin and hand-gilded liquid gold edges.",
    features: [
      "Simulated crushed quartz crystal inclusions",
      "Hand-painted gilded edge finish",
      "Anti-allergenic titanium posts",
      "Eye-catching light-refracting facets"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Deep Emerald", hex: "#1b4332", extraPrice: 0 },
        { name: "Sapphire Midnight", hex: "#1d3557", extraPrice: 0 },
        { name: "Ruby Sunset", hex: "#9d0208", extraPrice: 0 }
      ],
      foilTypes: ["24K Liquid Gold Edge", "Sterling Silver Edge"],
      hookTypes: ["Drop Hooks", "Push Back Studs"],
      sizes: ["Statement (4.8cm)", "Petite (3.2cm)"],
      allowCustomText: false
    }
  },
  {
    id: "prod-ear-04",
    name: "Celestial Moon & Star Shimmer Hoops",
    category: "earrings",
    categoryName: "Earrings",
    price: 599,
    originalPrice: 899,
    rating: 4.7,
    reviewCount: 26,
    badge: "Trending",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 20,
    curingTimeDays: "2 days",
    dimensions: "3.5 cm diameter hoops",
    weight: "5 grams",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dainty resin celestial charms embedded with luminescent micro-glitters and miniature star sequins, suspended from 14K gold plated huggie hoops.",
    features: [
      "Glow subtle luminescence in low light",
      "Easy latch-back huggie hoops",
      "Ultra comfortable for everyday wear"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Midnight Cosmic Black", hex: "#141414", extraPrice: 0 },
        { name: "Opalescent Cloud White", hex: "#e9ecef", extraPrice: 0 },
        { name: "Pastel Lavender", hex: "#b8b8ff", extraPrice: 0 }
      ],
      foilTypes: ["Micro Star Glitters", "Silver Dust", "Gold Moon Sequins"],
      hookTypes: ["Gold Huggie Hoops", "Silver Huggie Hoops"],
      sizes: ["Standard Hoop (3.5cm)"],
      allowCustomText: false
    }
  },

  // --- WALL CLOCK ---
  {
    id: "prod-clk-01",
    name: "Royal Sapphire Geode Resin Wall Clock with Quartz",
    category: "wall-clock",
    categoryName: "Wall Clock",
    price: 3499,
    originalPrice: 4999,
    rating: 5.0,
    reviewCount: 64,
    badge: "Bestseller",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 8,
    curingTimeDays: "5-6 business days",
    dimensions: "14 inches diameter (35 cm)",
    weight: "1.8 kg",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A show-stopping luxury centerpiece for your living room or office. Poured across multiple days with 3D layers of royal blue, metallic copper, and turquoise, embedded with real raw quartz crystal points and Roman dial numerals.",
    features: [
      "Silent sweep quartz clock movement (No ticking noise!)",
      "Real raw Brazilian quartz crystals embedded in resin fissure",
      "3-layer resin depth technique for authentic 3D fluid motion",
      "Hand-applied 3D Roman or Arabic metal numerals",
      "Heavy-duty sawtooth wall hanger pre-installed",
      "Runs on 1 AA battery (included)"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Royal Sapphire & Gold", hex: "#1e3a8a", extraPrice: 0 },
        { name: "Emerald & Champagne Gold", hex: "#064e3b", extraPrice: 0 },
        { name: "White Marble & Rose Gold", hex: "#f3f4f6", extraPrice: 200 },
        { name: "Onyx Black & Metallic Copper", hex: "#18181b", extraPrice: 200 }
      ],
      foilTypes: ["24K Liquid Gold Rim", "Rose Gold Rim", "Silver Leaf Veins"],
      sizes: ["12 Inches (Compact)", "14 Inches (Standard)", "16 Inches (+₹600)", "18 Inches Luxury (+₹1100)"],
      dialTypes: ["Roman Numerals (Gold)", "Modern Minimal Dashes", "Classic Arabic Numbers"],
      handsColor: ["Polished Gold Hands", "Matte Black Hands", "Silver Hands"],
      allowCustomText: true,
      textPlaceholder: "Family Name / Established Year (e.g. The Sharmas, Est. 2021)"
    }
  },
  {
    id: "prod-clk-02",
    name: "Bondi Shore Ocean Wave Live-Edge Resin Wall Clock",
    category: "wall-clock",
    categoryName: "Wall Clock",
    price: 2999,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 31,
    badge: "Popular",
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 6,
    curingTimeDays: "5 days",
    dimensions: "13 inches diameter",
    weight: "1.4 kg",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Bring the tranquil energy of coastal tides into your sanctuary. Handcrafted with realistic white resin wave lacing flowing over solid steam-treated natural mango wood.",
    features: [
      "Hyper-realistic lacing cell waves created with blowtorch technique",
      "Solid sustainable mango wood substrate",
      "Silent quartz clock mechanism with 1-year replacement warranty",
      "Triple heat-resistant clear topcoat"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Tropical Turquoise Wave", hex: "#00b4d8", extraPrice: 0 },
        { name: "Deep Pacific Navy", hex: "#03045e", extraPrice: 0 },
        { name: "Caribbean Aqua", hex: "#48cae4", extraPrice: 0 }
      ],
      foilTypes: ["Real Golden Sand Beach", "Mother of Pearl Crushed Shells"],
      sizes: ["12 Inches", "14 Inches (+₹500)", "16 Inches (+₹900)"],
      dialTypes: ["Minimalist Dots", "Roman Numerals", "Bare Beach Face (No Numbers)"],
      handsColor: ["White Driftwood Hands", "Brass Gold Hands"],
      allowCustomText: true,
      textPlaceholder: "Short Message / Coordinates (e.g. Goa 15.2993° N)"
    }
  },
  {
    id: "prod-clk-03",
    name: "Gilded Marble Luxury Resin Wall Clock 15-Inch",
    category: "wall-clock",
    categoryName: "Wall Clock",
    price: 3199,
    originalPrice: 4500,
    rating: 4.8,
    reviewCount: 22,
    badge: "Modern Lux",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: true,
    stock: 10,
    curingTimeDays: "4-5 business days",
    dimensions: "15 inches diameter",
    weight: "1.6 kg",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Statuesque Calacatta marble effect poured with epoxy resin and interwoven with metallic 24K gold foil veins. Perfect for contemporary interiors.",
    features: [
      "Carrara marble imitation with pearlescent mica shimmer",
      "Silent quartz movement",
      "Laser-cut gold mirrored acrylic hour markers"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "White Marble & Gold", hex: "#f8f9fa", extraPrice: 0 },
        { name: "Black Marquina & Gold", hex: "#212529", extraPrice: 0 },
        { name: "Grey Pearl & Silver", hex: "#ced4da", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Veins", "Rose Gold Shimmer", "Silver Leaf"],
      sizes: ["12 Inches", "15 Inches Standard", "18 Inches Large (+₹800)"],
      dialTypes: ["Gold Mirror Roman Numerals", "Slender Line Markers", "No Markers"],
      handsColor: ["Brushed Gold Hands", "Gloss Black Hands"],
      allowCustomText: true,
      textPlaceholder: "Custom Name Monogram (e.g. Verma Residence)"
    }
  },
  {
    id: "prod-clk-04",
    name: "Festive Peacock Feather Resin Wall Clock with Bell Tassels",
    category: "wall-clock",
    categoryName: "Wall Clock",
    price: 3699,
    originalPrice: 5299,
    rating: 5.0,
    reviewCount: 45,
    badge: "Festival Spl",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 7,
    curingTimeDays: "5 days",
    dimensions: "14 inches diameter",
    weight: "1.7 kg",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Celebrate Indian heritage with this majestic peacock feather-themed resin wall clock. Accented with metallic emerald, sapphire, and radiant gold shimmer.",
    features: [
      "Inspired by the Indian national bird & Radha Krishna motifs",
      "Includes hanging ornamental brass ghungroo tassels at base",
      "Silent quartz movement"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Peacock Emerald & Royal Blue", hex: "#0f4c5c", extraPrice: 0 },
        { name: "Lotus Pink & Gold", hex: "#e76f51", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Flakes", "Copper Shimmer"],
      sizes: ["14 Inches Standard", "16 Inches (+₹700)"],
      dialTypes: ["Devanagari Sanskrit Numerals", "Traditional Roman Numerals"],
      handsColor: ["Antique Gold Hands"],
      allowCustomText: true,
      textPlaceholder: "Shree / Om / Family Name"
    }
  },

  // --- BOOK MARK ---
  {
    id: "prod-bm-01",
    name: "Enchanted Wildflower Botanical Resin Bookmark with Tassel",
    category: "book-mark",
    categoryName: "Book Mark",
    price: 249,
    originalPrice: 399,
    rating: 4.9,
    reviewCount: 88,
    badge: "Bestseller",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 35,
    curingTimeDays: "2 days",
    dimensions: "14 cm x 2.8 cm x 0.25 cm",
    weight: "18 grams",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Every reader's dream companion. Genuine dried meadow flowers, baby's breath, and fluttering 24K gold foil eternally preserved in glass-like optical resin. Finished with a silky handmade tassel.",
    features: [
      "Ultra-slim 2.5mm profile doesn't warp or damage book spines",
      "Hand-collected dried botanicals and ferns",
      "Smooth polished rounded edges to prevent snagging pages",
      "Comes in giftable kraft presentation card"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Sunny Meadow Yellow", hex: "#f4a261", extraPrice: 0 },
        { name: "Rose Garden Pink", hex: "#e76f51", extraPrice: 0 },
        { name: "Forget-Me-Not Blue", hex: "#2a9d8f", extraPrice: 0 },
        { name: "Lavender Fields", hex: "#9b5de5", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Leaf", "Silver Flakes", "Rose Gold Leaf", "No Foil"],
      tasselColor: ["Champagne Gold Tassel", "Wine Red Tassel", "Emerald Green Tassel", "Dusty Pink Tassel"],
      sizes: ["Standard (14cm x 2.8cm)", "Slim Pocket (10cm x 2.2cm)"],
      allowCustomText: true,
      textPlaceholder: "Name / Inspiring Quote (e.g. 'Just one more chapter')"
    }
  },
  {
    id: "prod-bm-02",
    name: "Ocean Wave Surf Resin Bookmark with Real Sand & Shells",
    category: "book-mark",
    categoryName: "Book Mark",
    price: 279,
    originalPrice: 429,
    rating: 4.8,
    reviewCount: 52,
    badge: "Trending",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 28,
    curingTimeDays: "2 days",
    dimensions: "14 cm x 3 cm",
    weight: "20 grams",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A miniature piece of the sea for your reading moments. Handcrafted with real white foaming ocean surf, sparkling beach sand, and miniature crushed seashells.",
    features: [
      "Real sand from coastal beaches",
      "Laced foam wave effect",
      "Silky turquoise and silver threaded tassel"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Deep Ocean Blue", hex: "#0077b6", extraPrice: 0 },
        { name: "Emerald Seafoam", hex: "#52b788", extraPrice: 0 },
        { name: "Sunset Orange Waves", hex: "#f3722c", extraPrice: 0 }
      ],
      foilTypes: ["Gold Leaf Accents", "Silver Foam Glitter"],
      tasselColor: ["Aqua Blue Tassel", "Ivory White Tassel"],
      sizes: ["Standard (14cm)"],
      allowCustomText: true,
      textPlaceholder: "Reader's Name (e.g. Priya)"
    }
  },
  {
    id: "prod-bm-03",
    name: "Vintage 24K Gold Leaf & Rose Petal Herbarium Bookmark",
    category: "book-mark",
    categoryName: "Book Mark",
    price: 299,
    originalPrice: 449,
    rating: 5.0,
    reviewCount: 41,
    badge: "New Arrival",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 22,
    curingTimeDays: "2-3 business days",
    dimensions: "14.5 cm x 3 cm",
    weight: "18 grams",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Deep burgundy preserved rose petals dancing alongside suspended 24k gold leaf foil flakes in transparent museum-grade resin.",
    features: [
      "Natural fragrant rose petals harvested at peak bloom",
      "Gold embossed lettering option",
      "Wine-hued silk tassel with brass bead"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Deep Crimson Rose", hex: "#9b2226", extraPrice: 0 },
        { name: "Peach Blossom", hex: "#f4a261", extraPrice: 0 }
      ],
      foilTypes: ["Heavy 24K Gold Leaf", "Rose Gold Foil"],
      tasselColor: ["Burgundy Tassel", "Gold Tassel"],
      sizes: ["Standard"],
      allowCustomText: true,
      textPlaceholder: "Custom Name or Initials"
    }
  },
  {
    id: "prod-bm-04",
    name: "Personalized Initial Monogram Resin Bookmark Gift Set",
    category: "book-mark",
    categoryName: "Book Mark",
    price: 349,
    originalPrice: 499,
    rating: 4.9,
    reviewCount: 67,
    badge: "Gift Choice",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 30,
    curingTimeDays: "2 days",
    dimensions: "14 cm x 3 cm",
    weight: "20 grams",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The ultimate thoughtful gift for book lovers, teachers, and book clubs. Embedded with their initial letter in metallic gold typography, surrounded by real baby's breath.",
    features: [
      "Custom laser-cut metallic monogram inside resin",
      "Choice of tassel color",
      "Packed in foil-stamped gift box with custom message card"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Lavender Lilac", hex: "#b5838d", extraPrice: 0 },
        { name: "Sage Green & White", hex: "#84a59d", extraPrice: 0 },
        { name: "Midnight Navy", hex: "#1d3557", extraPrice: 0 }
      ],
      foilTypes: ["Gold Flakes", "Silver Flakes"],
      tasselColor: ["Matching Pastel Tassel", "Metallic Gold Tassel"],
      sizes: ["Standard"],
      allowCustomText: true,
      textPlaceholder: "Enter Monogram Letter & Full Name (e.g. 'A - Ananya')"
    }
  },

  // --- KEY CHAINS ---
  {
    id: "prod-kc-01",
    name: "Custom Initial Alphabet Floral Resin Keychain with Tassel",
    category: "key-chains",
    categoryName: "Key Chains",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    reviewCount: 142,
    badge: "Bestseller",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 50,
    curingTimeDays: "2 days",
    dimensions: "4.5 cm x 4 cm x 0.8 cm",
    weight: "22 grams",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Our viral alphabet keychain! Pick any letter from A to Z, customized with your favorite pigment blend, real dried pressed flowers, 24K gold foil flakes, and a matching suede leather tassel with gold swivel keyring.",
    features: [
      "Any letter from A to Z or numbers 0-9",
      "Real dried baby's breath or pressed petals",
      "Heavy duty anti-rust swivel lobster clasp & split ring",
      "Reinforced screw eye embedded deep inside the resin core"
    ],
    customizationOptions: {
      alphabetChoice: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Heart","&"],
      colorPalette: [
        { name: "Cotton Candy Pink & Gold", hex: "#ffafcc", extraPrice: 0 },
        { name: "Ocean Breeze Teal & Gold", hex: "#a2d2ff", extraPrice: 0 },
        { name: "Emerald Glitz", hex: "#2a9d8f", extraPrice: 0 },
        { name: "Royal Purple & Silver", hex: "#9d4edd", extraPrice: 0 },
        { name: "Classic Clear & 24K Gold", hex: "#ffffff", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Flakes", "Rose Gold Flakes", "Silver Flakes"],
      hardwareColor: ["Gold Hardware", "Silver Hardware", "Rose Gold Hardware"],
      allowCustomText: true,
      textPlaceholder: "Mini Name Tag Engraving (e.g. 'Pooja')"
    }
  },
  {
    id: "prod-kc-02",
    name: "Personalized Scannable Spotify Code Resin Keychain",
    category: "key-chains",
    categoryName: "Key Chains",
    price: 299,
    originalPrice: 449,
    rating: 5.0,
    reviewCount: 94,
    badge: "Viral Trend",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 40,
    curingTimeDays: "2 days",
    dimensions: "6 cm x 1.8 cm x 0.5 cm",
    weight: "20 grams",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Carry your special song everywhere! Scannable via the Spotify app camera to play your special track instantly. Made with glossy epoxy resin and custom song title + artist text.",
    features: [
      "100% scannable Spotify wave code guaranteed",
      "Reverse side can have custom date or couple names",
      "Scratch-resistant clear coat finish"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Jet Black with White Code", hex: "#121212", extraPrice: 0 },
        { name: "Clear with Gold Code & Flakes", hex: "#d4af37", extraPrice: 0 },
        { name: "Pastel Pink Shimmer", hex: "#fcd5ce", extraPrice: 0 },
        { name: "Smoky Translucent Teal", hex: "#0077b6", extraPrice: 0 }
      ],
      foilTypes: ["Gold Foil Border", "Silver Dust", "None"],
      hardwareColor: ["Gold Keyring", "Silver Keyring"],
      allowCustomText: true,
      textPlaceholder: "Song Title & Artist (e.g. Kesariya - Arijit Singh) OR Spotify Link"
    }
  },
  {
    id: "prod-kc-03",
    name: "Cherished Pet Memorial & Photo Resin Keychain",
    category: "key-chains",
    categoryName: "Key Chains",
    price: 349,
    originalPrice: 499,
    rating: 4.9,
    reviewCount: 56,
    badge: "Personalized",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 25,
    curingTimeDays: "3 days",
    dimensions: "4.5 cm circle",
    weight: "24 grams",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Preserve a beloved photo of your dog, cat, or loved one sealed permanently under waterproof resin crystal. Backing can include paw print, gold foil, and phone number in case of lost keys.",
    features: [
      "Archival waterproof photo print sealed inside",
      "Dual-sided: photo on front, phone number/name on back",
      "Includes mini bone/paw charm"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Warm Gold Foil Halo", hex: "#d4af37", extraPrice: 0 },
        { name: "Silver Moonlight Halo", hex: "#e0e1dd", extraPrice: 0 },
        { name: "Rose Petals Border", hex: "#e56b6f", extraPrice: 0 }
      ],
      foilTypes: ["Gold Flakes", "Silver Flakes"],
      hardwareColor: ["Gold Keyring", "Silver Keyring"],
      allowCustomText: true,
      allowPhotoUpload: true,
      textPlaceholder: "Pet Name & Emergency Phone Number"
    }
  },
  {
    id: "prod-kc-04",
    name: "Interlocking Couple Heart Magnetic Resin Keyrings (Set of 2)",
    category: "key-chains",
    categoryName: "Key Chains",
    price: 399,
    originalPrice: 599,
    rating: 4.8,
    reviewCount: 47,
    badge: "Gift Choice",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 30,
    curingTimeDays: "2-3 business days",
    dimensions: "Combined 5 cm heart",
    weight: "35 grams pair",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Two halves of a heart that click together with embedded neodymium magnets when brought close! Handcrafted with contrasting resin swirls and personalized anniversary date.",
    features: [
      "Neodymium magnet embedded inside both halves",
      "Contrasting his & hers colors or matching pairs",
      "Gift boxed ready for gifting"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Blush Pink & Midnight Blue", hex: "#4a4e69", extraPrice: 0 },
        { name: "Emerald Green & Pearl White", hex: "#2d6a4f", extraPrice: 0 },
        { name: "Black & 24K Gold Flakes", hex: "#14213d", extraPrice: 0 }
      ],
      foilTypes: ["Gold Leaf", "Silver Leaf"],
      hardwareColor: ["Gold Pair", "Silver Pair"],
      allowCustomText: true,
      textPlaceholder: "Two Names & Date (e.g. Rohan & Siya | 14.02.24)"
    }
  },

  // --- TORAN ---
  {
    id: "prod-trn-01",
    name: "Shubh Bandhan Handcrafted Resin Lotus & Marigold Festive Toran",
    category: "toran",
    categoryName: "Toran",
    price: 1899,
    originalPrice: 2699,
    rating: 5.0,
    reviewCount: 53,
    badge: "Festival Spl",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 12,
    curingTimeDays: "4 business days",
    dimensions: "38 inches standard door width (adjustable to 42\")",
    weight: "650 grams",
    images: [
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Welcome prosperity and divine blessings into your home. This luxurious entrance toran features 7 hand-poured 3D resin blooming lotuses, real preserved marigold petals, gold-dipped kundan embellishments, and melodic brass bells that chime with every breeze.",
    features: [
      "Waterproof and washable unlike fresh flower torans that wilt in 2 days",
      "Evergreen durability - reuse every Diwali, Navratri, Pooja, and housewarming for years",
      "7 hand-cast resin sacred lotus plaques with gold foil veins",
      "Strung on high-strength braided gold thread with hanging loop rings",
      "Tinkle sound brass bells (ghungroo) at every drop"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Festive Marigold Yellow & Orange", hex: "#f77f00", extraPrice: 0 },
        { name: "Divine Ruby Red & Gold", hex: "#d62828", extraPrice: 0 },
        { name: "Royal Peacock Blue & Emerald", hex: "#003049", extraPrice: 150 }
      ],
      sizes: ["36 Inches (Standard Door)", "38 Inches (Wide Door)", "42 Inches Double Door (+₹300)"],
      foilTypes: ["Heavy 24K Gold Flake Edges", "Kundan Gem Highlights"],
      allowCustomText: true,
      textPlaceholder: "Custom blessings or family name on center plaque (optional)"
    }
  },
  {
    id: "prod-trn-02",
    name: "Royal Pearl & Swastik Resin Bandhanwar with Brass Bells",
    category: "toran",
    categoryName: "Toran",
    price: 1599,
    originalPrice: 2299,
    rating: 4.8,
    reviewCount: 37,
    badge: "New Arrival",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: true,
    stock: 15,
    curingTimeDays: "3-4 days",
    dimensions: "36 inches length",
    weight: "580 grams",
    images: [
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Ornate traditional door valance with alternating Swastik and Om symbols encased in glossy teardrop resin charms, strung with multi-strand faux freshwater pearls.",
    features: [
      "Traditional Vaastu-compliant auspicious motifs",
      "Resin medallions with 3D embossed metallic iconography",
      "Easy dual-hook installation"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Auspicious Sindoor Red", hex: "#b7094c", extraPrice: 0 },
        { name: "Golden Haldi Yellow", hex: "#ffb703", extraPrice: 0 }
      ],
      sizes: ["36 Inches", "40 Inches (+₹200)"],
      foilTypes: ["24K Gold Leaf", "Copper Foil"],
      allowCustomText: false
    }
  },
  {
    id: "prod-trn-03",
    name: "Floral Meadow Modern Pastel Resin Entrance Toran",
    category: "toran",
    categoryName: "Toran",
    price: 1749,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 29,
    badge: "Modern Vibe",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 10,
    curingTimeDays: "4 days",
    dimensions: "38 inches length",
    weight: "500 grams",
    images: [
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A contemporary aesthetic take on the classic toran. Features preserved real botanical daisies, hydrangeas, and eucalyptus leaves in geometric hexagonal resin tiles with macrame accents.",
    features: [
      "Boho modern fusion for apartment doorways",
      "Real botanical preservation",
      "Cotton macrame braided cord"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Blush Peach & Sage", hex: "#e5989b", extraPrice: 0 },
        { name: "Lavender & Ivory", hex: "#b8b8ff", extraPrice: 0 }
      ],
      sizes: ["36 Inches", "38 Inches", "42 Inches (+₹250)"],
      foilTypes: ["Fine Gold Flakes", "Rose Gold Dust"],
      allowCustomText: false
    }
  },
  {
    id: "prod-trn-04",
    name: "Peacock Elegance Green & Blue Resin Festive Toran",
    category: "toran",
    categoryName: "Toran",
    price: 1999,
    originalPrice: 2899,
    rating: 5.0,
    reviewCount: 39,
    badge: "Festival Spl",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 8,
    curingTimeDays: "4-5 days",
    dimensions: "40 inches length",
    weight: "700 grams",
    images: [
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Inspired by temple architecture, featuring Mayur (peacock) resin figures adorned with emerald resin droplets and golden pearl tassels.",
    features: [
      "Heirloom festive quality",
      "Metallic mica colors with deep gloss luster",
      "Heavy brass jhumki drops"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Mayur Royal Blue & Emerald", hex: "#0f4c5c", extraPrice: 0 }
      ],
      sizes: ["38 Inches", "42 Inches (+₹300)"],
      foilTypes: ["24K Gold Leaf", "Silver Trim"],
      allowCustomText: false
    }
  },

  // --- SHUBH LABH ---
  {
    id: "prod-sl-01",
    name: "Divine Ganesha Shubh Labh Resin Entrance Hanging Pair",
    category: "shubh-labh",
    categoryName: "Shubh Labh",
    price: 799,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 89,
    badge: "Bestseller",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 30,
    curingTimeDays: "3 days",
    dimensions: "Each piece 5.5 inches diameter",
    weight: "320 grams (pair)",
    images: [
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Adorn your entrance with the auspicious symbols of 'Shubh' (Auspiciousness) and 'Labh' (Profit & Prosperity). Cast in high-clarity resin with miniature Lord Ganesha and Lakshmi Charan Paduka motifs, bordered with rich gold leaf flakes.",
    features: [
      "Set of 2 matching circular door hangings (Shubh + Labh)",
      "Comes with heavy-duty 3M double-sided tape and hanging rings",
      "3D embossed Sanskrit Devanagari calligraphy",
      "Weather-resistant resin suitable for outdoor main doors",
      "Includes gold tassel hanging drops"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Sindoor Crimson & 24K Gold", hex: "#9d0208", extraPrice: 0 },
        { name: "Deep Emerald & Gold Foil", hex: "#1b4332", extraPrice: 0 },
        { name: "Royal Sapphire Blue", hex: "#03045e", extraPrice: 0 },
        { name: "White Marble & Gold Leaf", hex: "#f8f9fa", extraPrice: 50 }
      ],
      foilTypes: ["Heavy 24K Gold Leaf Flakes", "Rose Gold Flakes", "Copper Shimmer"],
      sizes: ["Standard 5.5-inch Pair", "Grand 7.5-inch Pair (+₹350)"],
      hangingStyle: ["Double-sided 3M Wall Adhesive", "Brass Chain Ring", "Velvet Cord Loop"],
      allowCustomText: false
    }
  },
  {
    id: "prod-sl-02",
    name: "Lotus Petal Marble Finish Shubh Labh Wall Charms",
    category: "shubh-labh",
    categoryName: "Shubh Labh",
    price: 899,
    originalPrice: 1299,
    rating: 5.0,
    reviewCount: 46,
    badge: "Artisan Pick",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: true,
    stock: 20,
    curingTimeDays: "3 business days",
    dimensions: "6 inches x 5 inches each",
    weight: "360 grams pair",
    images: [
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Shaped in the silhouette of sacred blooming lotus petals with swirled pearl white and golden liquid resin. Ideal for Diwali pooja rooms and main door frames.",
    features: [
      "Lotus contour silhouette shape",
      "Laser engraved gold mirrored acrylic characters",
      "Silk tassel with brass bead"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Pearl White & Rose Gold", hex: "#fff0f5", extraPrice: 0 },
        { name: "Haldi Yellow & Gold", hex: "#fcbf49", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Leaf", "Silver Trim"],
      sizes: ["Standard 6-inch", "Grand 8-inch (+₹400)"],
      hangingStyle: ["Double-sided 3M Tape", "Hanging Ring"],
      allowCustomText: false
    }
  },
  {
    id: "prod-sl-03",
    name: "Teal Geode Crystal Edge Shubh Labh Entrance Plates",
    category: "shubh-labh",
    categoryName: "Shubh Labh",
    price: 949,
    originalPrice: 1399,
    rating: 4.8,
    reviewCount: 31,
    badge: "Trending",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 14,
    curingTimeDays: "3-4 days",
    dimensions: "5.5 inches each",
    weight: "340 grams pair",
    images: [
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Modern geode aesthetic infused with Indian spirituality. Organic geode rough crystal edges gilded with 24k liquid leaf surrounding vibrant teal pigments.",
    features: [
      "Hand-broken natural quartz crystal rim",
      "Gilded gold contour edge",
      "High refractive index resin"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Ocean Teal & Turquoise", hex: "#0077b6", extraPrice: 0 },
        { name: "Midnight Navy & Copper", hex: "#1b263b", extraPrice: 0 }
      ],
      foilTypes: ["24K Liquid Gold Rim", "Silver Leaf Rim"],
      sizes: ["Standard 5.5-inch"],
      hangingStyle: ["Double-sided Adhesive", "Hanging Ring"],
      allowCustomText: false
    }
  },
  {
    id: "prod-sl-04",
    name: "Traditional Kalash & Swastik Pooja Room Shubh Labh Tiles",
    category: "shubh-labh",
    categoryName: "Shubh Labh",
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviewCount: 24,
    badge: "Value Pick",
    isFeatured: false,
    isBestseller: false,
    isNew: false,
    isFestival: true,
    stock: 25,
    curingTimeDays: "2-3 days",
    dimensions: "5 inches x 5 inches each",
    weight: "280 grams pair",
    images: [
      "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1609137144827-6f81a7428807?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Square resin tiles with traditional auspicious Kalash and Swastik symbols cast inside transparent resin over maroon velvet shimmer.",
    features: [
      "Square modern format fits narrow door frames",
      "Durable non-fading pigments"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Auspicious Maroon & Gold", hex: "#6b0504", extraPrice: 0 },
        { name: "Turmeric Yellow & Red", hex: "#f48c06", extraPrice: 0 }
      ],
      foilTypes: ["Gold Flakes"],
      sizes: ["5-inch Square"],
      hangingStyle: ["3M Adhesive Backing"],
      allowCustomText: false
    }
  },

  // --- NAME PLATES ---
  {
    id: "prod-np-01",
    name: "Luxury Teak Wood & Emerald River Resin Home Nameplate",
    category: "name-plates",
    categoryName: "Name Plates",
    price: 2799,
    originalPrice: 3999,
    rating: 5.0,
    reviewCount: 78,
    badge: "Bestseller",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 10,
    curingTimeDays: "5-7 business days",
    dimensions: "16 inches x 8 inches x 0.8 inches thick",
    weight: "1.9 kg",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Create an unforgettable first impression at your doorstep. Solid seasoned teak wood halves separated by a mesmerizing hand-poured river of emerald resin with suspended gold leaf flecks. Your names are crafted in 3D laser-cut golden acrylic with weatherproof outdoor durability.",
    features: [
      "Natural live-edge seasoned Burma teak wood",
      "UV-stabilized resin won't yellow or crack in sun/rain",
      "3D raised acrylic lettering (choice of mirror gold, matte black, or brass finish)",
      "Keyhole hangers or stainless steel standoff screws included for mounting",
      "Complimentary digital layout proof sent on WhatsApp before pouring!"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Emerald River & 24K Gold", hex: "#1b4332", extraPrice: 0 },
        { name: "Ocean Wave Turquoise", hex: "#0077b6", extraPrice: 0 },
        { name: "Smoky Black & Copper River", hex: "#2b2d42", extraPrice: 100 },
        { name: "Amethyst Crystal Purple", hex: "#5a189a", extraPrice: 150 }
      ],
      sizes: ["14\" x 7\" (Compact)", "16\" x 8\" (Standard)", "18\" x 9\" (+₹600)", "20\" x 10\" Villa Size (+₹1200)"],
      letteringStyle: ["3D Mirror Gold Acrylic", "3D Brushed Brass Acrylic", "3D Matte Black", "Direct Gold Engraving"],
      mountingOption: ["Stainless Steel Standoffs (Floating)", "Concealed Keyhole Hangers"],
      allowCustomText: true,
      textPlaceholder: "Line 1: Names (e.g. 'Pooja & Vikram Sharma'), Line 2: House No / Villa Name"
    }
  },
  {
    id: "prod-np-02",
    name: "Ocean Surf Coastal Resin & Wood Villa Nameplate",
    category: "name-plates",
    categoryName: "Name Plates",
    price: 2999,
    originalPrice: 4299,
    rating: 4.9,
    reviewCount: 45,
    badge: "Trending",
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 8,
    curingTimeDays: "6 days",
    dimensions: "16 inches x 8 inches",
    weight: "1.8 kg",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Capture the serene essence of the ocean at your doorstep. Real frothing white ocean waves crashing against a shore of treated mango wood, personalized with crisp waterproof white or gold 3D letters.",
    features: [
      "Multiple wave layers hand-foamed with heat torch",
      "Waterproof outdoor polyurethane sealer",
      "Includes brass wall screw kit"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Caribbean Azure & Foam", hex: "#0096c7", extraPrice: 0 },
        { name: "Deep Pacific Navy", hex: "#03045e", extraPrice: 0 }
      ],
      sizes: ["14\" x 7\"", "16\" x 8\" (Standard)", "18\" x 9\" (+₹500)"],
      letteringStyle: ["Crisp 3D White Acrylic", "3D Mirror Gold Acrylic"],
      mountingOption: ["Concealed Back Hooks", "Floating Standoffs"],
      allowCustomText: true,
      textPlaceholder: "Names & Flat/House Number (e.g. 'The Kapoors - #402')"
    }
  },
  {
    id: "prod-np-03",
    name: "Botanical Pressed Flower Acrylic & Resin Transparent Nameplate",
    category: "name-plates",
    categoryName: "Name Plates",
    price: 2399,
    originalPrice: 3499,
    rating: 4.8,
    reviewCount: 34,
    badge: "New Arrival",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 12,
    curingTimeDays: "5 days",
    dimensions: "14 inches x 8 inches",
    weight: "1.2 kg",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "A dreamy glass-like nameplate featuring pressed wildflowers, golden eucalyptus leaves, and 24k gold flakes, set between crystal acrylic with rose gold metallic lettering.",
    features: [
      "Natural botanical floral garland border",
      "Transparent floating look against your doorway wall",
      "Includes 4 rose gold mounting standoffs"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Rose Garden Flowers & Gold", hex: "#f4a261", extraPrice: 0 },
        { name: "White Lily & Silver Flakes", hex: "#e9d8a6", extraPrice: 0 }
      ],
      sizes: ["12\" x 6\"", "14\" x 8\" (Standard)", "16\" x 9\" (+₹450)"],
      letteringStyle: ["Rose Gold Mirror Letters", "Gold Mirror Letters"],
      mountingOption: ["4 Metallic Standoffs (Included)"],
      allowCustomText: true,
      textPlaceholder: "Couple Names / Family Surname & House Number"
    }
  },
  {
    id: "prod-np-04",
    name: "Backlit LED Geode Luxury Residence Nameplate",
    category: "name-plates",
    categoryName: "Name Plates",
    price: 3999,
    originalPrice: 5999,
    rating: 5.0,
    reviewCount: 51,
    badge: "Luxury Edition",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 6,
    curingTimeDays: "7 business days",
    dimensions: "18 inches x 9 inches x 1.5 inches deep box",
    weight: "2.4 kg",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The pinnacle of entrance prestige. Features a glowing warm LED backlit channel behind a deep onyx and gold resin geode plaque with embedded quartz crystals that illuminates your family name at night.",
    features: [
      "Warm White waterproof LED strip embedded inside",
      "Includes 12V 1.5A power adapter (Plug & Play)",
      "High impact acrylic back casing",
      "Stunning ambient night glow"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Onyx Black & Gold Geode", hex: "#14213d", extraPrice: 0 },
        { name: "Sapphire Blue & Quartz", hex: "#03045e", extraPrice: 0 }
      ],
      sizes: ["18\" x 9\" Standard", "22\" x 11\" Grand Villa (+₹1000)"],
      letteringStyle: ["Edge-lit 3D Gold Acrylic", "3D Brass Finish"],
      mountingOption: ["LED Standoffs with power wire outlet"],
      allowCustomText: true,
      textPlaceholder: "Line 1: Full Names, Line 2: Residence / Flat Details"
    }
  },

  // --- COASTERS ---
  {
    id: "prod-cst-01",
    name: "Agate Geode Resin Coasters with Hand-Gilded Gold Trim (Set of 4)",
    category: "coasters",
    categoryName: "Coasters",
    price: 899,
    originalPrice: 1299,
    rating: 4.9,
    reviewCount: 96,
    badge: "Bestseller",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 35,
    curingTimeDays: "3 business days",
    dimensions: "Approx. 4.2 to 4.5 inches diameter each",
    weight: "480 grams (set of 4)",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Elevate your coffee table or cocktail bar with these handcrafted agate geode coasters. Poured with translucent jewel pigments, crushed glass crystal centers, and finished with 24K liquid gold hand-painted gilded rims.",
    features: [
      "Set of 4 unique, organic-shaped geode coasters",
      "Heat-resistant up to 90°C (safe for piping hot coffee mugs and cold drinks)",
      "Protective silicone bumper feet underneath to prevent scratching tabletops",
      "Waterproof and wipes clean with a damp microfiber cloth",
      "Includes a branded satin ribbon tie ready for gifting"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Emerald Green & Gold", hex: "#1b4332", extraPrice: 0 },
        { name: "Ocean Turquoise & Gold", hex: "#0077b6", extraPrice: 0 },
        { name: "Rose Quartz Blush & Gold", hex: "#e5989b", extraPrice: 0 },
        { name: "Royal Amethyst Purple & Gold", hex: "#5a189a", extraPrice: 0 },
        { name: "Onyx Black & Metallic Copper", hex: "#212529", extraPrice: 0 }
      ],
      foilTypes: ["24K Liquid Gold Rim", "Sterling Silver Rim", "Rose Gold Gilded Rim"],
      setQuantity: ["Set of 4 Coasters", "Set of 6 Coasters (+₹399)", "Set of 4 + Matching Coaster Holder (+₹249)"],
      allowCustomText: true,
      textPlaceholder: "Monogram initial in corner (e.g. 'S' or 'R&M')"
    }
  },
  {
    id: "prod-cst-02",
    name: "Bondi Ocean Wave Acacia Wood & Epoxy Coaster Set (Set of 4)",
    category: "coasters",
    categoryName: "Coasters",
    price: 999,
    originalPrice: 1499,
    rating: 5.0,
    reviewCount: 68,
    badge: "Artisan Pick",
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 20,
    curingTimeDays: "3-4 days",
    dimensions: "4 inches x 4 inches square/round",
    weight: "520 grams set",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Half natural acacia wood with rich natural grain, half vibrant Caribbean ocean resin with 3D frothy seafoam waves. Coated with food-grade high-gloss finish.",
    features: [
      "Genuine durable acacia hardwood base",
      "Realistic cellular wave foam",
      "Food-safe, heat-resistant, and scratch-resistant"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Caribbean Blue Waves", hex: "#00b4d8", extraPrice: 0 },
        { name: "Deep Pacific Navy", hex: "#03045e", extraPrice: 0 },
        { name: "Emerald Sea Spray", hex: "#2d6a4f", extraPrice: 0 }
      ],
      foilTypes: ["Fine Gold Shimmer Wave", "Natural Shell Inclusions"],
      setQuantity: ["Set of 4", "Set of 6 (+₹450)"],
      shape: ["Square with Rounded Corners", "Circular Discs"],
      allowCustomText: true,
      textPlaceholder: "Laser engraved initials on wood (e.g. 'V&A')"
    }
  },
  {
    id: "prod-cst-03",
    name: "Pressed Botanical Wildflower Hexagon Coasters (Set of 4)",
    category: "coasters",
    categoryName: "Coasters",
    price: 949,
    originalPrice: 1399,
    rating: 4.8,
    reviewCount: 42,
    badge: "Trending",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 25,
    curingTimeDays: "3 days",
    dimensions: "4 inches hexagon",
    weight: "440 grams set",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Preserved baby's breath, mini daisies, and fern fronds arranged in modern geometric hexagons with a scattering of 24K gold foil.",
    features: [
      "Hand-pressed seasonal flowers",
      "Diamond clear transparent resin",
      "Anti-slip clear silicone feet"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Sunny Meadow Florals", hex: "#f4a261", extraPrice: 0 },
        { name: "Pastel Lavender & Pink", hex: "#c77dff", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Leaf", "Silver Leaf", "Rose Gold Leaf"],
      setQuantity: ["Set of 4", "Set of 6 (+₹400)"],
      allowCustomText: false
    }
  },
  {
    id: "prod-cst-04",
    name: "Midnight Black & 24K Gold Flake Luxury Coasters (Set of 4)",
    category: "coasters",
    categoryName: "Coasters",
    price: 849,
    originalPrice: 1199,
    rating: 4.9,
    reviewCount: 39,
    badge: "Modern Lux",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: true,
    stock: 22,
    curingTimeDays: "3 days",
    dimensions: "4.2 inches diameter",
    weight: "460 grams set",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Bold, dramatic contrast of deep onyx resin with floating dense 24K gold leaf veins. Hand-gilded metallic gold rim creates a regal tabletop presence.",
    features: [
      "High opacity black pigment with gold suspension",
      "Luxury gilded rim",
      "Heat-resistant up to 90°C"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Onyx Black & Gold", hex: "#18181b", extraPrice: 0 },
        { name: "White Carrara & Gold", hex: "#f8f9fa", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Leaf", "Rose Gold Leaf"],
      setQuantity: ["Set of 4", "Set of 6 (+₹380)"],
      allowCustomText: true,
      textPlaceholder: "Monogram initial (optional)"
    }
  },

  // --- CUSTOMIZED GIFTS ---
  {
    id: "prod-cg-01",
    name: "Wedding Varmala Garland Flower Preservation Resin Hexagon Block",
    category: "customized-gifts",
    categoryName: "Customized Gifts",
    price: 3999,
    originalPrice: 5999,
    rating: 5.0,
    reviewCount: 114,
    badge: "Heirloom Pick",
    isFeatured: true,
    isBestseller: true,
    isNew: false,
    isFestival: false,
    stock: 12,
    curingTimeDays: "12-14 days (Multi-stage flower dehydration & deep pour)",
    dimensions: "8 inches height x 9 inches width x 2 inches thickness",
    weight: "2.3 kg solid crystal resin",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Don't let your once-in-a-lifetime wedding varmala garland dry up and wither away in a box. Send us your fresh or dried wedding flowers, and our master artisans will dehydrate them using specialized silica preservation before encasing them in a massive, optically flawless 8-inch crystal resin hexagon or heart keepsake block.",
    features: [
      "Professional 7-day silica gel moisture extraction preserves flower shape & vibrant color",
      "Slow-curing low-exotherm deep pour resin prevents petal scorching or discoloration",
      "Can incorporate wedding invitation card, varmala flowers, groom's brooch, or kaleere",
      "Personalized with couple's names, wedding hashtag, and wedding date in gold calligraphy",
      "Optional Warm LED wooden display light base with USB switch",
      "Free pan-India pickup of your wedding flowers arranged!"
    ],
    customizationOptions: {
      shape: ["Large Hexagon (8\" x 9\")", "Large Heart Block (8\" x 8\")", "Square Keepsake Cube (7\" x 7\")", "Arched Dome Block (+₹500)"],
      foilTypes: ["24K Gold Foil Flakes", "Rose Gold Flakes", "Silver Dust", "Clear Minimalist (No Foil)"],
      displayBase: ["Solid Teak LED Warm Glow Base (+₹699)", "Standard Acrylic Stand (Free)", "No Stand (Free-standing)"],
      allowPhotoUpload: true,
      allowCustomText: true,
      textPlaceholder: "Couple Names & Wedding Date (e.g. 'Ananya & Kabir - 24.11.2024')"
    }
  },
  {
    id: "prod-cg-02",
    name: "Baby's First Milestone Birth Stats Keepsake Resin Pyramid",
    category: "customized-gifts",
    categoryName: "Customized Gifts",
    price: 2499,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 48,
    badge: "New Arrival",
    isFeatured: true,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 15,
    curingTimeDays: "5-6 days",
    dimensions: "6 inches x 6 inches pyramid base",
    weight: "1.1 kg",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Preserve the precious memory of your newborn's arrival forever. Handcrafted pyramid block embedding baby's hospital tag, umbilical cord clamp, first lock of hair, birth weight, height, time, and baby photo.",
    features: [
      "Crystal clear optical resin with gold leaf floating halo",
      "Permanent custom birth stats plaque",
      "Safe preservation for hospital wristband & hospital memorabilia"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Baby Blue Cloud & Silver", hex: "#bde0fe", extraPrice: 0 },
        { name: "Baby Pink Blossom & Gold", hex: "#ffc8dd", extraPrice: 0 },
        { name: "Pastel Lemon & Gold", hex: "#fefae0", extraPrice: 0 },
        { name: "Pure Crystal Clear & Gold", hex: "#ffffff", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Leaf", "Silver Stars", "Rose Gold Flakes"],
      allowPhotoUpload: true,
      allowCustomText: true,
      textPlaceholder: "Baby Name, Birth Date, Time, Weight, Hospital (e.g. 'Aarav | 18 Aug 2024 | 3.2 kg | 10:45 AM')"
    }
  },
  {
    id: "prod-cg-03",
    name: "Custom 3D Resin Photo Keepsake Night Light with Wooden LED Base",
    category: "customized-gifts",
    categoryName: "Customized Gifts",
    price: 1999,
    originalPrice: 2899,
    rating: 4.9,
    reviewCount: 83,
    badge: "Trending",
    isFeatured: false,
    isBestseller: true,
    isNew: false,
    isFestival: true,
    stock: 20,
    curingTimeDays: "4-5 days",
    dimensions: "6 inches x 5 inches x 1 inch thick block",
    weight: "850 grams",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Transform your favorite memories into glowing art. Your high-definition photo is sealed inside high-refraction resin with dried flowers and gold flakes, slotted into a solid beechwood LED base that casts a magical ambient glow.",
    features: [
      "Warm ambient LED base with USB cord and on/off rocker switch",
      "Waterproof archival photo print inside resin",
      "Stunning bedside night lamp or living room mantle showpiece"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Golden Shimmer Flakes", hex: "#d4af37", extraPrice: 0 },
        { name: "Pink & White Floral Surround", hex: "#ffafcc", extraPrice: 0 },
        { name: "Blue Lagoon Tint", hex: "#90e0ef", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Leaf", "Rose Gold", "None"],
      allowPhotoUpload: true,
      allowCustomText: true,
      textPlaceholder: "Engraving on Wooden Base (e.g. 'Forever & Always - R&S')"
    }
  },
  {
    id: "prod-cg-04",
    name: "Anniversary Love Vows & Ring Box Keepsake Plaque",
    category: "customized-gifts",
    categoryName: "Customized Gifts",
    price: 2299,
    originalPrice: 3299,
    rating: 5.0,
    reviewCount: 36,
    badge: "Anniversary Spl",
    isFeatured: false,
    isBestseller: false,
    isNew: true,
    isFestival: false,
    stock: 14,
    curingTimeDays: "4 days",
    dimensions: "7 inches x 7 inches",
    weight: "950 grams",
    images: [
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Immortalize your wedding vows, ring exchange date, or love note. Crafted with real pressed red roses, gold calligraphy script, and twin brass pegs to safely hold couple wedding rings.",
    features: [
      "Twin brass pegs hold wedding bands during pooja or bedtime",
      "Personalized love vow calligraphy printed on archival parchment",
      "Clear optical resin with 24k gold leaf accents"
    ],
    customizationOptions: {
      colorPalette: [
        { name: "Rose Petals & Gold", hex: "#b7094c", extraPrice: 0 },
        { name: "Ivory Pearl & Champagne Gold", hex: "#f8f9fa", extraPrice: 0 }
      ],
      foilTypes: ["24K Gold Leaf", "Silver Flakes"],
      allowCustomText: true,
      textPlaceholder: "Couple Names, Date & Your Special 1-line Vow"
    }
  }
];

const INITIAL_PROMO_CODES = [
  { code: "ARTALAY10", discountPercent: 10, minOrder: 500, description: "10% OFF on all handcrafted items" },
  { code: "AURA10", discountPercent: 10, minOrder: 500, description: "10% OFF on all handcrafted items" },
  { code: "FESTIVE15", discountPercent: 15, minOrder: 1500, description: "15% Festival discount on orders above ₹1,500" },
  { code: "FIRSTRESIN", discountPercent: 20, minOrder: 999, description: "20% OFF for first-time art collectors" }
];

const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Shreya Mukherjee",
    city: "Bengaluru",
    rating: 5,
    date: "18 Oct 2026",
    product: "Wedding Varmala Garland Flower Preservation",
    comment: "I was so nervous sending my wedding varmala all the way from Bangalore, but Art आलय (Art Alay) Studio kept me updated at every stage! When the hexagon block arrived, my husband and I literally had tears in our eyes. The flowers look so vibrant and the finish is like diamond crystal!",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "rev-2",
    author: "Rohan & Aditi Sharma",
    city: "Mumbai",
    rating: 5,
    date: "12 Oct 2026",
    product: "Luxury Teak Wood & Emerald River Resin Home Nameplate",
    comment: "The nameplate is pure luxury! Our guests constantly ask where we bought it. The 3D gold letters and deep green emerald river with real gold flakes look even better than the photos. Super sturdy packaging too.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "rev-3",
    author: "Kavita Singhal",
    city: "Delhi NCR",
    rating: 5,
    date: "05 Oct 2026",
    product: "Shubh Bandhan Resin Lotus Toran & Ganesha Shubh Labh",
    comment: "Ordered the festive toran and Shubh Labh pair for Diwali. Real gamechanger! Unlike fresh flower torans that spoil in two days, this is washable, heavy, and sparkles beautifully under our doorway light.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
  },
  {
    id: "rev-4",
    author: "Ananya Deshmukh",
    city: "Pune",
    rating: 5,
    date: "28 Sep 2026",
    product: "Royal Sapphire Geode Wall Clock",
    comment: "The silent sweep is completely noiseless and the quartz crystals shimmer in the sunlight. Truly a centerpiece for my living room wall. Packaging was double-boxed with wooden reinforcement.",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
  }
];

const INITIAL_USERS = [
  {
    username: "Vikas",
    password: "Vikas",
    name: "Vikas Kumar",
    email: "vikas@example.com",
    phone: "+91 98100 12345",
    address: "104, Royal Palms Residency, 100ft Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
    wishlist: ["prod-clk-01", "prod-np-01"],
    avatar: "V",
    joinedDate: "October 2026"
  },
  {
    username: "Meenu",
    password: "Meenu",
    name: "Meenu Sharma",
    email: "meenu.sharma@example.com",
    phone: "+91 98200 67890",
    address: "Flat 702, Silver Sands Apt, Carter Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    wishlist: ["prod-ear-01", "prod-trn-01"],
    avatar: "M",
    joinedDate: "October 2026"
  },
  {
    username: "Ananta",
    password: "Ananta",
    name: "Ananta Verma",
    email: "ananta.verma@example.com",
    phone: "+91 98300 45678",
    address: "Villa 18, Lakeview Enclave, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560066",
    wishlist: ["prod-cst-01", "prod-bm-01"],
    avatar: "A",
    joinedDate: "October 2026"
  }
];

const INITIAL_SAMPLE_ORDERS = [
  // --- VIKAS'S ORDERS ---
  {
    orderId: "ORD-VIKAS-101",
    username: "Vikas",
    customer: {
      name: "Vikas Kumar",
      phone: "+91 98100 12345",
      email: "vikas@example.com",
      address: "104, Royal Palms Residency, 100ft Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    items: [
      {
        id: "prod-np-01",
        name: "Luxury Teak Wood & Emerald River Resin Home Nameplate",
        price: 2799,
        quantity: 1,
        selectedOptions: {
          color: "Emerald River & 24K Gold",
          size: "16\" x 8\" (Standard)",
          foil: "24K Gold Leaf",
          customText: "Vikas Kumar - Palm Sanctuary"
        },
        image: "images/name-plates.svg"
      }
    ],
    subtotal: 2799,
    discount: 280,
    shipping: 0,
    total: 2519,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    orderStatus: "Curing", // Placed -> Resin Poured -> Curing -> Polishing -> Shipped -> Delivered
    trackingSteps: [
      { status: "Order Placed", date: "20 Oct 2026, 02:30 PM", completed: true, note: "Order confirmed and master artisan assigned" },
      { status: "Resin Poured", date: "21 Oct 2026, 11:15 AM", completed: true, note: "Emerald pigment and 24K gold foil layered with reclaimed teak" },
      { status: "Deep Curing (72h)", date: "22 Oct 2026, 09:00 AM", completed: true, active: true, note: "Curing under temperature-controlled UV chambers" },
      { status: "Sanding & Polishing", date: "Estimated 23 Oct 2026", completed: false, note: "Diamond bevel edging and glass buffing" },
      { status: "Dispatched", date: "Estimated 24 Oct 2026", completed: false, note: "BlueDart Express Courier" },
      { status: "Delivered", date: "Estimated 26 Oct 2026", completed: false, note: "Doorstep delivery to Indiranagar" }
    ],
    trackingNumber: "BD-88492019IN",
    placedAt: "2026-10-20T14:30:00.000Z"
  },
  {
    orderId: "ORD-VIKAS-102",
    username: "Vikas",
    customer: {
      name: "Vikas Kumar",
      phone: "+91 98100 12345",
      email: "vikas@example.com",
      address: "104, Royal Palms Residency, 100ft Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    items: [
      {
        id: "prod-clk-01",
        name: "Royal Sapphire Geode Resin Wall Clock with Quartz",
        price: 3499,
        quantity: 1,
        selectedOptions: {
          color: "Royal Sapphire & Gold",
          size: "14 Inches (Standard)",
          dialTypes: "Roman Numerals (Gold)",
          handsColor: "Polished Gold Hands"
        },
        image: "images/wall-clock.svg"
      }
    ],
    subtotal: 3499,
    discount: 0,
    shipping: 0,
    total: 3499,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingSteps: [
      { status: "Order Placed", date: "10 Oct 2026", completed: true, note: "Order placed & quartz selected" },
      { status: "Resin Poured", date: "11 Oct 2026", completed: true, note: "Deep sapphire resin layered with crystals" },
      { status: "Deep Curing (72h)", date: "12 Oct 2026", completed: true, note: "Diamond crystal cured" },
      { status: "Sanding & Polishing", date: "13 Oct 2026", completed: true, note: "Movement calibrated" },
      { status: "Dispatched", date: "14 Oct 2026", completed: true, note: "Delhivery Express (AWB: DEL-772910)" },
      { status: "Delivered", date: "16 Oct 2026, 04:15 PM", completed: true, active: true, note: "Delivered safely and installed" }
    ],
    trackingNumber: "DEL-772910",
    placedAt: "2026-10-10T11:00:00.000Z"
  },

  // --- MEENU'S ORDERS ---
  {
    orderId: "ORD-MEENU-201",
    username: "Meenu",
    customer: {
      name: "Meenu Sharma",
      phone: "+91 98200 67890",
      email: "meenu.sharma@example.com",
      address: "Flat 702, Silver Sands Apt, Carter Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    },
    items: [
      {
        id: "prod-trn-01",
        name: "Shubh Bandhan Handcrafted Resin Lotus & Marigold Festive Toran",
        price: 1899,
        quantity: 1,
        selectedOptions: {
          color: "Lotus Crimson & Amber Gold",
          foil: "24K Gold Foil Veins",
          bellStyle: "Tinkle Brass Ghungroo Bells"
        },
        image: "images/toran.svg"
      }
    ],
    subtotal: 1899,
    discount: 0,
    shipping: 0,
    total: 1899,
    paymentMethod: "Credit Card (HDFC)",
    paymentStatus: "Paid",
    orderStatus: "Resin Poured",
    trackingSteps: [
      { status: "Order Placed", date: "21 Oct 2026, 09:45 AM", completed: true, note: "Festive rush order confirmed" },
      { status: "Resin Poured", date: "22 Oct 2026, 10:30 AM", completed: true, active: true, note: "7 Lotus motifs cast with preserved marigold petals" },
      { status: "Deep Curing (72h)", date: "Scheduled 23 Oct 2026", completed: false, note: "UV chamber curing" },
      { status: "Sanding & Polishing", date: "Scheduled 24 Oct 2026", completed: false, note: "Brass bells attachment" },
      { status: "Dispatched", date: "Estimated 25 Oct 2026", completed: false, note: "Air Express Mumbai Delivery" },
      { status: "Delivered", date: "Estimated 26 Oct 2026", completed: false, note: "Festive arrival" }
    ],
    trackingNumber: "EXP-MUM-99214",
    placedAt: "2026-10-21T09:45:00.000Z"
  },
  {
    orderId: "ORD-MEENU-202",
    username: "Meenu",
    customer: {
      name: "Meenu Sharma",
      phone: "+91 98200 67890",
      email: "meenu.sharma@example.com",
      address: "Flat 702, Silver Sands Apt, Carter Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    },
    items: [
      {
        id: "prod-ear-01",
        name: "Ocean Serenade Gold Flake Resin Drop Earrings",
        price: 699,
        quantity: 1,
        selectedOptions: {
          color: "Ocean Teal & Gold",
          foil: "24K Gold Flakes",
          hooks: "Surgical Steel Hooks"
        },
        image: "images/earrings.svg"
      }
    ],
    subtotal: 699,
    discount: 0,
    shipping: 0,
    total: 699,
    paymentMethod: "UPI (PhonePe)",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    trackingSteps: [
      { status: "Order Placed", date: "05 Oct 2026", completed: true, note: "Order placed" },
      { status: "Resin Poured", date: "06 Oct 2026", completed: true, note: "Earring mold cured" },
      { status: "Deep Curing (72h)", date: "07 Oct 2026", completed: true, note: "Curing complete" },
      { status: "Sanding & Polishing", date: "08 Oct 2026", completed: true, note: "Hooks assembled" },
      { status: "Dispatched", date: "09 Oct 2026", completed: true, note: "Delhivery Air" },
      { status: "Delivered", date: "11 Oct 2026, 01:20 PM", completed: true, active: true, note: "Delivered with velvet pouch" }
    ],
    trackingNumber: "DEL-441092",
    placedAt: "2026-10-05T16:20:00.000Z"
  },

  // --- ANANTA'S ORDERS ---
  {
    orderId: "ORD-ANANTA-301",
    username: "Ananta",
    customer: {
      name: "Ananta Verma",
      phone: "+91 98300 45678",
      email: "ananta.verma@example.com",
      address: "Villa 18, Lakeview Enclave, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066"
    },
    items: [
      {
        id: "prod-cst-01",
        name: "Agate Geode Resin Coasters with Hand-Gilded Gold Trim",
        price: 899,
        quantity: 1,
        selectedOptions: {
          color: "Emerald Green & Gold",
          foil: "24K Liquid Gold Rim",
          customText: "A&V"
        },
        image: "images/coasters.svg"
      },
      {
        id: "prod-bm-01",
        name: "Enchanted Wildflower Botanical Resin Bookmark",
        price: 249,
        quantity: 2,
        selectedOptions: {
          color: "Lavender Fields",
          foil: "24K Gold Leaf",
          customText: "Ananta"
        },
        image: "images/book-mark.svg"
      }
    ],
    subtotal: 1397,
    discount: 140,
    shipping: 0,
    total: 1257,
    paymentMethod: "Credit Card (Visa)",
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    trackingSteps: [
      { status: "Order Placed", date: "17 Oct 2026", completed: true, note: "Payment verified" },
      { status: "Resin Poured", date: "18 Oct 2026", completed: true, note: "Hand-poured with real botanicals" },
      { status: "Deep Curing (72h)", date: "19 Oct 2026", completed: true, note: "Crystal gloss achieved" },
      { status: "Sanding & Polishing", date: "20 Oct 2026", completed: true, note: "Liquid gold rim applied" },
      { status: "Dispatched", date: "21 Oct 2026", completed: true, active: true, note: "Shipped via Delhivery Express (AWB: DEL-9938102)" },
      { status: "Delivered", date: "Estimated 23 Oct 2026", completed: false, note: "Out for delivery in Whitefield" }
    ],
    trackingNumber: "DEL-9938102",
    placedAt: "2026-10-17T10:15:00.000Z"
  },
  {
    orderId: "ORD-ANANTA-302",
    username: "Ananta",
    customer: {
      name: "Ananta Verma",
      phone: "+91 98300 45678",
      email: "ananta.verma@example.com",
      address: "Villa 18, Lakeview Enclave, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066"
    },
    items: [
      {
        id: "prod-clk-03",
        name: "Gilded Marble Luxury Resin Wall Clock 15-Inch",
        price: 3199,
        quantity: 1,
        selectedOptions: {
          color: "White Marble & Gold",
          size: "15 Inches Standard",
          dialTypes: "Gold Mirror Roman Numerals",
          handsColor: "Brushed Gold Hands"
        },
        image: "images/wall-clock.svg"
      }
    ],
    subtotal: 3199,
    discount: 0,
    shipping: 0,
    total: 3199,
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "Paid",
    orderStatus: "Placed",
    trackingSteps: [
      { status: "Order Placed", date: "22 Oct 2026, 08:30 AM", completed: true, active: true, note: "Order placed & artisan marble template prepared" },
      { status: "Resin Poured", date: "Scheduled 23 Oct 2026", completed: false, note: "Carrara marble effect casting" },
      { status: "Deep Curing (72h)", date: "Scheduled 24 Oct 2026", completed: false, note: "72-hour curing cycle" },
      { status: "Sanding & Polishing", date: "Scheduled 26 Oct 2026", completed: false, note: "Bevel edge hand buffing" },
      { status: "Dispatched", date: "Scheduled 27 Oct 2026", completed: false, note: "Courier dispatch" },
      { status: "Delivered", date: "Estimated 29 Oct 2026", completed: false, note: "Safe doorstep delivery" }
    ],
    trackingNumber: "EXP-BLR-11029",
    placedAt: "2026-10-22T08:30:00.000Z"
  }
];

const INITIAL_CUSTOM_REQUESTS = [
  {
    id: "REQ-8491",
    username: "Meenu",
    customerName: "Meenu Sharma",
    phone: "+91 98200 67890",
    email: "meenu.sharma@example.com",
    productType: "Wedding Garland Varmala Preservation",
    dimensions: "10-inch Square Block with LED Light Base",
    colorPalette: "Pearl White & Rose Gold Shimmer",
    inclusions: "Fresh Varmala Red Roses, Jasmine & Wedding Invitation Card",
    customText: "Meenu & Rohit - 12.12.2026",
    status: "Pending Quote",
    estimatedBudget: "₹5,000 - ₹6,500",
    notes: "Wedding on Dec 12th. Want flowers picked up from Bandra venue.",
    createdAt: "2026-10-21T09:20:00.000Z"
  },
  {
    id: "REQ-8492",
    username: "Vikas",
    customerName: "Vikas Kumar",
    phone: "+91 98100 12345",
    email: "vikas@example.com",
    productType: "Live Edge River Resin Dining Table Top",
    dimensions: "5 ft x 3 ft Teak Slab",
    colorPalette: "Deep Ocean Turquoise Blue with White Foam Waves",
    inclusions: "Metallic mica pigments, LED channel along river",
    customText: "The Kumar Hearth",
    status: "In Discussion",
    estimatedBudget: "₹35,000 - ₹45,000",
    notes: "Custom conference/dining table for home penthouse in Indiranagar.",
    createdAt: "2026-10-19T16:45:00.000Z"
  },
  {
    id: "REQ-8493",
    username: "Ananta",
    customerName: "Ananta Verma",
    phone: "+91 98300 45678",
    email: "ananta.verma@example.com",
    productType: "Ocean Surf Resin Geode Coffee Table",
    dimensions: "24-inch Round Solid Acacia Wood",
    colorPalette: "Pacific Ocean Navy & Emerald Surf",
    inclusions: "Genuine beach sand, mini sea shells, gold trim",
    customText: "Serenity - Ananta & Varun",
    status: "Approved & Scheduling",
    estimatedBudget: "₹8,500 - ₹10,000",
    notes: "Anniversary gift for balcony lounge in Whitefield.",
    createdAt: "2026-10-21T18:10:00.000Z"
  }
];
