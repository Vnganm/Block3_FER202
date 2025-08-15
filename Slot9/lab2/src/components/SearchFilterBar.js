import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';
import { allGenres } from '../movies';

const SearchFilterBar = ({ setSearch, setGenre, setSort }) => {
  return (
    <div className="mb-4">
      <InputGroup className="mb-3">
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control 
          placeholder="Search by title..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      <Form.Select className="mb-3" onChange={(e) => setGenre(e.target.value)}>
        {allGenres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </Form.Select>
      <Form.Select onChange={(e) => setSort(e.target.value)}>
        <option value="none">Sort: None</option>
        <option value="durationAsc">Duration ↑</option>
        <option value="durationDesc">Duration ↓</option>
      </Form.Select>
    </div>
  );
};

SearchFilterBar.propTypes = {
  setSearch: PropTypes.func.isRequired,
  setGenre: PropTypes.func.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default SearchFilterBar;