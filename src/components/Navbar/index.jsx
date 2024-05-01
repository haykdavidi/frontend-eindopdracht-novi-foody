import {observer} from "mobx-react-lite";
import {MenuItem, MenuItems, NavBarContainer, NavBarLogo} from "./styles.js";
import logo from "../../assets/images/foody.png";

function Navbar() {
    return (
        <NavBarContainer>
            <NavBarLogo src={logo} />

            <MenuItems>
                <MenuItem to="/">Home</MenuItem>
                <MenuItem to="/search">Search</MenuItem>
                <MenuItem to="/whats-in-my-fridge">What's in my fridge?</MenuItem>
                <MenuItem to="/my-recipes">My Recipes</MenuItem>
                <MenuItem to="/questionnaire">Questionnaire</MenuItem>
                <MenuItem to="/decide-the-tempo">Decide the tempo</MenuItem>
                <MenuItem to="/login">Login</MenuItem>
            </MenuItems>
        </NavBarContainer>
    );
}

export default observer(Navbar);