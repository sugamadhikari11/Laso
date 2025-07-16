// src/context/ShopContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { PRODUCTS } from '../data/ProductsData'; // adjust path as needed

// Create context
const ShopContext = createContext();

// Provider component
export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentView, setCurrentView] = useState('shop');

  const addToCart = (productId, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'processing',
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  const value = {
    cart,
    favorites,
    orders,
    currentView,
    setCurrentView,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleFavorite,
    getCartTotal,
    getCartItemsCount,
    placeOrder
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

// Custom hook
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
