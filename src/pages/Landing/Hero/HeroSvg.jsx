"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function HeroSvg() {
    const containerRef = useRef(null)
    const barsRef = useRef([])

    // Function to calculate numBars based on screen width
    const getNumBars = () => {
        const minBars = 50
        const maxBars = 200
        const minWidth = 320 // Minimum screen width (e.g., mobile)
        const maxWidth = 1920 // Maximum screen width (e.g., desktop)
        const screenWidth = window.innerWidth

        // Linear interpolation to map screen width to number of bars
        const numBars = Math.round(
            minBars + (maxBars - minBars) * ((screenWidth - minWidth) / (maxWidth - minWidth))
        )

        // Clamp the value between minBars and maxBars
        return Math.max(minBars, Math.min(maxBars, numBars))
    }

    // Function to create and animate the waveform
    const createWaveform = () => {
        if (!containerRef.current) return

        const container = containerRef.current
        const numBars = getNumBars()
        barsRef.current = []

        // Clear existing bars
        container.innerHTML = ""

        // Create waveform bars that extend both up and down
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement("span")
            bar.className = "waveform-bar"

            // Calculate position with 2px gaps
            const barSpacing = 3 // 1px bar + 2px gap
            const totalWidth = numBars * barSpacing
            const startOffset = (50 - (totalWidth / window.innerWidth) * 100) / 2 // Center the bars
            const x = startOffset + ((i * barSpacing) / window.innerWidth) * 100

            bar.style.cssText = `
                position: absolute;
                left: calc(${i * 3}px + 50% - ${(numBars * 3) / 2}px);
                top: 50%;
                width: 1px;
                height: 4px;
                background: linear-gradient(to top, #ffffff, #e0e7ff, #c7d2fe);
                border-radius: 1px;
                transform-origin: center;
                transform: translateY(-50%);
                box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
            `

            container.appendChild(bar)
            barsRef.current.push(bar)
        }

        // Create smooth GSAP animations
        barsRef.current.forEach((bar, index) => {
            // Create varying base heights
            const minHeight = 8
            const maxHeight = 50
            const baseHeight = 20 + Math.random() * 30

            // Set initial state
            gsap.set(bar, {
                height: `${baseHeight}px`,
                opacity: 0.7,
            })

            // Create smooth height animation with staggered timing
            const tl = gsap.timeline({ repeat: -1 })

            // Create multiple keyframes for smooth wave motion
            const heights = []
            const opacities = []

            for (let i = 0; i <= 8; i++) {
                const progress = i / 8
                const wave = Math.sin(progress * Math.PI * 2 + (index / numBars) * Math.PI * 2) * 0.7
                const wave2 = Math.sin(progress * Math.PI * 4 + (index / numBars) * Math.PI) * 0.3
                const height = baseHeight + (maxHeight - baseHeight) * (0.5 + wave + wave2)

                heights.push(Math.max(minHeight, Math.min(maxHeight, height)))
                opacities.push(0.4 + (height / maxHeight) * 0.5)
            }

            // Animate through all keyframes smoothly
            heights.forEach((height, i) => {
                tl.to(
                    bar,
                    {
                        height: `${height}px`,
                        opacity: opacities[i],
                        duration: 1.5,
                        ease: "sine.inOut",
                    },
                    i * 1.5,
                )
            })

            // Add smooth glow animation
            const glowTl = gsap.timeline({ repeat: -1 })
            glowTl
                .to(bar, {
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
                    duration: 3,
                    ease: "sine.inOut",
                })
                .to(bar, {
                    boxShadow: "0 0 8px rgba(255, 255, 255, 0.2)",
                    duration: 3,
                    ease: "sine.inOut",
                })

            // Add occasional emphasis with smooth transitions
            if (index % 8 === 0) {
                gsap.to(bar, {
                    height: `${maxHeight * 1.2}px`,
                    duration: 2,
                    delay: 2 + (index / numBars) * 4,
                    repeat: -1,
                    repeatDelay: 6,
                    yoyo: true,
                    ease: "power2.inOut",
                })
            }
        })
    }

    useEffect(() => {
        // Initial waveform creation
        createWaveform()

        // Debounce function to limit resize event frequency
        let resizeTimeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                // Clear existing animations and bars
                gsap.killTweensOf(barsRef.current)
                barsRef.current = []
                if (containerRef.current) {
                    containerRef.current.innerHTML = ""
                }
                // Recreate waveform
                createWaveform()
            }, 200) // 200ms debounce delay
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            clearTimeout(resizeTimeout)
            gsap.killTweensOf(barsRef.current)
        }
    }, [])

    return (
        <div className="w-full absolute -bottom-10 h-fit overflow-hidden flex items-center justify-center">
            <div className="h-[1px] w-full bg-gradient-to-r from-gray-50 via-gray-50 to-transparent"></div>
            <div className="relative w-full h-48">
                <div ref={containerRef} className="absolute inset-0 w-full h-full" />
            </div>
            <div className="h-[1px] w-full bg-gradient-to-l from-gray-50 via-gray-50 to-transparent"></div>
        </div>
    )
}