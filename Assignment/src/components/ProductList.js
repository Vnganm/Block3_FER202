import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addProduct } from '../redux/slices/productSlice';
import Footer from './Footer';
import CarouselComponent from './CarouselComponent';
import ProductCard from './ProductCard';
import { 
  Button, 
  Row, 
  Col, 
  Form, 
  Container, 
  Alert,
  Toast,
  InputGroup,
  Card 
} from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, error } = useSelector(state => state.products);
  const user = useSelector(state => state.auth.user);

  // Debug: Kiểm tra user và role
  useEffect(() => {
    console.log('ProductList - Current user:', user);
    console.log('ProductList - User role:', user?.role);
  }, [user]);

  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    currentPrice: '', 
    image: '', 
    quantity: 0 
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sortOption, setSortOption] = useState('default');

  // useCallback with inline debounce
  const handleSearch = useCallback((value) => {
    const debounce = (func, delay) => {
      let timeoutId;
      return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
      };
    };
    debounce(() => setSearchTerm(value), 300)();
  }, []);

  const handleAdd = useCallback((e) => {
    e.preventDefault();
    dispatch(addProduct({ ...newProduct, id: Date.now().toString() }));
    setNewProduct({ name: '', description: '', price: '', currentPrice: '', image: '', quantity: 0 });
    setPreviewImage(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, [newProduct, dispatch]);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert('File phải ≤ 2MB');
      return;
    }
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Chỉ chấp nhận jpg/png');
      return;
    }
    setNewProduct({ ...newProduct, image: file || '' });
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  }, [newProduct]);

  // useMemo for visibleProducts with immutable sort
  const visibleProducts = useMemo(() => {
    let temp = [...(products || [])]; // Tạo bản sao để tránh mutate gốc
    if (searchTerm.trim() !== '') {
      temp = temp.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOption === 'name-asc') temp.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === 'price-asc') temp.sort((a, b) => parseFloat(a.currentPrice) - parseFloat(b.currentPrice));
    else if (sortOption === 'price-desc') temp.sort((a, b) => parseFloat(b.currentPrice) - parseFloat(a.currentPrice));
    return temp;
  }, [products, searchTerm, sortOption]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {/* Carousel full width */}
      <div className="full-width-carousel">
        <CarouselComponent />
      </div>

      <Container className="my-4">
        <h2 className="mb-4">Danh sách sản phẩm</h2>
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                onChange={(e) => handleSearch(e.target.value)}
              />
              <Button variant="outline-secondary"><FaSearch /></Button>
            </InputGroup>
          </Col>
          <Col md={6}>
            <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="w-100">
              <option value="default">Sắp xếp</option>
              <option value="name-asc">Name A→Z</option>
              <option value="price-asc">Price Ascending</option>
              <option value="price-desc">Price Descending</option>
            </Form.Select>
          </Col>
        </Row>
        <Row xs={1} sm={2} md={3} className="g-4">
          {visibleProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Container>

      {/* Form thêm sản phẩm riêng biệt */}
      {user?.role === 'admin' && (
        <Container className="my-4">
          <h3 className="mb-4">Thêm sản phẩm mới</h3>
          <Card className="p-4 shadow-sm">
            <Form onSubmit={handleAdd}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                      type="text"
                      value={newProduct.name}
                      onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                      type="text"
                      value={newProduct.description}
                      onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Giá gốc</Form.Label>
                    <Form.Control
                      type="number"
                      value={newProduct.price}
                      onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Giá hiện tại</Form.Label>
                    <Form.Control
                      type="number"
                      value={newProduct.currentPrice}
                      onChange={e => setNewProduct({ ...newProduct, currentPrice: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Hình ảnh sản phẩm</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                    />
                    {previewImage && (
                      <div className="mt-2">
                        <img
                          src={previewImage}
                          alt="Preview"
                          style={{ maxWidth: '100%', maxHeight: '200px' }}
                          className="img-thumbnail"
                        />
                      </div>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control
                      type="number"
                      value={newProduct.quantity}
                      onChange={e => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="success" type="submit" className="d-flex align-items-center gap-2 py-2 rounded-pill w-100">
                <FaPlus /> Thêm sản phẩm
              </Button>
            </Form>
          </Card>
        </Container>
      )}

      {/* Footer full width */}
      <div className="full-width-footer">
        <Footer />
      </div>

      <Toast
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        delay={3000}
        autohide
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        <Toast.Header>
          <strong className="me-auto">Thành công</strong>
        </Toast.Header>
        <Toast.Body>Thêm sản phẩm thành công!</Toast.Body>
      </Toast>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

      <style jsx>{`
        .full-width-carousel,
        .full-width-footer {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }
      `}</style>
    </>
  );
};

export default ProductList;