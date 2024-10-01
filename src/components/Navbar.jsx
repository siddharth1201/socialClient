import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css'

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/profile">Profile</Link>
  </nav>
);

export default Navbar;