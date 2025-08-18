import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" className="mt-auto py-3">
      <Container>
        <Navbar.Text className="text-center w-100 text-white">
          © {new Date().getFullYear()} Student Management System. All rights reserved.
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default Footer;