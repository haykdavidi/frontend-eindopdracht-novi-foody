import './notification.css';
import {motion} from "framer-motion";

const Notification = ({ message, type, description }) => {

    return (
        <motion.article className={`notification ${type}`}>
            <h4>{message}</h4>
        </motion.article>
    );
};

export default Notification;
