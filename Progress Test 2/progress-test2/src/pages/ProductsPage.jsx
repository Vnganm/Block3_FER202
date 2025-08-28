import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card, Toast, ToastContainer } from 'react-bootstrap';
import { FaSearch, FaTimesCircle, FaFilter, FaSort } from 'react-icons/fa';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { useProductFilters } from '../hooks/useProductFilters';
import api from '../services/api';
import { useCart } from '../Context/CartContext'; // Chỉ lấy useCart từ CartContext
import { useAuth } from '../Context/AuthContext'; // Lấy useAuth từ AuthContext

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [products, setProducts] = useState([]);
  const [showCartToast, setShowCartToast] = useState(false);
  const [showFavToast, setShowFavToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const { addToCart, addToFavourites } = useCart();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/products');
      const normalized = (data || []).map(p => ({
        id: p.id,
        name: p.title || p.name,
        image: p.image,
        price: p.price,
        description: p.description,
        category: p.category
      }));
      setProducts(normalized);
    })();
  }, []);

  const filteredProducts = useProductFilters(products, searchQuery, sortBy, filterBy);

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để thêm vào giỏ hàng!');
      return;
    }
    addToCart(product);
    setLastAddedProduct(product);
    setShowCartToast(true);
    setTimeout(() => setShowCartToast(false), 3000);
  };

  const handleAddToFavourites = (product) => {
    if (!isAuthenticated) {
      alert('Vui lòng đăng nhập để thêm vào danh sách yêu thích!');
      return;
    }
    addToFavourites(product);
    setLastAddedProduct(product);
    setShowFavToast(true);
    setTimeout(() => setShowFavToast(false), 3000);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container fluid className="flex-grow-1 px-4">
        <h1 className="mb-4">Products</h1>
        <Card className="mb-4">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button variant="outline-secondary" onClick={() => setSearchQuery('')}>
                      <FaTimesCircle />
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaFilter /></InputGroup.Text>
                  <Form.Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                    <option value="all">All Categories</option>
                    <option value="iphone">iPhone</option>
                    <option value="samsung">Samsung</option>
                    <option value="google">Google</option>
                    <option value="oppo">Oppo</option>
                  </Form.Select>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text><FaSort /></InputGroup.Text>
                  <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name-asc">Name A→Z</option>
                    <option value="name-desc">Name Z→A</option>
                    <option value="price-asc">Price ↑</option>
                    <option value="price-desc">Price ↓</option>
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="g-4">
          {filteredProducts.map(p => (
            <Col key={p.id} xs={12} sm={6} md={4}>
              <ProductCard product={p} onAddToCart={() => handleAddToCart(p)} onAddToFavourites={() => handleAddToFavourites(p)} />
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <Row className="mt-4"><Col><Card className="text-center"><Card.Body>No mobile found.</Card.Body></Card></Col></Row>
        )}
      </Container>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" className="p-3" style={{ position: 'fixed', top: '35px', left: '90%', transform: 'translateX(-50%)', zIndex: 1000 }}>
        <Toast show={showCartToast} onClose={() => setShowCartToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto text-success">Thành công</strong>
          </Toast.Header>
          <Toast.Body className="text-success">Đã thêm {lastAddedProduct?.name} vào giỏ hàng!</Toast.Body>
        </Toast>
        <Toast show={showFavToast} onClose={() => setShowFavToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto text-success">Thành công</strong>
          </Toast.Header>
          <Toast.Body className="text-success">Đã thêm {lastAddedProduct?.name} vào danh sách yêu thích!</Toast.Body>
        </Toast>
      </ToastContainer>

    </div>
  );
}