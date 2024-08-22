import React, { useState, useEffect } from "react";
import { TbSearch } from "react-icons/tb";
import RecipeCard from "../../components/Cards/index.jsx";
import { useUser } from "../../context/MainContext.jsx";
import "./myrecipes.css"; // Import the CSS file for styling

function MyRecipes() {
  const { recipes } = useUser();
  const [query, setQuery] = useState("");
  
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const containsQuery = (recipes) => {
    return recipes.filter(recipe => recipe.label.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <div className="my-recipes-container" data-aos="fade-up">
      <div className="search-bar" data-aos="fade-in">
        <input
          className="search-input"
          onChange={handleQueryChange}
          value={query}
          placeholder="Recipe name"
        />
        <button className="search-button"><TbSearch /></button>
      </div>

      <div className="my-recipes-header" data-aos="fade-up">
        <h1 className="my-recipes-title">My Recipes</h1>
        <p className="my-recipes-count">Found {containsQuery(recipes).length} recipes</p>
      </div>

      <div className="results" data-aos="fade-up">
        {recipes.length === 0 && (
          <p className="results-placeholder">You have no saved recipes</p>
        )}
        {recipes.length > 0 && (
          containsQuery(recipes).map((recipe, i) => (
            <RecipeCard rec={recipe} key={`recipe-${i}`} data-aos="fade-up" />
          ))
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
