'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { productUtils } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`} className="group h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-105 group-hover:shadow-lg h-full flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div className="flex-grow">
            {/* Category */}
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-black rounded-full mb-2 capitalize">
              {product.category}
            </span>

            {/* Title */}
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 min-h-[2.5rem]">
              {productUtils.truncateText(product.title, 60)}
            </h3>
          </div>

          {/* Bottom section with consistent spacing */}
          <div className="mt-auto">
            {/* Price and Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {productUtils.formatPrice(product.price)}
              </span>
              
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {product.rating.rate.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Stock indicator */}
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-300">
                {product.rating.count} in stock
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};