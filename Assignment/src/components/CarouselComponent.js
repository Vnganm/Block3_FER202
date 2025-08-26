import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselComponent = () => {
  return (
    <Carousel interval={3000} pause="hover"> {/* Autoplay 3s, pause on hover */}
      <Carousel.Item>
        <img
          src="/images/banner1.jpg"
          alt="Banner 1 - Phụ nữ cầm túi mua sắm"
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Chào mừng đến với mua sắm</h3>
          <p>Khám phá phong cách thời trang của bạn!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/banner2.jpg"
          alt="Banner 2 - Trendy Fashion 50% off"
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Giảm giá lên đến 50%</h3>
          <p>Đừng bỏ lỡ cơ hội mua sắm tuyệt vời!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/images/banner3.png"
          alt="Banner 3 - Brand Sale"
          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Thời trang thương hiệu</h3>
          <p>Khám phá các sản phẩm cao cấp ngay hôm nay.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;