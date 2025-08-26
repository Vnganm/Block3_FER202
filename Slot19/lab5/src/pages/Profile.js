import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Container, Card, Row, Col, Button, Form, Modal, Alert, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { dark } = useTheme();
  const { user, logout, updateUser } = useAuth(); // Thêm hàm updateUser từ AuthContext
  const navigate = useNavigate();
  
  // State cho form chỉnh sửa
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    address: "",
    avatar: ""
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "success" });

  // Khởi tạo dữ liệu form khi user thay đổi
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        birthDate: user.birthDate || "",
        address: user.address || "",
        avatar: user.avatar || ""
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSave = () => {
    // Cập nhật thông tin user
    updateUser(formData);
    
    // Hiển thị thông báo thành công
    setAlert({
      show: true,
      message: "Cập nhật thông tin thành công!",
      variant: "success"
    });
    
    // Ẩn modal
    setShowEditModal(false);
    
    // Tự động ẩn alert sau 3 giây
    setTimeout(() => {
      setAlert({ show: false, message: "", variant: "success" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          avatar: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container className={`py-4 ${dark ? "dark" : "light"}`}>
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={6}>
          {/* Alert thông báo */}
          {alert.show && (
            <Alert variant={alert.variant} className="mb-4" dismissible onClose={() => setAlert({ show: false, message: "", variant: "success" })}>
              {alert.message}
            </Alert>
          )}
          
          <Card className={`${dark ? "dark-card" : "light-card"} border-0 shadow-lg`}>
            <Card.Body>
              <div className="text-center">
                <h3 className={` ${dark ? "text-light" : "text-dark"}`}>Thông tin cá nhân</h3>
                <p className={dark ? "text-muted-dark" : "text-muted"}>Quản lý thông tin tài khoản của bạn</p>
              </div>

              {user ? (
                <div>
                  <div className={`p-4 rounded mb-4 ${dark ? "bg-dark-mode" : "bg-light-mode"}`}>
                    <div className="text-center">
                      {/* Avatar */}
                      <div className="mb-3 position-relative d-inline-block">
                        {user.avatar ? (
                          <Image 
                            src={user.avatar} 
                            alt="Avatar" 
                            roundedCircle 
                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                          />
                        ) : (
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                            style={{ width: "120px", height: "120px", backgroundColor: dark ? "#6c757d" : "#e9ecef" }}
                          >
                            <i className={`fas fa-user fa-2x ${dark ? "text-light" : "text-secondary"}`}></i>
                          </div>
                        )}
                      </div>
                      
                      <h4 className={`mb-2 ${dark ? "text-light" : "text-dark"}`}>
                        <i className="fas fa-user-circle me-2"></i>
                        Xin chào, {user.username}!
                      </h4>
                      <p className={dark ? "text-muted-dark" : "text-muted"}>
                        <i className="fas fa-envelope me-2"></i>
                        {user.email || "Chưa cập nhật email"}
                      </p>
                      <p className={dark ? "text-muted-dark" : "text-muted"}>
                        <i className="fas fa-user me-2"></i>
                        {user.fullName || "Chưa cập nhật họ tên"}
                      </p>
                    </div>
                  </div>
                  
                  <Row >
                    <Col md={6} className="mb-3">
                      <div className={`p-3 rounded text-center h-100 ${dark ? "bg-dark-card border-secondary" : "bg-white border-light shadow-sm"}`}>
                        <div className={`mb-2 ${dark ? "text-info" : "text-primary"}`}>
                          <i className="fas fa-user-check fa-2x"></i>
                        </div>
                        <small className={`d-block mb-2 ${dark ? "text-muted-dark" : "text-muted"}`}>Trạng thái tài khoản</small>
                        <span className="badge bg-success rounded-pill px-3 py-2">
                          <i className="fas fa-check-circle me-1"></i>
                          Đang hoạt động
                        </span>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className={`p-3 rounded text-center h-100 ${dark ? "bg-dark-card border-secondary" : "bg-white border-light shadow-sm"}`}>
                        <div className={`mb-2 ${dark ? "text-warning" : "text-warning"}`}>
                          <i className="fas fa-calendar-alt fa-2x"></i>
                        </div>
                        <small className={`d-block mb-2 ${dark ? "text-muted-dark" : "text-muted"}`}>Tham gia từ</small>
                        <span className={dark ? "text-light" : "text-dark"}>
                          <i className="fas fa-clock me-1"></i>
                          {user.joinDate || "Tháng 8, 2025"}
                        </span>
                      </div>
                    </Col>
                  </Row>

                  {/* Thông tin bổ sung */}
                  <Row className="mt-4">
                    <Col md={6} className="mb-3">
                      <div className={`p-3 rounded h-100 ${dark ? "bg-dark-card border-secondary" : "bg-white border-light shadow-sm"}`}>
                        <h6 className={`mb-3 ${dark ? "text-light" : "text-dark"}`}><i className="fas fa-phone me-2"></i>Thông tin liên hệ</h6>
                        <p className={dark ? "text-muted-dark" : "text-muted"}>
                          <strong>Điện thoại:</strong> {user.phone || "Chưa cập nhật"}
                        </p>
                        <p className={dark ? "text-muted-dark" : "text-muted"}>
                          <strong>Địa chỉ:</strong> {user.address || "Chưa cập nhật"}
                        </p>
                      </div>
                    </Col>
                    <Col md={6} className="mb-3">
                      <div className={`p-3 rounded h-100 ${dark ? "bg-dark-card border-secondary" : "bg-white border-light shadow-sm"}`}>
                        <h6 className={`mb-3 ${dark ? "text-light" : "text-dark"}`}><i className="fas fa-birthday-cake me-2"></i>Thông tin cá nhân</h6>
                        <p className={dark ? "text-muted-dark" : "text-muted"}>
                          <strong>Ngày sinh:</strong> {user.birthDate || "Chưa cập nhật"}
                        </p>
                      </div>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2">
                    <Button 
                      variant="outline-primary" 
                      className="rounded-pill "
                      onClick={handleEdit}
                    >
                      <i className="fas fa-edit me-2"></i>
                      Chỉnh sửa thông tin
                    </Button>
                    <Button 
                      variant="danger" 
                      className="rounded-pill "
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Đăng xuất
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className={`p-5 rounded ${dark ? "bg-dark-card" : "bg-light"}`}>
                    <div className={`rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center ${dark ? "bg-secondary" : "bg-light"}`}
                      style={{ width: '80px', height: '80px' }}>
                      <i className={`fas fa-sign-in-alt fa-2x ${dark ? "text-light" : "text-muted"}`}></i>
                    </div>
                    <h5 className={`mb-3 ${dark ? "text-light" : "text-dark"}`}>Chưa đăng nhập</h5>
                    <p className={`mb-4 ${dark ? "text-muted-dark" : "text-muted"}`}>
                      Vui lòng đăng nhập để xem thông tin cá nhân
                    </p>
                    <Button 
                      variant="primary" 
                      className="rounded-pill px-4 py-2"
                      onClick={() => navigate("/login")}
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Đăng nhập ngay
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal chỉnh sửa thông tin */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered className={dark ? "dark-modal" : ""}>
        <Modal.Header closeButton className={dark ? "bg-dark text-light border-secondary" : ""}>
          <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body className={dark ? "bg-dark text-light" : ""}>
          <Form>
            <div className="text-center mb-3">
              {formData.avatar ? (
                <Image 
                  src={formData.avatar} 
                  alt="Avatar" 
                  roundedCircle 
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  className="mb-2"
                />
              ) : (
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2"
                  style={{ width: "100px", height: "100px", backgroundColor: dark ? "#6c757d" : "#e9ecef" }}
                >
                  <i className={`fas fa-user ${dark ? "text-light" : "text-secondary"}`}></i>
                </div>
              )}
              <Form.Group controlId="formAvatar" className="mb-3">
                <Form.Label>Ảnh đại diện</Form.Label>
                <Form.Control 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarChange}
                  className={dark ? "bg-secondary border-secondary text-light" : ""}
                />
              </Form.Group>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={dark ? "bg-secondary border-secondary text-light" : ""}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={dark ? "bg-secondary border-secondary text-light" : ""}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={dark ? "bg-secondary border-secondary text-light" : ""}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={dark ? "bg-secondary border-secondary text-light" : ""}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={dark ? "bg-secondary border-secondary text-light" : ""}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className={dark ? "bg-dark border-secondary" : ""}>
          <Button variant="secondary" onClick={() => setShowEditModal(false)} className="rounded-pill">
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave} className="rounded-pill">
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;