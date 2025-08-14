"use client"

import { Menu } from "lucide-react"

export default function Topbar({ toggleSidebar }) {
    return (
        <header
            className="fixed top-0 left-0 z-40 flex h-16 w-full items-center justify-between border-b bg-blue-950/10 backdrop-blur-xs px-6 md:px-16 shadow-sm"
        >
            <button
                className="md:hidden mr-4"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <Menu className="h-5 w-5 text-white" />
            </button>
            <div className="relative flex-1 max-w-md">
                <img src="/navlogo.png" className="h-10" alt="S.E.N.S.E.S." />
            </div>
            <div className="flex items-center gap-4"></div>
        </header>
    )
}