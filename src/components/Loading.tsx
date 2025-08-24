'use client';

// Loading Spinner
export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-600 h-48 w-full rounded-md mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-300 dark:bg-gray-600 h-4 w-3/4 rounded"></div>
        <div className="bg-gray-300 dark:bg-gray-600 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 dark:bg-gray-600 h-4 w-1/4 rounded"></div>
      </div>
    </div>
  );
};

// Products Grid Skeleton
export const ProductsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

// Page Loading
export const PageLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

// Button Loading
export const ButtonLoading = () => {
  return (
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
  );
};