import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from "react-bootstrap";

const Register = () => {
    const { dark } = useTheme();
    const { register } = useAuth();
    const navigate = useNavigate();
    
    // State cho form data
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        agreeToTerms: false
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitMessage, setSubmitMessage] = useState("");

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        // Xóa lỗi khi người dùng bắt đầu nhập
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validation form
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập";
        else if (formData.username.length < 3) newErrors.username = "Tên đăng nhập phải có ít nhất 3 ký tự";
        
        if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";
        
        if (!formData.password) newErrors.password = "Vui lòng nhập mật khẩu";
        else if (formData.password.length < 6) newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
        
        if (!formData.confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
        
        if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
        
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "Bạn phải đồng ý với điều khoản";
        
        return newErrors;
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        
        setErrors({});
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        try {
            const result = register(formData);
            
            if (result.success) {
                setSubmitStatus('success');
                setSubmitMessage("Đăng ký thành công! Bạn đã được tự động đăng nhập.");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setSubmitStatus('error');
                setSubmitMessage(result.message || "Tên đăng nhập hoặc email đã tồn tại");
            }
        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className={`d-flex justify-content-center align-items-center ${dark ? "dark" : "light"}`}>
            <Card className={` ${dark ? "dark-card" : "light-card"} shadow`} style={{ maxWidth: "500px", width: "100%" }}>
                <Card.Body className="p-4">
                    <div className="text-center mb-4">
                        <h2 className={dark ? "text-light" : "text-dark"}>Đăng Ký</h2>
                        <p className={dark ? "text-muted-dark" : "text-muted"}>Tạo tài khoản để bắt đầu trải nghiệm</p>
                    </div>
                    
                    {submitStatus === 'success' && (
                        <Alert variant="success" className="text-center">
                            {submitMessage}
                        </Alert>
                    )}
                    
                    {submitStatus === 'error' && (
                        <Alert variant="danger" className="text-center">
                            {submitMessage}
                        </Alert>
                    )}
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label className={dark ? "text-light" : "text-dark"}>Họ và tên *</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="fullName"
                                value={formData.fullName} 
                                onChange={handleInputChange}
                                className={dark ? "form-control-dark" : "form-control-light"} 
                                isInvalid={!!errors.fullName}
                                placeholder="Nhập họ tên đầy đủ"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.fullName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className={dark ? "text-light" : "text-dark"}>Tên đăng nhập *</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="username"
                                value={formData.username} 
                                onChange={handleInputChange}
                                className={dark ? "form-control-dark" : "form-control-light"} 
                                isInvalid={!!errors.username}
                                placeholder="Chọn tên đăng nhập"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label className={dark ? "text-light" : "text-dark"}>Email *</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email"
                                value={formData.email} 
                                onChange={handleInputChange}
                                className={dark ? "form-control-dark" : "form-control-light"} 
                                isInvalid={!!errors.email}
                                placeholder="email@example.com"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className={dark ? "text-light" : "text-dark"}>Mật khẩu *</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="password"
                                        value={formData.password} 
                                        onChange={handleInputChange}
                                        className={dark ? "form-control-dark" : "form-control-light"} 
                                        isInvalid={!!errors.password}
                                        placeholder="Mật khẩu"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label className={dark ? "text-light" : "text-dark"}>Xác nhận *</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="confirmPassword"
                                        value={formData.confirmPassword} 
                                        onChange={handleInputChange}
                                        className={dark ? "form-control-dark" : "form-control-light"} 
                                        isInvalid={!!errors.confirmPassword}
                                        placeholder="Nhập lại mật khẩu"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                name="agreeToTerms"
                                id="agreeToTerms"
                                label={
                                    <span className={dark ? "text-light" : "text-dark"} style={{ fontSize: "0.9rem" }}>
                                        Tôi đồng ý với <a href="/terms" className={dark ? "text-info" : "text-primary"}>điều khoản sử dụng</a>
                                    </span>
                                }
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                                isInvalid={!!errors.agreeToTerms}
                            />
                            {errors.agreeToTerms && (
                                <div className="text-danger" style={{ fontSize: '0.875em', marginTop: '0.25rem' }}>
                                    {errors.agreeToTerms}
                                </div>
                            )}
                        </Form.Group>
                        
                        <div className="d-grid mb-3">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={isSubmitting}
                                size="md"
                                className="rounded-pill py-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="me-2"
                                        />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    "Đăng Ký"
                                )}
                            </Button>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;