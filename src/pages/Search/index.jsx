import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/Cards/index.jsx";
import "./search.css";
import { TbPlus, TbSearch } from "react-icons/tb";
import axios from "axios";
import DietHealthSelector from "../../components/searchSelectors/index.jsx";
import NotificationContainer from "../../components/notification/NotificationContainer.jsx";

function Search() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [selectedDiet, setSelectedDiet] = useState("");
    const [selectedHealth, setSelectedHealth] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, type) => {
        const id = Date.now();
        setNotifications(prevNotifications => [...prevNotifications, { id, message, type }]);

        setTimeout(() => {
            setNotifications(prevNotifications => prevNotifications.filter(n => n.id !== id));
        }, 3000);
    };

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

    const onSearchClick = (e) => {
        e.preventDefault();
        search(query);
    };

    const addFilter = (e) => {
        e.preventDefault();
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

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchRecipes = async () => {
            const app_id = '3738d17e';
            const app_key = 'bbe48a223f253671896036d5c4faf81e';
            const q = filters.join(" ");
            const dietParam = selectedDiet ? `&diet=${selectedDiet}` : "";
            const healthParam = selectedHealth.length ? selectedHealth.map(health => `&health=${health}`).join("") : "";

            try {
                setLoading(true);
                const res = await axios.get(`https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}${dietParam}${healthParam}`, {
                    cancelToken: source.token
                });
                setResults(res.data.hits ?? []);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.error("Failed to fetch recipes", error);
                }
            } finally {
                setLoading(false);
            }
        };

        if (filters.length > 0) {
            fetchRecipes();
        } else {
            setResults([]);
        }

        return () => {
            source.cancel("Request canceled by user");
        };
    }, [filters, selectedDiet, selectedHealth]);

    return (
        <>
            <NotificationContainer
                notifications={notifications}

            />
            <section className="search-container" data-aos="fade-up">
                <section className="search-bar" data-aos="fade-in">
                    <form className="input-container">
                        <input
                            className="search-input"
                            onChange={handleQueryChange}
                            onKeyDown={onEnter}
                            value={query}
                            placeholder="Ingredients e.g. chicken, broccoli, rice"
                        />
                        <button className="add-filter-button" onClick={addFilter}><TbPlus/></button>
                        <button className="search-button" onClick={onSearchClick}><TbSearch/></button>
                    </form>
                    <DietHealthSelector
                        onDietSelect={setSelectedDiet}
                        onHealthSelect={setSelectedHealth}
                    />
                </section>

                <section className="filters" data-aos="fade-up">
                    {filters.map((filter, i) => (
                        <div className="filter" key={`filter-${i}`}>
                            <span className="filter-value">{filter}</span>
                            <button className="remove-filter-button" onClick={() => removeFilter(i)}>⨯</button>
                        </div>
                    ))}
                </section>

                <section className="results" data-aos="fade-up">
                    {loading ? (
                        <div className="spinner"></div>
                    ) : results.length === 0 ? (
                        <p className="results-placeholder">What do you have in your fridge?</p>
                    ) : (
                        results.map((result, i) => (
                            <RecipeCard rec={result.recipe} key={`recipe-${i}`} data-aos="fade-up"
                                        addNotification={addNotification}/>
                        ))
                    )}
                </section>

            </section>
        </>

    );
}

export default Search;
