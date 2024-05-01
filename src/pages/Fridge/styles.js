import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

export const SearchContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
`;

export const SearchBar = styled.div`
    display: flex;
    margin-bottom: 32px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const SearchInput = styled.input`
    width: 30%;
    padding: 16px;
    border: 1px solid lightgray;
    border-radius: 25px;
    font-size: 16px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const SearchButton = styled.button`
    height: 35px;
    width: 35px;
    min-height: 35px;
    min-width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: rgb(232, 99, 36);
    border-radius: 50%;
    padding: 8px;
    color: white;
    font-size: 20px;
    user-select: none;
    border: none;
    margin-left: 8px;
    
    &:hover {
        filter: brightness(90%);
    }
`;

export const AddFilterButton = styled(SearchButton)``;

export const Filters = styled.div`
    display: flex;
    margin-bottom: 32px;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const Filter = styled.div`
    min-width: 75px;
    margin: 0 4px 8px 4px;
    padding: 8px 8px 8px 16px;
    border-radius: 25px;
    background: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const FilterValue = styled.span`
    margin-right: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const RemoveFilterButton = styled.button`
    margin-left: auto;
    height: 25px;
    width: 25px;
    min-height: 25px;
    min-width: 25px;
    border-radius: 50%;
    border: none;
    
    &:hover {
        filter: brightness(95%);
    }
`;

export const Results = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
`;

export const ResultsPlaceholder = styled.p`
    margin: auto;
    color: gray;
`;

export const Spinner = styled(ClipLoader)`
    margin: auto;
`;