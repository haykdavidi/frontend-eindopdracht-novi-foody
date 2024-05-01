import {observer} from "mobx-react-lite";
import {
    SubmitFormButton,
    FormItem,
    FormItemInput,
    FormItemLabel,
    FormContainer,
    FormDescription,
    FormHeader
} from "./styles.js";
import {useState} from "react";
import ConfettiExplosion from "react-confetti-explosion";
import ResultsModal from "../../components/ResultsModal/index.jsx";

function Questionnaire() {
    const [exploding, setExploding] = useState(false);
    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);

    // TODO: Voeg vragen toe aan deze array, deze worden automatisch erbij gerenderd.
    const [questions, setQuestions] = useState([
        {
            question: "Vraag 1", answer: ""
        },
        {
            question: "Vraag 2", answer: ""
        },
        {
            question: "Vraag 2", answer: ""
        }
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
        <FormContainer>
            <FormHeader>Questionnaire</FormHeader>
            <FormDescription>
                Answer the following three questions and suprise yourself with recipes!
            </FormDescription>

            {questions.map((question, i) => (
                <FormItem key={`question-${i}`}>
                    <FormItemLabel>{question.question}</FormItemLabel>
                    <FormItemInput
                        onChange={(e) => questionValueChange(i, e)}
                        value={question.answer}
                    />
                </FormItem>
            ))}

            <SubmitFormButton onClick={onSubmit}>Suprise me with recipes!</SubmitFormButton>
            {exploding && (
                <ConfettiExplosion
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

export default observer(Questionnaire);