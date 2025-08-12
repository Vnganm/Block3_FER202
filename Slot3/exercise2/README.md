Exercise 2
PersonList.js
 

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


FilterPersons.js
 
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
SkillRanking.js
 
import React from 'react';
import { persons } from '../persons';
import { Table } from 'react-bootstrap';

const SkillRanking = () => {
  const skillCounts = persons.reduce((acc, { skills }) => {
    skills.forEach(s => acc[s] = (acc[s] || 0) + 1);
    return acc;
  }, {});

  const sortedSkills = Object.entries(skillCounts).sort(([,a], [,b]) => b - a);
  const maxCount = sortedSkills[0]?.[1] || 0;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Skill</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {sortedSkills.map(([skill, count]) => (
          <tr key={skill}>
            <td style={{ fontWeight: count === maxCount ? 'bold' : 'normal' }}>{skill}</td>
            <td>{count}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SkillRanking;


SearchPersons.js
 

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


App.js
import React from 'react';
import PersonList from './components/PersonList';
import FilterPersons from './components/FilterPersons';
import SkillRanking from './components/SkillRanking';
import SearchPersons from './components/SearchPersons';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="my-4">
      <h1 className="mb-4">Bài tập React</h1>
      <h2>Yêu cầu 1</h2>
      <PersonList />
      <hr />
      <h2>Yêu cầu 2</h2>
      <FilterPersons />
      <hr />
      <h2>Yêu cầu 3</h2>
      <SkillRanking />
      <hr />
      <h2>Yêu cầu 4</h2>
      <SearchPersons />
    </Container>
  );
}
export default App;



