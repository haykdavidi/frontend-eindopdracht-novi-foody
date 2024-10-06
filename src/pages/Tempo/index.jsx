import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import ResultsModal from "../../components/ResultsModal/index.jsx";
import './tempo.css';
import axios from "axios";

function Tempo() {
    const [exploding, setExploding] = useState(false);
    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);

    const [questions, setQuestions] = useState([
        { question: "How many minutes do you have today to cook?", answer: 10 },
        { question: "On a scale from 1 - 10, how busy are you today?", answer: 1 },
        { question: "Do you prefer vegetarian recipes?", answer: 0 },
        { question: "How many servings do you need?", answer: 2 },
        { question: "What type of cuisine are you in the mood for?", answer: '' }
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
        const maximumTime = questions[0].answer;
        const cuisineType = questions[4].answer ? `&cuisineType=${questions[4].answer}` : '';
        const vegetarianFilter = questions[2].answer == 1 ? `&diet=vegetarian` : '';

        try {
            const res = await axios.get(`https://api.edamam.com/search?q=chicken${vegetarianFilter}&app_id=${app_id}&app_key=${app_key}&time=1-${maximumTime}${cuisineType}`);
            return res.data;
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
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
        <form className="form-container">
            <h1 className="form-header">Decide The Tempo</h1>
            <p className="form-description">Generate recipes based on your availability!</p>

            <fieldset className="questions">
                {questions.map((question, i) => (
                    <div className="form-item" key={`question-${i}`}>
                        <label className="form-item-label" htmlFor={`question-${i}`}>{question.question}</label>
                        <input
                            id={`question-${i}`}
                            className="form-item-input"
                            type={typeof question.answer === 'number' ? 'number' : 'text'}
                            onChange={(e) => questionValueChange(i, e)}
                            value={question.answer}
                        />
                    </div>
                ))}
            </fieldset>

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
        </form>
    );
}

export default Tempo;
