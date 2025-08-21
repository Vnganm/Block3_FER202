import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Container, Table, Button, Badge, Row, Col, Modal } from "react-bootstrap";

const Cart = ({ dark }) => {
  const { cartItems, addToCart, removeFromCart, removeItem, clearCart, totalValue, totalCount } =
    useContext(CartContext);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      window.alert("Giỏ hàng đang trống. Vui lòng chọn món trước khi thanh toán.");
      return;
    }
    const ok = window.confirm(
      `Xác nhận đơn ${totalCount} món, tổng $${totalValue}?`
    );
    if (ok) {
      clearCart();
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <Container>
      <h2 className="my-4">Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p className="text-center my-4">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div>
          {/* Thêm variant cho Table để hỗ trợ dark mode */}
          <Table responsive striped bordered hover variant={dark ? "dark" : "light"}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const price = parseFloat(item.price);
                const qty = item.quantity || 1;
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${price.toFixed(2)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => removeFromCart(item.id)}
                        >
                          -
                        </Button>
                        <Badge bg="secondary" className="mx-2">{qty}</Badge>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>${(price * qty).toFixed(2)}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => removeItem(item.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Row className="mt-4">
            <Col className="d-flex justify-content-between align-items-center">
              <h4>Tổng cộng: ${totalValue}</h4>
              <div>
                <Button variant="outline-secondary" onClick={clearCart} className="me-2">
                  Clear Cart
                </Button>
                <Button variant="primary" onClick={handleCheckout}>
                  Xác nhận đơn hàng
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}

      {/* Modal thông báo thành công */}
      <Modal 
        show={showSuccessModal} 
        onHide={handleCloseModal} 
        centered 
        data-bs-theme={dark ? "dark" : "light"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center fs-5">Thanh toán thành công! Cảm ơn bạn đã đặt món.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;