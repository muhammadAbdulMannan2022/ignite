import React from "react";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    from?: string; // Tailwind class: e.g. "from-[#3D66EE]"
    to?: string;   // Tailwind class: e.g. "to-[#8923CC]"
    children: React.ReactNode;
    className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
    from = "from-[#3D66EE]",
    to = "to-[#8923CC]",
    children,
    className = "",
    disabled,
    ...rest
}) => {
    return (
        <button
            className={`
         rounded-full font-semibold text-white
        bg-gradient-to-r ${from} ${to}
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer
        ${!disabled ? "hover:opacity-90 active:scale-95 focus:ring-white/40" : "opacity-50 cursor-not-allowed"}
        ${className}
      `}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default GradientButton;
