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
                <MenuItem to="/my-recipes">Fave Recipes</MenuItem>
                <MenuItem to="/Match your MoodFood">Match your MoodFood</MenuItem>
                <MenuItem to="/decide-the-tempo">Decide the tempo</MenuItem>
                <MenuItem to="/login">Login</MenuItem>
            </MenuItems>
        </NavBarContainer>
    );
}
