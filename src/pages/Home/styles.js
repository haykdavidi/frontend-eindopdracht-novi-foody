import styled from "styled-components";
import {Link} from "react-router-dom";

export const HomeContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    user-select: none;
`;

export const Name = styled.p`
    font-family: Cooking, serif;
    font-size: 100px;
    text-align: center;
    color: rgb(232, 99, 36);
    margin-bottom: 16px;

    @media (max-width: 768px) {
        font-size: 72px;
    }
`;

export const Description = styled.p`
    font-family: Anko, serif;
    font-size: 24px;
    text-align: center;
    margin-bottom: 32px;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

export const HomeButtons = styled.div`
    display: flex;
`;

export const ToSearchButton = styled(Link)`
    margin: 0 4px;
    padding: 16px 32px;
    border-radius: 25px;
    border: none;
    background: rgb(232, 99, 36);
    color: white;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    
    &:hover {
        filter: brightness(90%);
    }
`;