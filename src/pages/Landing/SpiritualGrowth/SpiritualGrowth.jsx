"use client"

import { useLayoutEffect, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mic, Volume2, Headphones, Radio, Music, Waves } from "lucide-react"
import { AnimatedGradientButton } from "../../../components/utils/GradientBorderButton"

export default function Component() {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const textRef = useRef(null)
    const buttonRef = useRef(null)
    const iconsRef = useRef(null)


    const handleButtonClick = () => {
        console.log("Try for free clicked!")
        // Add your CTA logic here
    }

    return (
        <section
            ref={sectionRef}
            className="relative bg-black flex items-center justify-center px-6 py-20 overflow-hidden"
        >
            {/* Floating icons */}
            <div ref={iconsRef} className="absolute inset-0 pointer-events-none">
                <Mic className="absolute top-[15%] left-[10%] w-5 h-5 sm:w-6 sm:h-6 text-purple-400/30" />
                <Volume2 className="absolute top-[25%] right-[15%] w-4 h-4 sm:w-5 sm:h-5 text-blue-400/20" />
                <Headphones className="absolute top-[50%] left-[8%] w-6 h-6 sm:w-7 sm:h-7 text-purple-300/20" />
                <Radio className="absolute bottom-[20%] right-[10%] w-5 h-5 sm:w-6 sm:h-6 text-blue-300/20" />
                <Music className="absolute bottom-[15%] left-[12%] w-4 h-4 sm:w-5 sm:h-5 text-purple-400/20" />
                <Waves className="absolute top-[30%] right-[8%] w-5 h-5 sm:w-6 sm:h-6 text-blue-400/30" />

                <svg
                    className="absolute top-[20%] left-[45%] w-10 h-6 sm:w-12 sm:h-8 text-purple-300/30"
                    viewBox="0 0 100 60"
                    fill="currentColor"
                >
                    <path d="M20 30 Q30 20, 40 30 T60 30 T80 30" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M25 30 Q35 25, 45 30 T65 30" stroke="currentColor" strokeWidth="0.8" fill="none" />
                </svg>

                <svg
                    className="absolute bottom-[25%] right-[30%] w-8 h-8 sm:w-10 sm:h-10 text-blue-300/30"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                >
                    <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.5" />
                    <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                    <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.2" />
                </svg>
            </div>
            <div className="w-[100%] h-[100%] absolute top-[0%] -right-[50%] md:-right-[50%] bg-radial from-blue-500/50 via-transparent  to-transparent rounded-full blur-lg"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                    Spiritual Growth
                </h1>

                <p
                    ref={textRef}
                    className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto"
                    style={{ color: "#D6E0EB" }}
                >
                    It's a journey of transforming and evolving one's inner self towards higher states of awareness, wisdom, and love. It involves developing a closer relationship with the Supreme (variously understood as God, the Universe or Source). Spirituality gives your life deeper meaning and enables you to discover and fulfill your purpose. Spiritual growth is not a destination but an ongoing process to living a meaningful life by Awakening Your S.E.N.S.E.S. (Spirituality, Energy, Naturopathy, Sciences, Equity and Singularity).
                </p>

                <div ref={buttonRef}>
                    <AnimatedGradientButton className="hover:cursor-pointer" onClick={handleButtonClick}>
                        Try for free
                    </AnimatedGradientButton>
                </div>
            </div>
        </section>
    )
}
