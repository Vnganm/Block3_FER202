import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";

export default function Header() {
  const { totalCount: cartCount } = useCart();
  const { totalCount: favCount } = useFavourites();
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // Lấy path hiện tại

  // Hàm kiểm tra xem link có active không
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar
      bg={dark ? "dark" : "white"}
      variant={dark ? "dark" : "light"}
      expand="lg"
      className={`${dark ? '' : 'border-bottom'}`}
      style={{
        minHeight: '65px',
        backdropFilter: 'blur(10px)',
        borderBottom: dark ? '1px solid #343a40' : '1px solid #e9ecef'
      }}
    >
      <Container fluid className="px-4">
        <Navbar.Brand
          as={Link}
          to="/"
          className={`fw-bold ${isActive("/") ? "opacity-100" : "opacity-75"}`}
          style={{
            fontSize: '1.4rem',
            color: dark ? '#fff' : '#212529',
            textDecoration: 'none',
            letterSpacing: '-0.3px'
          }}
        >
          Food Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-5">
            <Nav.Link
              as={Link}
              to="/"
              className={`me-4 ${isActive("/")
                  ? "fw-semibold border-bottom border-2 border-primary pb-1"
                  : ""
                }`}
              style={{
                color: dark ? (isActive("/") ? '#fff' : '#adb5bd') : (isActive("/") ? '#212529' : '#6c757d'),
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease'
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/register"
              className={`me-4 ${isActive("/register")
                  ? "fw-semibold border-bottom border-2 border-primary pb-1"
                  : ""
                }`}
              style={{
                color: dark ? (isActive("/register") ? '#fff' : '#adb5bd') : (isActive("/register") ? '#212529' : '#6c757d'),
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'all 0.2s ease'
              }}
            >
              Register Account
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Button
              variant="link"
              onClick={toggleTheme}
              className={`me-3 p-2 border-0 ${dark ? 'text-light' : 'text-dark'}`}
              style={{
                fontSize: '1.1rem',
                textDecoration: 'none',
                opacity: 0.7,
                transition: 'opacity 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
            >
              {dark ? "☀️" : "🌙"}
            </Button>



            {user ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className={`me-4 ${isActive("/profile")
                      ? "fw-semibold border-bottom border-2 border-primary pb-1"
                      : ""
                    }`}
                  style={{
                    color: dark ? (isActive("/profile") ? '#fff' : '#adb5bd') : (isActive("/profile") ? '#212529' : '#6c757d'),
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  Profile
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/favourites"
                  className={`me-4 position-relative ${isActive("/favourites")
                      ? "fw-semibold border-bottom border-2 border-primary pb-1"
                      : ""
                    }`}
                  style={{
                    color: dark ? (isActive("/favourites") ? '#fff' : '#adb5bd') : (isActive("/favourites") ? '#212529' : '#6c757d'),
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  My Favourites
                  {favCount > 0 && (
                    <Badge
                      bg="secondary"
                      className="ms-1"
                      style={{
                        fontSize: '0.65rem',
                        opacity: 0.8
                      }}
                    >
                      {favCount}
                    </Badge>
                  )}
                </Nav.Link>


                <Nav.Link
                  as={Link}
                  to="/cart"
                  className={`position-relative me-4 ${isActive("/cart")
                      ? "fw-semibold border-bottom border-2 border-primary pb-1"
                      : ""
                    }`}
                  style={{
                    color: dark ? (isActive("/cart") ? '#fff' : '#adb5bd') : (isActive("/cart") ? '#212529' : '#6c757d'),
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  🛒
                  {cartCount > 0 && (
                    <Badge
                      bg="danger"
                      className="position-absolute"
                      style={{
                        top: '-5px',
                        right: '-8px',
                        fontSize: '0.65rem',
                        minWidth: '18px',
                        height: '18px',
                        borderRadius: '50%'
                      }}
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>

                <Nav.Link
                  onClick={() => { logout(); navigate("/"); }}
                  style={{
                    color: '#dc3545',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                    opacity: 0.8
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '1'}
                  onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className={`${isActive("/login")
                    ? "fw-semibold border-bottom border-2 border-primary pb-1"
                    : ""
                  }`}
                style={{
                  color: dark ? (isActive("/login") ? '#fff' : '#adb5bd') : (isActive("/login") ? '#212529' : '#6c757d'),
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease'
                }}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}