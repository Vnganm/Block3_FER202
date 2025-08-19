import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ValidatedInput from './components/ValidatedInput';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container className="my-5">
      <div className="mb-5">
        <ValidatedInput/>
      </div>
    </Container>
  );
}

export default App;