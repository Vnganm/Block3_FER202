import React, { useState } from 'react';
import { persons } from '../persons';
import { Button, ListGroup } from 'react-bootstrap';

const PersonList = () => {
  // State lưu danh sách đã sort và trạng thái sort
  const [sortedPersons, setSortedPersons] = useState([...persons]);
  const [sortAsc, setSortAsc] = useState(true);

  // Sort theo firstName (A-Z/Z-A)
  const handleSort = () => {
    const sorted = [...sortedPersons].sort((a, b) => {
      return sortAsc 
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    });
    setSortedPersons(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div>
      {/* Button sort - hiển thị chiều sort hiện tại */}
      <Button variant="primary" onClick={handleSort} className="mb-3">
        Sort: {sortAsc ? 'A→Z' : 'Z→A'}
      </Button>

      {/* Hiển thị danh sách */}
      <ListGroup>
        {sortedPersons.map(p => (
          <ListGroup.Item key={p.id}>
            {p.firstName} {p.lastName}, 
            Age: {p.age}, 
            City: {p.city}, 
            Skills: {p.skills.join(', ')}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PersonList;