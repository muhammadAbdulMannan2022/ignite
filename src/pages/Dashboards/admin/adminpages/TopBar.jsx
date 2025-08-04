"use client"

import { Menu } from "lucide-react"

export default function Topbar({ toggleSidebar }) {
    return (
        <header
            className="fixed top-0 left-0 z-40 flex h-16 w-full items-center justify-between border-b bg-white px-6 shadow-sm"
        >
            <button
                className="md:hidden mr-4"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <Menu className="h-5 w-5" />
            </button>
            <div className="relative flex-1 max-w-md">
                {/* Placeholder for search bar or other content */}
                <span className="text-gray-500">Search...</span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-gray-800">User</span>
            </div>
        </header>
    )
}