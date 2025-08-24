export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export type SortOption = 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc';

export type Theme = 'light' | 'dark';

export interface FilterState {
  category: string;
  search: string;
  sort: SortOption;
}