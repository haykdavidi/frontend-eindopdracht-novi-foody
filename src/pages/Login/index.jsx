import { useState } from "react";
import { useUser } from "../../context/MainContext.jsx";
import './login.css';

function Login() {
    const [mode, setMode] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, register, error, clearError } = useUser();

    const handleModeChange = () => {
        setMode(mode === "login" ? "register" : "login");
        clearError();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            clearError();
            await login(email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Failed to login", error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            clearError();
            await register(email, password);
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Failed to register", error);
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-header">{mode === "login" ? "Login" : "Sign Up"}</h1>
            <p className="form-description">
                Start searching and saving your favourite recipes!
            </p>
            {error && <p className="error-message">{error}</p>}

            <form id="login-form" onSubmit={mode === "login" ? handleLogin : handleRegister}>
                <div className="form-item">
                    <label className="form-item-label" htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        className="form-item-input"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="form-item">
                    <label className="form-item-label" htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="form-item-input"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                <button type="submit" className="submit-form-button">
                    {mode === "login" ? "Login" : "Sign Up"}
                </button>
            </form>

            <div className="create-account">
                <p>{mode === "login" ? "Don't" : "Already"} have an account?</p>
                <button
                    className="create-account-label"
                    onClick={handleModeChange}
                >
                    {mode === "login" ? "Create an account" : "Login"}
                </button>
            </div>
        </div>
    );
}

export default Login;
