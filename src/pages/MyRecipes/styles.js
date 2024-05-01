import styled from "styled-components";

export const MyRecipesContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
`;

export const MyRecipesHeader = styled.div`
    display: flex;
    align-items: baseline;
    width: 50%;
    margin-bottom: 32px;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

export const MyRecipesTitle = styled.h1``;

export const MyRecipesCount = styled.p`
    margin-left: auto;
;`