"use client";

import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const router = useRouter();

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.076.721-.506 1.393-1.234 1.393H4.36a1.125 1.125 0 01-1.234-1.393l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 mt-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} Items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-[#111] p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-32 h-32 bg-gray-50 dark:bg-black rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                <img src={item.image} alt={item.name} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    <Link href={`/products/${item.productId}`} className="hover:text-blue-600 transition-colors">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="font-bold whitespace-nowrap ml-4">{formatPrice(item.price)}</p>
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {Object.values(item.selectedVariants).join(' • ')}
                </p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                      &#43;
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 sticky top-24">
            <h2 className="text-xl font-bold mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Estimated Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/checkout')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Proceed to Checkout
            </button>
            
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-blue-600 hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
