"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 text-center flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
        <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  // Calculate dynamic price based on variants
  let currentPrice = product.basePrice;
  product.variants.forEach((v: any) => {
    const selectedValue = selectedVariants[v.name];
    if (selectedValue) {
      const option = v.options.find((o: any) => o.value === selectedValue);
      if (option) {
        currentPrice += option.extraPrice;
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

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4 sm:p-8 font-[family-name:var(--font-geist-sans)] text-gray-900">
      <div className="max-w-4xl w-full bg-white rounded-[24px] shadow-sm flex flex-col md:flex-row overflow-hidden border border-gray-100">
        
        {/* Left Column: Image and Details */}
        <div className="w-full md:w-5/12 bg-white p-8 flex flex-col border-b md:border-b-0 md:border-r border-gray-100">
          <div className="mb-2">
            <span className="text-[10px] font-bold text-red-500 tracking-widest uppercase">NEW</span>
          </div>
          <h1 className="text-[28px] leading-tight font-medium mb-1 tracking-tight text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-8">{selectedVariants["Storage"] || "256GB"}</p>
          
          <div className="flex-grow flex items-center justify-center mb-8">
            <img src={product.image} alt={product.name} className="w-full max-w-[200px] object-contain" />
          </div>

          {/* Variants section */}
          <div className="mt-auto space-y-5">
            {product.variants.map((variant: any) => (
              <div key={variant.name} className="flex flex-col items-center">
                <p className="text-xs text-gray-400 mb-3">{variant.name === "Color" ? `Available in ${variant.options.length} finishes` : `Select ${variant.name}`}</p>
                <div className="flex gap-4 justify-center">
                  {variant.options.map((opt: any) => {
                    const isSelected = selectedVariants[variant.name] === opt.value;
                    if (variant.name === "Color") {
                      const colorMap: Record<string, string> = {
                        "Silver": "bg-gray-200",
                        "Gold": "bg-[#F3E5AB]",
                        "Space Black": "bg-[#252525]",
                        "Titanium Gray": "bg-gray-400",
                        "Titanium Black": "bg-[#1c1c1e]",
                        "Obsidian": "bg-[#111111]",
                        "Porcelain": "bg-[#f5f5f0]"
                      };
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: opt.value })}
                          className={`w-6 h-6 rounded-full border-2 focus:outline-none transition-all ${isSelected ? 'border-gray-400 ring-2 ring-gray-200' : 'border-transparent'} ${colorMap[opt.value] || 'bg-gray-300'}`}
                          title={opt.value}
                        />
                      );
                    }
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedVariants({ ...selectedVariants, [variant.name]: opt.value })}
                        className={`px-4 py-1.5 text-xs rounded-full border transition-all ${isSelected ? 'border-gray-900 bg-gray-900 text-white font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
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
        <div className="w-full md:w-7/12 bg-[#f9fafb] p-8 flex flex-col">
          <div className="mb-5">
            <h2 className="text-[32px] font-semibold text-gray-900 leading-none">{formatPrice(currentPrice)}</h2>
            <p className="text-sm text-gray-400 line-through mt-1">{formatPrice(currentMrp)}</p>
            <p className="text-sm text-gray-600 mt-2">EMI plans backed by mutual funds</p>
          </div>

          <div className="flex-grow overflow-y-auto space-y-2.5 pr-1 max-h-[420px] custom-scrollbar">
            {product.emiPlans.map((plan: any) => {
              const monthlyInstallment = Math.round(currentPrice / plan.months);
              // Basic interest calculation for demonstration
              const totalWithInterest = currentPrice + (currentPrice * (plan.interestRate / 100) * (plan.months / 12));
              const displayMonthly = plan.interestRate === 0 
                ? monthlyInstallment 
                : Math.round(totalWithInterest / plan.months);
              
              const isSelected = selectedPlanId === plan.id;

              return (
                <div 
                  key={plan.id} 
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`relative p-3 rounded-[12px] bg-white border cursor-pointer transition-all duration-200 ${isSelected ? 'border-gray-900 shadow-sm' : 'border-transparent shadow-sm hover:border-gray-200 hover:shadow-md'}`}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center ${isSelected ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                        {isSelected && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="ml-3 flex-grow flex justify-between items-center">
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-[15px] font-semibold text-gray-900">{formatPrice(displayMonthly)}</span>
                          <span className="text-gray-500 text-[13px] ml-1.5">x {plan.months} months</span>
                        </div>
                        {plan.cashback > 0 && (
                          <p className="text-[11px] text-[#00a65a] font-medium mt-0.5">
                            Additional cashback of {formatPrice(plan.cashback)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[13px] text-gray-600 font-medium">
                          {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 flex gap-3">
            <Link href="/" className="px-5 py-3 rounded-[12px] bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-center text-sm shadow-sm">
              Back
            </Link>
            <button className="flex-grow bg-gray-900 hover:bg-black text-white font-medium py-3 px-6 rounded-[12px] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 text-sm">
              Proceed
            </button>
          </div>
        </div>
        
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
