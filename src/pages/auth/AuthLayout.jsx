import { Outlet } from "react-router"

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-[#060D19] text-[#ACC0D8] flex items-center justify-center p-4 sm:p-8">
            <div className="bg-[#060D19] rounded-xl shadow-lg flex flex-col lg:flex-row max-w-6xl w-full overflow-hidden h-[90vh]">
                {/* Left Panel - Image (Hidden on small screens, lazy-loaded) */}
                <div className="hidden lg:block lg:w-1/2 relative h-64 lg:h-auto">
                    <img
                        src="/authimg.jpg"
                        alt="Person meditating in mountains"
                        className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
                        loading="lazy"
                    />
                </div>

                {/* Right Panel - Form */}
                <Outlet />
            </div>
        </div>
    )
}