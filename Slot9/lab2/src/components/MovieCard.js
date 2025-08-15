import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, Badge, Button, Modal, Toast } from 'react-bootstrap';

const MovieCard = ({ movie, addToFavourites, isFavourite }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.poster} alt={movie.title} className="card-img-top" />
        <Card.Body className='text-white'>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description.slice(0, 50)}...</Card.Text>
          <Card.Text>Year: {movie.year}</Card.Text>
          <Card.Text>Country: {movie.country}</Card.Text>
          <Card.Text>Duration: {movie.duration} min</Card.Text>
          <Badge bg="success">{movie.genre}</Badge>
          <div className="mt-2">
            <Button variant="primary" size="sm" className="me-2" onClick={() => setShowModal(true)}>
              Details
            </Button>
            <Button
              variant={isFavourite ? 'danger' : 'light'}
              size="sm"
              onClick={() => {
                addToFavourites(movie.id);
                setShowToast(true);
              }}
            >
              {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card.Img variant="top" src={movie.poster} className="card-img-top mb-3" />
          <p>{movie.description}</p>
          <p>Showtimes: Check local listings</p>
          <p>Year: {movie.year}</p>
          <p>Country: {movie.country}</p>
          <p>Duration: {movie.duration} min</p>
          <p>Genre: {movie.genre}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary " >Close</Button>
        </Modal.Footer>

      </Modal>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{ 
          position: 'fixed', 
          top: '80px',
          right: '20px',
          zIndex: 1000,
          minWidth: '300px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: isFavourite ? '#fee2e2' : '#fff'
        }}
      >
        <Toast.Header style={{
          background: 'transparent',
          borderBottom: 'none',
          padding: '12px 12px 0px 12px'
        }}>
          <i className={`bi ${isFavourite ? 'bi-heart-break-fill text-success' : 'bi-heart-fill text-danger'} me-2`}></i>
          <strong className="me-auto" style={{ color: isFavourite ? '#dc2626' : '#000' }}>
            {isFavourite ? 'Added to Favourites' : 'Removed from Favourites'}
          </strong>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowToast(false)}
            style={{ padding: '12px' }}
          />
        </Toast.Header>
        <Toast.Body style={{ padding: '8px 12px 12px 12px' }}>
          <div className="d-flex align-items-center">
            <img 
              src={movie.poster} 
              alt={movie.title}
              style={{ 
                width: '40px', 
                height: '40px', 
                objectFit: 'cover',
                borderRadius: '4px',
                marginRight: '12px'
              }}
            />
            <div>
              <div className="fw-semibold" style={{ color: isFavourite ? '#dc2626' : '#16a34a' }}>
                {movie.title}
              </div>
              <small className="text-muted">
                {movie.year} • {movie.genre}
              </small>
            </div>
          </div>
        </Toast.Body>
      </Toast>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  addToFavourites: PropTypes.func.isRequired,
  isFavourite: PropTypes.bool.isRequired,
};

export default MovieCard;