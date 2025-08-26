import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';
import { Container, Card, Row, Col, Button, Badge, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
      toast.success('Quantity updated');
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Item removed');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <Container className="my-4">
      <Card className="shadow-lg border-0">
        <Card.Header className="bg-primary text-white">
          <h3>Giỏ hàng <Badge bg="light" text="dark">{cartItems.length}</Badge></h3>
        </Card.Header>
        <Card.Body>
          {cartItems.length === 0 ? (
            <p className="text-center text-muted">Giỏ hàng trống</p>
          ) : (
            <>
              {cartItems.map(item => (
                <Card key={item.id} className="mb-3 border rounded">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>${item.price.toFixed(2)}</Card.Text>
                      </Col>
                      <Col md={4} className="d-flex align-items-center">
                        <Form.Control
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                          className="me-2"
                          style={{ width: '80px' }}
                        />
                        <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)} className="ms-2">
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
              <Card className="mt-4 bg-light">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col>
                      <h4>Tổng cộng:</h4>
                    </Col>
                    <Col xs="auto">
                      <h4 className="text-success">${calculateTotal()}</h4>
                    </Col>
                  </Row>
                  <Button variant="success" size="lg" className="mt-3 w-100">Thanh toán</Button>
                </Card.Body>
              </Card>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;