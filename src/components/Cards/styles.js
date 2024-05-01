import styled from "styled-components";
import {AiOutlineAppstoreAdd, AiOutlineDelete} from "react-icons/ai";

export const RecipeCardContainer = styled.div`
    padding: 16px;
    margin: 8px;
    width: 250px;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    display: flex;
    flex-flow: column;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

export const RecipeImage = styled.img`
    width: 100%;
`;

export const RecipeName = styled.h4`
`;

export const RecipeBy =  styled.p`
    color: gray;
    margin-bottom: 32px;
`;

export const RecipeActions = styled.div`
    margin-top: auto;
    display: flex;
`;

export const RecipeLink = styled.a`
    text-decoration: none;
    color: rgb(232, 99, 36);
`;

export const SaveRecipe = styled(AiOutlineAppstoreAdd)`
    margin-left: auto;
    cursor: pointer;
`;

export const DeleteRecipe = styled(AiOutlineDelete)`
    margin-left: auto;
    cursor: pointer;
`