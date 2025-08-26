import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { Container, Row, Col, Card, Form, Button, Toast, Badge } from "react-bootstrap";
import Carousel from "../components/Carousel"; 
import "../styles.css";

const DishesList = ({ dishes }) => {
  const { dark } = useTheme();
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: favDispatch, favourites } = useFavourites();
  const [query, setQuery] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? dishes.filter((d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)) : dishes;
  }, [query, dishes]);

  const addToCart = (dish) => {
    cartDispatch({ type: "ADD_TO_CART", payload: dish });
    setToastMessage("Added to cart");
    setShowToast(true);
  };

  const addToFavourites = (dish) => {
    if (favourites.some((item) => item.id === dish.id)) {
      navigate("/favourites");
    } else {
      favDispatch({ type: "ADD_TO_FAVOURITES", payload: dish });
      setToastMessage("Added to favourites");
      setShowToast(true);
    }
  };

  return (
    <Container fluid className={`px-0 ${dark ? "dark" : "light"}`}> {/* Container fluid để full width */}

      <div className="carousel-container">
        <Carousel />
      </div>
      
      <Container>
        <h2 className="mb-4 text-center mt-4">Danh sách món ăn</h2>
        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            placeholder="Tìm theo tên hoặc mô tả…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={dark ? "form-control-dark" : "form-control-light"}
          />
        </Form.Group>
        <Row className="g-4">
          {filtered.map((dish) => (
            <Col key={dish.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className={`dish-card ${dark ? "dark-card" : "light-card"} h-100`}>
                <Card.Img 
                  variant="top" 
                  src={dish.image} 
                  alt={dish.name} 
                  style={{ height: "250px", objectFit: "cover" }} 
                />
                <Card.Body className="d-flex flex-column">
                  <div>
                    <Card.Title className="fs-5" style={{ minHeight: "25px" }}>{dish.name}</Card.Title>
                    <Card.Text 
                      className="text-muted mb-3" 
                      style={{ 
                        minHeight: "53px", 
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical"
                      }}
                    >
                      {dish.description}
                    </Card.Text>
                  </div>

                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <Badge bg="warning" className="fs-6">${parseFloat(dish.price).toFixed(2)}</Badge>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => navigate(`/products/${dish.id}`)}
                        className="rounded-pill"
                      >
                        Details
                      </Button>
                    </div>
                    <div className="d-grid gap-2">
                      <Button 
                        variant="success"  
                        size="sm"
                        onClick={() => addToCart(dish)}
                        className="rounded-pill"
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant={favourites.some((item) => item.id === dish.id) ? "danger" : "outline-secondary"}
                        onClick={() => addToFavourites(dish)}
                        size="sm"
                        className="rounded-pill"
                      >
                        {favourites.some((item) => item.id === dish.id) ? "Browse Favourites" : "Add to Favourites"}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
        className={dark ? "toast-dark" : "toast-light"}
      >
        <Toast.Header className={dark ? "bg-dark text-white" : "bg-light text-dark"}>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className={dark ? "bg-dark text-white" : "bg-light text-dark"}>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default DishesList;