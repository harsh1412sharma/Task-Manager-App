import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', formData);
      console.log(res.data);
      setMessage('User registered successfully!');
    } catch (err) {
      console.error(err.response.data);
      setMessage('Registration failed.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h1>User Registration</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
};
export default Register;