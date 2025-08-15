import { useState } from 'react';
import { Form, Button, Toast } from 'react-bootstrap';
import { allGenres } from '../movies';

const MovieRequestForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.year || formData.year <= 1900) newErrors.year = 'Year must be > 1900';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Duration must be > 0';
    if (!formData.description || formData.description.length < 30)
      newErrors.description = 'Description must be at least 30 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowToast(true);
      setFormData({ title: '', genre: '', year: '', duration: '', description: '' });
      setErrors({});
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
            isInvalid={!!errors.genre}
          >
            <option value="">Select genre</option>
            {allGenres.slice(1).map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            isInvalid={!!errors.year}
          />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            isInvalid={!!errors.duration}
          />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="light" type="submit">
          Submit Request
        </Button>
      </Form>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{ position: 'fixed', top: 70, right: 20, color: '#000', zIndex: 1000, minWidth: '300px' }}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>Request submitted. Thank you!</Toast.Body>
      </Toast>
    </>
  );
};

export default MovieRequestForm;