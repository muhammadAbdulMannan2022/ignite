import { Link } from "react-router"
import { Facebook, Twitter, Linkedin } from "lucide-react"

export default function Footer({ className }) {
    return (
        <footer className={`bg-black text-gray-300 ${className}`}>
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Home Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">Home</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Sign Up
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Subscription Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">Subscription</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/pricing" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    Plans
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Connect With Us Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-6">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Facebook className="w-5 h-5 text-gray-300 hover:text-white" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Twitter className="w-5 h-5 text-gray-300 hover:text-white" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors duration-200"
                            >
                                <Linkedin className="w-5 h-5 text-gray-300 hover:text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section with copyright and policies */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">All Copyrights Reserved 2025-2026 XCCFSS</div>
                        <div className="flex space-x-6">
                            <Link
                                to="/privacy-policy"
                                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/cookie-policy"
                                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
