import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

function Filters({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('all');
  const [hasAvatar, setHasAvatar] = useState(false);

  const handleFilter = () => {
    onFilter({ searchTerm, ageRange, hasAvatar });
  };

  return (
    <Form className="p-3 border rounded" style={{ 
      maxWidth: '400px',
      backgroundColor: '#f8f9fa',
      borderColor: '#dee2e6'
    }}>
      {/* Search Field */}
      <Form.Group controlId="formSearch" className="mb-3">
        <Form.Label className="fw-semibold" style={{ color: '#495057' }}>
          Search by name/email
        </Form.Label>
        <InputGroup>
          <InputGroup.Text style={{ 
            backgroundColor: '#fff', 
            borderColor: '#ced4da'
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#6c757d">
              <path fillRule="evenodd" d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm-.82 4.74a6 6 0 111.06-1.06l2.79 2.79a.75.75 0 11-1.06 1.06l-2.79-2.79z" clipRule="evenodd"/>
            </svg>
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilter();
            }}
            style={{
              borderLeft: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              borderColor: '#ced4da'
            }}
          />
        </InputGroup>
      </Form.Group>

      {/* Age Range Select */}
      <Form.Group controlId="formAgeRange" className="mb-3">
        <Form.Label className="fw-semibold" style={{ color: '#495057' }}>
          Age Range
        </Form.Label>
        <Form.Select
          value={ageRange}
          onChange={(e) => {
            setAgeRange(e.target.value);
            handleFilter();
          }}
          style={{
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            borderColor: '#ced4da',
            color: '#495057'
          }}
        >
          <option value="all">All students</option>
          <option value="<=20">20 or younger</option>
          <option value="21-25">21 to 25 years</option>
          <option value=">25">Over 25 years</option>
        </Form.Select>
      </Form.Group>

      {/* Avatar Toggle */}
      <Form.Group controlId="formHasAvatar">
        <Form.Check
          type="switch"
          id="avatar-switch"
          label={
            <span className="fw-semibold" style={{ color: '#495057' }}>
              Has avatar
            </span>
          }
          checked={hasAvatar}
          onChange={(e) => {
            setHasAvatar(e.target.checked);
            handleFilter();
          }}
          style={{
            '--bs-form-switch-bg': 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e")',
            '--bs-form-switch-border-color': '#adb5bd',
            '--bs-form-switch-bg-color': '#6c757d'
          }}
        />
      </Form.Group>
    </Form>
  );
}

export default Filters;