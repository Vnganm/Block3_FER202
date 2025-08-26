import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <Container>
        <p className="mb-0">
          © 2025 Fashion Shop. All rights reserved. | 
          <a href="https://github.com/Vnganm/Block3_FER202" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;