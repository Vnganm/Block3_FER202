import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, updateProfile } from '../redux/userSlice';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, isLoggedIn } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '', age: '' });

  const handleLogin = () => {
    dispatch(login(form));
    toast.success('Logged in');
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out');
  };

  const handleUpdate = () => {
    dispatch(updateProfile(form));
    toast.success('Profile updated');
  };

  if (!isLoggedIn) {
    return (
      <Container className="my-4">
        <h2 className="mb-4">Login</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Age"
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin} className="w-100">Login</Button>
        </Form>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4">Profile</h2>
      <Row className="mb-3">
        <Col><strong>Name:</strong> {user.name}</Col>
        <Col><strong>Email:</strong> {user.email}</Col>
        <Col><strong>Age:</strong> {user.age}</Col>
      </Row>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="New Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="New Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="New Age"
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate} className="me-2">Update</Button>
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </Form>
    </Container>
  );
};

export default UserProfile;