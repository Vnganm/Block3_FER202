import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FaEye, FaCartPlus, FaHeart } from 'react-icons/fa';
import { formatPrice, assetUrl } from '../utils/format';
import { useCart } from '../Context/CartContext';

const ProductCard = ({ product, onAddToCart, onAddToFavourites }) => {
  const navigate = useNavigate();
  const { favourites } = useCart();

  const isFavourite = favourites.some(item => item.id === product.id);
  const handleFavourite = () => {
    if (isFavourite) {
      navigate('/favourites');
    } else {
      onAddToFavourites();
    }
  };

  return (
    <Card className="h-100 shadow-sm product-card">
      <Card.Img
        variant="top"
        src={assetUrl(product.image)}
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.name}</Card.Title>
        <Card.Text className="flex-grow-1 small text-muted mb-2">
          {product.description}
        </Card.Text>
        <div className="mb-3">
          <Badge bg="primary" className="fs-6">
            {formatPrice(product.price)}
          </Badge>
        </div>
        <ButtonGroup className="w-100">
          <Button
            variant="outline-primary"
            size="sm"
            className="flex-fill"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <FaEye className="me-1" /> View Details
          </Button>
          <Button
            variant="success"
            size="sm"
            className="flex-fill"
            onClick={onAddToCart}
          >
            <FaCartPlus className="me-1" /> Add to Cart
          </Button>
          <Button
            variant={isFavourite ? 'danger' : 'outline-danger'}
            size="sm"
            className="flex-fill"
            onClick={handleFavourite}
          >
            <FaHeart className="me-1" /> Favourite
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;