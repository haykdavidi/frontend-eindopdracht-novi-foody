import {observer} from "mobx-react-lite";
import {Modal} from "react-bootstrap";
import {Results} from "../../pages/Search/styles.js";
import RecipeCard from "../Cards/index.jsx";
import React from "react";
import {StyledCloseModalBtn, StyledResultsModal} from "./styles.js";

function ResultsModal({open, handleOpenChange, recipes}) {
    return (
        <StyledResultsModal
            show={open}
            onHide={() => handleOpenChange(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size="xl"
        >
            <Modal.Header closeButton>
                <Modal.Title>Here are your recipes!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Results>
                    {recipes.map((recipe, i) => (
                        <RecipeCard rec={recipe} key={`recipe-${i}`}/>
                    ))}
                </Results>
            </Modal.Body>

            <Modal.Footer>
                <StyledCloseModalBtn variant="outline-dark" onClick={() => handleOpenChange(false)}>
                    Close
                </StyledCloseModalBtn>
            </Modal.Footer>
        </StyledResultsModal>
    );
}

export default observer(ResultsModal);