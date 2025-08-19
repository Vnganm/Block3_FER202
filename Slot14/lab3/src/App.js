import React, { useState } from 'react';
import StudentsPage from './pages/StudentsPage';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [showProfileWizard, setShowProfileWizard] = useState(false); // Đã import useState
  
  return (
    <div className="App">
      <StudentsPage showProfileWizard={showProfileWizard} setShowProfileWizard={setShowProfileWizard} /> {/* Truyền prop */}
      <Footer />
    </div>
  );
}

export default App;