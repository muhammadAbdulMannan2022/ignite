import React from "react";


const GradientText = ({ text, className = "" }) => {
    return (
        <span
            className={`bg-gradient-to-r from-[#3D66EE] to-[#8923CC] bg-clip-text text-transparent ${className}`}
        >
            {text}
        </span>
    );
};

export default GradientText;
