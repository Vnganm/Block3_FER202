import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../Context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.get('/accounts');
      const user = data.find(u => u.email === email && u.password === password && u.isActive);
      if (user) {
        login(); // Cập nhật trạng thái đăng nhập
        alert('Đăng nhập thành công!');
        navigate('/products');
      } else {
        setError('Email hoặc mật khẩu không đúng hoặc tài khoản không hoạt động');
      }
    } catch (err) {
      setError('Lỗi khi đăng nhập');
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  return (
    <Container fluid className="bg-white d-flex justify-content-center align-items-center p-3">
      <div className="w-100" style={{ maxWidth: '400px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
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
          <div className="d-flex gap-2">
            <Button type="submit" variant="primary" className="flex-fill">Đăng nhập</Button>
            <Button variant="secondary" className="flex-fill" onClick={handleCancel}>Cancel</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}