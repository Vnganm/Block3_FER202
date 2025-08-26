import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../context/AuthContext';
import { Form, Button, Container, Card, Alert, Spinner } from 'react-bootstrap';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    avatar: null,
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    secretAnswer: ''
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        setValidationErrors({ ...validationErrors, avatar: 'File phải ≤ 2MB' });
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(files[0].type)) {
        setValidationErrors({ ...validationErrors, avatar: 'Chỉ chấp nhận jpg/png' });
        return;
      }
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Vui lòng nhập họ tên';
      if (!formData.email.trim()) errors.email = 'Vui lòng nhập email';
      if (!formData.avatar) errors.avatar = 'Vui lòng chọn avatar';
    } else {
      if (!formData.username.trim() || formData.username.length < 4) errors.username = 'Tên đăng nhập phải ≥ 4 ký tự';
      if (!formData.password || formData.password.length < 6) errors.password = 'Mật khẩu phải ≥ 6 ký tự';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Mật khẩu không khớp';
      if (!formData.secretQuestion) errors.secretQuestion = 'Vui lòng chọn câu hỏi bảo mật';
      if (!formData.secretAnswer) errors.secretAnswer = 'Vui lòng nhập câu trả lời';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key === 'avatar' && formData.avatar) formDataToSend.append(key, formData.avatar);
      else formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('id', Date.now().toString());
    formDataToSend.append('role', 'user');
    formDataToSend.append('wishlist', []);

    try {
      // Convert FormData to plain object
      const userData = {
        id: Date.now().toString(),
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'user', // Explicitly set role as user
        wishlist: [],
        avatar: null, // Handle avatar separately if needed
        secretQuestion: formData.secretQuestion,
        secretAnswer: formData.secretAnswer
      };

      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(userData)
      });
      
      if (!res.ok) {
        throw new Error('Registration failed');
      }
      
      const newUser = await res.json();
      console.log('New user created:', newUser); // Debug log
      authDispatch({ type: 'REGISTER', payload: newUser });
      navigate('/');
    } catch (error) {
      setValidationErrors({ general: 'Đăng ký thất bại. Vui lòng thử lại!' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="mx-auto" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Đăng ký</h2>
          <Form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">{validationErrors.fullName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Ảnh đại diện</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    onChange={handleChange}
                    isInvalid={!!validationErrors.avatar}
                  />
                  <Form.Control.Feedback type="invalid">{validationErrors.avatar}</Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            {step === 2 && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.username}
                  />
                  <Form.Control.Feedback type="invalid">{validationErrors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.password}
                  />
                  <Form.Control.Feedback type="invalid">{validationErrors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Xác nhận mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{validationErrors.confirmPassword}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Câu hỏi bảo mật</Form.Label>
                  <Form.Select
                    name="secretQuestion"
                    value={formData.secretQuestion}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.secretQuestion}
                  >
                    <option value="">Chọn câu hỏi</option>
                    <option value="pet">Tên thú cưng đầu tiên của bạn là gì?</option>
                    <option value="school">Trường tiểu học của bạn là gì?</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{validationErrors.secretQuestion}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Trả lời</Form.Label>
                  <Form.Control
                    type="text"
                    name="secretAnswer"
                    value={formData.secretAnswer}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.secretAnswer}
                  />
                  <Form.Control.Feedback type="invalid">{validationErrors.secretAnswer}</Form.Control.Feedback>
                </Form.Group>
              </>
            )}
            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Đang xử lý...
                </>
              ) : step === 1 ? 'Tiếp tục' : 'Đăng ký'}
            </Button>
            {step > 1 && (
              <div className="text-center">
                <Button variant="link" onClick={() => setStep(1)} className="p-0">Quay lại</Button>
              </div>
            )}
            {validationErrors.general && <Alert variant="danger">{validationErrors.general}</Alert>}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;