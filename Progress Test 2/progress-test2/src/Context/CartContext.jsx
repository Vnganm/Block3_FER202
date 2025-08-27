import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToFavourites = (product) => {
    setFavourites([...favourites, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, favourites, addToCart, addToFavourites, removeFromCart, removeFromFavourites }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);