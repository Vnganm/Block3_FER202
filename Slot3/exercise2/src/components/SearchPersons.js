import React, { useState, useEffect } from 'react';
import { persons } from '../persons';
import { Form, ListGroup, Card } from 'react-bootstrap';

const SearchPersons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayed, setDisplayed] = useState(persons);

  useEffect(() => {
    let filtered = persons.filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()));
    filtered.sort((a, b) => {
      if (a.isActive !== b.isActive) return b.isActive - a.isActive ? 1 : -1;
      if (a.age !== b.age) return a.age - b.age;
      return a.lastName.localeCompare(b.lastName);
    });
    setDisplayed(filtered);
  }, [searchTerm]);

  const stats = displayed.reduce((acc, { age, isActive }) => {
    acc.total++;
    acc.sumAge += age;
    if (isActive) acc.active++;
    return acc;
  }, { total: 0, sumAge: 0, active: 0 });
  const avgAge = stats.total ? (stats.sumAge / stats.total).toFixed(2) : 0;

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <ListGroup>
        {displayed.map(p => (
          <ListGroup.Item key={p.id}>{`${p.firstName} ${p.lastName}, Age: ${p.age}, City: ${p.city}, Skills: ${p.skills.join(', ')}`}</ListGroup.Item>
        ))}
      </ListGroup>
      <Card className="mt-3 p-2">
        <Card.Text>Statistics: Total: {stats.total}, Avg Age: {avgAge}, Active: {stats.active}</Card.Text>
      </Card>
    </div>
  );
};

export default SearchPersons;