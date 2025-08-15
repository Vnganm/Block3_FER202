import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const Filters = ({ onFilter }) => {
  const [maxPrep, setMaxPrep] = useState(0);
  const [maxCook, setMaxCook] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilter({ maxPrep, maxCook, searchTerm });
    }, 300);
    return () => clearTimeout(handler); // Dọn dẹp timeout khi component unmount hoặc state thay đổi
  }, [maxPrep, maxCook, searchTerm, onFilter]);

  return (
    <Form className="d-flex justify-content-between mb-4">
      <div className="d-flex">
        <Form.Select
          className="me-3"
          value={maxPrep}
          onChange={(e) => setMaxPrep(parseInt(e.target.value) || 0)}
          style={{ width: '200px', borderRadius: '5px', border: '1px solid #ced4da', padding: '6px' }}
        >
          <option value="0">Max Prep Time</option>
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
          <option value="20">20 mins</option>
        </Form.Select>
        <Form.Select
          value={maxCook}
          onChange={(e) => setMaxCook(parseInt(e.target.value) || 0)}
          style={{ width: '200px', borderRadius: '5px', border: '1px solid #ced4da', padding: '6px' }}
        >
          <option value="0">Max Cook Time</option>
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
          <option value="20">20 mins</option>
        </Form.Select>
      </div>
      <Form.Control
        type="text"
        placeholder="Search by name or ingredient..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '300px', borderRadius: '5px', border: '1px solid #ced4da', padding: '6px' }}
      />
    </Form>
  );
};

export default Filters;