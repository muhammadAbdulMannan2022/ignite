import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";

export default function VerificationPage() {
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [code, setCode] = useState(["", "", "", ""]);
    const navigate = useNavigate()

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Paste full code
        if (value.length === 4) {
            const digits = value.split("").slice(0, 4);
            setCode(digits);
            digits.forEach((digit, i) => {
                if (inputRefs[i].current) inputRefs[i].current.value = digit;
            });
            inputRefs[3].current?.focus();
            return;
        }

        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < inputRefs.length - 1) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullCode = code.join("");
        navigate("/auth/changePass")
    };

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
                    Enter Verification Code
                </h2>
                <p className="text-sm sm:text-base text-[#ACC0D8] opacity-80 mb-6 sm:mb-10">
                    We've sent a 4-digit code to your email. Please enter it below.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-center gap-4 sm:gap-6">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            maxLength={4}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-14 sm:w-16 h-14 sm:h-16 text-3xl sm:text-4xl font-bold text-center bg-[#1A2137] border border-[#ACC0D8] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4180AD] text-[#ACC0D8]"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            aria-label={`Digit ${index + 1}`}
                            placeholder="*"
                        />
                    ))}
                </div>

                <div className="text-center text-sm text-[#ACC0D8] opacity-80 mt-2">
                    Didn’t receive a code?{" "}
                    <a href="#" className="text-[#4180AD] hover:underline">
                        Resend
                    </a>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-full max-w-xl hover:cursor-pointer py-2.5 sm:py-3 px-4 bg-[#4180AD] hover:bg-[#518BB7] rounded-lg text-base sm:text-lg font-medium text-[#ACC0D8] transition-colors"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}
