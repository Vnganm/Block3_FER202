import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useCart } from "../context/CartContext";
import { useFavourites } from "../context/FavouritesContext";
import { Container, Card, Button, Toast, Row, Col, Badge } from "react-bootstrap";

const DishDetail = ({ dishes }) => {
  const { dark } = useTheme();
  const { id } = useParams();
  const dish = dishes.find((d) => d.id === parseInt(id));
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: favDispatch, favourites } = useFavourites();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const addToCart = () => {
    cartDispatch({ type: "ADD_TO_CART", payload: dish });
    setToastMessage("Added to cart");
    setShowToast(true);
  };

  const addToFavourites = () => {
    if (favourites.some((item) => item.id === dish.id)) {
      navigate("/favourites");
    } else {
      favDispatch({ type: "ADD_TO_FAVOURITES", payload: dish });
      setToastMessage("Added to favourites");
      setShowToast(true);
    }
  };

  if (!dish) return <h2 className="text-center py-4">Không tìm thấy món ăn</h2>;

  return (
    <Container className="py-3">
      <Button 
        variant={dark ? "outline-light" : "outline-secondary"} 
        onClick={() => navigate("/")} 
        size="sm"
        className="mb-3"
      >
        ← Back to List
      </Button>
      
      <Card bg={dark ? "dark" : "light"} text={dark ? "white" : "dark"} className="overflow-hidden">
        <Row className="g-0">
          <Col md={6}>
            <Card.Img 
              variant="top" 
              src={dish.image} 
              alt={dish.name} 
              style={{ height: "100%", minHeight: "180px", objectFit: "cover" }} 
            />
          </Col>
          <Col md={6}>
            <Card.Body className="p-4 d-flex flex-column h-100">
              <div className="mb-3">
                <Card.Title as="h3" className="mb-2">{dish.name}</Card.Title>
                <Badge bg="success" className="mb-3">${parseFloat(dish.price).toFixed(2)}</Badge>
                <Card.Text className="mt-2" style={{ lineHeight: "1.1" }}>
                  {dish.description}
                </Card.Text>
              </div>
              
              <div className="mt-auto d-grid gap-2">
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={addToCart} className="flex-fill">
                    Add to Cart
                  </Button>
                  
                  <Button
                    variant={favourites.some((item) => item.id === dish.id) ? "danger" : "outline-primary"}
                    onClick={addToFavourites}
                    className="flex-fill"
                  >
                    {favourites.some((item) => item.id === dish.id) ? "Go to Favourites" : "Add to Favourites"}
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
      
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
        bg={dark ? "dark" : "light"}
      >
        <Toast.Header className={dark ? "bg-dark text-white" : ""}>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className={dark ? "bg-dark text-white" : ""}>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default DishDetail;