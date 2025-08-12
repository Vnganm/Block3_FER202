import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const CompanyTable = () => {
  const initialCompanies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const [companies, setCompanies] = useState(initialCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(initialCompanies.map(company => company.category))];

  const handleSearch = () => {
    let filtered = initialCompanies;
    
    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== 'All') {
      filtered = filtered.filter(company => company.category === filterCategory);
    }
    
    let sorted = [...filtered];
    switch (sortOption) {
      case 'start-asc':
        sorted.sort((a, b) => a.start - b.start);
        break;
      case 'start-desc':
        sorted.sort((a, b) => b.start - a.start);
        break;
      case 'duration':
        sorted.sort((a, b) => (a.end - a.start) - (b.end - b.start));
        break;
      default:
        break;
    }
    
    setCompanies(sorted);
  };

  useEffect(() => {
    handleSearch();
  }, [sortOption, filterCategory]);

  return (
    <Container className="my-4">
      <h1 className="mb-4">Company Management</h1>
      
      <Row className="mb-4 g-2">
        <Col xs={12} md={6} lg={4}>
          <Form.Group>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="Search company name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </Form.Group>
        </Col>
        
        <Col xs={6} md={3} lg={2}>
          <Form.Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Form.Select>
        </Col>
        
        <Col xs={6} md={3} lg={2}>
          <Form.Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Default Order</option>
            <option value="start-asc">Start Year (Ascending)</option>
            <option value="start-desc">Start Year (Descending)</option>
            <option value="duration">Duration (End - Start)</option>
          </Form.Select>
        </Col>
      </Row>
      
      {companies.length === 0 ? (
        <p className="text-center text-muted">No results found</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Start Year</th>
              <th>End Year</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr key={index}>
                <td>{company.name}</td>
                <td>{company.category}</td>
                <td>{company.start}</td>
                <td>{company.end}</td>
                <td>{company.end - company.start} years</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CompanyTable;