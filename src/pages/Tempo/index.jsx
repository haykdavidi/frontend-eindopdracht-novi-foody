import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import ResultsModal from "../../components/ResultsModal/index.jsx";
import './tempo.css';

function Tempo() {
    const [exploding, setExploding] = useState(false);
    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);

    // Extended questions array
    const [questions, setQuestions] = useState([
        { question: "How many minutes do you have today to cook?", answer: 10 },
        { question: "On a scale from 1 - 10, how busy are you today?", answer: 1 },
        { question: "Do you prefer vegetarian recipes?", answer: 0 },  // 0 = No, 1 = Yes
        { question: "How many servings do you need?", answer: 2 },
        { question: "What type of cuisine are you in the mood for?", answer: '' } // Text input for specific cuisine
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
        const maximumTime = questions[0].answer;
        const cuisineType = questions[4].answer ? `&cuisineType=${questions[4].answer}` : '';
        const vegetarianFilter = questions[2].answer == 1 ? `&diet=vegetarian` : '';
        const res = await fetch(`https://api.edamam.com/search?q=chicken${vegetarianFilter}&app_id=${app_id}&app_key=${app_key}&time=1-${maximumTime}${cuisineType}`);
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
            <h1 className="form-header">Decide The Tempo</h1>
            <p className="form-description">Generate recipes based on your availability!</p>

            {questions.map((question, i) => (
                <div className="form-item" key={`question-${i}`}>
                    <label className="form-item-label">{question.question}</label>
                    <input
                        className="form-item-input"
                        type={typeof question.answer === 'number' ? 'number' : 'text'}
                        onChange={(e) => questionValueChange(i, e)}
                        value={question.answer}
                    />
                </div>
            ))}

            <button className="submit-form-button" onClick={onSubmit}>Surprise me with recipes!</button>
            {exploding && (
                <ConfettiExplosion
                    style={{ zIndex: 1000 }}
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

export default Tempo;
