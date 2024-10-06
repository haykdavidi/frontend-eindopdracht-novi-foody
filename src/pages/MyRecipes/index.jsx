import React, { useState } from "react";
import RecipeCard from "../../components/Cards/index.jsx";
import { useUser } from "../../context/MainContext.jsx";
import "./myrecipes.css";
import NotificationContainer from "../../components/notification/NotificationContainer.jsx";

function MyRecipes() {
    const { recipes } = useUser();
    const [query, setQuery] = useState("");
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type) => {
        const id = Date.now();
        setNotifications(prevNotifications => [...prevNotifications, { id, message, type }]);

        setTimeout(() => {
            setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== id));
        }, 3000);
    };

    const containsQuery = (recipes) => {
        return recipes.filter(recipe => recipe.label.toLowerCase().includes(query.toLowerCase()));
    };

    return (
        <>
            <NotificationContainer
                notifications={notifications}
            />
            <section className="my-recipes-container" data-aos="fade-up">
                <div className="my-recipes-header" data-aos="fade-up">
                    <h1 className="my-recipes-title">My Recipes</h1>
                    <p className="my-recipes-count">Found {containsQuery(recipes).length} recipes</p>
                </div>

                <section className="results" data-aos="fade-up">
                    {recipes.length === 0 && (
                        <p className="results-placeholder">You have no saved recipes</p>
                    )}
                    {recipes.length > 0 && (
                        containsQuery(recipes).map((recipe, i) => (
                            <RecipeCard
                                rec={recipe}
                                key={`recipe-${i}`}
                                data-aos="fade-up"
                                addNotification={addNotification}
                            />
                        ))
                    )}
                </section>
            </section>
        </>
    );
}

export default MyRecipes;
