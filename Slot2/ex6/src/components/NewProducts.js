import React from 'react';
import { Container, Row, Col, Card, Badge, Button, ButtonGroup } from 'react-bootstrap';

const NewProducts = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1562815515627-WUI5RN2UL8UZPT1WLROY/chup-anh-mon-an-nha-hang-chuyen-nghiep-4.jpg",
      originalPrice: "400,000đ",
      salePrice: "340,000đ",
      discount: "15%"
    },
    {
      id: 2,
      name: "Product 2",
      image: "https://stix.vn/wp-content/uploads/2016/04/Nha-hang-Hoang-Yen-Stix-Mon-An-5.jpg",
      originalPrice: "400,000đ",
      salePrice: "340,000đ",
      discount: "15%"
    },
    {
      id: 3,
      name: "Product 3",
      image: "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1597822198496-4IO5IM9MIV6ZHWVKMYRC/chup-anh-mon-an-breakfast-8.jpg",
      originalPrice: "400,000đ",
      salePrice: "340,000đ",
      discount: "15%"
    },
    {
      id: 4,
      name: "Product 4",
      image: "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg",
      originalPrice: "400,000đ",
      salePrice: "340,000đ",
      discount: "15%"
    }
  ];

  const handleAddToCart = (productId) => {
    console.log(`Thêm sản phẩm ${productId} vào giỏ hàng`);
    // Xử lý thêm vào giỏ hàng ở đây
  };

  const handleViewDetail = (productId) => {
    console.log(`Xem chi tiết sản phẩm ${productId}`);
    // Xử lý xem chi tiết sản phẩm ở đây
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">NEW PRODUCT</h2>
          <p className="text-center text-muted">List product description</p>
        </Col>
      </Row>
      
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={3} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={product.image} 
                  alt={product.name}
                  style={{ height: '280px', objectFit: 'cover' }}
                />
                <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                  {product.discount}
                </Badge>
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <div className="mb-3">
                  <span className="text-decoration-line-through text-muted me-2">{product.originalPrice}</span>
                  <span className="fw-bold text-danger">{product.salePrice}</span>
                </div>
                
                <ButtonGroup className="mt-auto">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => handleViewDetail(product.id)}
                  >
                    Xem chi tiết
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Thêm giỏ hàng
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewProducts;