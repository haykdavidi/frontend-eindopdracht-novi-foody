import {observer} from "mobx-react-lite";
import {MyRecipesContainer, MyRecipesCount, MyRecipesHeader, MyRecipesTitle} from "./styles.js";
import {Results, ResultsPlaceholder, SearchBar, SearchButton, SearchInput} from "../Search/styles.js";
import {userStore} from "../../stores/index.js";
import RecipeCard from "../../components/Cards/index.jsx";
import React, {useState} from "react";
import {TbPlus, TbSearch} from "react-icons/tb";

function MyRecipes() {
    const [query, setQuery] = useState("");
    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const containsQuery = (recipes) => {
        return recipes.filter(recipe => recipe.label.toLowerCase().includes(query.toLowerCase()));
    };

    return (
        <MyRecipesContainer>
            <SearchBar>
                <SearchInput
                    onChange={handleQueryChange}
                    value={query}
                    placeholder="Recipe name"
                />
                <SearchButton><TbSearch/></SearchButton>
            </SearchBar>

            <MyRecipesHeader>
                <MyRecipesTitle>My Recipes</MyRecipesTitle>
                <MyRecipesCount>Found {containsQuery(userStore.recipes).length} recipes</MyRecipesCount>
            </MyRecipesHeader>

            <Results>
                {userStore.recipes.length === 0 && (
                    <ResultsPlaceholder>You have no saved recipes</ResultsPlaceholder>
                )}
                {userStore.recipes.length > 0 && (
                    containsQuery(userStore.recipes).map((recipe, i) => (
                        <RecipeCard rec={recipe} key={`recipe-${i}`}/>
                    ))
                )}
            </Results>
        </MyRecipesContainer>
    );
}

export default observer(MyRecipes);