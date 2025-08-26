import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, updateProduct } from '../redux/slices/productSlice';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(state => state.products.items);
  const product = products.find(p => p.id === parseInt(id));
  const [updatedProduct, setUpdatedProduct] = useState(null);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    } else if (product) {
      setUpdatedProduct(product);
    }
  }, [dispatch, product, products.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updatedProduct) {
      dispatch(updateProduct({ id: parseInt(id), updatedProduct }));
      navigate(`/product/${id}`);
    }
  };

  if (!updatedProduct) return <p>Đang tải sản phẩm...</p>;

  return (
    <Container className="mt-4">
      <h2>Sửa sản phẩm</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                value={updatedProduct.name || ''}
                onChange={e => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                value={updatedProduct.description || ''}
                onChange={e => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                value={updatedProduct.price || ''}
                onChange={e => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Giá hiện tại</Form.Label>
              <Form.Control
                value={updatedProduct.currentPrice || ''}
                onChange={e => setUpdatedProduct({ ...updatedProduct, currentPrice: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                value={updatedProduct.image || ''}
                onChange={e => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                value={updatedProduct.quantity || 0}
                onChange={e => setUpdatedProduct({ ...updatedProduct, quantity: parseInt(e.target.value) })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit">Cập nhật</Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
