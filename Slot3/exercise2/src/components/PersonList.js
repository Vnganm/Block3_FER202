import React, { useState } from 'react';
import { persons } from '../persons';
import { Button, ListGroup } from 'react-bootstrap';

const PersonList = () => {
  const [sortedPersons, setSortedPersons] = useState([...persons]); // Sao chép mảng ban đầu
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = () => {
    const sorted = [...sortedPersons].sort((a, b) => {
      const compareResult = a.firstName.localeCompare(b.firstName);
      return sortAsc ? compareResult : -compareResult; // Đảo ngược bằng cách nhân -1
    });
    setSortedPersons(sorted);
    setSortAsc(!sortAsc);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleSort} className="mb-3">
        Sort First Name: {sortAsc ? 'A→Z' : 'Z→A'}
      </Button>
      <ListGroup>
        {sortedPersons.map(p => (
          <ListGroup.Item key={p.id}>
            {`${p.firstName} ${p.lastName}, Age: ${p.age}, City: ${p.city}, Skills: ${p.skills.join(', ')}`}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PersonList;