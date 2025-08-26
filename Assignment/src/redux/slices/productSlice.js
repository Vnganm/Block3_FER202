import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
  const res = await axios.post(BASE_URL, newProduct);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, updatedProduct }) => {
  const res = await axios.patch(`${BASE_URL}/${id}`, updatedProduct);
  return res.data;
});

export const removeFromWishlist = createAsyncThunk('products/removeFromWishlist', async ({ userId, wishlist }, { dispatch, getState }) => {
  const user = getState().auth.user;
  const updatedUser = { ...user, wishlist };
  await axios.patch(`http://localhost:3001/users/${userId}`, updatedUser);
  dispatch({ type: 'auth/updateUser', payload: updatedUser });
  return updatedUser;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addProduct.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        // Không cần thay đổi products, chỉ cập nhật user
      });
  },
});

export default productSlice.reducer;