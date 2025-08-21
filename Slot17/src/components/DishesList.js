import React, { useContext, useMemo, useState } from "react";
import { CartContext } from "./CartContext";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const DishesList = ({ dishes, dark }) => {
  const { addToCart } = useContext(CartContext);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }, [query, dishes]);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Danh sách món ăn</h2>

      <Form.Group className="mb-4">
        <Form.Control
          type="text"
          size="md"
          placeholder="Tìm theo tên hoặc mô tả…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Form.Group>

      {filtered.length === 0 ? (
        <Alert variant="info" className="text-center">
          Không tìm thấy món phù hợp.
        </Alert>
      ) : (
        <Row>
          {filtered.map((dish) => (
            <Col key={dish.id} md={6} lg={3} className="mb-4">
              {/* Thêm bg và text props để hỗ trợ dark mode */}
              <Card 
                className="h-100 dish-card text-center" 
                bg={dark ? "dark" : "light"}
                text={dark ? "white" : "dark"}
              >
                <Card.Img 
                  variant="top" 
                  src={dish.image} 
                  alt={dish.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{dish.name}</Card.Title>
                  <Card.Text className={dark ? "text-light" : "text-muted"} style={{ flexGrow: 1 }}>
                    {dish.description}
                  </Card.Text>
                  <Card.Text className="fw-bold text-primary">
                    ${parseFloat(dish.price).toFixed(2)}
                  </Card.Text>
                  <Button 
                    variant="success" 
                    onClick={() => addToCart(dish)}
                    className="mt-auto"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DishesList;