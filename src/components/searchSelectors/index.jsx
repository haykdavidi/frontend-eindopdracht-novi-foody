import React, { useState } from 'react';
import "./searchSelectors.css"

const DietHealthSelector = ({ onDietSelect, onHealthSelect }) => {
    const [selectedDiet, setSelectedDiet] = useState("");
    const [selectedHealth, setSelectedHealth] = useState([]);

    const diets = ["low-carb", "high-protein", "balanced"];
    const healthOptions = ["vegan", "gluten-free", "keto-friendly"];

    const handleDietClick = (diet) => {
        if (selectedDiet === diet) {
            setSelectedDiet("");
            onDietSelect("");
        } else {
            setSelectedDiet(diet);
            onDietSelect(diet);
        }
    };

    const handleHealthClick = (health) => {
        if (selectedHealth.includes(health)) {
            const updatedHealth = selectedHealth.filter(h => h !== health);
            setSelectedHealth(updatedHealth);
            onHealthSelect(updatedHealth);
        } else {
            const updatedHealth = [...selectedHealth, health];
            setSelectedHealth(updatedHealth);
            onHealthSelect(updatedHealth);
        }
    };

    return (
        <div className="diet-health-container">
            <div className="diet-container">
                <h3>Select Diet</h3>
                {diets.map((diet) => (
                    <button
                        key={diet}
                        onClick={() => handleDietClick(diet)}
                        className={selectedDiet === diet ? "btn selected" : "btn"}
                    >
                        {diet}
                    </button>
                ))}
            </div>

            <div className="health-container">
                <h3>Select Health Option</h3>
                {healthOptions.map((health) => (
                    <button
                        key={health}
                        onClick={() => handleHealthClick(health)}
                        className={selectedHealth.includes(health) ? "btn selected" : "btn"}
                    >
                        {health}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DietHealthSelector;
