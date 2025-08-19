import React from 'react';
import { Modal, Button, Image } from 'react-bootstrap';

function StudentDetailModal({ show, onHide, student }) {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0">
        <div className="row">
          <div className="col-md-4 text-center">
            <Image 
              src={student.avatar || 'https://via.placeholder.com/300'} 
              alt={student.name}
              fluid
              rounded
              className="mb-3"
            />
          </div>
          <div className="col-md-8">
            <ul className="list-unstyled">
              <li className="mb-2"><strong>ID:</strong> {student.id}</li>
              <li className="mb-2"><strong>Name:</strong> {student.name}</li>
              <li className="mb-2"><strong>Email:</strong> {student.email}</li>
              <li className="mb-2"><strong>Age:</strong> {student.age}</li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentDetailModal;