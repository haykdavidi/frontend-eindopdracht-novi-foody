import {observer} from "mobx-react-lite";
import {
    AddFilterButton,
    Filter,
    Filters, FilterValue,
    RemoveFilterButton, Results, ResultsPlaceholder,
    SearchBar,
    SearchButton,
    SearchContainer,
    SearchInput, Spinner
} from "./styles.js";
import React, {useEffect, useState} from "react";
import {TbPlus, TbSearch} from "react-icons/tb";
import RecipeCard from "../../components/Cards/index.jsx";

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
        <SearchContainer>
            <SearchBar>
                <SearchInput
                    onChange={handleQueryChange}
                    onKeyDown={onEnter}
                    value={query}
                    placeholder="Ingredients e.g. chicken, broccoli, rice"
                />
                <AddFilterButton onClick={addFilter}><TbPlus/></AddFilterButton>
                <SearchButton onClick={onSearchClick}><TbSearch/></SearchButton>
            </SearchBar>

            <Filters>
                {filters.map((filter, i) => (
                    <Filter key={`filter-${i}`}>
                        <FilterValue>{filter}</FilterValue>
                        <RemoveFilterButton onClick={() => removeFilter(i)}>⨯</RemoveFilterButton>
                    </Filter>
                ))}
            </Filters>

            <Results>
                {(!loading && results.length === 0) && (
                    <ResultsPlaceholder>What do you have in your fridge?</ResultsPlaceholder>
                )}
                {loading && (
                    <Spinner size={150} color={" rgb(239, 133, 11)"}/>
                )}
                {(!loading && results.length > 0) && (
                    results.map((result, i) => (
                        <RecipeCard rec={result.recipe} key={`recipe-${i}`} />
                    ))
                )}
            </Results>
        </SearchContainer>
    );
}

export default observer(Fridge);