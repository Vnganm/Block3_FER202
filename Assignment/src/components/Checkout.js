import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { useCartState, useCartDispatch } from '../context/CartContext';
import { Table, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items: carts } = useCartState();
  const cartDispatch = useCartDispatch();
  const { items: products } = useSelector(state => state.products);
  const user = useSelector(state => state.auth.user);

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
    await axios.post('http://localhost:3001/orders', order);
    cartDispatch({ type: 'CLEAR_CART' });
    alert('Đặt hàng thành công!');
  };

  if (user?.role !== 'user') return <Alert variant="warning">Chỉ dành cho user.</Alert>;

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