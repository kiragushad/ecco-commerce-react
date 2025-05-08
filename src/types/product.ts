
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  countInStock: number;
  numReviews: number;
  featured?: boolean;
  discount?: number;
  isNew?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  brand?: string;
  sortBy?: 'price-low-high' | 'price-high-low' | 'newest' | 'popular';
}
