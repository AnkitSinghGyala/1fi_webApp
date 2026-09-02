"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400">Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-12 text-center mt-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">1Fi Store</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Discover the latest smartphones, laptops, and accessories. Premium tech, flexible EMI plans.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product: any) => (
          <Link href={`/products/${product.slug}`} key={product.id} className="block group">
            <div className="bg-white dark:bg-[#111111] rounded-3xl shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center h-full hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-4 left-4">
                {product.emiPlans && product.emiPlans.length > 0 && (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-400 text-white text-[10px] uppercase font-bold tracking-wider py-1 px-2.5 rounded-full shadow-sm">
                    EMI Available
                  </span>
                )}
              </div>
              <div className="h-56 w-full flex items-center justify-center mb-6 overflow-hidden pt-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm" 
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {product.name}
              </h2>
              <div className="flex items-center gap-3 mb-5 mt-auto">
                <p className="text-gray-400 text-sm line-through decoration-gray-300 dark:decoration-gray-600">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </p>
                <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                  ₹{product.basePrice.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-full">
                <span className="block w-full text-center py-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 transition-colors">
                  View Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
