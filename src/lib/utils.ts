import { Cart, Product, SortOption } from '@/types';

// LocalStorage utilities
export const storage = {
  getCart: (): Cart => {
    if (typeof window === 'undefined') return { items: [], total: 0 };
    
    try {
      const cart = localStorage.getItem('ecom-cart');
      return cart ? JSON.parse(cart) : { items: [], total: 0 };
    } catch {
      return { items: [], total: 0 };
    }
  },

  setCart: (cart: Cart): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('ecom-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  },

  getTheme: (): string => {
    if (typeof window === 'undefined') return 'light';
    
    try {
      return localStorage.getItem('ecom-theme') || 'light';
    } catch {
      return 'light';
    }
  },

  setTheme: (theme: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('ecom-theme', theme);
    } catch (error) {
      console.error('Failed to save theme to localStorage:', error);
    }
  }
};

// Product utilities
export const productUtils = {
  calculateCartTotal: (cart: Cart): number => {
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },

  sortProducts: (products: Product[], sortOption: SortOption): Product[] => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  },

  filterProducts: (products: Product[], search: string, category: string): Product[] => {
    return products.filter(product => {
      const matchesSearch = search === '' || 
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = category === '' || product.category === category;
      
      return matchesSearch && matchesCategory;
    });
  },

  formatPrice: (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  },

  truncateText: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }
};

// Debounce utility for search
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};