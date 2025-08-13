import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const Filters = ({ onFilter }) => {
  const [maxPrep, setMaxPrep] = useState(0);
  const [maxCook, setMaxCook] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilter({ maxPrep, maxCook, searchTerm, sortBy });
    }, 300);
    return () => clearTimeout(handler);
  }, [maxPrep, maxCook, searchTerm, sortBy, onFilter]);

  return (
    <Form className="d-flex justify-content-between mb-4" style={{ backgroundColor: '#F5F6F2', alignItems: 'center' }}>
      <div className="d-flex align-items-center">
        <Form.Select    
          className="me-3"
          value={maxPrep}
          onChange={(e) => setMaxPrep(parseInt(e.target.value) || 0)}
          style={{ 
            width: '200px', 
            height: '40px', 
            borderRadius: '20px', 
            border: '1px solid #203933', 
            padding: '6px 15px', 
            backgroundColor: '#F5F6F2', 
            color: '#203933', 
            fontWeight: '500', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <option value="0" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>Max Prep Time</option>
          <option value="5" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>5 mins</option>
          <option value="10" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>10 mins</option>
          <option value="15" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>15 mins</option>
          <option value="20" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>20 mins</option>
        </Form.Select>
        <Form.Select
          className="me-3"
          value={maxCook}
          onChange={(e) => setMaxCook(parseInt(e.target.value) || 0)}
          style={{ 
            width: '200px', 
            height: '40px', 
            borderRadius: '20px', 
            border: '1px solid #203933', 
            padding: '6px 15px', 
            backgroundColor: '#F5F6F2', 
            color: '#203933', 
            fontWeight: '500', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <option value="0" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>Max Cook Time</option>
          <option value="5" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>5 mins</option>
          <option value="10" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>10 mins</option>
          <option value="15" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>15 mins</option>
          <option value="20" style={{ backgroundColor: '#F5F6F2', color: '#203933' }}>20 mins</option>
        </Form.Select>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ 
            width: '200px', 
            height: '40px', 
            borderRadius: '20px', 
            border: '1px solid #203933', 
            padding: '6px 15px', 
            backgroundColor: '#203933', 
            color: 'white', 
            fontWeight: '500', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <option value="" style={{ backgroundColor: '#203933', color: 'white' }}>Sort by</option>
          <option value="name-asc" style={{ backgroundColor: '#203933', color: 'white' }}>Name A→Z</option>
          <option value="name-desc" style={{ backgroundColor: '#203933', color: 'white' }}>Name Z→A</option>
          <option value="prep-asc" style={{ backgroundColor: '#203933', color: 'white' }}>Prep ↑</option>
          <option value="prep-desc" style={{ backgroundColor: '#203933', color: 'white' }}>Prep ↓</option>
          <option value="cook-asc" style={{ backgroundColor: '#203933', color: 'white' }}>Cook ↑</option>
          <option value="cook-desc" style={{ backgroundColor: '#203933', color: 'white' }}>Cook ↓</option>
        </Form.Select>
      </div>
      <Form.Control
        type="text"
        placeholder="Search by name or ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ 
          width: '300px', 
          height: '40px', 
          borderRadius: '20px', 
          border: '1px solid #203933', 
          padding: '6px 15px', 
          backgroundColor: '#F5F6F2', 
          color: '#203933', 
          fontWeight: '500', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      />
    </Form>
  );
};

export default Filters;