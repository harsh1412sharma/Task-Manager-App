import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();

      const res = await api.post('/users/login', formData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.user.name);
      
      setMessage('Login successful!');
      
      // Navigate to the dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.msg) {
        setMessage(err.response.data.msg); // Display a message from the backend if available
      } else {
        setMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>User Login</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;