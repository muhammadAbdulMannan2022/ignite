import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

function ChangePasswordAuthUser() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false,
    });

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const validateForm = () => {
        const newErrors = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        };

        if (!formData.oldPassword) {
            newErrors.oldPassword = "Old password is required";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (
            formData.oldPassword === formData.newPassword &&
            formData.oldPassword &&
            formData.newPassword
        ) {
            newErrors.newPassword =
                "New password must be different from old password";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== "");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Password change submitted:", formData);
            alert("Password change request submitted successfully!");
        }
    };

    const inputClasses = (error) =>
        `w-full pl-12 pr-12 py-4 rounded-lg bg-white/5 border ${error ? "border-red-500" : "border-white/10"
        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`;

    return (
        <div className="relative z-10 container mx-auto px-6 py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white">
                    Change Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Old Password */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-3"
                            style={{ color: "#ACC0D8" }}
                        >
                            Old Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} style={{ color: "#ACC0D8" }} />
                            </div>
                            <input
                                type={showPassword.old ? "text" : "password"}
                                placeholder="Enter old password"
                                value={formData.oldPassword}
                                onChange={(e) =>
                                    handleInputChange("oldPassword", e.target.value)
                                }
                                className={inputClasses(errors.oldPassword)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                                onClick={() => togglePasswordVisibility("old")}
                            >
                                {showPassword.old ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.oldPassword && (
                            <p className="mt-2 text-sm text-red-400">{errors.oldPassword}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-3"
                            style={{ color: "#ACC0D8" }}
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} style={{ color: "#ACC0D8" }} />
                            </div>
                            <input
                                type={showPassword.new ? "text" : "password"}
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={(e) =>
                                    handleInputChange("newPassword", e.target.value)
                                }
                                className={inputClasses(errors.newPassword)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                                onClick={() => togglePasswordVisibility("new")}
                            >
                                {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="mt-2 text-sm text-red-400">{errors.newPassword}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-3"
                            style={{ color: "#ACC0D8" }}
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} style={{ color: "#ACC0D8" }} />
                            </div>
                            <input
                                type={showPassword.confirm ? "text" : "password"}
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    handleInputChange("confirmPassword", e.target.value)
                                }
                                className={inputClasses(errors.confirmPassword)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
                                onClick={() => togglePasswordVisibility("confirm")}
                            >
                                {showPassword.confirm ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full py-4 rounded-lg font-medium hover:cursor-pointer text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: "#4180AD" }}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordAuthUser;
