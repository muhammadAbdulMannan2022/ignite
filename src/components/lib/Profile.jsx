import React from 'react';
import { Edit2, Phone, Mail, MapPin, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';

function Profile() {
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-center mt-0 md:mt-20'>
            <div className="relative overflow-hidden max-w-7xl max-h-[80vh] overflow-y-auto">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                </div>
                <div className="relative z-10 container mx-auto px-6 py-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            WELCOME TO <span style={{ color: '#0D6FF0' }}>SENSES</span>
                        </h1>
                        <button
                            onClick={() => navigate("/dashboard/admin/edit/profile")}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:cursor-pointer"
                            style={{ backgroundColor: '#4180AD', color: 'white' }}
                        >
                            <Edit2 size={16} />
                            <span className="text-sm font-medium">Edit</span>
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mx-auto">
                        {/* Profile Section */}
                        <div className="lg:col-span-1">
                            <div className="flex flex-col items-center text-center mb-8">
                                {/* Profile Image */}
                                <div className="relative mb-6">
                                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                                        <img
                                            src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
                                            alt="Jacob Jones"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                </div>

                                {/* Name and Title */}
                                <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#0D6FF0' }}>
                                    JACOB JONES
                                </h2>
                                <p className="text-lg font-medium" style={{ color: '#ACC0D8' }}>
                                    Product Designer
                                </p>
                            </div>


                        </div>

                        {/* Content Sections */}
                        <div className="flex flex-col gap-4 md:col-span-2">
                            {/* Contact Information */}
                            <div className="flex flex-col md:flex-row">
                                <div className='md:w-1/2 p-2'>
                                    <div className="flex items-center gap-3 text- py-1">
                                        <Phone size={16} style={{ color: '#ACC0D8' }} />
                                        <span className="text-[#ACC0D8]">+77 022 444 05 05</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm py-1">
                                        <Mail size={16} style={{ color: '#ACC0D8' }} />
                                        <span className="text-[#ACC0D8]">jacob360@gmail.com</span>
                                    </div>
                                </div>
                                <div className='md:w-1/2 p-2'>
                                    <div className="flex items-center gap-3 text-sm py-1">
                                        <Calendar size={16} style={{ color: '#ACC0D8' }} />
                                        <span className="text-[#ACC0D8]">25 yrs</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm py-1">
                                        <User size={16} style={{ color: '#ACC0D8' }} />
                                        <span className="text-[#ACC0D8]">Male</span>
                                    </div>

                                    <div className="flex items-center gap-3 text-sm lg:col-span-1 sm:col-span-2 py-1">
                                        <MapPin size={16} style={{ color: '#ACC0D8' }} />
                                        <span className="text-[#ACC0D8]">United Kingdom, London</span>
                                    </div>
                                </div>
                            </div>
                            {/* About Section */}
                            <div className="h-fit backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4" style={{ color: '#0D6FF0' }}>
                                    ABOUT
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    My name is <span style={{ color: '#0D6FF0' }}>Jacob Jones</span>.
                                    I am a web designer & developer, and I'm very passionate and dedicated to
                                    my work, dedicated to my work, dedicated to my work.
                                </p>
                            </div>

                            {/* Professional Background Section */}
                            <div className="h-fit backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <h3 className="text-xl font-bold mb-4" style={{ color: '#0D6FF0' }}>
                                    PROFESSIONAL BACKGROUND
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    With 10+ years experience as a professional a graphic designer, I have
                                    acquired the skills and knowledge necessary to make your project a
                                    success.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;