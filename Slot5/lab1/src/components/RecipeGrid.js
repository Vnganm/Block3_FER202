import React, { useState } from 'react';
import { Pagination, Form } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onView }) => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <div className="d-flex justify-content-end mb-3">
        <Form.Select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          style={{ width: '170px', borderRadius: '20px'}}
        >
          <option value="6">6 per page</option>
          <option value="9">9 per page</option>
          <option value="12">12 per page</option>
        </Form.Select>
      </div>
      <div className="row">
        {currentRecipes.map((recipe, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
            <RecipeCard recipe={recipe} onView={onView} />
          </div>
        ))}
      </div>
      <Pagination className="justify-content-center">
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        />
      </Pagination>
    </div>
  );
};

export default RecipeGrid;