import React from 'react';
import { useUser } from '../../context/MainContext.jsx';
import { AiOutlineAppstoreAdd, AiOutlineDelete } from "react-icons/ai";
import "./card.css";

function RecipeCard({ rec }) {
  const { containsRecipe, addRecipe, removeRecipe } = useUser();

  return (
    <div className="recipe-card-container">
      <img className="recipe-image" src={rec.image} alt={rec.label} />
      <h4 className="recipe-name">{rec.label}</h4>
      <p className="recipe-by">by {rec.source}</p>
      <div className="recipe-actions">
        <a className="recipe-link" href={rec.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
        {!containsRecipe(rec) && (
          <AiOutlineAppstoreAdd className="save-recipe" onClick={() => addRecipe(rec)} size={30} />
        )}
        {containsRecipe(rec) && (
          <AiOutlineDelete className="delete-recipe" onClick={() => removeRecipe(rec)} size={30} />
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
