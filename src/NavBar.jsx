import React from 'react';
import './Navbar.css';
import youtubeLogo from './assets/youtube.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Top Section: Title */}
      <div className="nav-brand">
        <h1>Mokz.Net</h1>
      </div>
      
      {/* Bottom Section: Links */}
      <ul className="nav-links">
        <li><a href="#projects">Home</a></li>
        <li><a href="#projects">Guest Book</a></li>
        <li><a href="#projects">Image Board</a></li>
        <li><a href="#about">Game?</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;