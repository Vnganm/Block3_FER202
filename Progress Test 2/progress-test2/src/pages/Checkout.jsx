import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { formatPrice } from '../utils/format';

export default function Checkout() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = React.useState('');
  const [customerAddress, setCustomerAddress] = React.useState('');
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (!customerName || !customerAddress) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    alert(`Đơn hàng của ${customerName} với tổng cộng ${formatPrice(total)} đã được đặt thành công!`);
    cart.forEach(item => removeFromCart(item.id)); // Xóa giỏ hàng sau khi checkout
    navigate('/products');
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Thanh toán</h1>
      {cart.length === 0 ? (
        <Card><Card.Body>Không có sản phẩm trong giỏ hàng để thanh toán.</Card.Body></Card>
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
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  type="text"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Nhập địa chỉ giao hàng"
                  required
                />
              </Form.Group>
              <Button variant="success" onClick={handleCheckout}>Hoàn tất đơn hàng</Button>
            </Form>
          </div>
        </>
      )}
    </Container>
  );
}