import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const RequestForm = () => (
  <Form>
    <Form.Group className="mb-3">
      <Form.Label>Your Name</Form.Label>
      <Form.Control type="text" placeholder="Enter your name" />
      <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email Address</Form.Label>
      <Form.Control type="email" placeholder="Enter your email" />
      <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Desired Ingredient</Form.Label>
      <Form.Control type="text" placeholder="E.g., avocado, tomato, chicken" />
      <Form.Control.Feedback type="invalid">Please specify ingredients</Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Max Prep Time</Form.Label>
      <Form.Select>
        <option>5 mins</option>
        <option>10 mins</option>
        <option>15 mins</option>
        <option>30 mins</option>
      </Form.Select>
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Notes</Form.Label>
      <Form.Control as="textarea" rows={4} />
      <Form.Control.Feedback type="invalid">Please add notes if any</Form.Control.Feedback>
    </Form.Group>
    <Button variant="primary" type="submit">
      <FaPaperPlane className="me-2" /> Submit Request
    </Button>
  </Form>
);

export default RequestForm;