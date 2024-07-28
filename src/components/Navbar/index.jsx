import { useUser } from "../../context/MainContext.jsx";
import logo from "../../assets/images/foody.png";
import './navbar.css';
import { Link } from "react-router-dom";

function Navbar() {
  const { authenticated, handleSignOut } = useUser();

  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="navbar-container">
      <img className="navbar-logo" src={logo} alt="Logo" />
      <div className="menu-items">
        <Link className="menu-item" to="/">Home</Link>
        <Link className="menu-item" to="/search">Search</Link>
        <Link className="menu-item" to="/whats-in-my-fridge">What's in my fridge?</Link>
        <Link className="menu-item" to="/questionnaire">Questionnaire</Link>
        <Link className="menu-item" to="/decide-the-tempo">Decide the tempo</Link>
        {authenticated ? (
          <>
            <Link className="menu-item" to="/my-recipes">My Recipes</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link className="menu-item" to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default (Navbar);
