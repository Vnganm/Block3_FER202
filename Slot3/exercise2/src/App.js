import React, { useState } from 'react';
import PersonList from './components/PersonList';
import FilterPersons from './components/FilterPersons';
import SkillRanking from './components/SkillRanking';
import SearchPersons from './components/SearchPersons';
import { Container, Nav, Navbar, Tab, Tabs } from 'react-bootstrap';

function App() {
  const [key, setKey] = useState('req1'); // Quản lý tab active

  return (
    <Container className="my-4">
        <h2>Exercive 2</h2>
      <Tabs
        id="req-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        justify
      >
        <Tab eventKey="req1" title="Yêu cầu 1">
          <PersonList />
        </Tab>
        <Tab eventKey="req2" title="Yêu cầu 2">
          <FilterPersons />
        </Tab>
        <Tab eventKey="req3" title="Yêu cầu 3">
          <SkillRanking />
        </Tab>
        <Tab eventKey="req4" title="Yêu cầu 4">
          <SearchPersons />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;