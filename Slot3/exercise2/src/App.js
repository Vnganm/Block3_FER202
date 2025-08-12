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