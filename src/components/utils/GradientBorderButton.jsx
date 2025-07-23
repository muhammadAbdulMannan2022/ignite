"use client"

import React, { useRef, useEffect } from "react"

export const AnimatedGradientButton = ({ children, onClick, className = "" }) => {
    const buttonRef = useRef(null)

    useEffect(() => {
        const buttonElement = buttonRef.current
        if (!buttonElement) return

        const updateAnimation = () => {
            const currentAngle = parseFloat(buttonElement.style.getPropertyValue("--angle")) || 0
            const newAngle = (currentAngle + 0.5) % 360
            buttonElement.style.setProperty("--angle", `${newAngle}deg`)
            requestAnimationFrame(updateAnimation)
        }

        requestAnimationFrame(updateAnimation)
    }, [])

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            style={{
                "--angle": "0deg",
                "--border-color": "linear-gradient(var(--angle), #8B22CD, #283483)",
                "--bg-color": "linear-gradient(#1e293b, #1e293b)",
            }}
            className={`
        relative px-8 py-4 text-white font-semibold rounded-full text-lg 
        transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25
        border-2 border-transparent
        [background:padding-box_var(--bg-color),border-box_var(--border-color)]
        hover:scale-105
        ${className}
      `}
        >
            {children}
        </button>
    )
}
