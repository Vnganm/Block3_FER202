import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function StudentCard({ student, onViewDetails }) {
  return (
    <Card style={{ width: '16rem', height: '97%', margin: '10px', display: 'flex', flexDirection: 'column', }}>
      <Card.Img variant="top" src={student.avatar || 'https://via.placeholder.com/150'} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
      <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Card.Title>ID: {student.id}</Card.Title>
          <Card.Text>
            Name: {student.name}<br />
            Email: {student.email}<br />
            Age: {student.age}
          </Card.Text>
        </div>
        <button onClick={() => onViewDetails(student)} style={{ width: '100%', marginTop: '10px' }} className="btn btn-primary">
          View Details
        </button>
      </Card.Body>
    </Card>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default StudentCard;