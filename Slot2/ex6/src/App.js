import React from 'react';
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap';
import NewProducts from './components/NewProducts';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">Food Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Trang chủ</Nav.Link>
              <Nav.Link href="#products">Sản phẩm</Nav.Link>
              <Nav.Link href="#new">Hàng mới</Nav.Link>
              <Nav.Link href="#contact">Liên hệ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#search">Tìm kiếm</Nav.Link>
              <Nav.Link href="#cart">Giỏ hàng</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Carousel/Slider */}
      <Carousel fade className="mb-5">

<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://marketplace.canva.com/EAFxrPcRELM/2/0/1600w/canva-black-orange-vibrant-and-dynamic-business-retractable-exhibition-banner-rwuAXUylWyY.jpg"
    alt="First slide"
    style={{ height: '350px', objectFit: 'cover' }}
  />
  <Carousel.Caption>
    <h3>Khuyến mãi mùa hè</h3>
    <p>Giảm giá lên đến 50%</p>
  </Carousel.Caption>
</Carousel.Item>

<Carousel.Item>
  <img
    className="d-block w-100"
    src="https://marketplace.canva.com/EAE51qDOSOs/1/0/800w/canva-food-sale-%28banner-%28landscape%29%29-S78kmJWq3G8.jpg"
    alt="First slide"
    style={{ height: '350px', objectFit: 'cover' }}
  />
  <Carousel.Caption>
    <h3>Khuyến mãi mùa hè</h3>
    <p>Giảm giá lên đến 50%</p>
  </Carousel.Caption>
</Carousel.Item>

      </Carousel>

      {/* Phần sản phẩm mới */}
      <NewProducts />
    </div>
  );
}

export default App;