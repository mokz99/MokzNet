import React from 'react';
import './NavBar.css';
import youtubeLogo from './assets/youtube.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Top Section: Title */}
      <div className="nav-brand">
        <h1>Mokz.<span style={{color: 'var(--terminal-yellow-text)', textShadow: 'var(--yellow-glow)'}}>Net</span></h1>
        {/*<h1 style={{backgroundImage: 'linear-gradient(to right, rgb(255, 255, 255), rgb(235, 173, 40))', color: 'transparent', backgroundClip: 'text'}}>Mokz.Net</h1>*/}
      </div>
      
      {/* Bottom Section: Links */}
      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/lobby">Lobby</a></li>
        <li><a href="/games">Games</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;