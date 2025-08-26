import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import TodoList from './components/TodoList';
import UserProfile from './components/UserProfile';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('cart');

  return (
    <Provider store={store}>
      <div className="bg-light min-vh-100">
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="#home" className="fw-bold">
              <i className="fas fa-shopping-cart me-2"></i> Redux Examples
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" activeKey={activeTab} onSelect={setActiveTab}>
                <Nav.Link eventKey="cart">Cart</Nav.Link>
                <Nav.Link eventKey="todo">Todo List</Nav.Link>
                <Nav.Link eventKey="profile">User Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container className="py-4">
          <Row>
            <Col>
              {activeTab === 'cart' && <Cart />}
              {activeTab === 'todo' && <TodoList />}
              {activeTab === 'profile' && <UserProfile />}
            </Col>
          </Row>
          {activeTab === 'cart' && <ProductList />}
        </Container>
      </div>
    </Provider>
  );
};

export default App;