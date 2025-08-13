import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="text-center py-3 mt-4" style={{ backgroundColor: '#203933', color: '#FFFFFF' }}>
    <Container>
      <Row>
        <Col>
          <p className="mb-0">Made with ❤️ and 🍳</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;