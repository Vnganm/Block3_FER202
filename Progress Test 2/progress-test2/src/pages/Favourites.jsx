import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { formatPrice } from '../utils/format';

export default function Favourites() {
  const { favourites, removeFromFavourites } = useCart();
  const navigate = useNavigate();

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
          <h1 className="mb-4">Sản phẩm yêu thích</h1>
          {favourites.length === 0 ? (
            <Card><Card.Body>Không có sản phẩm yêu thích.</Card.Body></Card>
          ) : (
            <Row className="g-4">
              {favourites.map(item => (
                <Col key={item.id} md={4}>
                  <Card>
                    <Card.Img variant="top" src={item.image} alt={item.name} style={{ height: '150px', objectFit: 'cover' }} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{formatPrice(item.price)}</Card.Text>
                      <Button variant="danger" onClick={() => removeFromFavourites(item.id)}>Xóa</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </main>
    </div>
  );
}