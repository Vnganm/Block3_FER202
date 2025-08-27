import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.get('/accounts');
      const user = data.find(u => u.email === email && u.password === password && u.isActive);
      if (user) {
        alert('Đăng nhập thành công!');
        navigate('/products');
      } else {
        setError('Email hoặc mật khẩu không đúng hoặc tài khoản không hoạt động');
      }
    } catch (err) {
      setError('Lỗi khi đăng nhập');
    }
  };

  return (
    <Container fluid className="py-4 bg-light min-vh-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Đăng nhập</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit" variant="primary" className="w-100">Đăng nhập</Button>
        </Form>
      </div>
    </Container>
  );
}