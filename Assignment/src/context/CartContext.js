import React, { createContext, useReducer, useContext, useMemo, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = { items: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => 
        item.productId === action.payload.productId && 
        item.userId === action.payload.userId
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId && item.userId === action.payload.userId
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      }
      return { 
        ...state, 
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }] 
      };
    }
    case 'REMOVE_FROM_CART':
      return { 
        ...state, 
        items: state.items.filter(item => item.id !== action.payload) 
      };
    case 'UPDATE_QTY':
      return { 
        ...state, 
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.qty }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const count = useMemo(() => state.items.reduce((sum, item) => sum + item.qty, 0), [state.items]);
  const subtotal = useMemo(() => state.items.reduce((sum, item) => sum + item.price * item.qty, 0), [state.items]);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.items]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          parsedCart.forEach(item => {
            dispatch({ type: 'ADD_TO_CART', payload: item });
          });
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  return (
    <CartStateContext.Provider value={{ ...state, count, subtotal }}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);