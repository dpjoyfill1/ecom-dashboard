'use client';

import { useState, useEffect } from 'react';
import { Product, FilterState, SortOption } from '@/types';
import { api } from '@/lib/api';
import { productUtils } from '@/lib/utils';
import {
  ProductCard,
  SearchAndFilter,
  ProductsGridSkeleton,
  ErrorComponent
} from '@/components';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    search: '',
    sort: 'title-asc'
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsData, categoriesData] = await Promise.all([
          api.getProducts(),
          api.getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters and sorting whenever filters or products change
  useEffect(() => {
    let result = [...products];
    
    // Apply search and category filters
    result = productUtils.filterProducts(result, filters.search, filters.category);
    
    // Apply sorting
    result = productUtils.sortProducts(result, filters.sort);
    
    setFilteredProducts(result);
  }, [products, filters]);

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSort = (sort: SortOption) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorComponent
          message={error}
          onRetry={handleRetry}
          fullPage={false}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Discover our amazing collection of products
        </p>
      </div>

      {/* Search and Filter */}
      <SearchAndFilter
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onSort={handleSort}
        categories={categories}
        loading={loading}
      />

      {/* Results Count */}
      {!loading && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <ProductsGridSkeleton />
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-4v2M7 9v2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
