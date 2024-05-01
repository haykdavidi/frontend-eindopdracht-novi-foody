import React from 'react'
import {
    DeleteRecipe,
    RecipeActions,
    RecipeBy,
    RecipeCardContainer,
    RecipeImage,
    RecipeLink,
    RecipeName,
    SaveRecipe
} from "./styles.js";
import {userStore} from "../../stores/index.js";
import {observer} from "mobx-react-lite";

function RecipeCard({rec}) {
    return (
        <RecipeCardContainer>
            <RecipeImage src={rec.image} alt={rec.label}/>
            <RecipeName>{rec.label}</RecipeName>

            <RecipeBy>by {rec.source}</RecipeBy>
            <RecipeActions>
                <RecipeLink href={rec.url} target="_blank">View Recipe</RecipeLink>
                {!userStore.containsRecipe(rec) && (
                    <SaveRecipe onClick={() => userStore.addRecipe(rec)} size={30} />
                )}
                {userStore.containsRecipe(rec) && (
                    <DeleteRecipe onClick={() => userStore.removeRecipe(rec)} size={30} />
                )}
            </RecipeActions>
        </RecipeCardContainer>
    );
}

export default observer(RecipeCard);
