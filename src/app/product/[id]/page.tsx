'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { api } from '@/lib/api';
import { productUtils } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { LoadingSpinner, ErrorComponent, ButtonLoading } from '@/components';

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productId = parseInt(params.id as string);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await api.getProduct(productId);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setAddingToCart(true);
      addToCart(product, quantity);
      setTimeout(() => setAddingToCart(false), 1000);
    } catch {
      setAddingToCart(false);
    }
  };

  if (loading) return <div className="container mx-auto px-4 py-8"><LoadingSpinner /></div>;
  if (error || !product) return <div className="container mx-auto px-4 py-8"><ErrorComponent message={error || 'Product not found'} /></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">← Back to Products</Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8">
          <div className="relative aspect-square">
            <Image src={product.image} alt={product.title} fill className="object-contain" priority />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <span className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-black rounded-full capitalize">
            {product.category}
          </span>
          
          <h1 className="text-3xl font-bold text-dark-primary">{product.title}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-5 h-5 ${i < Math.floor(product.rating.rate) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{product.rating.rate} ({product.rating.count} reviews)</span>
          </div>
          
          <div className="text-3xl font-bold text-dark-primary">{productUtils.formatPrice(product.price)}</div>
          
          <div>
            <h3 className="text-lg font-medium text-dark-primary mb-3">Description</h3>
            <p className="text-dark-secondary leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-primary mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} disabled={quantity <= 1} className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">-</button>
                <span className="w-12 text-center text-lg font-medium text-dark-primary">{quantity}</span>
                <button onClick={() => quantity < 10 && setQuantity(quantity + 1)} disabled={quantity >= 10} className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} disabled={addingToCart} className="w-full flex items-center justify-center px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50">
              {addingToCart ? <><ButtonLoading /><span className="ml-2">Adding...</span></> : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}