import React, { useState } from 'react';
import { Card, Button, Toast } from 'react-bootstrap';
import { FaUtensils, FaClock, FaFire } from 'react-icons/fa';

const RecipeCard = ({ recipe, onView }) => {
  const [showToast, setShowToast] = useState(false);

  const handleFavourite = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <Card style={{ 
      maxWidth: '450px', 
      margin: '0 auto', 
      borderRadius: '10px', 
      overflow: 'hidden', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      height: '100%'
    }}>
      <Card.Img 
        variant="top" 
        src={recipe.image} 
        style={{ 
          width: '450px', 
          height: '250px', 
          objectFit: 'cover', 
          borderTopLeftRadius: '10px', 
          borderTopRightRadius: '10px' 
        }} 
      />
      <Card.Body className="d-flex flex-column p-3" style={{ height: '100%' }}>
        <Card.Title className="text-dark fw-bold mb-2 flex-shrink-0">{recipe.title}</Card.Title>
        <Card.Text className="text-muted mb-3 flex-grow-1" style={{ fontSize: '0.9rem' }}>{recipe.description}</Card.Text>
        <div className="d-flex align-items-center mb-2">
          <FaUtensils className="text-success me-2" />
          <span className="me-3">Servings: {recipe.servings}</span>
          <FaClock className="text-success me-2" />
          <span>Prep: {recipe.prep} mins</span>
        </div>
        <div className="d-flex align-items-center mb-3">
          <FaFire className="text-success me-2" />
          <span>Cook: {recipe.cook} mins</span>
        </div>
        <Button 
          variant="custom" 
          onClick={() => onView(recipe)} 
          style={{ 
            backgroundColor: '#203933', 
            color: 'white', 
            borderColor: '#203933', 
            width: '100%', 
            padding: '8px', 
            borderRadius: '26px', 
            flexShrink: 0 
          }}
        >
          View Recipe
        </Button>
        <Button 
          variant="light" 
          onClick={handleFavourite} 
          className="mt-2" 
          style={{ width: '100%', borderRadius: '26px' }}
        >
          ♡ Add to Favourite
        </Button>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={5000} 
          autohide 
          style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
        >
          <Toast.Body>Added to favourites</Toast.Body>
        </Toast>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;