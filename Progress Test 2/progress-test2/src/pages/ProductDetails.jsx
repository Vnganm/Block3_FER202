import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../services/api';
import { formatPrice } from '../utils/format';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct({
          id: data.id,
          name: data.name,
          image: data.image,
          price: data.price,
          description: data.description,
          category: data.category
        });
      } catch (error) {
        console.error('Error fetching product', error);
      }
    })();
  }, [id]);

  if (!product) return <Container className="py-4"><h3>Loading...</h3></Container>;

  return (
    <Container className="py-4">
      <Button variant="secondary" onClick={() => navigate('/products')} className="mb-3">Back to Products</Button>
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img src={product.image} alt={product.name} style={{ objectFit: 'cover' }} />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>{formatPrice(product.price)}</Card.Text>
              <Button variant="success">Add to Cart</Button>
              <Button variant="outline-danger" className="ms-2">Favourite</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}