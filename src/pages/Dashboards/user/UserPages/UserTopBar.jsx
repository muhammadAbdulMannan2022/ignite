"use client"

import { Menu } from "lucide-react"

export default function UserTopbar({ toggleSidebar, memberType }) {
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
            <div className="flex items-center justify-end md:justify-between gap-4 w-full">
                {/* Logo */}
                <div>
                    <img src="/navlogo.png" className="h-10" alt="S.E.N.S.E.S." />
                </div>

                {/* Subscription Status */}
                <div>
                    <h1 className="text-white hidden md:block font-medium">
                        {memberType === "free" ? "Freebie Subscriber" : "Premium Subscriber"}
                    </h1>
                </div>

                {/* Upgrade Button */}
                <div className="hidden md:block">
                    {memberType === "free" && (
                        <button
                            className="ml-auto px-4 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: "#4180AD" }}
                        >
                            Upgrade Subscription
                        </button>
                    )}
                </div>
            </div>

        </header>
    )
}