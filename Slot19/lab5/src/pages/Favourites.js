import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFavourites } from "../context/FavouritesContext";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const Favourites = () => {
  const { dark } = useTheme();
  const { favourites, dispatch } = useFavourites();
  const navigate = useNavigate();

  return (
    <Container className="my-4">
      <h2>Yêu thích</h2>
      {favourites.length === 0 ? (
        <p>Không có sản phẩm yêu thích.</p>
      ) : (
        <Row className="g-4">
          {favourites.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={3} className="mb-4">
              <Card bg={dark ? "dark" : "light"} text={dark ? "white" : "dark"} className="h-100">
                <Card.Img variant="top" src={item.image} alt={item.name} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>${parseFloat(item.price).toFixed(2)}</Card.Text>
                  </div>
                  <div>
                    <Button variant="danger" onClick={() => dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: item.id })} className="w-100">
                      Xóa
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Button variant="secondary" onClick={() => navigate("/")}>Quay lại</Button>
    </Container>
  );
};

export default Favourites;