import styled from "styled-components";
import {Link} from "react-router-dom";

export const NavBarContainer = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    padding: 8px 16px;
    background: #f6f6f7;

    @media (max-width: 768px) {
        flex-flow: column;
        height: auto;
        align-items: center;
    }
`;

export const NavBarLogo = styled.img`
    height: 100%;
    
    @media (max-width: 768px) {
        max-height: 50px;
        height: 50px;
    }
`;

export const MenuItems = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        margin: 8px auto auto auto;
    }
`;

export const MenuItem = styled(Link)`
    padding: 8px 16px;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    text-decoration: none;
    color: black;
    
    &:hover {
        border-bottom: 1px solid orange;
    }
`;