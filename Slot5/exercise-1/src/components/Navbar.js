import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavbarComponent = () => (
    <Navbar bg="light" expand="lg" className="mb-4" style={{ backgroundColor: '#F5F6F2' }}>
        <Container fluid>
            <Navbar.Brand href="#home" className="d-flex align-items-center fw-bold">
                <img src="/logo.png" alt="Logo" style={{ width: '45px', height: '45px', marginRight: '10px' }} />
                Healthy Recipe Finder
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto" style={{ color: '#094f3e' }}>
                    <Nav.Link href="#home" active>Home</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#recipes">Recipes</Nav.Link>
                </Nav>
                <div className="d-flex">
                    <Button variant="custom" style={{ backgroundColor: '#203933', color: 'white', borderColor: '#203933' }}>Browse Recipes</Button>
                </div>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default NavbarComponent;