import React, { useState, useEffect } from 'react';
import { persons } from '../persons';
import { Form, ListGroup, Card } from 'react-bootstrap';

const SearchPersons = () => {
  // State cho search term và kết quả hiển thị
  const [searchTerm, setSearchTerm] = useState('');
  const [displayed, setDisplayed] = useState(persons);

  // Filter và sort khi searchTerm thay đổi
  useEffect(() => {
    const filtered = persons
      .filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        // Ưu tiên active -> tuổi tăng dần -> lastName A-Z
        if (a.isActive !== b.isActive) return b.isActive - a.isActive;
        if (a.age !== b.age) return a.age - b.age;
        return a.lastName.localeCompare(b.lastName);
      });
    setDisplayed(filtered);
  }, [searchTerm]);

  // Tính toán thống kê
  const stats = displayed.reduce((acc, { age, isActive }) => ({
    total: acc.total + 1,
    sumAge: acc.sumAge + age,
    active: acc.active + (isActive ? 1 : 0)
  }), { total: 0, sumAge: 0, active: 0 });

  return (
    <div>
      {/* Search input */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {/* Danh sách kết quả */}
      <ListGroup>
        {displayed.map(p => (
          <ListGroup.Item key={p.id}>
            {`${p.firstName} ${p.lastName}, Age: ${p.age}, City: ${p.city}, Skills: ${p.skills.join(', ')}`}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Thống kê */}
      <Card className="mt-3 p-2">
        <Card.Text>
          Total: {stats.total} | 
          Avg Age: {stats.total ? (stats.sumAge / stats.total).toFixed(2) : 0} | 
          Active: {stats.active}
        </Card.Text>
      </Card>
    </div>
  );
};

export default SearchPersons;