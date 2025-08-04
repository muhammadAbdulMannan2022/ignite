import { Mail } from "lucide-react";
import { useNavigate } from "react-router";

export default function ConfirmEmail() {
    const navigate = useNavigate()
    return (
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
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
                    Confirm Email
                </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#ACC0D8] mb-2">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] w-5 h-5" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="user@mail.com"
                            className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#1A2137] rounded-lg border border-[#ACC0D8] focus:outline-none focus:ring-1 focus:ring-[#ACC0D8] text-[#ACC0D8] text-sm sm:text-base"
                            required
                        />
                    </div>
                </div>

                <button
                    onClick={() => navigate("/auth/verify")}
                    type="button"
                    className="w-full py-2.5 sm:py-3 px-4 bg-[#4180AD] hover:cursor-pointer rounded-lg text-base sm:text-lg font-medium text-[#ACC0D8] hover:bg-[#518BB7] transition-colors"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}