import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollSmoother from 'gsap/ScrollSmoother'
import Hero from './Hero/Hero'
import SpiritualGrowth from './SpiritualGrowth/SpiritualGrowth'
import FAQSection from './FAQ/FAQ'
import Footer from './Footer/Footer'

gsap.registerPlugin(ScrollSmoother)

function Landing() {
    const wrapperRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        if (!ScrollSmoother.get()) {
            ScrollSmoother.create({
                wrapper: wrapperRef.current,
                content: contentRef.current,
                smooth: 1.5,
                effects: true,
            })
        }
    }, [])

    return (
        <div ref={wrapperRef} id="smooth-wrapper">
            <div ref={contentRef} id="smooth-content">
                <Hero />
                <SpiritualGrowth />
                <FAQSection />
                <Footer />
            </div>
        </div>
    )
}

export default Landing
