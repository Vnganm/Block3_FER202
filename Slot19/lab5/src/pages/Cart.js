import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Container, Table, Button, Row, Col, Modal, Card, Badge } from "react-bootstrap";

const Cart = () => {
  const { dark } = useTheme();
  const { cartItems, dispatch, totalCount, totalValue } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Modal states
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartModal(true);
      return;
    }
    if (!user) {
      navigate("/login");
    } else {
      setShowCheckoutModal(true);
    }
  };

  const confirmCheckout = () => {
    setShowCheckoutModal(false);
    dispatch({ type: "CLEAR_CART" });
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  return (
    <Container className="py-4">
      {/* Header Section */}
      <div className="mb-4">
        <Row className="align-items-center">
          <Col>
            <h2 className={`mb-2 ${dark ? 'text-light' : 'text-dark'}`}>
              Giỏ hàng
            </h2>
            {cartItems.length > 0 && (
              <Badge bg="primary" className="fs-6">
                {totalCount} sản phẩm
              </Badge>
            )}
          </Col>
        </Row>
      </div>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <Card className={`text-center ${dark ? 'bg-dark border-secondary' : ''}`}>
          <Card.Body className="py-5">
            <div className="mb-4">
              <i className="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
              <h4 className={`${dark ? 'text-light' : 'text-dark'}`}>
                Giỏ hàng của bạn đang trống
              </h4>
              <p className="text-muted">
                Hãy thêm một số sản phẩm để bắt đầu mua sắm
              </p>
            </div>
            <Button 
              variant="primary" 
              size="md"
              onClick={() => navigate("/")}
            >
              Tiếp tục mua hàng
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <>
          {/* Cart Items Table */}
          <Card className={`mb-4 ${dark ? 'bg-dark border-secondary' : ''}`}>
            <Card.Body className="p-0">
              <Table 
                hover 
                variant={dark ? "dark" : "light"}
                className="mb-0"
              >
                <thead className={`${dark ? 'table-dark' : 'table-light'}`}>
                  <tr>
                    <th className="border-0 py-3">Sản phẩm</th>
                    <th className="border-0 py-3 text-center">Đơn giá</th>
                    <th className="border-0 py-3 text-center">Số lượng</th>
                    <th className="border-0 py-3 text-center">Tạm tính</th>
                    <th className="border-0 py-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="align-middle py-3">
                        <div>
                          <h6 className="mb-0">{item.name}</h6>
                        </div>
                      </td>
                      <td className="align-middle text-center">
                        <span className="fw-semibold">
                          ${parseFloat(item.price).toFixed(2)}
                        </span>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center justify-content-center">
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px' }}
                          >
                            -
                          </Button>
                          <span className="mx-3 fw-bold" style={{ minWidth: '30px', textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <Button 
                            variant="outline-secondary" 
                            size="sm" 
                            onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
                            className="rounded-circle"
                            style={{ width: '32px', height: '32px' }}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="align-middle text-center">
                        <span className="fw-bold fs-6">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </td>
                      <td className="align-middle text-center">
                        <Button 
                          variant="outline-danger" 
                          size="sm" 
                          onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                        >
                          Xóa
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          {/* Cart Summary */}
          <Row className="g-3">
            <Col lg={8}>
              <div className="d-flex gap-2">
                <Button 
                  variant="outline-primary" 
                  onClick={() => navigate("/")}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Tiếp tục mua hàng
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={() => dispatch({ type: "CLEAR_CART" })}
                >
                  Xóa tất cả
                </Button>
              </div>
            </Col>
            <Col lg={4}>
              <Card className={`${dark ? 'bg-dark border-secondary' : 'bg-light'}`}>
                <Card.Header className={`${dark ? 'bg-secondary text-light' : 'bg-primary text-white'} text-center`}>
                  <h5 className="mb-0">Tổng kết đơn hàng</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Số lượng sản phẩm:</span>
                    <Badge bg="info">{totalCount} món</Badge>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Phí vận chuyển:</span>
                    <span className="text-success">Miễn phí</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">Tổng cộng:</h5>
                    <h5 className="mb-0 text-primary">${totalValue}</h5>
                  </div>
                  <Button 
                    variant="success" 
                    onClick={handleCheckout}
                    className="w-100"
                    size="md"
                  >
                    <i className="fas fa-credit-card me-2"></i>
                    Thanh toán
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Empty Cart Modal */}
      <Modal show={showEmptyCartModal} onHide={() => setShowEmptyCartModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle text-warning me-2"></i>
            Giỏ hàng trống
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <p className="mb-0">Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.</p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="primary" onClick={() => {
            setShowEmptyCartModal(false);
            navigate("/");
          }}>
            Đi mua hàng ngay
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Checkout Confirmation Modal */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            <i className="fas fa-shopping-cart text-primary me-2"></i>
            Xác nhận thanh toán
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <div className="text-center mb-3">
            <h5>Chi tiết đơn hàng</h5>
          </div>
          <div className="bg-light p-3 rounded mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span>Số lượng sản phẩm:</span>
              <strong>{totalCount} món</strong>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tổng tiền:</span>
              <strong className="text-success">${totalValue}</strong>
            </div>
          </div>
          <p className="text-muted text-center mb-0">
            Bạn có chắc chắn muốn tiến hành thanh toán không?
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="outline-secondary" onClick={() => setShowCheckoutModal(false)}>
            Hủy bỏ
          </Button>
          <Button variant="success" onClick={confirmCheckout}>
            <i className="fas fa-check me-2"></i>
            Xác nhận thanh toán
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleSuccessClose} centered>
        <Modal.Header className="border-0 justify-content-center">
          <Modal.Title className="text-center w-100">
            <i className="fas fa-check-circle text-success fa-2x mb-3 d-block"></i>
            Thanh toán thành công!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <h5 className="mb-3">Cảm ơn bạn đã mua hàng!</h5>
          <p className="text-muted mb-0">
            Đơn hàng của bạn đang được xử lý. Chúng tôi sẽ liên hệ với bạn sớm nhất.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0 justify-content-center">
          <Button variant="primary" onClick={handleSuccessClose} size="md">
            Tiếp tục mua hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;