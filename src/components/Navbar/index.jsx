import React, {useEffect, useState} from 'react';
import { useUser } from "../../context/MainContext.jsx";
import logo from "../../assets/images/foody.png";
import './navbar.css';
import {Link, NavLink} from "react-router-dom";
import Button from "../button/Button.jsx";
import { motion } from 'framer-motion';

function Navbar() {
  const { authenticated, handleSignOut } = useUser();
  const [isBurger, setIsBurger] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  const toggleBurger = () => {
    setIsBurger(!isBurger);
  }

  useEffect(() => {
    const handleBurger = () => {
      setIsMobile(window.innerWidth < 1000);
      if (window.innerWidth > 1000) {
        setIsBurger(false);
      }
    }

    window.addEventListener('resize', handleBurger);

    return() => {
      window.removeEventListener('resize', handleBurger);
    }
  }, []);

  const handleLogout = async () => {
    if (isBurger) {
      toggleBurger();
    }
    try {
      await handleSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    tap: { scale: 0.95, transition: { duration: 0.2, ease: 'easeOut' } }
  };

  if (!isMobile) return (
      <header>
        <nav className="navbar-container">
          <Link to="/" id="logo">
            <motion.img
                className="navbar-logo"
                src={logo}
                alt="Logo"
                loading='lazy'
                initial="hidden"
                animate="visible"
                variants={fadeRight}
                style={{ willChange: "transform, opacity" }}
            />
          </Link>
          <ul className="menu-items">
            <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" whileTap="tap">
              <Link to="/search">Search</Link>
            </motion.li>
            <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.2 }} whileTap="tap">
              <Link to="/whats-in-my-fridge">What's in my fridge?</Link>
            </motion.li>
            <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.4 }} whileTap="tap">
              <Link to="/decide-your-food">Decide your Mood Food</Link>
            </motion.li>
            <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.6 }} whileTap="tap">
              <Link to="/decide-the-tempo">Decide the tempo</Link>
            </motion.li>
            {authenticated ? (
                <>
                  <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.8 }} whileTap="tap">
                    <Link to="/my-recipes">My Recipes</Link>
                  </motion.li>
                  <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 1 }} whileTap="tap">
                    <Button className="logout-button" onClick={handleLogout}>Logout</Button>
                  </motion.li>
                </>
            ) : (
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 1 }} whileTap="tap">
                  <Link to="/login">Login</Link>
                </motion.li>
            )}
          </ul>
        </nav>
      </header>
  );

  return (
      <header>
        {isMobile ? (
            <nav className={`mobile-navbar-container ${isBurger ? 'menu-open' : ''}`}>
              <div className="mobile-logo-btn">
                <NavLink to="/" id="logo">
                  <motion.img
                      className="navbar-logo"
                      src={logo}
                      alt="Logo"
                      loading='lazy'
                      initial="hidden"
                      animate="visible"
                      variants={fadeRight}
                      style={{ willChange: "transform, opacity" }}
                  />
                </NavLink>
                <Button onClick={toggleBurger} className={`burger ${isBurger ? "active" : ""}`}>
                  <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="burger-svg">
                    <line x1="25" x2="175" y1="50" y2="50" stroke="var(--accent-color)" strokeLinecap="round" strokeWidth="15" strokeDasharray="150" strokeDashoffset="0" className={` ${isBurger ? "active line top" : "line top"}`} />
                    <line x1="25" x2="175" y1="100" y2="100" stroke="var(--accent-color)" strokeLinecap="round" strokeWidth="15" strokeDasharray="150" strokeDashoffset="0" className={` ${isBurger ? "active line middle" : "line middle"}`} />
                    <line x1="25" x2="175" y1="150" y2="150" stroke="var(--accent-color)" strokeLinecap="round" strokeWidth="15" strokeDasharray="150" strokeDashoffset="0" className={` ${isBurger ? "active line bottom" : "line bottom"}`} />
                  </svg>
                </Button>
              </div>
              <ul className={isBurger ? "burger-open" : "burger-closed"}>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" whileTap="tap">
                  <NavLink to="/" onClick={toggleBurger}>Home</NavLink>
                </motion.li>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.2 }} whileTap="tap">
                  <NavLink to="/search" onClick={toggleBurger}>Search</NavLink>
                </motion.li>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.4 }} whileTap="tap">
                  <NavLink to="/whats-in-my-fridge" onClick={toggleBurger}>What's in my fridge?</NavLink>
                </motion.li>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.6 }} whileTap="tap">
                  <NavLink to="/decide-your-food" onClick={toggleBurger}>Decide your Mood Food</NavLink>
                </motion.li>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.8 }} whileTap="tap">
                  <NavLink to="/decide-the-tempo" onClick={toggleBurger}>Decide the tempo</NavLink>
                </motion.li>
                {authenticated ? (
                    <>
                      <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 1 }} whileTap="tap">
                        <NavLink to="/my-recipes" onClick={toggleBurger}>My Recipes</NavLink>
                      </motion.li>
                      <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 1.2 }} whileTap="tap">
                        <Button className="logout-button-mobile" onClick={handleLogout}>Logout</Button>
                      </motion.li>
                    </>
                ) : (
                    <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 1.2 }} whileTap="tap">
                      <NavLink to="/login" onClick={toggleBurger}>Login</NavLink>
                    </motion.li>
                )}
              </ul>
            </nav>
        ) : (
            <nav className="navbar-container">
              <NavLink to="/" id="logo">
                <motion.img
                    className="navbar-logo"
                    src={logo}
                    alt="Logo"
                    loading='lazy'
                    initial="hidden"
                    animate="visible"
                    variants={fadeRight}
                    style={{ willChange: "transform, opacity" }}
                />
              </NavLink>
              <ul className="menu-items">
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" whileTap="tap">
                  <NavLink to="/search">Search</NavLink>
                </motion.li>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.2 }} whileTap="tap">
                  <NavLink to="/whats-in-my-fridge">What's in my fridge?</NavLink>
                </motion.li>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.4 }} whileTap="tap">
                  <NavLink to="/decide-your-food">Decide your Mood Food</NavLink>
                </motion.li>
                <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.6 }} whileTap="tap">
                  <NavLink to="/decide-the-tempo">Decide the tempo</NavLink>
                </motion.li>
                {authenticated ? (
                    <>
                      <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 0.8 }} whileTap="tap">
                        <NavLink to="/my-recipes">My Recipes</NavLink>
                      </motion.li>
                      <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 1 }} whileTap="tap">
                        <Button className="logout-button" onClick={handleLogout}>Logout</Button>
                      </motion.li>
                    </>
                ) : (
                    <motion.li className="menu-item" variants={fadeRight} initial="hidden" animate="visible" transition={{ delay: 1 }} whileTap="tap">
                      <NavLink to="/login">Login</NavLink>
                    </motion.li>
                )}
              </ul>
            </nav>
        )}
      </header>
  )
}

export default Navbar;
