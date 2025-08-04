import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

export default function ChangePasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate()

    return (
        <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center min-h-screen bg-[#0A0A1A] text-[#ACC0D8]">
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
                    Change Password
                </h2>
            </div>

            <form className="space-y-6 sm:space-y-8">
                {/* New Password */}
                <div>
                    <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                        New Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] w-5 h-5" />
                        <input
                            type={showNew ? "text" : "password"}
                            id="new-password"
                            name="new-password"
                            placeholder="Enter password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#1A2137] rounded-lg border border-[#ACC0D8] focus:outline-none focus:ring-1 focus:ring-[#ACC0D8] text-[#ACC0D8] text-sm sm:text-base"
                            required
                        />
                        {newPassword && (
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] hover:opacity-80"
                            >
                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] w-5 h-5" />
                        <input
                            type={showConfirm ? "text" : "password"}
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#1A2137] rounded-lg border border-[#ACC0D8] focus:outline-none focus:ring-1 focus:ring-[#ACC0D8] text-[#ACC0D8] text-sm sm:text-base"
                            required
                        />
                        {confirmPassword && (
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ACC0D8] hover:opacity-80"
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => navigate("/auth/backtoLogin")}
                    type="submit"
                    className="w-full hover:cursor-pointer py-2.5 sm:py-3 px-4 bg-[#4180AD] hover:bg-[#518BB7] rounded-lg text-base sm:text-lg font-medium text-[#ACC0D8] transition-colors mt-4"
                >
                    Confirm
                </button>
            </form>
        </div>
    );
}
