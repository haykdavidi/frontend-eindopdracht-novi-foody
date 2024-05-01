import styled from "styled-components";
import {Modal, Button} from "react-bootstrap";

export const StyledResultsModal = styled(Modal)`
    .modal-dialog {
        width: 90vw;
        max-width: none !important;
    }
`;

export const StyledCloseModalBtn  = styled(Button)`
    color: rgb(232, 99, 36);
    background-color: white;
    border-color: rgb(232, 99, 36);

    &:hover {
        color: white;
        background-color: rgb(232, 99, 36);
        border-color: rgb(232, 99, 36);
    }
`;