import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { useCartState, useCartDispatch } from '../context/CartContext';
import { useAuthState } from '../context/AuthContext';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items: carts } = useCartState();
  const cartDispatch = useCartDispatch();
  const { items: products } = useSelector(state => state.products);
  const { user } = useAuthState();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const userCarts = carts.filter(item => item.userId === user?.id);

  const getTotal = () => {
    return userCarts.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? parseInt(product.currentPrice) * item.quantity : 0);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      // Kiểm tra xem còn đủ số lượng sản phẩm không
      for (const cartItem of userCarts) {
        const product = products.find(p => p.id === cartItem.productId);
        if (!product || cartItem.quantity > product.quantity) {
          alert(`Sản phẩm ${product?.name || 'Unknown'} không đủ số lượng!`);
          return;
        }
      }

      const order = {
        id: Date.now().toString(),
        userId: user.id,
        items: userCarts.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        total: getTotal(),
        date: new Date().toISOString()
      };

      // Tạo đơn hàng
      const orderResponse = await axios.post('http://localhost:3001/orders', order);

      if (orderResponse.status === 201 || orderResponse.status === 200) {
        // Cập nhật số lượng sản phẩm
        for (const item of order.items) {
          const product = products.find(p => p.id === item.productId);
          if (product) {
            await axios.patch(`http://localhost:3001/products/${product.id}`, {
              quantity: product.quantity - item.quantity
            });
          }
        }

        // Xóa giỏ hàng
        cartDispatch({ type: 'CLEAR_CART' });
        alert('Đặt hàng thành công!');
        window.location.href = '/'; // Chuyển về trang chủ
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!');
    }
  };

  if (!user?.id) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">Vui lòng đăng nhập để thanh toán.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Thanh toán</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Tổng</th>
          </tr>
        </thead>
        <tbody>
          {userCarts.map(item => {
            const product = products.find(p => p.id === item.productId);
            return (
              <tr key={item.id}>
                <td>{product?.name || 'Unknown'}</td>
                <td>{item.quantity}</td>
                <td>{product?.currentPrice || 0} VND</td>
                <td>{(product ? parseInt(product.currentPrice) * item.quantity : 0).toLocaleString()} VND</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Alert variant="info">Tổng tiền: {getTotal().toLocaleString()} VND</Alert>
      <Button variant="success" onClick={handleCheckout}>Xác nhận thanh toán</Button>
    </Container>
  );
};

export default Checkout;