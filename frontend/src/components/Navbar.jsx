import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Index CSS se styles import karenge

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Task Manager</h1>
      <div className="navbar-links">
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;