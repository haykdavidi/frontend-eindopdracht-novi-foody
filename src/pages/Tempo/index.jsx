import {observer} from "mobx-react-lite";
import {useState} from "react";
import {
    FormContainer,
    FormDescription,
    FormHeader,
    FormItem,
    FormItemInput,
    FormItemLabel, SubmitFormButton
} from "../Questionnaire/styles.js";
import ConfettiExplosion from "react-confetti-explosion";
import ResultsModal from "../../components/ResultsModal/index.jsx";

function Tempo() {
    const [exploding, setExploding] = useState(false);
    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);

    const [questions, setQuestions] = useState([
        {
            question: "How many minutes do you have today to cook?",
            answer: 10
        },
        {
            question: "On a scale from 1 - 10, how busy are you today?",
            answer: 1
        },
    ]);

    const questionValueChange = (i, e) => {
        let copyQuestions = [...questions];
        copyQuestions[i].answer = e.target.value;
        setQuestions(copyQuestions);
    };

    const handleOpenChange = (value) => setOpen(value);

    const generateRandomRecipes = async () => {
        const app_id = '3738d17e'; // Replace with your Edamam app ID
        const app_key = 'bbe48a223f253671896036d5c4faf81e';
        const maximumTime = questions[0].answer;
        const res = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${app_id}&app_key=${app_key}&time=1-${maximumTime}`);
        return await res.json();
    };

    const onSubmit = () => {
        generateRandomRecipes().then((res) => {
            const recipes = res.hits.map(hit => hit.recipe);
            setRecipes(recipes.slice(0, 5)); // TODO: Change second number to amount of recipes you'd like returned.
            setExploding(true);
            setOpen(true);
        });
    };

    const onConfettiComplete = () => {
        setExploding(false);
    };

    return (
        <FormContainer>
            <FormHeader>Decide The Tempo</FormHeader>
            <FormDescription>Generate recipes based on your availability!</FormDescription>

            {questions.map((question, i) => (
                <FormItem key={`question-${i}`}>
                    <FormItemLabel>{question.question}</FormItemLabel>
                    <FormItemInput
                        type="number"
                        onChange={(e) => questionValueChange(i, e)}
                        value={question.answer}
                    />
                </FormItem>
            ))}

            <SubmitFormButton onClick={onSubmit}>Suprise me with recipes!</SubmitFormButton>
            {exploding && (
                <ConfettiExplosion
                    style={{zIndex: 1000}}
                    particleCount={400}
                    duration={3000}
                    onComplete={onConfettiComplete}
                    height="100vh"
                />
            )}
            <ResultsModal open={open} handleOpenChange={handleOpenChange} recipes={recipes} />
        </FormContainer>
    );
}

export default observer(Tempo);
