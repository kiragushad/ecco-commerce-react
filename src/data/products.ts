import { Product, Category } from '@/types/product';

// Categories
export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Latest gadgets and electronic devices',
    image: '/images/categories/electronics.png', // Local image path example
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Stylish and comfortable clothing for all seasons',
    image: '/images/categories/clothing.png', // Local image path example
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look with our accessories',
    image: '/images/categories/accessories.png', // Local image path example
  },
  {
    id: 'home-decor',
    name: 'Home Decor',
    description: 'Beautiful items to decorate your home',
    image: '/images/categories/home-decor.png', // Local image path example
  }
];

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation technology and long battery life.',
    price: 199.99,
    image: '/images/products/headphones.png', // Local image path example
    category: 'electronics',
    brand: 'SoundMaster',
    rating: 4.8,
    countInStock: 15,
    numReviews: 42,
    featured: true,
    isNew: true,
    tags: ['wireless', 'audio', 'noise-cancelling']
  },
  {
    id: '2',
    name: 'Ultra-Slim Laptop Pro',
    description: 'A powerful laptop that weighs just 2.5 pounds. Perfect for professionals on the go.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'electronics',
    brand: 'TechPro',
    rating: 4.9,
    countInStock: 8,
    numReviews: 31,
    featured: true,
    tags: ['laptop', 'ultrabook', 'professional']
  },
  {
    id: '3',
    name: 'Classic Cotton T-Shirt',
    description: 'Super soft, premium cotton t-shirt with a comfortable fit.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'clothing',
    brand: 'ComfortWear',
    rating: 4.5,
    countInStock: 50,
    numReviews: 87,
    discount: 20,
    tags: ['cotton', 't-shirt', 'casual']
  },
  {
    id: '4',
    name: 'Designer Watch',
    description: 'Elegant, hand-crafted watch with a stainless steel band and premium movement.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'accessories',
    brand: 'TimeCraft',
    rating: 4.7,
    countInStock: 12,
    numReviews: 28,
    featured: true,
    tags: ['watch', 'luxury', 'stainless steel']
  },
  {
    id: '5',
    name: 'Smart Home Hub',
    description: 'Control your entire home with this easy-to-use smart hub. Compatible with most smart devices.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc0d3?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'electronics',
    brand: 'SmartLiving',
    rating: 4.4,
    countInStock: 25,
    numReviews: 36,
    isNew: true,
    tags: ['smart home', 'automation', 'voice control']
  },
  {
    id: '6',
    name: 'Premium Denim Jeans',
    description: 'Classic fit jeans made with premium denim for durability and comfort.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'clothing',
    brand: 'DenimCo',
    rating: 4.6,
    countInStock: 35,
    numReviews: 52,
    discount: 15,
    tags: ['jeans', 'denim', 'casual']
  },
  {
    id: '7',
    name: 'Leather Wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots and RFID protection.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'accessories',
    brand: 'LeatherCraft',
    rating: 4.8,
    countInStock: 40,
    numReviews: 63,
    tags: ['wallet', 'leather', 'accessories']
  },
  {
    id: '8',
    name: 'Minimalist Table Lamp',
    description: 'Modern, minimalist lamp that adds elegance to any room. Features adjustable brightness.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'home-decor',
    brand: 'ModernHome',
    rating: 4.3,
    countInStock: 18,
    numReviews: 24,
    isNew: true,
    tags: ['lamp', 'lighting', 'home decor']
  },
  {
    id: '9',
    name: 'Athletic Running Shoes',
    description: 'Lightweight, breathable running shoes with superior cushioning and support.',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'clothing',
    brand: 'ActiveStep',
    rating: 4.7,
    countInStock: 22,
    numReviews: 45,
    featured: true,
    tags: ['shoes', 'athletic', 'running']
  },
  {
    id: '10',
    name: 'Digital Camera Kit',
    description: 'Professional-grade digital camera with multiple lenses and accessories.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'electronics',
    brand: 'PhotoPro',
    rating: 4.9,
    countInStock: 7,
    numReviews: 19,
    tags: ['camera', 'photography', 'digital']
  },
  {
    id: '11',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic coffee mugs. Microwave and dishwasher safe.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'home-decor',
    brand: 'HomeEssentials',
    rating: 4.5,
    countInStock: 30,
    numReviews: 38,
    discount: 10,
    tags: ['mugs', 'kitchen', 'ceramic']
  },
  {
    id: '12',
    name: 'Winter Coat',
    description: 'Warm, waterproof winter coat with detachable hood and multiple pockets.',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=600&h=600&q=80',
    category: 'clothing',
    brand: 'WinterWear',
    rating: 4.6,
    countInStock: 15,
    numReviews: 29,
    tags: ['coat', 'winter', 'outerwear']
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(product => product.discount && product.discount > 0);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
