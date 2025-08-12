import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';

function ChangeEmail() {
    const [formData, setFormData] = useState({
        oldEmail: '',
        newEmail: '',
        confirmEmail: ''
    });

    const [errors, setErrors] = useState({
        oldEmail: '',
        newEmail: '',
        confirmEmail: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            oldEmail: '',
            newEmail: '',
            confirmEmail: ''
        };

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.oldEmail) {
            newErrors.oldEmail = 'Old email is required';
        } else if (!emailRegex.test(formData.oldEmail)) {
            newErrors.oldEmail = 'Please enter a valid email';
        }

        if (!formData.newEmail) {
            newErrors.newEmail = 'New email is required';
        } else if (!emailRegex.test(formData.newEmail)) {
            newErrors.newEmail = 'Please enter a valid email';
        }

        if (!formData.confirmEmail) {
            newErrors.confirmEmail = 'Please confirm your new email';
        } else if (formData.newEmail !== formData.confirmEmail) {
            newErrors.confirmEmail = 'Emails do not match';
        }

        if (formData.oldEmail === formData.newEmail && formData.oldEmail && formData.newEmail) {
            newErrors.newEmail = 'New email must be different from old email';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Email change submitted:', formData);
            // Handle email change logic here
            alert('Email change request submitted successfully!');
        }
    };

    return (
        <div className="relative z-10 container mx-auto px-6 py-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white">
                    Change Email
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Enter Old Email */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: '#ACC0D8' }}>
                            Enter Old Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} style={{ color: '#ACC0D8' }} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter Password"
                                value={formData.oldEmail}
                                onChange={(e) => handleInputChange('oldEmail', e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 rounded-lg bg-white/5 border ${errors.oldEmail ? 'border-red-500' : 'border-white/10'
                                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            />
                        </div>
                        {errors.oldEmail && (
                            <p className="mt-2 text-sm text-red-400">{errors.oldEmail}</p>
                        )}
                    </div>

                    {/* New Email */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: '#ACC0D8' }}>
                            New Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} style={{ color: '#ACC0D8' }} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter Password"
                                value={formData.newEmail}
                                onChange={(e) => handleInputChange('newEmail', e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 rounded-lg bg-white/5 border ${errors.newEmail ? 'border-red-500' : 'border-white/10'
                                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            />
                        </div>
                        {errors.newEmail && (
                            <p className="mt-2 text-sm text-red-400">{errors.newEmail}</p>
                        )}
                    </div>

                    {/* Confirm New Email */}
                    <div>
                        <label className="block text-sm font-medium mb-3" style={{ color: '#ACC0D8' }}>
                            Confirm New Email
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} style={{ color: '#ACC0D8' }} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter Password"
                                value={formData.confirmEmail}
                                onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 rounded-lg bg-white/5 border ${errors.confirmEmail ? 'border-red-500' : 'border-white/10'
                                    } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                            />
                        </div>
                        {errors.confirmEmail && (
                            <p className="mt-2 text-sm text-red-400">{errors.confirmEmail}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full py-4 rounded-lg font-medium hover:cursor-pointer text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: '#4180AD' }}
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ChangeEmail;