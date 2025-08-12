import React, { useState } from 'react';
import { persons } from '../persons';
import { Form, Button, ListGroup } from 'react-bootstrap';

const FilterPersons = () => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [filtered, setFiltered] = useState([]);

  const skills = persons.reduce((acc, { skills }) => [...acc, ...skills], []).filter((v, i, a) => a.indexOf(v) === i);

  const handleFilter = () => {
    const result = persons.filter(({ age, skills }) => {
      const inAge = (!minAge || age >= +minAge) && (!maxAge || age <= +maxAge);
      const hasSkill = !selectedSkill || skills.includes(selectedSkill);
      return inAge && hasSkill;
    });
    setFiltered(result);
  };

  return (
    <div>
      <Form className="mb-3">
        <Form.Group className="mb-2">
          <Form.Control
            type="number"
            placeholder="Min Age"
            value={minAge}
            onChange={e => setMinAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control
            type="number"
            placeholder="Max Age"
            value={maxAge}
            onChange={e => setMaxAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Select value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}>
            <option value="">All Skills</option>
            {skills.map(s => <option key={s} value={s}>{s}</option>)}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={handleFilter}>
          Filter
        </Button>
      </Form>
      {filtered.length ? (
        <ListGroup>
          {filtered.map(({ firstName, lastName, skills }) => (
            <ListGroup.Item key={firstName}>{`${firstName} - ${lastName} - ${skills.join(', ')}`}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : <p className="text-center text-muted">No found.</p>}
    </div>
  );
};

export default FilterPersons;