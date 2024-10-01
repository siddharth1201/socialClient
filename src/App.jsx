import React from 'react';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? <Navigate to="/" /> : element;
};


const App = () => (
  
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
      <Route path="/register" element={<ProtectedRoute element={<Register />} />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  </Router>
);

export default App;
