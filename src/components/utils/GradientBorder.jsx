"use client"

import { useEffect, useRef } from "react"
import { FaMicrophone } from "react-icons/fa"
import { gsap } from "gsap"
import GradientButton from "./GradientButton"

const AnimatedMicButton = () => {
    const ring1 = useRef(null)
    const ring2 = useRef(null)

    useEffect(() => {
        const animateRing = (el, delay) => {
            if (!el) return

            // Set initial state
            gsap.set(el, { scale: 1, opacity: 0 })

            // Create smooth continuous animation
            gsap.to(el, {
                scale: 2,
                opacity: 0.7,
                duration: 1.2,
                ease: "power2.out",
                delay,
                repeat: -1,
                repeatDelay: 1.3,
                yoyo: false,
                onRepeat: () => {
                    // Reset smoothly at the start of each cycle
                    gsap.set(el, { scale: 1, opacity: 0 })
                },
            })

            // Separate opacity animation for smoother fade
            gsap.to(el, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
                delay: delay + 1.2,
                repeat: -1,
                repeatDelay: 1.3,
            })
        }

        animateRing(ring1.current, 0)
        animateRing(ring2.current, 1.25) // offset for continuous loop

        return () => {
            gsap.killTweensOf([ring1.current, ring2.current])
        }
    }, [])

    return (
        <div className="relative w-16 h-16">
            {/* Ring 1 */}
            <div
                ref={ring1}
                className="absolute inset-0 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(141,34,204,0.7) 0%, rgba(61,102,238,0.2) 100%)",
                }}
            ></div>
            {/* Ring 2 */}
            <div
                ref={ring2}
                className="absolute inset-0 rounded-full"
                style={{
                    background: "radial-gradient(circle, rgba(141,34,204,0.7) 0%, rgba(61,102,238,0.2) 100%)",
                }}
            ></div>
            {/* Mic Button with gradient border */}
            <div className="absolute inset-0 flex items-center justify-center">
                <GradientButton className="p-6">
                    <FaMicrophone className="text-[#D8E1EB] text-3xl" />
                </GradientButton>
            </div>
        </div>
    )
}

export default AnimatedMicButton
