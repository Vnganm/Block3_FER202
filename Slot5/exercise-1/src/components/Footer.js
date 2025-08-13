import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-light text-center py-3 mt-4" style={{ backgroundColor: '#F5F6F2' }}>
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