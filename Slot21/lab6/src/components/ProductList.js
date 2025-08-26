import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, updateQuantity, removeFromCart } from '../redux/cartSlice';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';

const ProductList = () => {
  const products = useSelector(state => state.cart.products);
  const cartItems = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleUpdateQuantity = (product) => {
    const quantity = quantities[product.id] || 1;
    const cartItem = cartItems.find(item => item.id === product.id);

    if (cartItem) {
      dispatch(updateQuantity({ productId: product.id, quantity }));
    } else {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Danh sách sản phẩm</h2>
      <Row>
        {products.map(product => {
          const cartItem = cartItems.find(item => item.id === product.id);
          const quantity = quantities[product.id] || (cartItem ? cartItem.quantity : 1);

          return (
            <Col key={product.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-primary fw-bold">{product.name}</Card.Title>
                  <Card.Text className="text-muted">
                    <small><strong>ID:</strong> {product.id}</small>
                  </Card.Text>
                  <Card.Text className="flex-grow-1">{product.description}</Card.Text>
                  <Card.Text className="text-success h5 mb-3">${product.price.toFixed(2)}</Card.Text>
                  <div className="mb-3">
                    {product.catalogs.map(catalog => (
                      <Badge key={catalog} bg="secondary" className="me-1">{catalog}</Badge>
                    ))}
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                      className="me-2"
                      style={{ width: '80px' }}
                    />
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleUpdateQuantity(product)}
                      className="me-2"
                    >
                      Update
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product)}
                      disabled={cartItem}
                    >
                      Add to Cart
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFromCart(product.id)}
                    disabled={!cartItem}
                    className="mt-auto"
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ProductList;