"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  id: string; // Unique ID for the cart item (product.id + selected variant string)
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedVariants: Record<string, string>;
  selectedEmiPlanId?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem('cartItems');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load cart from local storage', error);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }, [items, isClient]);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems((prevItems) => {
      // Create a unique ID based on product and variants
      const variantString = Object.entries(newItem.selectedVariants)
        .sort(([k1], [k2]) => k1.localeCompare(k2))
        .map(([k, v]) => `${k}:${v}`)
        .join('|');
      
      const uniqueId = `${newItem.productId}-${variantString}`;
      
      const existingItemIndex = prevItems.findIndex(item => item.id === uniqueId);
      
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }
      
      return [...prevItems, { ...newItem, id: uniqueId, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems((prevItems) => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
