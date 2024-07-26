import { Modal, Button } from "react-bootstrap";
import RecipeCard from "../Cards/index.jsx";
import React from "react";
import './resultmodal.css';

function ResultsModal({ open, handleOpenChange, recipes }) {
  return (
    <Modal
      show={open}
      onHide={() => handleOpenChange(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="xl"
      dialogClassName="results-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Here are your recipes!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="results">
          {recipes.map((recipe, i) => (
            <RecipeCard rec={recipe} key={`recipe-${i}`} />
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-dark"
          onClick={() => handleOpenChange(false)}
          className="close-modal-btn"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default (ResultsModal);
