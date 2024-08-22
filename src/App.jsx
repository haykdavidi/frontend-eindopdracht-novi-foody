import Navbar from "./components/Navbar/index.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import React, { useEffect } from "react";
import "./App.css"; // Import the CSS file for styling
import Search from "./pages/Search/index.jsx";
import MyRecipes from "./pages/MyRecipes/index.jsx";
import DecideYourFood from "./pages/DecideYourFood/index.jsx";
import Login from "./pages/Login/index.jsx";
import Fridge from "./pages/Fridge/index.jsx";
import Tempo from "./pages/Tempo/index.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
function App() {
  useEffect(()=>{
    AOS.init({
      duration: 1000
    });
  },)
  return (
   <div>
     <div className="main-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/whats-in-my-fridge" element={<Fridge />} />
          <Route path="/my-recipes" element={<MyRecipes />} />
          <Route path="/decide-your-food" element={<DecideYourFood />} />
          <Route path="/decide-the-tempo" element={<Tempo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
   </div>
  );
}

export default App;
