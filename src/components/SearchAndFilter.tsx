'use client';

import { useState, useEffect, useCallback } from 'react';
import { SortOption } from '@/types';
import { debounce } from '@/lib/utils';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  onSort: (sort: SortOption) => void;
  categories: string[];
  loading?: boolean;
}

export const SearchAndFilter = ({
  onSearch,
  onCategoryFilter,
  onSort,
  categories,
  loading = false
}: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('title-asc');

  // Memoized debounced search function
  const debouncedSearch = useCallback(
    debounce(onSearch, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryFilter(category);
  };

  const handleSortChange = (sort: SortOption) => {
    setSelectedSort(sort);
    onSort(sort);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">
            Search products
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:w-48">
          <label htmlFor="category" className="sr-only">
            Filter by category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            disabled={loading}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="lg:w-48">
          <label htmlFor="sort" className="sr-only">
            Sort by
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            disabled={loading}
            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="title-asc">Name A-Z</option>
            <option value="title-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedCategory) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Active filters:
          </span>
          {searchTerm && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50"
              >
                ×
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 capitalize">
              Category: {selectedCategory}
              <button
                onClick={() => handleCategoryChange('')}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};