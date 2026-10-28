export const DEFAULT_CATEGORY_IMAGES = {
  "earrings": "images/earrings.svg",
  "wall-clock": "images/wall-clock.svg",
  "book-mark": "images/book-mark.svg",
  "key-chains": "images/key-chains.svg",
  "toran": "images/toran.svg",
  "shubh-labh": "images/shubh-labh/ShubhLabh1_focus.jpg",
  "name-plates": "images/name-plates.svg",
  "coasters": "images/coasters.svg",
  "customized-gifts": "images/customized-gifts.svg"
};

export const INITIAL_CATEGORIES = [
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
    count: 5,
    image: "images/shubh-labh/ShubhLabh1_focus.jpg",
    description: "Traditional auspicious entrance charms and temple jharokhas hand-poured in high-gloss resin with gold calligraphy."
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

export const INITIAL_PROMO_CODES = [
  { code: "FESTIVE15", discountPercent: 15, minOrder: 999, description: "15% OFF festive orders above ₹999" },
  { code: "ARTALAY10", discountPercent: 10, minOrder: 499, description: "10% OFF your handcrafted collection" },
  { code: "FIRSTRESIN", discountPercent: 20, minOrder: 1499, description: "20% OFF first order above ₹1,499" },
  { code: "VARMALA25", discountPercent: 25, minOrder: 4999, description: "25% OFF Wedding Varmala flower blocks" }
];

export const INITIAL_USERS = [
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
    avatar: "V",
    joinedDate: "October 2026",
    role: "admin",
    isAdmin: true
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
    avatar: "M",
    joinedDate: "October 2026",
    role: "user",
    isAdmin: false
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
    avatar: "A",
    joinedDate: "October 2026",
    role: "user",
    isAdmin: false
  }
];
