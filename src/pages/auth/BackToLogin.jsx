import { CheckCheck, Mail } from "lucide-react";
import { useNavigate } from "react-router";

export default function BackToLogin() {
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
            </div>

            <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col items-center justify-center">
                    <CheckCheck />
                    <h1>Password changed successfully</h1>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        onClick={() => navigate("/auth/login")}
                        type="button"
                        className="w-full max-w-xl py-2.5 sm:py-3 px-4 bg-[#4180AD] hover:cursor-pointer rounded-lg text-base sm:text-lg font-medium text-[#ACC0D8] hover:bg-[#518BB7] transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}