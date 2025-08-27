import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { addToCart, addToWishlist } from '../redux/slices/cartSlice';
import { 
  Container, 
  Row, 
  Col, 
  Button, 
  Spinner, 
  Alert, 
  Badge, 
  Toast, 
  ToastContainer,
  Image
} from 'react-bootstrap';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaEdit, 
  FaArrowLeft,
  FaList
} from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const products = useSelector(state => state.products.items);
  const user = useSelector(state => state.auth.user);
  const product = products.find(p => p.id === id);
  const isInWishlist = user?.wishlist?.includes(product?.id);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
        setLoading(false);
      } catch (err) {
        setError('Không thể tải thông tin sản phẩm');
        setLoading(false);
      }
    };
    loadProduct();
  }, [dispatch, id]);

  const showToastMessageHandler = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAddToCart = async () => {
    if (!user) {
      showToastMessageHandler('Vui lòng đăng nhập để thêm vào giỏ hàng');
      const redirectUri = `${location.pathname}${location.search}`;
      setTimeout(() => window.location.href = `/login?redirect_uri=${encodeURIComponent(redirectUri)}`, 1500);
      return;
    }
    
    if (!product || product.quantity <= 0) {
      showToastMessageHandler('Sản phẩm đã hết hàng!');
      return;
    }

    try {
      const cartItem = {
        id: Date.now().toString(), // unique ID for cart item
        productId: product.id,
        userId: user.id,
        quantity: 1,
        price: parseInt(product.currentPrice)
      };

      const response = await fetch('http://localhost:3001/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      });

      if (response.ok) {
        dispatch(addToCart(cartItem));
        showToastMessageHandler('Đã thêm vào giỏ hàng!');
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToastMessageHandler('Không thể thêm vào giỏ hàng!');
    }
  };

  const handleWishlistAction = () => {
    if (!user) {
      showToastMessageHandler('Vui lòng đăng nhập để thêm vào danh sách yêu thích');
      const redirectUri = `${location.pathname}${location.search}`;
      setTimeout(() => window.location.href = `/login?redirect_uri=${encodeURIComponent(redirectUri)}`, 1500);
      return;
    }
    if (!isInWishlist) {
      dispatch(addToWishlist(product.id))
        .then(() => showToastMessageHandler('Đã thêm vào danh sách yêu thích!'))
        .catch(() => showToastMessageHandler('Không thể thêm vào danh sách yêu thích!'));
    }
  };

  if (loading) return (
    <Container className="my-4 text-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Đang tải...</span>
      </Spinner>
    </Container>
  );

  if (error) return (
    <Container className="my-4">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  if (!product) return (
    <Container className="my-4">
      <Alert variant="warning">
        Không tìm thấy sản phẩm (ID: {id})
        <div className="mt-2">
          <Button variant="outline-primary" onClick={() => navigate('/')} size="sm">
            <FaArrowLeft className="me-1" /> Quay lại trang chủ
          </Button>
        </div>
      </Alert>
    </Container>
  );

  const discountPercentage = parseInt(product.price) > parseInt(product.currentPrice) 
    ? Math.round((1 - parseInt(product.currentPrice) / parseInt(product.price)) * 100)
    : 0;

  return (
    <Container className="my-4">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)} 
        className="mb-3"
        size="sm"
      >
        <FaArrowLeft className="me-1" /> Quay lại
      </Button>

      <Row className="g-4">
        {/* Hình ảnh sản phẩm */}
        <Col md={6}>
          <div className="position-relative">
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="rounded border"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            {product.quantity === 0 && (
              <Badge bg="danger" className="position-absolute top-0 end-0 m-2" pill>
                Hết hàng
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge bg="success" className="position-absolute top-0 start-0 m-2" pill>
                -{discountPercentage}%
              </Badge>
            )}
          </div>
        </Col>

        {/* Thông tin sản phẩm */}
        <Col md={6}>
          <div>
            <h3 className="fw-bold mb-2">{product.name}</h3>
            
            <div className="mb-3">
              <h4 className="text-primary mb-1">
                {parseInt(product.currentPrice).toLocaleString()} VND
              </h4>
              {discountPercentage > 0 && (
                <div className="d-flex align-items-center">
                  <span className="text-decoration-line-through text-muted me-2">
                    {parseInt(product.price).toLocaleString()} VND
                  </span>
                </div>
              )}
            </div>

            <p className="text-muted mb-3">{product.description}</p>

            <div className="mb-3">
              <span className="fw-medium">Tình trạng: </span>
              <Badge bg={product.quantity > 0 ? 'success' : 'danger'} className="ms-1">
                {product.quantity > 0 ? `Còn ${product.quantity} sản phẩm` : 'Hết hàng'}
              </Badge>
            </div>

            {/* Các nút hành động */}
            <div className="d-flex flex-wrap gap-2 mt-4">
              {user?.role === 'user' && product.quantity > 0 && (
                <Button
                  variant="primary"
                  onClick={handleAddToCart}
                  className="d-flex align-items-center"
                  disabled={product.quantity <= 0}
                >
                  <FaShoppingCart className="me-1" /> Thêm vào giỏ
                </Button>
              )}
              {user?.role === 'user' && (
                isInWishlist ? (
                  // Nếu đã trong wishlist - hiển thị nút xem wishlist
                  <Button
                    variant="success"
                    as={Link}
                    to="/wishlist"
                    className="d-flex align-items-center"
                  >
                    <FaList className="me-1" /> Xem WL
                  </Button>
                ) : (
                  // Nếu chưa trong wishlist - hiển thị nút thêm wishlist
                  <Button
                    variant="outline-secondary"
                    onClick={handleWishlistAction}
                    className="d-flex align-items-center"
                  >
                    <FaHeart className="me-1" /> Yêu thích
                  </Button>
                )
              )}
              {user?.role === 'admin' && (
                <Button
                  variant="outline-warning"
                  onClick={() => navigate(`/edit/${id}`)}
                  className="d-flex align-items-center"
                >
                  <FaEdit className="me-1" /> Chỉnh sửa
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* ToastContainer với fixed position và z-index cao */}
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
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #28a745',
            color: '#28a745',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <Toast.Body className="d-flex align-items-center">
            <span className="fw-bold">{toastMessage}</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ProductDetail;