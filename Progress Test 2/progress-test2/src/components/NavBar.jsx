import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const NavBar = () => {
  const { cart, favourites } = useCart();

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/products">Mobile Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/favourites">
              <FaHeart /> Favourites{' '}
              {favourites.length > 0 && <span className="badge bg-secondary">{favourites.length}</span>}
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart /> Cart{' '}
              {cart.length > 0 && <span className="badge bg-secondary">{cart.length}</span>}
            </Nav.Link>
            <Nav.Link as={Link} to="/login"><FaUser /> Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;