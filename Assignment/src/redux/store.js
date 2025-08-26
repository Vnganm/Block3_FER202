// ✅ File cấu hình Redux store chính

// Import hàm tạo store từ Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import các reducer con
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

// ✅ Tạo store chính với 3 reducer: auth, products, carts
export const store = configureStore({
  reducer: {
    auth: authReducer,        // state.auth dùng cho đăng nhập
    products: productReducer, // state.products dùng cho danh sách sản phẩm
    carts: cartReducer,       // state.carts dùng cho giỏ hàng
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // sử dụng middleware mặc định
});
