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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      width: '100%',
      margin: 0,
      padding: 0 
    }}>
      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '20px 0',
        width: '100%'
      }}>
        <Container fluid style={{ padding: '0 15px', maxWidth: '100%' }}>
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
                <Button variant="success" onClick={() => navigate('/checkout')}>Thanh toán</Button>
              </div>
            </>
          )}
        </Container>
      </main>
    </div>
  );
}