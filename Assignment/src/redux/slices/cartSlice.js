import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCarts = createAsyncThunk('carts/fetchCarts', async () => {
  const res = await axios.get('http://localhost:3001/carts');
  return res.data;
});

export const addToCart = createAsyncThunk('carts/addToCart', async (product, { getState }) => {
  const user = getState().auth.user;
  await axios.patch(`http://localhost:3001/products/${product.id}`, {
    quantity: product.quantity - 1
  });
  const res = await axios.post('http://localhost:3001/carts', {
    productId: product.id,
    quantity: 1,
    userId: user.id
  });
  return res.data;
});

export const addToWishlist = createAsyncThunk('carts/addToWishlist', async (productId, { getState, dispatch }) => {
  const user = getState().auth.user;
  const updatedWishlist = user.wishlist ? [...user.wishlist, productId] : [productId];
  const updatedUser = { ...user, wishlist: updatedWishlist };
  await axios.patch(`http://localhost:3001/users/${user.id}`, updatedUser);
  dispatch({ type: 'auth/updateUser', payload: updatedUser });
  localStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
});

export const updateCartItem = createAsyncThunk('carts/updateCartItem', async ({ id, quantity, productId, oldQuantity }) => {
  const quantityChange = quantity - oldQuantity;
  if (quantityChange !== 0) {
    const productRes = await axios.get(`http://localhost:3001/products/${productId}`);
    await axios.patch(`http://localhost:3001/products/${productId}`, {
      quantity: productRes.data.quantity - quantityChange
    });
  }
  const cartRes = await axios.patch(`http://localhost:3001/carts/${id}`, { quantity });
  return cartRes.data;
});

export const deleteCartItem = createAsyncThunk('carts/deleteCartItem', async ({ id, productId, quantity }, { dispatch }) => {
  await axios.delete(`http://localhost:3001/carts/${id}`);
  const productRes = await axios.get(`http://localhost:3001/products/${productId}`);
  await axios.patch(`http://localhost:3001/products/${productId}`, {
    quantity: productRes.data.quantity + quantity
  });
  return id;
});

export const clearCart = createAsyncThunk('carts/clearCart', async (userId, { getState }) => {
  const res = await axios.get('http://localhost:3001/carts');
  const userCarts = res.data.filter(item => item.userId === userId);
  await Promise.all(userCarts.map(async item => {
    const productRes = await axios.get(`http://localhost:3001/products/${item.productId}`);
    await axios.patch(`http://localhost:3001/products/${item.productId}`, {
      quantity: productRes.data.quantity + item.quantity
    });
    await axios.delete(`http://localhost:3001/carts/${item.id}`);
  }));
  return userId;
});

const cartSlice = createSlice({
  name: 'carts',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addToCart.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.userId !== action.payload);
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        // Không cần thay đổi carts, chỉ cập nhật user
      });
  },
});

export default cartSlice.reducer;