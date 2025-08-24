import { Product } from '@/types';

const BASE_URL = 'https://fakestoreapi.com';

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
  }
  return response.json();
};

export const api = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to fetch products');
    }
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to fetch product');
    }
  },

  // Get all categories
  getCategories: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to fetch categories');
    }
  },

  // Get products by category
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      return handleResponse(response);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error instanceof ApiError ? error : new ApiError('Failed to fetch products by category');
    }
  }
};

// Custom hooks for data fetching
export const useApi = () => {
  return api;
};