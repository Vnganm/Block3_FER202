import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    { id: '123456', name: 'iPhone 15 Pro', price: 999.99, description: 'Flagship smartphone', catalogs: ['Electronics', 'Smartphones'] },
    { id: '234567', name: 'MacBook Air M2', price: 1299.99, description: 'Ultra-thin laptop', catalogs: ['Electronics', 'Laptops'] },
    { id: '345678', name: 'AirPods Pro', price: 249.99, description: 'Wireless earbuds', catalogs: ['Electronics', 'Audio'] },
    { id: '456789', name: 'Samsung Galaxy S24', price: 899.99, description: 'Latest Android smartphone', catalogs: ['Electronics', 'Smartphones'] }
  ],
  cart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find(item => item.id === productId);
      if (item && quantity > 0) item.quantity = quantity;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;