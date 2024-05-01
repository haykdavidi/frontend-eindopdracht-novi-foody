import {
    CreateAccount, CreateAccountLabel,
    FormContainer,
    FormDescription,
    FormHeader,
    FormItem,
    FormItemInput,
    FormItemLabel, SubmitFormButton
} from "../Questionnaire/styles.js";
import {useState} from "react";
import {observer} from "mobx-react-lite";
import {userStore} from "../../stores/index.js";

function Login() {
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleModeChange = () => {
        setMode(mode === "login" ? "register" : "login");
    };

    const login = () => {
        userStore.login(email, password);
    };

    const register = () => {
        userStore.register(email, password);
    };

    return (
        <FormContainer>
            <FormHeader>{mode === "login" ? "Login" : "Sign Up"}</FormHeader>
            <FormDescription>Start searching and saving your favourite recipes!</FormDescription>

            <FormItem>
                <FormItemLabel>E-mail</FormItemLabel>
                <FormItemInput
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </FormItem>
            <FormItem>
                <FormItemLabel>Password</FormItemLabel>
                <FormItemInput
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </FormItem>

            <SubmitFormButton onClick={mode === "login" ? login : register}>
                {mode === "login" ? "Login" : "Sign Up"}
            </SubmitFormButton>


            <CreateAccount>
                <p>{mode === "login" ? "Don't" : "Already"} have an account?</p>
                <CreateAccountLabel onClick={handleModeChange}>Create an account</CreateAccountLabel>
            </CreateAccount>
        </FormContainer>
    );
}

export default observer(Login);