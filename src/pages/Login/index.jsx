import { useState } from "react";
import { useUser } from "../../context/MainContext.jsx";
import './login.css';

function Login() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register, error, clearError  } = useUser();

  const handleModeChange = () => {
    setMode(mode === "login" ? "register" : "login");
    clearError();
  };

  const handleLogin = async () => {
    try {
      clearError();
      await login(email, password);
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const handleRegister = async () => {
    try {
      clearError();
      await register(email, password);
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

      <div className="form-item">
        <label className="form-item-label">E-mail</label>
        <input
          className="form-item-input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="form-item">
        <label className="form-item-label">Password</label>
        <input
          className="form-item-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button
        className="submit-form-button"
        onClick={mode === "login" ? handleLogin : handleRegister}
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>

      <div className="create-account">
        <p>{mode === "login" ? "Don't" : "Already"} have an account?</p>
        <a className="create-account-label" onClick={handleModeChange}>
          Create an account
        </a>
      </div>
    </div>
  );
}

export default Login;
