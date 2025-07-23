"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { Link } from "react-router"
import GradientText from "../../../components/utils/GradientText"
import GradientButton from "../../../components/utils/GradientButton"

const GlassyNavbar = () => {
  const navRef = useRef(null)
  const logoRef = useRef(null)
  const menuItemsRef = useRef([])
  const loginBtnRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const mobileMenuItemsRef = useRef([]) // New ref for mobile menu items
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { name: "Home", active: true },
    { name: "Pricing", active: false },
    { name: "Try for free", active: false },
    { name: "FAQ", active: false },
    { name: "Online store (Coming soon)", active: false },
    { name: "Podcast", active: false },
  ]

  useEffect(() => {
    // Initial animation on mount
    const tl = gsap.timeline()

    tl.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .fromTo(
        menuItemsRef.current,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.6",
      )
      .fromTo(
        loginBtnRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.8",
      )

    return () => {
      gsap.killTweensOf([navRef.current, logoRef.current, menuItemsRef.current, loginBtnRef.current])
    }
  }, [])

  useEffect(() => {
    // Mobile menu animation
    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" },
      )
      gsap.fromTo(
        mobileMenuItemsRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 },
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
    }
  }, [isMobileMenuOpen])

  const addToMenuRefs = (el) => {
    if (el && !menuItemsRef.current.includes(el)) {
      menuItemsRef.current.push(el)
    }
  }

  const addToMobileMenuRefs = (el) => {
    if (el && !mobileMenuItemsRef.current.includes(el)) {
      mobileMenuItemsRef.current.push(el)
    }
  }

  return (

    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 px-5 md:px-20 pt-3 md:pt-5"
      style={{ zIndex: 10000 }}
    >
      <div style={{ zIndex: 10000 }} className="backdrop-blur-md z-50 bg-white/10 shadow-lg mx-auto px-4 sm:px-6 lg:px-8 rounded-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <div className="text-white font-bold text-xl tracking-wider">
              <Link to={"/"}>
                <div className="w-32">
                  <img src="/fevicon.png" alt="" className="w-full" />
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item, index) => (
                <Link
                  key={item.name}
                  ref={addToMenuRefs}
                  to="#"
                  className={`${item.active
                    ? "border-b-2 border-[#B442FF]"
                    : "text-gray-300 hover:text-white"
                    }`}
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { scale: 1.05, duration: 0.2 })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.target, { scale: 1, duration: 0.2 })
                  }}
                >
                  {item.active ? (
                    <GradientText className="inline-block font-bold" text={item.name} />
                  ) : (
                    item.name
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <div ref={loginBtnRef} className="hidden md:block">
            <GradientButton
              className="px-3 py-2"
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.05, duration: 0.2 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, duration: 0.2 })
              }}
            >
              Login
            </GradientButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden backdrop-blur-md bg-white/5 border-t border-white/10"
        style={{ zIndex: 10000 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              ref={addToMobileMenuRefs}
              to="#"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${item.active
                ? "border border-purple-400/30"
                : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.05, duration: 0.2 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, duration: 0.2 })
              }}
            >
              {item.active ? (
                <GradientText className="inline-block font-bold" text={item.name} />
              ) : (
                item.name
              )}
            </Link>
          ))}
          <div className="pt-4 pb-2">
            <GradientButton
              className="w-full px-6 py-2"
              onMouseEnter={(e) => {
                gsap.to(e.target, { scale: 1.05, duration: 0.2 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.target, { scale: 1, duration: 0.2 })
              }}
            >
              Login
            </GradientButton>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default GlassyNavbar