"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { MessageCircle, Users, FileText, Mail, Lock, Settings, X, ChevronDown, Edit, LogOut, UserRoundCog } from "lucide-react"
import { Link } from "react-router"
import { CgProfile } from "react-icons/cg"


export default function Sidebar({ isOpen, toggleSidebar }) {
    const sidebarRef = useRef(null)
    const isInitialMount = useRef(true)
    const [isManagementOpen, setIsManagementOpen] = useState(true)
    const [isSettingsOpen, setIsSettingsOpen] = useState(true)

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

    const navItems = [
        {
            title: "Conversation",
            icon: MessageCircle,
            url: "/dashboard/admin/",
            active: true,
        },
        {
            title: "Management",
            icon: Settings,
            collapsible: true,
            isOpen: isManagementOpen,
            toggle: () => setIsManagementOpen(!isManagementOpen),
            items: [
                { title: "User", icon: Users, url: "/dashboard/admin/user-controle" },
                { title: "File", icon: FileText, url: "#" },
            ],
        },
        {
            title: "Settings",
            icon: UserRoundCog,
            collapsible: true,
            isOpen: isSettingsOpen,
            toggle: () => setIsSettingsOpen(!isSettingsOpen),
            items: [
                { title: "Profile", icon: CgProfile, url: "#" },
                { title: "Change Email", icon: Mail, url: "#" },
                { title: "Change Password", icon: Lock, url: "#" },
            ],
        },
    ]

    return (
        <aside
            ref={sidebarRef}
            className={`fixed left-0 z-50 flex w-64 flex-col bg-blue-950/10 backdrop-blur-xs text-[#ACC0D8] shadow-lg
                top-16 h-[calc(100vh-4rem)] 
                md:translate-x-0
                max-md:transform max-md:transition-transform max-md:duration-300 max-md:ease-in-out
                ${isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"}`}
        >
            <div className="flex items-center justify-end border-b border-gray-700 px-4 py-3 md:hidden hover:cursor-pointer">
                <button
                    className="md:hidden text-[#ACC0D8] hover:bg-gray-700/20 p-1 rounded"
                    onClick={toggleSidebar}
                    aria-label="Close sidebar"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Profile Section */}
            <div className="flex flex-col items-center justify-center p-6 border-b border-gray-700">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white">
                    <img
                        src="/user.svg"
                        alt="Cameron Malek"
                        width={80}
                        height={80}
                        className=""
                    />
                </div>
                <div className="mt-3 text-center">
                    <div className="flex items-center gap-1">
                        <h2 className="text-lg font-semibold">Cameron Malek</h2>
                        <button className="text-gray-400 hover:text-[#ACC0D8] p-1 rounded hover:cursor-pointer">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit Profile</span>
                        </button>
                    </div>
                    <p className="text-sm text-gray-400">Admin</p>
                </div>
            </div>

            <nav className="flex-1 overflow-auto py-4">
                <ul className="space-y-1 px-4">
                    {navItems.map((item, index) => (
                        <li key={item.title}>
                            {item.collapsible ? (
                                <>
                                    <button
                                        onClick={item.toggle}
                                        className="flex items-center hover:cursor-pointer justify-between w-full rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700/20 hover:text-[#ACC0D8]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.title}</span>
                                        </div>
                                        <ChevronDown className={`h-4 w-4 transition-transform ${item.isOpen ? "rotate-180" : ""}`} />
                                    </button>
                                    {item.isOpen && (
                                        <ul className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                                            {item.items?.map((subItem) => (
                                                <li key={subItem.title}>
                                                    <Link
                                                        to={subItem.url}
                                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:bg-gray-700/20 hover:text-[#ACC0D8]"
                                                    >
                                                        <subItem.icon className="h-4 w-4" />
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                            ) : (
                                <Link
                                    href={item.url}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                                        ${item.active ? "bg-gradient-to-r from-[#561880] to-[#3F64ED] text-[#ACC0D8]" : "text-gray-300 hover:bg-gray-700/20 hover:text-[#ACC0D8]"}`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                </Link>
                            )}
                            {index === 0 && <div className="my-4 border-b border-gray-700" />} {/* Separator after Conversation */}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-700 ">
                <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-gray-300 transition-all hover:bg-gray-700/20 hover:text-red-300 hover:cursor-pointer">
                    <LogOut className="h-5 w-5" />
                    Logout
                </button>
            </div>
        </aside>
    )
}