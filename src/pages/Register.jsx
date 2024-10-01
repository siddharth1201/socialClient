import React, { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import './css/Register.css'; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const res = await register({ username, email, password });
      console.log(res.data);
      res && navigate('/login');
    } catch (error) {
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  const isFormValid = () => {
    return username && email && password && confirmPassword && password === confirmPassword;
  };

  return (
    <div className="register-container">
      <div className="navbar">
        <Navbar />
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={!isFormValid()}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
