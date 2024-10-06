import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    return (
        <main className="home-container">
            <h1 className="name" data-aos="fade-down">
                MoodFood
            </h1>
            <p className="description">
                Moody Foody, match your mood with the taste of new food!
            </p>

            <div className="home-buttons">
                <Link className="to-search-button" to="/search" data-aos="fade-up">
                    Get started
                </Link>
                <Link className="to-search-button" to="/decide-your-food" data-aos="fade-up">
                    Which food is in your mood?
                </Link>
                <Link className="to-search-button" to="/whats-in-my-fridge" data-aos="fade-up">
                    What's in my fridge?
                </Link>
                <Link className="to-search-button" to="/decide-the-tempo" data-aos="fade-up">
                    Decide the tempo
                </Link>
            </div>
        </main>
    );
}

export default Home;
