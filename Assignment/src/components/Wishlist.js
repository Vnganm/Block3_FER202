import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Container } from 'react-bootstrap';
import { fetchProducts } from '../redux/slices/productSlice';
import { useWishlistState, useWishlistDispatch } from '../context/WishlistContext';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items: wishlistItems } = useWishlistState();
  const wishlistDispatch = useWishlistDispatch();
  const products = useSelector(state => state.products.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRemoveFromWishlist = (productId) => {
    if (user && user.wishlist) {
      wishlistDispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
    }
  };

  const displayedItems = Array.from(wishlistItems).map(id => products.find(p => p.id === id)).filter(p => p) || [];

  return (
    <Container className="mt-4">
      <h2>Danh sách yêu thích</h2>
      {displayedItems.length === 0 ? (
        <p>Không có sản phẩm nào trong danh sách yêu thích.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{parseInt(product.currentPrice).toLocaleString()} VND</td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveFromWishlist(product.id)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Wishlist;