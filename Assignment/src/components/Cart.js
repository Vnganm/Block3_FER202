import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { useCartState, useCartDispatch } from '../context/CartContext';
import { useAuthState } from '../context/AuthContext';
import { Table, Button, Container, Form, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: carts } = useCartState();
  const cartDispatch = useCartDispatch();
  const { items: products } = useSelector(state => state.products);
  const { user } = useAuthState();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const userCarts = carts.filter(item => item.userId === user?.id);

  const handleUpdate = async (id, newQuantity, productId, oldQuantity) => {
    if (newQuantity > 0) {
      try {
        // Kiểm tra số lượng sản phẩm có sẵn
        const product = products.find(p => p.id === productId);
        if (product && newQuantity <= product.quantity) {
          cartDispatch({ type: 'UPDATE_QTY', payload: { id, qty: newQuantity } });
        } else {
          alert('Số lượng yêu cầu vượt quá số lượng có sẵn!');
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        alert('Không thể cập nhật số lượng. Vui lòng thử lại!');
      }
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      cartDispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getTotal = () => {
    return userCarts.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? parseInt(product.currentPrice) * item.quantity : 0);
    }, 0);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const confirmCheckout = async () => {
    try {
      cartDispatch({ type: 'CLEAR_CART' });
      setCheckoutSuccess(true);
      setShowCheckoutModal(false);
      setTimeout(() => setCheckoutSuccess(false), 3000);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  if (!user?.id) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Vui lòng đăng nhập để xem giỏ hàng.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Giỏ hàng</h2>
      {userCarts.length === 0 ? (
        <Alert variant="info">Giỏ hàng của bạn trống.</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {userCarts.map(item => {
                const product = products.find(p => p.id === item.productId);
                const totalPrice = product ? parseInt(product.currentPrice) * item.quantity : 0;
                return (
                  <tr key={item.id}>
                    <td>{product?.name || 'Unknown'}</td>
                    <td>
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        min="1"
                        className="text-center"
                        onChange={e => handleUpdate(item.id, parseInt(e.target.value), item.productId, item.quantity)}
                      />
                    </td>
                    <td>{product?.currentPrice || 0} VND</td>
                    <td>{totalPrice.toLocaleString()} VND</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Đang xóa...' : 'Xóa'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Button variant="secondary" onClick={() => navigate('/')}>Tiếp tục mua sắm</Button>
            <div className="text-end">
              <h4>Tổng cộng: {getTotal().toLocaleString()} VND</h4>
              <Button variant="success" size="lg" onClick={handleCheckout}>Thanh toán</Button>
            </div>
          </div>
        </>
      )}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn thanh toán đơn hàng này?</p>
          <p><strong>Tổng tiền: {getTotal().toLocaleString()} VND</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>Hủy</Button>
          <Button variant="primary" onClick={confirmCheckout}>Xác nhận thanh toán</Button>
        </Modal.Footer>
      </Modal>
      {checkoutSuccess && (
        <Alert variant="success" className="mt-3">
          Thanh toán thành công!
        </Alert>
      )}
    </Container>
  );
};

export default Cart;