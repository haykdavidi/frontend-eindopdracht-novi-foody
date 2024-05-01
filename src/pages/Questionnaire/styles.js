import styled from "styled-components";
import {SearchInput} from "../Search/styles.js";
import {Description, Name} from "../Home/styles.js";

export const FormContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
`;

export const FormHeader = styled(Name)`
    font-size: 72px;

    @media (max-width: 768px) {
        font-size: 60px;
    }
`;

export const FormDescription = styled(Description)`
    font-size: 20px;

    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const FormItem = styled.div`
    width: 30%;
    margin-bottom: 32px;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

export const FormItemLabel = styled.p`
    margin: 0 0 8px 8px;
`;

export const FormItemInput = styled(SearchInput)`
    width: 100%;
`;

export const SubmitFormButton = styled.button`
    padding: 16px 0;
    margin-top: 16px;
    border-radius: 25px;
    border: none;
    background: rgb(232, 99, 36);
    color: white;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    width: 30%;

    &:hover {
        filter: brightness(90%);
    }

    @media (max-width: 768px) {
        width: 90%;
    }
`;

export const CreateAccount = styled.div`
    width: 30%;
    margin-top: 32px;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

export const CreateAccountLabel = styled.a`
    color: rgb(232, 99, 36);
    margin-left: 8px;
    cursor: pointer;
`;