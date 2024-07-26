import React, { useEffect, useState } from "react";
import { TbPlus, TbSearch } from "react-icons/tb";
import RecipeCard from "../../components/Cards/index.jsx";
import './fridge.css';

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
    const app_id = '3738d17e'; // Replace with your Edamam app ID
    const app_key = 'bbe48a223f253671896036d5c4faf81e';
    const q = filters.join(" ");
    const res = await fetch(`https://api.edamam.com/search?q=${q}&app_id=${app_id}&app_key=${app_key}`);
    return await res.json();
  };

  useEffect(() => {
    if (filters.length > 0) {
      setLoading(true);
      fetchRecipes().then((results) => {
        setResults(results?.hits ?? []);
        setLoading(false);
      });
    } else {
      setResults([]);
    }
  }, [filters]);

  return (
    <div className="search-container">
      <div className="search-bar">
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

      <div className="filters">
        {filters.map((filter, i) => (
          <div className="filter" key={`filter-${i}`}>
            <span className="filter-value">{filter}</span>
            <button className="remove-filter-button" onClick={() => removeFilter(i)}>⨯</button>
          </div>
        ))}
      </div>

      <div className="results">
        {(!loading && results.length === 0) && (
          <p className="results-placeholder">What do you have in your fridge?</p>
        )}
        {loading && (
          <div className="spinner" />
        )}
        {(!loading && results.length > 0) && (
          results.map((result, i) => (
            <RecipeCard rec={result.recipe} key={`recipe-${i}`} />
          ))
        )}
      </div>
    </div>
  );
}

export default Fridge;
