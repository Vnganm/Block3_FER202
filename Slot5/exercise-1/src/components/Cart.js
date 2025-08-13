import React from 'react';
import { Modal, Table, Button } from 'react-bootstrap';

const Cart = ({ cart, setCart, onClose }) => {
  const pricePerItem = 5; // Giả định giá mỗi món là 5 USD

  const handleIncrease = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const handleDecrease = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) newCart[index].quantity -= 1;
    else newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + (pricePerItem * item.quantity), 0);

  const handleCheckout = () => {
    alert(`Checkout with total: $${total.toFixed(2)}. This is a placeholder!`);
    setCart([]); // Xóa giỏ hàng sau khi checkout
    onClose(); // Đóng modal
  };

  return (
    <>
      <Modal.Header style={{ backgroundColor: '#F5F6F2', borderBottom: 'none', padding: '15px' }}>
        <Modal.Title style={{ color: '#203933', fontSize: '1.5rem', fontWeight: '600' }}>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#F5F6F2', padding: '20px', borderRadius: '0 0 10px 10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {cart.length === 0 ? (
          <p className="text-center" style={{ color: '#203933', fontSize: '1.1rem' }}>Your cart is empty.</p>
        ) : (
          <>
            <Table striped bordered hover responsive className="mb-4">
              <thead>
                <tr style={{ backgroundColor: '#e8f5e9', color: '#203933' }}>
                  <th className="p-3">Item</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} style={{ verticalAlign: 'middle' }}>
                    <td className="p-3">{item.title}</td>
                    <td className="p-3 text-center">
                      <Button 
                        variant="outline-success" 
                        size="sm" 
                        onClick={() => handleDecrease(index)} 
                        style={{ marginRight: '5px' }}
                        className="rounded-circle"
                      >
                        -
                      </Button>
                      {item.quantity}
                      <Button 
                        variant="outline-success" 
                        size="sm" 
                        onClick={() => handleIncrease(index)} 
                        style={{ marginLeft: '5px' }}
                        className="rounded-circle"
                      >
                        +
                      </Button>
                    </td>
                    <td className="p-3 text-center">${(pricePerItem * item.quantity).toFixed(2)}</td>
                    <td className="p-3 text-center">
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleDecrease(index, true)} 
                        className="rounded-pill"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-end">
              <h5 style={{ color: '#203933', marginBottom: '15px' }}>Total: ${total.toFixed(2)}</h5>
              <Button 
                variant="success" 
                size="lg" 
                onClick={handleCheckout} 
                className="rounded-pill px-4"
                style={{ backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </>
  );
};

export default Cart;