import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: '', email: '', age: 0 },
  isLoggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = { name: '', email: '', age: 0 };
      state.isLoggedIn = false;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  }
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;