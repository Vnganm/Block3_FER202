import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ 
      backgroundColor: '#333', 
      color: 'white', 
      padding: '15px',
      marginBottom: '20px'
    }}>
      <ul style={{ 
        display: 'flex', 
        listStyle: 'none', 
        gap: '20px',
        margin: 0,
        padding: 0
      }}>
        <li style={{ cursor: 'pointer' }}>Home</li>
        <li style={{ cursor: 'pointer' }}>About</li>
        <li style={{ cursor: 'pointer' }}>Services</li>
        <li style={{ cursor: 'pointer' }}>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;