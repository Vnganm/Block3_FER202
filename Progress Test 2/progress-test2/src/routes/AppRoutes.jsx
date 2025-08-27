import { Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetails from '../pages/ProductDetails';
import LoginPage from '../pages/LoginPage';
import Favourites from '../pages/Favourites';
import Cart from '../pages/Cart';
// Thêm nếu có Favourites và Cart
// import Favourites from '../pages/Favourites';
// import Cart from '../pages/Cart';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />  // Redirect root đến /products
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}