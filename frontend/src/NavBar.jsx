import React from 'react';
import { useEffect, useState } from 'react';
import './NavBar.css';
import youtubeLogo from './assets/youtube.png';

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    // Sets the path when the component mounts (e.g., "/", "/guestbook", or "/games")
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <nav className="navbar">
      {/* Top Section: Title */}
      <div className="nav-brand">
        <h1>Mokz.<span style={{ color: 'var(--star-theme-text)', textShadow: 'var(--star-theme-glow)' }}>Net</span></h1>
      </div>

      {/* Bottom Section: Links */}
      <ul className="nav-links">
        <li><a href="/" className={currentPath === '/' ? 'active' : ''}>Home</a></li>
        <li><a href="/guestbook" className={currentPath === '/guestbook' ? 'active' : ''}>Guestbook</a></li>
        <li><a href="/games" className={currentPath === '/games' ? 'active' : ''}>Games</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;