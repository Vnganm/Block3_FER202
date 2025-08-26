import React, { createContext, useReducer, useContext, useMemo, useEffect } from 'react';

const WishlistStateContext = createContext();
const WishlistDispatchContext = createContext();

const initialState = { items: new Set() };

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      return { items: new Set(state.items).add(action.payload) };
    case 'REMOVE_FROM_WISHLIST':
      const newSet = new Set(state.items);
      newSet.delete(action.payload);
      return { items: newSet };
    case 'CLEAR_WISHLIST':
      return { items: new Set() };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const isWished = useMemo(() => (id) => state.items.has(id), [state.items]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) dispatch({ type: 'ADD_TO_WISHLIST', payload: JSON.parse(savedWishlist) });
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...state.items]));
  }, [state.items]);

  return (
    <WishlistStateContext.Provider value={{ ...state, isWished }}>
      <WishlistDispatchContext.Provider value={dispatch}>
        {children}
      </WishlistDispatchContext.Provider>
    </WishlistStateContext.Provider>
  );
};

export const useWishlistState = () => useContext(WishlistStateContext);
export const useWishlistDispatch = () => useContext(WishlistDispatchContext);