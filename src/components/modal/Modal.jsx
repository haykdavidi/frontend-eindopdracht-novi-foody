import "./modal.css"
import React from 'react';
import Button from "../button/Button.jsx";


const Modal = ({ isOpen, onClose, title, children, description }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                {description}
                <div className="modal-children">
                    {children}
                    <Button onClick={onClose} className="modal-close-button">Close</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
