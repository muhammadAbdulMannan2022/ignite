import { Mail, Lock, Chrome } from "lucide-react"
import { Link } from "react-router"

export default function SignUpPage() {
    return (

        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            {/* S.E.N.S.E.S. Logo Image */}
            <div className="text-center mb-6 sm:mb-8">
                <div className="relative w-[250px] mx-auto -mb-12">
                    <img
                        src="/logo.png"
                        alt="S.E.N.S.E.S. Logo"
                        className="w-full"
                        loading="lazy"
                    />
                </div>
                <h2 className="text-3xl sm:text-4xl font-semibold mt-6 sm:mt-8 mb-4 sm:mb-6 text-[#ACC0D8]">
                    Welcome
                </h2>
            </div>

            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-left text-sm font-medium text-[#ACC0D8] mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] w-5 h-5" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="user@mail.com"
                            className="w-full pl-10 pr-4 py-3 bg-[#1A2137] rounded-lg border border-[#ACC0D8] focus:outline-none focus:ring-1 focus:ring-[#ACC0D8] text-[#ACC0D8]"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-left text-sm font-medium text-[#ACC0D8] mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] w-5 h-5" />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 bg-[#1A2137] rounded-lg border border-[#ACC0D8] focus:outline-none focus:ring-1 focus:ring-[#ACC0D8] text-[#ACC0D8]"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block text-left text-sm font-medium text-[#ACC0D8] mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] w-5 h-5" />
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 bg-[#1A2137] rounded-lg border border-[#ACC0D8] focus:outline-none focus:ring-1 focus:ring-[#ACC0D8] text-[#ACC0D8]"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#4180AD] rounded-lg text-lg font-medium hover:bg-[#518BB7] transition-colors mt-8"
                >
                    Sign Up
                </button>
            </form>

            <div className="text-center mt-6 text-[#ACC0D8]">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-[#ACC0D8] hover:underline font-medium">
                    Sign In
                </Link>
            </div>

            <div className="flex items-center my-8">
                <div className="flex-grow border-t border-[#ACC0D8]"></div>
                <span className="mx-4 text-[#ACC0D8] text-sm">Or sign up with</span>
                <div className="flex-grow border-t border-[#ACC0D8]"></div>
            </div>

            <button
                type="button"
                className="w-full py-3 px-4 bg-transparent rounded-lg border border-[#ACC0D8] text-lg font-medium flex items-center justify-center gap-3 text-[#ACC0D8] transition-colors"
            >
                <img src="/google.svg" className="w-8 h-8" />
                Google
            </button>
        </div>
    )
}
