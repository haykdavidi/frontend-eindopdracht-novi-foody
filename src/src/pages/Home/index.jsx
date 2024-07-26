import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
    return (
        <div className="home-container">
            <p className="name">MoodFood</p>
            <p className="description">Moody Foody, match your mood with the taste of new food!</p>

            <div className="home-buttons">
                <Link className="to-search-button" to="/search">Get started</Link>
                <Link className="to-search-button" to="/questionnaire">Which food is in your mood?</Link>
                <Link className="to-search-button" to="/whats-in-my-fridge">What's in my fridge?</Link>
                <Link className="to-search-button" to="/decide-the-tempo">Decide the tempo</Link>
            </div>
        </div>
    );
}

export default Home;
