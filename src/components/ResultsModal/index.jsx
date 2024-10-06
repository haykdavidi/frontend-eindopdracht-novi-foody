import RecipeCard from "../Cards/index.jsx";
import React from "react";
import "./resultmodal.css";
import Button from "../button/Button.jsx";

function ResultsModal({ open, handleOpenChange, recipes }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={handleOpenChange}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Here are your recipes!</h2>
          <button onClick={handleOpenChange} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="results-modal">
            {recipes.map((recipe, i) => (
             <div key={`recipe-${i}`} id="results-container">
               <RecipeCard rec={recipe} key={`recipe-${i}`}/>
             </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <Button onClick={handleOpenChange} className="close-modal-btn">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResultsModal;
