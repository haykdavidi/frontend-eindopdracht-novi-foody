import Notification from './Notification';
import './notification.css';
import { AnimatePresence, motion } from 'framer-motion';

const NotificationContainer = ({ notifications }) => {
    const variants = {
        initial: {
            opacity: 0,
            x: -50,
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: {
                opacity: {
                    type: "tween",
                    duration: 0.6,
                    ease: [0.25, 1, 0.5, 1],
                },
                x: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }
            }
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: {
                opacity: { duration: 0.5 },
                x: { duration: 0.5 }
            }
        }
    };

    return (
        <section className="notifications-container">
            <AnimatePresence>
                {notifications.map(notification => (
                    <motion.div
                        key={notification.id}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={variants}
                    >
                        <Notification
                            message={notification.message}
                            type={notification.type}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </section>
    );
};

export default NotificationContainer;
