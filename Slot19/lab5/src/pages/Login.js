import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const Login = () => {
  const { dark } = useTheme();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!username) newErrors.username = "Vui lòng nhập tên đăng nhập";
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setLoginError("");
    
    const loginSuccess = login({ username, password });
    
    if (loginSuccess) {
      navigate("/");
    } else {
      setLoginError("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className={`my-4 ${dark ? "dark-card" : "light-card"} shadow`} style={{ width: "450px", borderRadius: "15px" }}>
        <Card.Body className="p-4">
          <h2 className={`text-center ${dark ? "text-light" : "text-dark"}`}>Đăng nhập</h2>
          
          {loginError && (
            <Alert variant="danger" className="text-center">
              {loginError}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className={dark ? "text-light" : "text-dark"}>Tên đăng nhập</Form.Label>
              <Form.Control 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className={dark ? "form-control-dark" : "form-control-light"} 
                placeholder="Nhập tên đăng nhập"
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={dark ? "text-light" : "text-dark"}>Mật khẩu</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className={dark ? "form-control-dark" : "form-control-light"} 
                placeholder="Nhập mật khẩu"
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit" className="rounded-pill py-2">
                Đăng nhập
              </Button>
            </div>
            <div className="text-center mt-3">
              <span className={dark ? "text-light" : "text-dark"}>Chưa có tài khoản? </span>
              <Button 
                variant="link" 
                onClick={() => navigate("/register")}
                className={`p-0 ${dark ? "text-info" : "text-primary"}`}
              >
                Đăng ký ngay
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;