import React, { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import RecipeGrid from './components/RecipeGrid';
import Footer from './components/Footer';
import recipes from './recipes';

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleFilter = ({ maxPrep, maxCook, searchTerm }) => {
    console.log('Filtering with:', { maxPrep, maxCook, searchTerm }); // Debug
    const filtered = recipes.filter(recipe =>
      (recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (maxPrep === 0 || recipe.prep <= maxPrep) &&
      (maxCook === 0 || recipe.cook <= maxCook)
    );
    setFilteredRecipes(filtered);
  };

  const handleViewRecipe = (recipe) => setSelectedRecipe(recipe);
  const handleCloseModal = () => setSelectedRecipe(null);

  return (
    <div style={{ backgroundColor: '#F5F6F2', minHeight: '100vh' }}>
      <NavbarComponent />
      <Container>
        <Hero />
        <Filters onFilter={handleFilter} />
        <RecipeGrid recipes={filteredRecipes} onView={handleViewRecipe} />
      </Container>
      <Footer />
      <Modal show={!!selectedRecipe} onHide={handleCloseModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#F5F6F2' }}>
          <Modal.Title>{selectedRecipe?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedRecipe?.description}</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#F5F6F2' }}>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="custom" style={{ backgroundColor: '#203933', color: 'white', borderColor: '#203933' }}>Add to Cart</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;