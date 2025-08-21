import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { Navbar, Container, Badge, Button } from "react-bootstrap";

export default function Header({ dark, onToggleTheme }) {
  const { totalCount } = useContext(CartContext);
  const navigate = useNavigate();
  const count = totalCount;

  return (
    <Navbar bg={dark ? "dark" : "light"} variant={dark ? "dark" : "light"} className="py-2">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold m-0">
          Food Management
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2"> 
          {/* Nút chuyển đổi chế độ sáng/tối */}
          <Button 
            variant={dark ? "outline-light" : "outline-dark"} 
            onClick={onToggleTheme}
            size="sm"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </Button>
          
          {/* Nút giỏ hàng */}
          <Button 
            variant={dark ? "outline-warning" : "outline-primary"} 
            onClick={() => navigate("/cart")}
            className="position-relative"
          >
            🛒
            {count > 0 && (
              <Badge 
                bg="danger" 
                className="position-absolute top-0 start-100 translate-middle"
              >
                {count}
              </Badge>
            )}
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}