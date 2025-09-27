// Peesaenth Fashion Product Data
// Centralized product management for the fashion landing page

export const products = [
  {
    id: 1,
    name: "Ankara Elegance Maxi Dress",
    category: "women",
    price: "₦85,000",
    originalPrice: "₦95,000",
    description: "Handcrafted Ankara maxi dress with contemporary silhouette, perfect for special occasions",
    detailedDescription: "This stunning Ankara maxi dress combines traditional Nigerian fabric with modern design. Features a flowing silhouette, adjustable waist tie, and intricate embroidery details. Made with premium cotton Ankara fabric sourced locally.",
    images: [
      "https://images.unsplash.com/photo-1566479179817-97e6e5b26e7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1566479179817-97e6e5b26e7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Royal Blue", hex: "#1e40af", available: true },
      { name: "Emerald Green", hex: "#10b981", available: true },
      { name: "Golden Yellow", hex: "#f59e0b", available: false }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    materials: ["100% Premium Cotton Ankara", "Hand-embroidered details", "Lined interior"],
    careInstructions: "Hand wash cold, air dry, iron on low heat",
    inStock: true,
    featured: true,
    tags: ["elegant", "traditional", "handmade", "special occasion"],
    sku: "PF-AD-001"
  },
  {
    id: 2,
    name: "Executive Agbada Set",
    category: "men",
    price: "₦120,000",
    originalPrice: "₦140,000",
    description: "Premium traditional Agbada with modern tailoring for the distinguished gentleman",
    detailedDescription: "Expertly tailored Agbada set crafted from finest Guinea brocade. Features contemporary fit, intricate embroidery, and matching accessories. Perfect for weddings, cultural events, and formal occasions.",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Classic White", hex: "#ffffff", available: true },
      { name: "Royal Navy", hex: "#1e3a8a", available: true },
      { name: "Rich Burgundy", hex: "#991b1b", available: true }
    ],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    materials: ["Guinea Brocade Fabric", "Gold thread embroidery", "Silk lining"],
    careInstructions: "Dry clean only, store hanging",
    inStock: true,
    featured: true,
    tags: ["traditional", "formal", "luxury", "handcrafted"],
    sku: "PF-AG-002"
  },
  {
    id: 3,
    name: "Beaded Clutch Collection",
    category: "accessories",
    price: "₦35,000",
    originalPrice: "₦42,000",
    description: "Artisan-crafted beaded clutch with intricate Nigerian-inspired patterns",
    detailedDescription: "Handmade beaded clutch featuring traditional Nigerian motifs and contemporary design. Each piece is unique, crafted by local artisans using premium beads and quality leather interior.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Gold & Black", hex: "#000000", available: true },
      { name: "Silver & Navy", hex: "#1e40af", available: true },
      { name: "Bronze & Green", hex: "#15803d", available: false }
    ],
    sizes: ["One Size"],
    materials: ["Premium glass beads", "Leather interior", "Magnetic clasp"],
    careInstructions: "Spot clean only, store in dust bag",
    inStock: true,
    featured: true,
    tags: ["handmade", "artisan", "unique", "evening"],
    sku: "PF-BC-003"
  },
  {
    id: 4,
    name: "Contemporary Kaftan Dress",
    category: "women",
    price: "₦65,000",
    originalPrice: "₦75,000",
    description: "Modern kaftan with flowing silhouette and vibrant African print details",
    detailedDescription: "Versatile kaftan dress perfect for both casual and semi-formal occasions. Features a relaxed fit, three-quarter sleeves, and carefully selected African print accents that celebrate our heritage.",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Sunset Orange", hex: "#ea580c", available: true },
      { name: "Ocean Blue", hex: "#0ea5e9", available: true },
      { name: "Forest Green", hex: "#16a34a", available: true }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    materials: ["Soft cotton blend", "African print details", "Breathable fabric"],
    careInstructions: "Machine wash cold, tumble dry low",
    inStock: true,
    featured: true,
    tags: ["versatile", "comfortable", "modern", "cultural"],
    sku: "PF-KD-004"
  },
  {
    id: 5,
    name: "Heritage Watch Collection",
    category: "accessories",
    price: "₦95,000",
    originalPrice: "₦110,000",
    description: "Luxury timepiece with Nigerian-inspired design elements and premium craftsmanship",
    detailedDescription: "Elegant watch featuring traditional Nigerian patterns on the face, premium leather strap, and Swiss movement. A perfect blend of heritage and modern sophistication.",
    images: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Brown Leather", hex: "#92400e", available: true },
      { name: "Black Leather", hex: "#000000", available: true },
      { name: "Navy Leather", hex: "#1e3a8a", available: false }
    ],
    sizes: ["One Size - Adjustable"],
    materials: ["Swiss movement", "Genuine leather strap", "Stainless steel case"],
    careInstructions: "Keep dry, service annually",
    inStock: true,
    featured: true,
    tags: ["luxury", "heritage", "timepiece", "craftsmanship"],
    sku: "PF-HW-005"
  },
  {
    id: 6,
    name: "Senator Suit Collection",
    category: "men",
    price: "₦95,000",
    originalPrice: "₦105,000",
    description: "Contemporary senator suit with traditional Nigerian styling and modern fit",
    detailedDescription: "Sophisticated senator suit perfect for business and formal events. Tailored for contemporary fit while maintaining traditional Nigerian elegance. Includes matching shirt and traditional cap.",
    images: [
      "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    mainImage: "https://images.unsplash.com/photo-1564859228273-274232fdb516?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colors: [
      { name: "Charcoal Grey", hex: "#374151", available: true },
      { name: "Deep Navy", hex: "#1e3a8a", available: true },
      { name: "Classic Black", hex: "#000000", available: true }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    materials: ["Premium wool blend", "Cotton lining", "Horn buttons"],
    careInstructions: "Dry clean only, press with care",
    inStock: true,
    featured: true,
    tags: ["professional", "elegant", "tailored", "complete set"],
    sku: "PF-SS-006"
  }
];

// Get products from localStorage or fallback to static data
export const getAllProducts = () => {
  const savedProducts = localStorage.getItem('peesaenth_products');
  if (savedProducts) {
    try {
      return JSON.parse(savedProducts);
    } catch (error) {
      console.error('Error parsing saved products:', error);
      return products;
    }
  }
  return products;
};

// Helper functions for filtering and searching
export const getProductsByCategory = (category) => {
  const allProducts = getAllProducts();
  if (category === 'all') return allProducts;
  return allProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.featured);
};

export const getProductById = (id) => {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === parseInt(id));
};

export const getAvailableProducts = () => {
  const allProducts = getAllProducts();
  return allProducts.filter(product => product.inStock);
};

// Categories for filtering
export const categories = [
  { id: 'all', label: 'All Collections' },
  { id: 'women', label: 'Women\'s Fashion' },
  { id: 'men', label: 'Men\'s Fashion' },
  { id: 'accessories', label: 'Accessories' }
];