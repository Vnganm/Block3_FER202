import React, { createContext, useReducer, useContext, useMemo, useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const initialState = { items: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'INC_QTY':
      return { ...state, items: state.items.map(item => item.id === action.payload ? { ...item, qty: item.qty + 1 } : item) };
    case 'DEC_QTY':
      return { ...state, items: state.items.map(item => item.id === action.payload && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item) };
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
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) dispatch({ type: 'ADD_TO_CART', payload: JSON.parse(savedCart) });
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