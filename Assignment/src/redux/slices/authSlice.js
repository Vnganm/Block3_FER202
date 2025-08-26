import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const restoreAuthState = createAsyncThunk(
  'auth/restore',
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user')) || { wishlist: [] };
      return user;
    } catch (error) {
      return rejectWithValue('Failed to restore auth state');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:3001/users');
      const user = res.data.find(u => u.username === username && u.password === password);
      if (!user) return rejectWithValue('Tên đăng nhập hoặc mật khẩu không đúng');
      localStorage.setItem('user', JSON.stringify({ ...user, wishlist: user.wishlist || [] }));
      return { ...user, wishlist: user.wishlist || [] };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:3001/users');
      const userExists = res.data.some(u => u.username === userData.get('username'));
      if (userExists) return rejectWithValue('Tên đăng nhập đã tồn tại');
      const formDataToSend = new FormData();
      for (let [key, value] of userData.entries()) {
        formDataToSend.append(key, value);
      }
      formDataToSend.append('id', Date.now().toString());
      formDataToSend.append('role', 'user');
      formDataToSend.append('wishlist', []);
      const resPost = await axios.post('http://localhost:3001/users', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const newUser = resPost.data;
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('user');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    _hydrated: false,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreAuthState.pending, (state) => { state.status = 'loading'; })
      .addCase(restoreAuthState.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state._hydrated = true;
      })
      .addCase(restoreAuthState.rejected, (state) => {
        state.status = 'failed';
        state._hydrated = true;
      })
      .addCase(loginUser.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => { state.status = 'loading'; })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      });
  },
});

export const { updateUser } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectAuthHydrated = (state) => state.auth._hydrated;

export default authSlice.reducer;