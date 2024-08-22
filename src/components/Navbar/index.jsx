import React, { useEffect } from 'react';
import { useUser } from "../../context/MainContext.jsx";
import logo from "../../assets/images/foody.png";
import './navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
  const { authenticated, handleSignOut } = useUser();
  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar-container" data-aos="fade-down">
      <img className="navbar-logo" src={logo} alt="Logo" loading='lazy' data-aos="fade-in"/>
      <div className="menu-items" data-aos="fade-up">
        <Link className="menu-item" to="/" data-aos="fade-right">Home</Link>
        <Link className="menu-item" to="/search" data-aos="fade-right" data-aos-delay="100">Search</Link>
        <Link className="menu-item" to="/whats-in-my-fridge" data-aos="fade-right" data-aos-delay="200">What's in my fridge?</Link>
        <Link className="menu-item" to="/decide-your-food" data-aos="fade-right" data-aos-delay="300">Decide your Mood Food</Link>
        <Link className="menu-item" to="/decide-the-tempo" data-aos="fade-right" data-aos-delay="400">Decide the tempo</Link>
        {authenticated ? (
          <>
            <Link className="menu-item" to="/my-recipes" data-aos="fade-right" data-aos-delay="500">My Recipes</Link>
            <button className="logout-button" onClick={handleLogout} data-aos="fade-up">Logout</button>
          </>
        ) : (
          <Link className="menu-item" to="/login" data-aos="fade-right" data-aos-delay="600">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
