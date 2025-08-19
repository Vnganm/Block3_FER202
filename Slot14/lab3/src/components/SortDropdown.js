import React from 'react';
import { Dropdown } from 'react-bootstrap';

function SortDropdown({ onSort }) {
  const handleSort = (option) => {
    onSort(option);
  };

  return (
    <Dropdown className="mb-3 text-end">
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Sort by
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => handleSort('ageAsc')}>Age ↑</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort('ageDesc')}>Age ↓</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort('nameAsc')}>Name A-Z</Dropdown.Item>
        <Dropdown.Item onClick={() => handleSort('nameDesc')}>Name Z-A</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default SortDropdown;