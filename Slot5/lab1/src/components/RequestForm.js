import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ingredient: '',
    maxPrep: '5',
    notes: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    ingredient: '',
  });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
      isValid = false;
    }
    if (!formData.ingredient.trim()) {
      newErrors.ingredient = 'Please specify ingredients';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name] && value.trim()) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Form submitted successfully!'); 
      
      setFormData({ name: '', email: '', ingredient: '', maxPrep: '5', notes: '' });
      setErrors({});
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Desired Ingredient</Form.Label>
        <Form.Control
          type="text"
          name="ingredient"
          value={formData.ingredient}
          onChange={handleChange}
          placeholder="E.g., avocado, tomato, chicken"
          isInvalid={!!errors.ingredient}
        />
        <Form.Control.Feedback type="invalid">{errors.ingredient}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Max Prep Time</Form.Label>
        <Form.Select
          name="maxPrep"
          value={formData.maxPrep}
          onChange={handleChange}
        >
          <option value="5">5 mins</option>
          <option value="10">10 mins</option>
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        <FaPaperPlane className="me-2" /> Submit Request
      </Button>
    </Form>
  );
};

export default RequestForm;