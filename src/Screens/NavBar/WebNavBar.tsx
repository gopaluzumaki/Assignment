import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-logo">
          AEON
        </a>
        <a href="/">Showcase</a>
        <a href="/">Docs</a>
        <a href="/">Blog</a>
        <a href="/">Analytics</a>
        <a href="/">Templates</a>
        <a href="/">Enterprise</a>
      </div>
      <div className="navbar-right">
        <input
          type="text"
          className="search-input"
          placeholder="Search documentation..."
        />
      </div>
    </nav>
  );
};

export default Navbar;
