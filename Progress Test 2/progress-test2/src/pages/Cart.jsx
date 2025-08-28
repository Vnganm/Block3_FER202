import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { formatPrice } from '../utils/format';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Container className="py-4">
      <h1 className="mb-4">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <Card><Card.Body>Không có sản phẩm trong giỏ hàng.</Card.Body></Card>
      ) : (
        <>
          <Row className="g-4">
            {cart.map(item => (
              <Col key={item.id} md={4}>
                <Card>
                  <Card.Img variant="top" src={item.image} alt={item.name} style={{ height: '150px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{formatPrice(item.price)}</Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(item.id)}>Xóa</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="mt-4">
            <h4>Tổng cộng: {formatPrice(total)}</h4>
            <Button variant="primary" onClick={() => navigate('/checkout')} className="me-2">Thanh toán</Button>
            <Button variant="secondary" onClick={() => navigate('/products')}>Tiếp tục mua sắm</Button>
          </div>
        </>
      )}
    </Container>
  );
}