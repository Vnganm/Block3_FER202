import React, { useState } from 'react'; // Thêm useState
import { Navbar as BootstrapNavbar, Nav, Form, FormControl, Container, Button } from 'react-bootstrap';

function Navbar({ onQuickSearch, onShowProfile }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onQuickSearch(e.target.value);
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
      <Container fluid>
        <BootstrapNavbar.Brand href="#home" className="d-flex align-items-center">
          <i className="bi bi-people-fill me-2" style={{ fontSize: '1.5rem' }}></i>
          <span className="fw-bold">Student Management</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" className="border-0" />
        <BootstrapNavbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link href="#home" className="mx-2 px-3 py-2 rounded-3">
              <i className="bi bi-house-door me-2"></i>Home
            </Nav.Link>
            <Nav.Link href="#students" className="mx-2 px-3 py-2 rounded-3">
              <i className="bi bi-people me-2"></i>Students
            </Nav.Link>
            <Nav.Link href="#about" className="mx-2 px-3 py-2 rounded-3">
              <i className="bi bi-info-circle me-2"></i>About
            </Nav.Link>
          </Nav>
          <Button 
            variant="outline-light" 
            className="me-2"
            onClick={onShowProfile}
          >
            Build your Profile
          </Button>
          <Form className="d-flex flex-grow-1 mx-3">
            <FormControl
              type="search"
              placeholder="Search students by name or email..."
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="rounded-pill px-3"
              style={{
                marginLeft: 'auto',
                maxWidth: '450px',
                width: '100%'
              }}
            />
          </Form>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;