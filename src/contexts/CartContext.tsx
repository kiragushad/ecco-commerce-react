
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, CartItem } from '@/types/product';
import { toast } from '@/components/ui/sonner';

// Define context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // If product already in cart, update quantity
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        
        // Ensure quantity doesn't exceed stock
        if (newQuantity > product.countInStock) {
          toast.error("Sorry, we don't have enough items in stock");
          return prevItems;
        }
        
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
        };
        
        toast.success(`Updated ${product.name} quantity in cart`);
        return updatedItems;
      } else {
        // If product not in cart, add it
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.product.id !== productId
      );
      const removedItem = prevItems.find(item => item.product.id === productId);
      if (removedItem) {
        toast.info(`Removed ${removedItem.product.name} from cart`);
      }
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.product.id === productId) {
          // Ensure quantity is within stock limits
          const validQuantity = Math.min(
            Math.max(1, quantity), // minimum 1, or the new quantity
            item.product.countInStock // maximum is the stock count
          );
          
          return { ...item, quantity: validQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart has been cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price * (1 - item.product.discount / 100) 
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
