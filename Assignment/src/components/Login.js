import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthDispatch } from '../context/AuthContext';
import { Form, Button, Container, Card, Toast } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/users');
      if (!res.ok) throw new Error('Failed to fetch users');
      const users = await res.json();
      console.log('Available users:', users); // Debug danh sách người dùng
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        console.log('Logged in user:', user); // Debug user được tìm thấy
        console.log('User role from API:', user.role); // Debug role từ API

        const userToLogin = {
          id: user.id,
          username: user.username,
          role: user.role, // Explicitly include role
          email: user.email,
          wishlist: user.wishlist || []
        };
        console.log('User being dispatched:', userToLogin); // Debug
        console.log('Role being dispatched:', userToLogin.role); // Debug role được dispatch
        authDispatch({ type: 'LOGIN', payload: userToLogin });
        const redirect = location.state?.redirect_uri ? decodeURIComponent(location.state.redirect_uri) : from;
        navigate(redirect, { replace: true });
        setShowError(false);
      } else {
        authDispatch({ type: 'LOGOUT' }); // Clear state cũ
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (err) {
      console.error('Login error:', err); // Debug lỗi
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  // Debug: Kiểm tra localStorage khi component mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      console.log('Current user in localStorage:', JSON.parse(savedUser));
    }
  }, []);

  // Function để clear localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('user');
    authDispatch({ type: 'LOGOUT' });
    console.log('LocalStorage cleared');
  };

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Đăng nhập</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Đăng nhập
            </Button>

          </Form>
          {showError && (
            <Toast
              show={showError}
              onClose={() => setShowError(false)}
              delay={3000}
              autohide
              style={{ position: 'absolute', top: '10px', right: '10px' }}
            >
              <Toast.Header>
                <strong className="me-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>Đăng nhập thất bại. Vui lòng kiểm tra lại!</Toast.Body>
            </Toast>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;