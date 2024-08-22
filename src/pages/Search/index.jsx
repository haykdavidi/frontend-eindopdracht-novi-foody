import React, { useEffect, useState } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";
import RecipeCard from "../../components/Cards/index.jsx";
import "./search.css"; // Import the CSS file for styling

function Search() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);


    const handleQueryChange = (e) => setQuery(e.target.value);

    const search = (value) => {
        const splitValue = value.split(" ");
        const copyFilters = [...filters];

        splitValue.forEach(val => {
            if (val.length > 0 && !copyFilters.includes(val)) {
                copyFilters.push(val);
            }
        });

        setFilters(copyFilters);
    };

    const onEnter = (e) => {
        if (e.key === "Enter" && !filters.includes(e.target.value)) {
            search(e.target.value);
        }
    };

    const onSearchClick = () => {
        search(query);
    };

    const addFilter = () => {
        const splitQuery = query.split(" ");
        splitQuery.forEach(term => {
            if (term.length > 0 && !filters.includes(term)) {
                setFilters([...filters, term]);
            }
        });
    };

    const removeFilter = (index) => {
        setFilters(filters.filter((_, i) => i !== index));
    };

    const fetchRecipes = async () => {
        const app_id = '3738d17e'; // Replace with your Edamam app ID
        const app_key = 'bbe48a223f253671896036d5c4faf81e';
        const q = filters.join(" ");
        try {
            const res = await fetch(`https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch recipes", error);
            return { hits: [] };
        }
    };

    useEffect(() => {
        if (filters.length > 0) {
            setLoading(true);
            fetchRecipes().then((data) => {
                setResults(data.hits ?? []);
                setLoading(false);
            });
        } else {
            setResults([]);
        }
    }, [filters]);

    return (
        <div className="search-container" data-aos="fade-up">
            <div className="search-bar" data-aos="fade-in">
                <input
                    className="search-input"
                    onChange={handleQueryChange}
                    onKeyDown={onEnter}
                    value={query}
                    placeholder="Ingredients e.g. chicken, broccoli, rice"
                />
                <button className="add-filter-button" onClick={addFilter}><TbPlus /></button>
                <button className="search-button" onClick={onSearchClick}><TbSearch /></button>
            </div>

            <div className="filters" data-aos="fade-up">
                {filters.map((filter, i) => (
                    <div className="filter" key={`filter-${i}`}>
                        <span className="filter-value">{filter}</span>
                        <button className="remove-filter-button" onClick={() => removeFilter(i)}>⨯</button>
                    </div>
                ))}
            </div>

            <div className="results" data-aos="fade-up">
                {loading ? (
                    <div className="spinner"></div>
                ) : results.length === 0 ? (
                    <p className="results-placeholder">What do you have in your fridge?</p>
                ) : (
                    results.map((result, i) => (
                        <RecipeCard rec={result.recipe} key={`recipe-${i}`} data-aos="fade-up" />
                    ))
                )}
            </div>
        </div>
    );
}

export default Search;
