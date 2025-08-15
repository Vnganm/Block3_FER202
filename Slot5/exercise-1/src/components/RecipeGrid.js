import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onView }) => (
  <div className="row">
    {recipes.map((recipe, index) => (
      <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
        <RecipeCard recipe={recipe} onView={onView} />
      </div>
    ))}
  </div>
);

export default RecipeGrid;