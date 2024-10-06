import React, { useEffect, useState } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";
import RecipeCard from "../../components/Cards/index.jsx";
import './fridge.css';
import axios from "axios";

function Fridge() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [results, setResults] = useState([]);

  const handleQueryChange = (e) => setQuery(e.target.value);

  const search = (value) => {
    const splitValue = value.split(" ");
    const copyFilters = [...filters];

    splitValue.forEach(val => {
      if (!copyFilters.includes(val) && val.length > 0) {
        copyFilters.push(val);
      }
    });

    setFilters(copyFilters);
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!filters.includes(query)) {
        search(query);
      }
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
      if (!filters.includes(term) && term.length > 0) {
        setFilters([...filters, term]);
      }
    });
  };

  const removeFilter = (index) => {
    const copyArr = [...filters];
    copyArr.splice(index, 1);
    setFilters(copyArr);
  };

  const fetchRecipes = async () => {
    const app_id = '3738d17e';
    const app_key = 'bbe48a223f253671896036d5c4faf81e';
    const q = filters.join(" ");
    try {
      const res = await axios.get(`https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}`);
      return res.data;
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
      <section className="search-container" data-aos="fade-up">
        <section className="search-bar" data-aos="fade-in" onSubmit={(e) => e.preventDefault()}>
          <form className="input-container">
            <input
                className="search-input"
                onChange={handleQueryChange}
                onKeyDown={onEnter}
                value={query}
                placeholder="Ingredients e.g. chicken, broccoli, rice"
            />
            <button type="button" className="add-filter-button" onClick={addFilter}><TbPlus/></button>
            <button type="button" className="search-button" onClick={onSearchClick}><TbSearch/></button>
          </form>
        </section>

        <section className="filters" data-aos="fade-up">
          <ul>
            {filters.map((filter, i) => (
                <li className="filter" key={`filter-${i}`}>
                  <span className="filter-value">{filter}</span>
                  <button type="button" className="remove-filter-button" onClick={() => removeFilter(i)}
                          aria-label="Remove filter">⨯
                  </button>
                </li>
            ))}
          </ul>
        </section>

        <div className="results" data-aos="fade-up">
          {(!loading && results.length === 0) && (
              <p className="results-placeholder">What do you have in your fridge?</p>
          )}
          {loading && (
              <div className="spinner"></div>
          )}
          {(!loading && results.length > 0) && (
              results.map((result, i) => (
                  <RecipeCard rec={result.recipe} key={`recipe-${i}`} data-aos="fade-up" />
              ))
          )}
        </div>
      </section>
  );
}

export default Fridge;
