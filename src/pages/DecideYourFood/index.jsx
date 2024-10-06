import React, { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import ResultsModal from '../../components/ResultsModal/index.jsx';
import './decideyourfood.css';
import axios from 'axios';

function DecideYourFood() {
    const [exploding, setExploding] = useState(false);
    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [questions, setQuestions] = useState([
        { question: "Question 1: Do you feel lucky today?", answer: "" },
        { question: "Question 2: On a scale of 1 to 10, how much do you feel like a superhero today?", answer: "" },
        { question: "Question 3: How would you rate your current mood on the Grumpy Cat scale?", answer: "" },
        { question: "Question 4: Are you in love at this very moment?", answer: "" },
        { question: "Question 5: Why did the chicken cross the road?", answer: "" }
    ]);

    const questionValueChange = (i, e) => {
        const copyQuestions = [...questions];
        copyQuestions[i].answer = e.target.value;
        setQuestions(copyQuestions);
    };

    const handleOpenChange = () => setOpen(!open);

    const generateRandomRecipes = async () => {
        const app_id = '3738d17e';
        const app_key = 'bbe48a223f253671896036d5c4faf81e';
        try {
            setLoading(true);
            setError(null);
            const res = await axios.get(`https://api.edamam.com/search?q=chicken&random=true&app_id=${app_id}&app_key=${app_key}`);
            return res.data;
        } catch (err) {
            setError("Failed to fetch recipes. Please try again.");
            console.error(err);
            return { hits: [] };
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await generateRandomRecipes();
            const recipes = res.hits.map(hit => hit.recipe);
            setRecipes(recipes.slice(0, 5));
            setExploding(true);
            setOpen(true);
        } catch (error) {
            console.error("Error generating recipes", error);
        }
    };

    const onConfettiComplete = () => {
        setExploding(false);
    };

    return (
        <form className="form-container">
            <h1 className="form-header">Match your MoodFood</h1>
            <p className="form-description">Answer the following three questions and surprise yourself with recipes!</p>

            <fieldset className="questions">
                {questions.map((question, i) => (
                    <div className="form-item" key={`question-${i}`}>
                        <label className="form-item-label" htmlFor={`question-${i}`}>{question.question}</label>
                        <input
                            id={`question-${i}`}
                            className="form-item-input"
                            type="text"
                            onChange={(e) => questionValueChange(i, e)}
                            value={question.answer}
                        />
                    </div>
                ))}
            </fieldset>

            <button className="submit-form-button" onClick={onSubmit}>Surprise me with recipes!</button>

            {loading && <p>Loading recipes...</p>}
            {error && <p className="error-message">{error}</p>}

            {exploding && (
                <ConfettiExplosion
                    particleCount={400}
                    duration={3000}
                    onComplete={onConfettiComplete}
                    height="100vh"
                />
            )}
            <ResultsModal open={open} handleOpenChange={handleOpenChange} recipes={recipes} />
        </form>
    );
}

export default DecideYourFood;
