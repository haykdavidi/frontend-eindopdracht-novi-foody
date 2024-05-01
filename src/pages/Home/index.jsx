import React from 'react';
import {observer} from "mobx-react-lite";
import {Description, HomeButtons, HomeContainer, Name, ToSearchButton} from "./styles.js";

function Home() {
    return (
        <HomeContainer>
            <Name>MoodFood</Name>
            <Description>Moody Foody, match your mood with the taste of new food!</Description>

            <HomeButtons>
                <ToSearchButton to="/search">Get started</ToSearchButton>
                <ToSearchButton to="/questionnaire">Which food is in your mood?</ToSearchButton>
                <ToSearchButton to="/whats-in-my-fridge">What's in my fridge?</ToSearchButton>
                <ToSearchButton to="/decide-the-tempo">Decide the tempo</ToSearchButton>
            </HomeButtons>
        </HomeContainer>
    );
}

export default observer(Home);
