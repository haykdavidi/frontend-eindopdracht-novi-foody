import Navbar from "./components/Navbar/index.jsx";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home/index.jsx";
import React from "react";
import {Content, MainContainer} from "./styles.js";
import Search from "./pages/Search/index.jsx";
import MyRecipes from "./pages/MyRecipes/index.jsx";
import Questionnaire from "./pages/Questionnaire/index.jsx";
import Login from "./pages/Login/index.jsx";
import Fridge from "./pages/Fridge/index.jsx";
import Tempo from "./pages/Tempo/index.jsx";

function App() {
    return (
        <MainContainer>
            <Navbar />
            <Content>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/whats-in-my-fridge" element={<Fridge />} />
                    <Route path="/my-recipes" element={<MyRecipes />} />
                    <Route path="/questionnaire" element={<Questionnaire />} />
                    <Route path="/decide-the-tempo" element={<Tempo />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Content>
        </MainContainer>
    )
}

export default App;
