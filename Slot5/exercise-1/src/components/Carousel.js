import React from 'react';
import { Carousel } from 'react-bootstrap';

const RecipeCarousel = () => {
  const carouselItems = [
    {
      image: 'https://d3design.vn/uploads/Food_menu_web_banner_social_media_banner_template_Free_Psd8.jpg',
      caption: 'Delicious Avocado Toast',
      description: 'Quick and healthy breakfast option.',
    },
    {
      image: 'https://img.freepik.com/premium-vector/healthy-food-banner-template-promotions-web-social-media-design-template_553310-691.jpg',
      caption: 'Fresh Summer Salad',
      description: 'Light and refreshing for any meal.',
    },
    {
      image: 'https://graphicsfamily.com/wp-content/uploads/edd/2023/05/Website-Food-Banner-Design-scaled.jpg',
      caption: 'Grilled Chicken Delight',
      description: 'Flavorful and protein-packed dish.',
    },
  ];

  return (
    <Carousel style={{ maxWidth: '100%', margin: '0 auto' }}>
      {carouselItems.map((item, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={item.image}
            alt={item.caption}
            style={{ height: '250px', objectFit: 'cover'}}
          />
          <Carousel.Caption style={{ backgroundColor: 'rgba(32, 57, 51, 0.7)', borderRadius: '10px', padding: '10px' }}>
            <h3 style={{ color: '#FFFFFF', fontWeight: '600' }}>{item.caption}</h3>
            <p style={{ color: '#FFFFFF' }}>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RecipeCarousel;