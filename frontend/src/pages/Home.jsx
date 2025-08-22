import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';

const Home = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Welcome to Task Manager</h1>
        <p className="home-description">
          Your simple solution for managing daily tasks.
        </p>
      </div>
    </div>
  );
};

export default Home;