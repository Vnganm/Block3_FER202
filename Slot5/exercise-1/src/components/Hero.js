import React from 'react';

const Hero = () => (
  <div className="text-center py-5" style={{ 
    backgroundColor: '#F5F6F2', 
    padding: '30px 20px', 
    borderRadius: '10px'
  }}>
    <h1 className="fw-bold mb-3" style={{ 
      fontSize: '2.5rem',
      color: '#203933' 
    }}>
      Explore our simple, healthy recipes
    </h1>
    <p className="mb-0" style={{ 
      fontSize: '1rem',
      color: '#203933' 
    }}>
      Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. Use the search bar to find a recipe by name or ingredient, or simply scroll the list and let something delicious catch your eye.
    </p>
  </div>
);

export default Hero;