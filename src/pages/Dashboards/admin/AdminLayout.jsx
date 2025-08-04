"use client"

import { useState, useEffect } from "react"
import Topbar from "./adminpages/TopBar"
import Sidebar from "./adminpages/SideBar"
import UserManagement from "./adminpages/UserManagement"


export default function AdminLayout() {

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
        <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
            <Topbar toggleSidebar={toggleSidebar} />
            <div
                className={`flex flex-1 flex-col transition-all duration-300 ease-in-out
                ml-0 md:ml-64`}
            >
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <UserManagement />
            </div>
        </div>
    )
}