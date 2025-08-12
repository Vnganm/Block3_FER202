import React, { useState } from 'react';
import { persons } from '../persons';
import { Form, Button, ListGroup } from 'react-bootstrap';

const FilterPersons = () => {
  // State cho filter
  const [minAge, setMinAge] = useState(''); // Tuổi tối thiểu
  const [maxAge, setMaxAge] = useState(''); // Tuổi tối đa
  const [selectedSkill, setSelectedSkill] = useState(''); // Kỹ năng chọn
  const [filtered, setFiltered] = useState([]); // Kết quả filter

  // Lấy danh sách skills duy nhất từ persons
  const skills = [...new Set(persons.flatMap(p => p.skills))];

  const handleFilter = () => {
    const result = persons.filter(({ age, skills }) => {
      const ageInRange = (!minAge || age >= +minAge) && (!maxAge || age <= +maxAge);
      const skillMatch = !selectedSkill || skills.includes(selectedSkill);
      return ageInRange && skillMatch;
    });
    setFiltered(result);
  };

  return (
    <div>
      {/* Form filter */}
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

      {/* Hiển thị kết quả */}
      {filtered.length ? (
        <ListGroup>
          {filtered.map(({ id, firstName, lastName, skills }) => (
            <ListGroup.Item key={id}>
              {firstName} {lastName} - Skills: {skills.join(', ')}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center text-muted">No results found</p>
      )}
    </div>
  );
};

export default FilterPersons;