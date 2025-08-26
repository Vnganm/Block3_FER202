import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import todoReducer from './todoSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    todos: todoReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;