import React, { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import ResultsModal from '../../components/ResultsModal/index.jsx';
import './questionnaire.css';

function Questionnaire() {
    const [exploding, setExploding] = useState(false);
    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);
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
        const app_id = '3738d17e'; // Replace with your Edamam app ID
        const app_key = 'bbe48a223f253671896036d5c4faf81e';
        const res = await fetch(`https://api.edamam.com/search?q=chicken&random=true&app_id=${app_id}&app_key=${app_key}`);
        return await res.json();
    };

    const onSubmit = () => {
        generateRandomRecipes().then((res) => {
            const recipes = res.hits.map(hit => hit.recipe);
            setRecipes(recipes.slice(0, 5));
            setExploding(true);
            setOpen(true);
        });
    };

    const onConfettiComplete = () => {
        setExploding(false);
    };

    return (
        <div className="form-container">
            <h1 className="form-header">Match your MoodFood</h1>
            <p className="form-description">Answer the following three questions and surprise yourself with recipes!</p>

            {questions.map((question, i) => (
                <div className="form-item" key={`question-${i}`}>
                    <p className="form-item-label">{question.question}</p>
                    <input
                        className="form-item-input"
                        type="text"
                        onChange={(e) => questionValueChange(i, e)}
                        value={question.answer}
                    />
                </div>
            ))}

            <button className="submit-form-button" onClick={onSubmit}>Surprise me with recipes!</button>
            {exploding && (
                <ConfettiExplosion
                    particleCount={400}
                    duration={3000}
                    onComplete={onConfettiComplete}
                    height="100vh"
                />
            )}
            <ResultsModal open={open} handleOpenChange={handleOpenChange} recipes={recipes} />
        </div>
    );
}

export default Questionnaire;
