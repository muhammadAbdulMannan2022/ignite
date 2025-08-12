"use client"

import { useState, useEffect, } from "react"
import { Outlet } from "react-router"
import UserSidebar from "./UserPages/UserSideBar"
import UserTopbar from "./UserPages/UserTopBar"

export default function UserLayout() {
    const [memberType, setMemberType] = useState("free")

    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth >= 768 // md breakpoint
        }
        return true
    })

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (

        <div className="flex h-screen w-full overflow-hidden">
            <UserTopbar memberType={memberType} toggleSidebar={toggleSidebar} />
            <div
                className={`flex flex-1 flex-col transition-all duration-300 ease-in-out
                ml-0 md:ml-64`}
            >
                <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                {/* main content of admin data */}
                <main className="flex-1 p-4 md:p-6 pt-24 bg-blue-950/10 backdrop-blur-xs">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}