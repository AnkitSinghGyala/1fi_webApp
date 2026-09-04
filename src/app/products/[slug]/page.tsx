"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [addedToast, setAddedToast] = useState(false);
  
  // To handle variant selections (e.g. storage, color)
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.data);
          
          // Set default variants
          const defaults: Record<string, string> = {};
          data.data.variants.forEach((v: any) => {
            if (v.options.length > 0) {
              defaults[v.name] = v.options[0].value;
            }
          });
          setSelectedVariants(defaults);
          
          if (data.data.emiPlans && data.data.emiPlans.length > 0) {
            setSelectedPlanId(data.data.emiPlans[0].id);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8 text-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Product not found</h2>
        <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  // Calculate dynamic price and image based on variants
  let currentPrice = product.basePrice;
  let dynamicImage = product.image;
  
  product.variants.forEach((v: any) => {
    const selectedValue = selectedVariants[v.name];
    if (selectedValue) {
      const option = v.options.find((o: any) => o.value === selectedValue);
      if (option) {
        currentPrice += option.extraPrice;
        if (option.image) {
          dynamicImage = option.image;
        }
      }
    }
  });

  // Calculate dynamic MRP (assume same extra price added to MRP)
  let currentMrp = product.mrp + (currentPrice - product.basePrice);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR'
    });
  };

  const handleAddToCart = () => {
    let emiDetails = undefined;
    if (selectedPlanId && product.emiPlans) {
      const plan = product.emiPlans.find((p: any) => p.id === selectedPlanId);
      if (plan) {
        const totalWithInterest = currentPrice + (currentPrice * (plan.interestRate / 100) * (plan.months / 12));
        const displayMonthly = plan.interestRate === 0 
          ? Math.round(currentPrice / plan.months)
          : Math.round(totalWithInterest / plan.months);
        
        emiDetails = {
          months: plan.months,
          monthlyAmount: displayMonthly,
          interestRate: plan.interestRate
        };
      }
    }

    addToCart({
      productId: product.id,
      name: product.name,
      image: dynamicImage,
      price: currentPrice,
      selectedVariants,
      selectedEmiPlanId: selectedPlanId || undefined,
      emiDetails
    });
    
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/cart');
  };

  return (
    <div className="min-h-[85vh] p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white dark:bg-[#111111] rounded-3xl shadow-lg dark:shadow-none flex flex-col md:flex-row overflow-hidden border border-gray-100 dark:border-gray-800">
        
        {/* Left Column: Image and Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 relative">
          
          {addedToast && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg animate-fade-in-down z-10">
              Added to Cart!
            </div>
          )}

          <div className="mb-4">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Back to Store
            </Link>
          </div>
          
          <h1 className="text-3xl lg:text-4xl leading-tight font-bold mb-2 tracking-tight">{product.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 font-medium">
            {Object.values(selectedVariants).join(' • ')}
          </p>
          
          <div className="flex-grow flex items-center justify-center mb-8 min-h-[250px]">
            <img src={dynamicImage} alt={product.name} className="w-full max-w-[280px] object-contain drop-shadow-md transition-all duration-300" />
          </div>

          {/* Variants section */}
          <div className="mt-auto space-y-6">
            {product.variants.map((variant: any) => (
              <div key={variant.name} className="flex flex-col items-center sm:items-start">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-3">
                  {variant.name}
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {variant.options.map((opt: any) => {
                    const isSelected = selectedVariants[variant.name] === opt.value;
                    if (variant.name === "Color") {
                      // Extended color map for the new products
                      const colorMap: Record<string, string> = {
                        "Silver": "bg-gray-200",
                        "Gold": "bg-[#F3E5AB]",
                        "Space Black": "bg-[#252525]",
                        "Titanium Gray": "bg-gray-400",
                        "Titanium Black": "bg-[#1c1c1e]",
                        "Titanium Violet": "bg-[#5a507a]",
                        "Obsidian": "bg-[#111111]",
                        "Porcelain": "bg-[#f5f5f0]",
                        "Bay": "bg-[#a7c5e2]",
                        "Black": "bg-black",
                        "Platinum Silver": "bg-[#e5e5e5]",
                        "Midnight Blue": "bg-[#191970]",
                        "White": "bg-white",
                        "Dark Gray": "bg-gray-700",
                        "Graphite": "bg-gray-600",
                        "Beige": "bg-[#f5f5dc]",
                        "Pale Grey": "bg-gray-300",
                      };
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: opt.value })}
                          className={`w-8 h-8 rounded-full border-2 focus:outline-none transition-all ${isSelected ? 'border-gray-500 ring-4 ring-gray-200 dark:ring-gray-700' : 'border-gray-200 dark:border-gray-700'} ${colorMap[opt.value] || 'bg-gray-300'}`}
                          title={opt.value}
                        />
                      );
                    }
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: opt.value })}
                        className={`px-5 py-2.5 text-sm rounded-xl border transition-all font-medium ${
                          isSelected 
                            ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-300' 
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pricing and EMI Plans */}
        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-[#1a1a1a] p-8 md:p-12 flex flex-col">
          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-tight">{formatPrice(currentPrice)}</h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-sm text-gray-400 line-through">{formatPrice(currentMrp)}</p>
              <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                Save {formatPrice(currentMrp - currentPrice)}
              </span>
            </div>
          </div>

          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Available EMI Plans
          </h3>
          
          <div className="flex-grow overflow-y-auto space-y-3 pr-2 max-h-[360px] custom-scrollbar mb-8">
            {product.emiPlans && product.emiPlans.length > 0 ? (
              product.emiPlans.map((plan: any) => {
                const monthlyInstallment = Math.round(currentPrice / plan.months);
                const totalWithInterest = currentPrice + (currentPrice * (plan.interestRate / 100) * (plan.months / 12));
                const displayMonthly = plan.interestRate === 0 
                  ? monthlyInstallment 
                  : Math.round(totalWithInterest / plan.months);
                
                const isSelected = selectedPlanId === plan.id;

                return (
                  <div 
                    key={plan.id} 
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-blue-500 bg-white dark:bg-[#222] shadow-md ring-1 ring-blue-500' 
                        : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-[#222]/50 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white dark:hover:bg-[#222]'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                        </div>
                      </div>
                      <div className="ml-4 flex-grow flex justify-between items-center">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold">{formatPrice(displayMonthly)}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">/mo</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                            For {plan.months} months
                          </p>
                          {plan.cashback > 0 && (
                            <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1.5 flex items-center gap-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg>
                              {formatPrice(plan.cashback)} cashback
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                            plan.interestRate === 0 
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}>
                            {plan.interestRate === 0 ? "No Cost EMI" : `${plan.interestRate}% p.a.`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-4 bg-white dark:bg-[#222] rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500">
                No EMI plans available for this product.
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-white dark:bg-[#222] border-2 border-gray-900 dark:border-gray-600 hover:border-black dark:hover:border-gray-400 text-gray-900 dark:text-white font-bold py-3.5 px-6 rounded-xl transition-all"
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Buy Now
            </button>
          </div>
        </div>
        
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translate(-50%, -10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
