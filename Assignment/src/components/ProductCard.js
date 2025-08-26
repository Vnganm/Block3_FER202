import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from '../context/AuthContext';
import { useWishlistState, useWishlistDispatch } from '../context/WishlistContext';
import { useCartDispatch, useCartState } from '../context/CartContext';
import { Card, Button, Badge, Toast, ToastContainer } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaEye, FaList } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { user } = useAuthState();
  const location = useLocation();
  const wishlistState = useWishlistState();
  const { isWished, items: wishlistItems } = wishlistState;
  const wishlistDispatch = useWishlistDispatch();
  const cartDispatch = useCartDispatch();
  const { items: cartItems } = useCartState();
  const isInWishlist = useMemo(() => isWished(product.id), [isWished, product.id]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStyle, setToastStyle] = useState({
    backgroundColor: '#ffffff',
    border: '1px solid #17a2b8',
    color: '#17a2b8',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  });

  // Persist cart và wishlist vào localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('wishlist', JSON.stringify([...wishlistItems]));
  }, [cartItems, wishlistItems]);

  // Hàm hiển thị toast
  const showToastMessage = useCallback((message, type = 'info') => {
    setToastMessage(message);
    setShowToast(true);
    setToastStyle({
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      ...(type === 'success' ? { border: '1px solid #28a745', color: '#28a745' } :
        type === 'info' ? { border: '1px solid #17a2b8', color: '#17a2b8' } :
        { border: '1px solid #dc3545', color: '#dc3545' })
    });
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = useCallback(() => {
    console.log('User role:', user?.role); // Debug vai trò
    if (!user) {
      showToastMessage('Please sign in to save to cart', 'info');
      const redirectUri = `${location.pathname}${location.search}`;
      setTimeout(() => window.location.href = `/login?redirect_uri=${encodeURIComponent(redirectUri)}`, 1500);
      return;
    }
    if (product.quantity <= 0) {
      showToastMessage('Out of stock!', 'danger');
      return;
    }
    cartDispatch({ type: 'ADD_TO_CART', payload: { ...product, qty: 1, id: Date.now().toString(), userId: user.id } });
    showToastMessage('Added to cart!', 'success');
  }, [user, product, cartDispatch, location, showToastMessage]);

  // Xử lý thêm vào danh sách yêu thích
  const handleWishlistAction = useCallback(() => {
    console.log('User role:', user?.role); // Debug vai trò
    if (!user) {
      showToastMessage('Please sign in to save wishlist', 'info');
      const redirectUri = `${location.pathname}${location.search}`;
      setTimeout(() => window.location.href = `/login?redirect_uri=${encodeURIComponent(redirectUri)}`, 1500);
      return;
    }
    if (!isInWishlist) {
      wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product.id });
      showToastMessage('Added to wishlist!', 'success');
    }
  }, [user, isInWishlist, wishlistDispatch, location, showToastMessage, product.id]);

  return (
    <>
      <Card className="h-100 shadow-sm">
        <div style={{ position: 'relative' }}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            style={{ height: '180px', objectFit: 'cover' }}
          />
          {product.quantity === 0 && (
            <Badge bg="danger" className="position-absolute top-0 end-0 m-1" pill>
              Hết hàng
            </Badge>
          )}
          {parseInt(product.price) > parseInt(product.currentPrice) && (
            <Badge bg="success" className="position-absolute top-0 start-0 m-1" pill>
              Sale
            </Badge>
          )}
        </div>
        
        <Card.Body className="d-flex flex-column">
          <Card.Title className="fs-6 fw-bold mb-2" style={{ height: '40px', overflow: 'hidden' }}>
            {product.name}
          </Card.Title>
          
          <Card.Text className="text-muted small mb-2" style={{ height: '40px', overflow: 'hidden' }}>
            {product.description}
          </Card.Text>
          
          <div className="mb-2">
            {parseInt(product.price) > parseInt(product.currentPrice) ? (
              <>
                <div className="text-decoration-line-through text-muted small">
                  {parseInt(product.price).toLocaleString()} VND
                </div>
                <div className="text-danger fw-bold">
                  {parseInt(product.currentPrice).toLocaleString()} VND
                </div>
              </>
            ) : (
              <div className="fw-bold">
                {parseInt(product.currentPrice).toLocaleString()} VND
              </div>
            )}
          </div>

          <div className="mt-auto">
            <Button
              variant="primary"
              size="sm"
              as={Link}
              to={`/product/${product.id}`}
              style={{ 
                borderRadius: '20px',
                width: '100%',
                marginBottom: '8px'
              }}
              className="d-flex align-items-center justify-content-center"
            >
              <FaEye className="me-1" /> Xem chi tiết
            </Button>
            
            <div className="d-flex gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={handleAddToCart}
                disabled={!user || product.quantity === 0}
                style={{ 
                  borderRadius: '20px',
                  flex: 1
                }}
                className="d-flex align-items-center justify-content-center"
              >
                <FaShoppingCart className="me-1" /> Thêm giỏ
              </Button>
              
              {user ? (
                isInWishlist ? (
                  // Khi đã trong wishlist - hiển thị nút "View Wishlist"
                  <Button
                    variant="danger"
                    size="sm"
                    as={Link}
                    to="/wishlist"
                    style={{ 
                      borderRadius: '20px',
                      flex: 1
                    }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <FaList className="me-1" /> View Wishlist
                  </Button>
                ) : (
                  // Khi chưa trong wishlist - hiển thị nút "Thêm wishlist"
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleWishlistAction}
                    style={{ 
                      borderRadius: '20px',
                      flex: 1
                    }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <FaHeart className="me-1" /> Add to Wishlist
                  </Button>
                )
              ) : (
                // Khi chưa đăng nhập
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleWishlistAction}
                  style={{ 
                    borderRadius: '20px',
                    flex: 1
                  }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <FaHeart className="me-1" /> Add to Wishlist
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      <ToastContainer 
        position="top-end"
        className="p-3"
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 9999,
        }}
      >
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          style={toastStyle}
        >
          <Toast.Body className="d-flex align-items-center">
            <span className="fw-bold">{toastMessage}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductCard;