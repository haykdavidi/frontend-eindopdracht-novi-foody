import React, { useRef } from "react";
import "./perspectiveWrapper.css";
import { AnimatePresence, motion, useInView } from "framer-motion";

function animation(variants) {
    return {
        initial: "initial",
        animate: "animate",
        exit: "exit",
        variants
    };
}

const variants = {
    initial: {
        scale: 0.4,
        rotateY: 60,
        opacity: 0,
    },
    animate: {
        scale: 1,
        rotateY: 0,
        opacity: 1,
        transition: {
            opacity: {
                type: "tween",
                duration: 1,
                ease: [0.25, 1, 0.5, 1],
            },
            rotateY: {
                type: "tween",
                duration: 1,
                ease: [0.25, 1, 0.5, 1],
            },
            scale: {
                type: "spring",
                mass: 0.5,
                bounce: 0.2,
                duration: 1,
            },
            default: {
                duration: 0.3,
                ease: "easeIn"
            }
        }
    },
    exit: {
        scale: 0.4,
        rotateY: -60,
        transition: {
            duration: 2,
            ease: "easeOut"
        }
    }
};

const PerspectiveWrapper = ({ children }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

    return (
        <AnimatePresence>
            <motion.div
                className="perspective-container"
                ref={ref}
            >
                <motion.div {...animation(variants)} animate={isInView ? "animate" : "initial"} className="motion-element" >
                    {children}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default PerspectiveWrapper;
