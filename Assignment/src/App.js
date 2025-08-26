// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider, useAuthState } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import Register from './components/Register';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import { Container, Spinner } from 'react-bootstrap';

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthState();

  useEffect(() => {
    const publicRoutes = ['/login', '/register'];
    const from = location.state?.from || '/';
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (user && isPublicRoute) {
      navigate(from, { replace: true });
    } else if (!user && !isPublicRoute) {
      navigate('/login', { state: { from } });
    }
  }, [user, location.pathname, navigate, location.state]);

  if (!user && !['/login', '/register'].includes(location.pathname)) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {user?.role === 'admin' && (
            <Route path="/admin/cart" element={<Cart adminView />} />
          )}
          <Route path="*" element={<div>404 - Không tìm thấy trang</div>} />
        </Routes>
      </Container>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <AppContent />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;