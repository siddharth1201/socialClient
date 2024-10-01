import React, { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import './css/Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      if (res) {
        const temp = {
          username: res.data.username,
          email: res.data.email,
          _id: res.data._id,
          isAdmin: res.data.isAdmin,
        };

        localStorage.setItem('user', JSON.stringify(temp));
        navigate('/');
      }
    } catch (error) {
      setErrorMessage('Incorrect email or password'); // Display error message on failure
    }
  };

  return (
    <div className="login-container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="login-form">
        <h1>Login</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error */}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
