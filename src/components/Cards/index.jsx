import React, {useEffect, useState} from 'react';
import { useUser } from '../../context/MainContext.jsx';
import { AiOutlineAppstoreAdd, AiOutlineDelete } from "react-icons/ai";
import "./card.css";
import Modal from "../modal/Modal.jsx";
import AOS from "aos";
import PerspectiveWrapper from "../animationWrappers/PerspectiveWrapper.jsx";
import Button from "../button/Button.jsx";
import { useNavigate } from "react-router-dom";


function RecipeCard({ rec, addNotification }) {
    const { recipes } = useUser();
    const { containsRecipe, addRecipe, removeRecipe, authenticated } = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleAddRecipe = () => {
        if(authenticated){
            addRecipe(rec);
            console.log(rec.label);
        }else{
            navigate("/login")
        }
    };

    const handleRemoveRecipe = () => {
        const recipeInFavorites = recipes.find(r => r.label === rec.label && r.source === rec.source);

        if (recipeInFavorites && recipeInFavorites.id) {
            removeRecipe(recipeInFavorites);
            addNotification(`${recipeInFavorites.label} is removed from your favorites`);

        } else {
            console.error("Recipe not found in favorites");
        }
        handleCloseModal();
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <PerspectiveWrapper>
            <article className="recipe-card-container" data-aos="fade-up">
                <img className="recipe-image" src={rec.image} alt={rec.label}/>
                <h4 className="recipe-name" data-aos="fade-in">{rec.label}</h4>
                <p className="recipe-by" data-aos="fade-in">by {rec.source}</p>
                <div className="recipe-actions" data-aos="fade-up">
                    <a className="recipe-link" href={rec.url} target="_blank" rel="noopener noreferrer">
                        View Recipe
                    </a>
                    {!containsRecipe(rec) ? (
                        <Button className="save-recipe" onClick={handleAddRecipe} aria-label="Save recipe">
                            <AiOutlineAppstoreAdd size={30}/>
                        </Button>
                    ) : (
                        <Button className="delete-recipe" onClick={handleOpenModal} aria-label="Remove recipe">
                            <AiOutlineDelete size={30}/>
                        </Button>
                    )}
                </div>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen}
                           onClose={handleCloseModal}
                           title="Confirm Removal"
                           description="Are you sure you want to remove this recipe?"
                    >
                        <Button
                            onClick={handleRemoveRecipe}
                            className="confirm"
                        >Confirm</Button>
                    </Modal>
                )}
            </article>
        </PerspectiveWrapper>
    );
}

export default RecipeCard;
