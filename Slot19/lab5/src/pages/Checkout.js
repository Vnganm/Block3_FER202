import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Container, Button, Modal } from "react-bootstrap";

const Checkout = () => {
  const { dark } = useTheme();
  const { cartItems, totalValue } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleConfirm = () => {
    setShowModal(true);
  };

  const confirmCheckout = () => {
    setShowModal(false);
    alert("Thanh toán thành công!");
    navigate("/");
  };

  return (
    <Container className="my-4">
      <h2>Thanh toán</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <>
          <p>Tổng cộng: ${totalValue}</p>
          <Button variant="primary" onClick={handleConfirm}>Xác nhận thanh toán</Button>
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>Xác nhận thanh toán $${totalValue}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
          <Button variant="primary" onClick={confirmCheckout}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Checkout;