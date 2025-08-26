import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../context/AuthContext';
import { useCartState } from '../context/CartContext';
import { FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const { user } = useAuthState();
  const authDispatch = useAuthDispatch();
  const { count: cartCount } = useCartState();
  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid="lg">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="fw-bold">Fashion Shop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="px-3">Trang Chủ</Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {user ? (
              <>
                {/* Debug: Hiển thị role */}
                <Nav.Link className="px-3 text-warning">
                  Role: {user.role || 'Không có role'}
                </Nav.Link>
                <Nav.Link as={Link} to="/my-account" className="px-3">My Account</Nav.Link>
                <Nav.Link as={Link} to="/checkout" className="px-3">Checkout</Nav.Link>
                <Nav.Link as={Link} to="/wishlist" className="px-3">Wishlist</Nav.Link>
                <Nav.Link as={Link} to="/cart" className="position-relative px-3">
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6rem' }}>
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
                <NavDropdown title={user.name || user.username} id="user-dropdown" align="end">
                  <NavDropdown.Item as={Link} to="/my-account">Account</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout <FaSignOutAlt className="ms-1" /></NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" className="px-3">Register</Nav.Link>
                <Nav.Link as={Link} to="/login" className="px-3">Sign in</Nav.Link>
                <Nav.Link as={Link} to="/checkout" className="px-3">Checkout</Nav.Link>
                <Nav.Link as={Link} to="/wishlist" className="px-3">Wishlist</Nav.Link>
                <Nav.Link as={Link} to="/cart" className="position-relative px-3">
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6rem' }}>
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;