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
    return <div className="p-8 text-center">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-[family-name:var(--font-geist-sans)] text-gray-900">
      <main className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">1Fi Smartphone Store</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <Link href={`/products/${product.slug}`} key={product.id} className="block group">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 flex flex-col items-center h-full">
                <div className="h-48 w-full flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-500 text-sm mb-4 line-through">MRP: ₹{product.mrp.toLocaleString('en-IN')}</p>
                <p className="text-blue-600 font-medium mb-4">Starting at ₹{product.basePrice.toLocaleString('en-IN')}</p>
                <span className="mt-auto px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  View EMI Plans
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
