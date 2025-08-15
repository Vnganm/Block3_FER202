import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Navbar, Nav, Carousel, Row, Col, Alert } from 'react-bootstrap';
import { movies } from './movies';
import MovieCard from './components/MovieCard';
import SearchFilterBar from './components/SearchFilterBar';
import MovieRequestForm from './components/MovieRequestForm';

const App = () => {
  const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('none');

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (id) => {
    setFavourites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]));
  };

  const filteredMovies = useMemo(() => {
    let result = movies;
    if (search) {
      result = result.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (genre !== 'All') {
      result = result.filter((movie) => movie.genre === genre);
    }
    if (sort === 'durationAsc') {
      result = [...result].sort((a, b) => a.duration - b.duration);
    } else if (sort === 'durationDesc') {
      result = [...result].sort((a, b) => b.duration - a.duration);
    }
    return result;
  }, [search, genre, sort]);

  const favouriteMovies = useMemo(() => {
    return movies.filter((movie) => favourites.includes(movie.id));
  }, [favourites]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand as={NavLink} to="/" className="fs-5 fw-bold">
          Movie Explorer
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" activeClassName="active">
              Free Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favourites" activeClassName="active">
              My Favourite Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/request" activeClassName="active">
              Movie Request Form
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel className="mb-4">
                  {movies.slice(0, 3).map((movie) => (
                    <Carousel.Item key={movie.id}>
                      <img
                        className="d-block w-100 carousel-img"
                        src={movie.poster}
                        alt={movie.title}
                      />
                      <Carousel.Caption>
                        <h3>{movie.title}</h3>
                        <p>{movie.description.slice(0, 50)}...</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
                <SearchFilterBar setSearch={setSearch} setGenre={setGenre} setSort={setSort} />
                {filteredMovies.length === 0 && <Alert variant="warning">No movies found</Alert>}
                <Row xs={1} md={2} lg={3} className="g-4">
                  {filteredMovies.map((movie) => (
                    <Col key={movie.id}>
                      <MovieCard
                        movie={movie}
                        addToFavourites={addToFavourites}
                        isFavourite={favourites.includes(movie.id)}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            }
          />
          <Route
            path="/favourites"
            element={
              <>
                {favouriteMovies.length === 0 && <Alert variant="warning">No favourites yet.</Alert>}
                <Row xs={1} md={2} lg={3} className="g-4">
                  {favouriteMovies.map((movie) => (
                    <Col key={movie.id}>
                      <MovieCard
                        movie={movie}
                        addToFavourites={addToFavourites}
                        isFavourite={favourites.includes(movie.id)}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            }
          />
          <Route path="/request" element={<MovieRequestForm />} />
        </Routes>
      </div>
    </>
  );
};

export default App;