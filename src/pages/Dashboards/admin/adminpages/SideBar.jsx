"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Home, Users, Package, BarChart, Settings, X } from "lucide-react"

export default function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef(null)
    const isInitialMount = useRef(true)

    useEffect(() => {
        if (sidebarRef.current) {
            const isMobileView = window.innerWidth < 768 // md breakpoint

            if (isInitialMount.current) {
                if (!isMobileView) {
                    // Initial animation for desktop view
                    gsap.fromTo(
                        sidebarRef.current,
                        { x: -260, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.2 }
                    )
                }
                isInitialMount.current = false
            } else {
                if (isMobileView) {
                    // Animate sidebar for mobile
                    gsap.to(sidebarRef.current, {
                        x: isOpen ? 0 : -260,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                } else {
                    // Ensure sidebar is visible on desktop
                    gsap.set(sidebarRef.current, { x: 0, opacity: 1 })
                }
            }
        }
    }, [isOpen])

    return (
        <aside
            ref={sidebarRef}
            className={`fixed left-0 z-50 flex w-64 flex-col border-r bg-gray-900 text-white shadow-lg
                top-16 h-[calc(100vh-4rem)] // Start below top bar (4rem = 64px)
                md:translate-x-0
                max-md:transform max-md:transition-transform max-md:duration-300 max-md:ease-in-out
                ${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
        >
            <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
                <h1 className="text-xl font-bold text-white">Menu</h1>
                <button
                    className="md:hidden text-white hover:bg-gray-700 p-1 rounded"
                    onClick={toggleSidebar}
                    aria-label="Close sidebar"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>
            <nav className="flex-1 overflow-auto py-4">
                <ul className="space-y-1 px-4">
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
                        >
                            <Users className="h-5 w-5" />
                            Users
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
                        >
                            <Package className="h-5 w-5" />
                            Products
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
                        >
                            <BarChart className="h-5 w-5" />
                            Analytics
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700 hover:text-white"
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}