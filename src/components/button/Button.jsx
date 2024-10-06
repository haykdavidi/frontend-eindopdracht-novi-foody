import React from "react";
import "./button.css"
import {motion} from "framer-motion";

function animation(variants){
    return{
        initial: "initial",
        animate: "animate",
        exit: "exit",
        variants
    }
}

const variants = {
    initial: {
        scale: 0
    },
    animate: {
        scale: 1,
        transition: {
            duration: 0.15,
            ease: "easeOut"
        }
    }
}

const Button = ({ onClick, children, className }) => {
    return(
        <motion.button {...animation(variants)} className={className} onClick={onClick}>{children}</motion.button>
    )
}

export default Button;