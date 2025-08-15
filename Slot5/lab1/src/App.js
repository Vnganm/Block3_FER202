import React, { useState } from 'react';
import { Container, Modal, Button, Toast } from 'react-bootstrap';
import NavbarComponent from './components/Navbar';
import Hero from './components/Hero';
import Filters from './components/Filters';
import RecipeGrid from './components/RecipeGrid';
import Footer from './components/Footer';
import RequestForm from './components/RequestForm';
import Cart from './components/Cart';
import RecipeCarousel from './components/Carousel'; 
import recipes from './recipes';

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [sortedRecipes, setSortedRecipes] = useState(filteredRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const handleFilter = ({ maxPrep, maxCook, searchTerm, sortBy }) => {
    const filtered = recipes.filter(recipe =>
      (maxPrep === 0 || recipe.prep <= maxPrep) &&
      (maxCook === 0 || recipe.cook <= maxCook) &&
      (searchTerm === '' || 
       recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       recipe.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredRecipes(filtered);
    handleSort(filtered, sortBy);
  };

  const handleSort = (recipesToSort, sortBy) => {
    let sorted = [...recipesToSort];
    switch (sortBy) {
      case 'name-asc': sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'name-desc': sorted.sort((a, b) => b.title.localeCompare(a.title)); break;
      case 'prep-asc': sorted.sort((a, b) => a.prep - b.prep); break;
      case 'prep-desc': sorted.sort((a, b) => b.prep - a.prep); break;
      case 'cook-asc': sorted.sort((a, b) => a.cook - b.cook); break;
      case 'cook-desc': sorted.sort((a, b) => b.cook - a.cook); break;
      default: sorted = recipesToSort;
    }
    setSortedRecipes(sorted);
  };

  const handleViewRecipe = (recipe) => setSelectedRecipe(recipe);
  const handleCloseModal = () => setSelectedRecipe(null);
  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);
  const handleAddToCart = (recipe) => {
    setCart([...cart, { ...recipe, quantity: 1 }]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
    handleCloseModal();
  };
  const handleShowCart = () => setShowCartModal(true);
  const handleCloseCartModal = () => setShowCartModal(false);

  return (
    <div style={{ backgroundColor: '#F5F6F2', minHeight: '100vh' }}>

      <NavbarComponent onShowForm={handleShowForm} cartCount={cart.length} onShowCart={handleShowCart} />
      
      <Container>
        <RecipeCarousel /> 
        <Hero />
        <Filters onFilter={handleFilter} />
        
        <RecipeGrid recipes={sortedRecipes} onView={handleViewRecipe} onAddToCart={handleAddToCart} />

        <Modal show={showForm} onHide={handleCloseForm} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#F5F6F2' }}>
            <Modal.Title>Recipe Request Form</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F5F6F2' }}>
            <RequestForm />
          </Modal.Body>
        </Modal>

        <Modal show={!!selectedRecipe} onHide={handleCloseModal} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#F5F6F2', borderBottom: 'none', padding: '10px' }}>
            <Modal.Title style={{ fontSize: '1.5rem', fontWeight: '600' }}>{selectedRecipe?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#F5F6F2', padding: '15px', borderRadius: '0 0 10px 10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            {selectedRecipe && (
              <div>
                <img src={selectedRecipe.image} alt={selectedRecipe.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }} />
                <p style={{ margin: '5px 0', fontSize: '0.95rem' }}><strong>Description:</strong> {selectedRecipe.description}</p>
                <p style={{ margin: '5px 0', fontSize: '0.95rem' }}><strong>Servings:</strong> {selectedRecipe.servings}</p>
                <p style={{ margin: '5px 0', fontSize: '0.95rem' }}><strong>Prep Time:</strong> {selectedRecipe.prep} mins</p>
                <p style={{ margin: '5px 0', fontSize: '0.95rem' }}><strong>Cook Time:</strong> {selectedRecipe.cook} mins</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#F5F6F2', borderTop: 'none', padding: '10px', justifyContent: 'space-between' }}>
            <Button variant="secondary" onClick={handleCloseModal} style={{ padding: '5px 15px', fontSize: '0.9rem' }}>Close</Button>
            <Button variant="custom" onClick={() => handleAddToCart(selectedRecipe)} style={{ backgroundColor: '#203933', color: 'white', borderColor: '#203933', padding: '5px 15px', fontSize: '0.9rem' }}>Add to Cart</Button>
          </Modal.Footer>
        </Modal>


        <Modal show={showCartModal} onHide={handleCloseCartModal} centered size="lg">
          <Cart cart={cart} setCart={setCart} onClose={handleCloseCartModal} />
        </Modal>

        <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide style={{ position: 'fixed', top: '20px', right: '20px' }}>
          <Toast.Body>Added to cart</Toast.Body>
        </Toast>

      </Container>
      <Footer />
    </div>
  );
}

export default App;