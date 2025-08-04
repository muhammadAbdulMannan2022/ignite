import { Mic, Rocket, Square } from "lucide-react"

export default function PricingPlan() {
    return (
        <div className="min-h-screen text-white py-12 pt-32 md:pt-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-bold mb-2">Our Pricing Plan</h1>
                <p className="text-lg text-gray-400 uppercase tracking-widest">SIGN UP RISK FREE</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                {/* Free Plan Card */}
                <div className="bg-[#1a1a332f] backdrop-blur-sm  rounded-xl p-8 flex flex-col text-left shadow-lg border border-[#514F6E]">
                    <div className="flex flex-col flex-grow w-full">
                        <div className="bg-[#2e2788a2] rounded-md px-4 py-2 mb-6 w-fit">
                            <img src="/mike.png" className="h-10" alt="" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Try out S.E.N.S.E.S</h2>
                        <ul className="text-gray-300 text-lg space-y-2 mb-8 w-full">
                            <li className="flex items-center gap-2">
                                <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                Limited Prompts/Questions
                            </li>
                        </ul>
                        <div className="text-5xl font-bold mb-8">
                            $0<span className="text-2xl font-normal">/Month</span>
                        </div>
                    </div>
                    <button className="w-full py-3 px-6 bg-[#3A3A6A] rounded-lg text-lg font-medium hover:bg-[#4A4A7A] transition-colors">
                        Try now
                    </button>
                </div>

                {/* Premium Plan Card */}
                <div className="bg-[#1a1a332f] backdrop-blur-sm rounded-xl flex flex-col shadow-lg overflow-hidden border border-[#400C6F]">
                    <div className="bg-[#400C6F] py-4 text-center text-xl font-semibold uppercase tracking-wider">
                        PREMIUM
                    </div>
                    <div className="p-8 flex flex-col text-left flex-grow w-full">
                        <div className="bg-[#8C82FF] rounded-md p-3 mb-6 w-fit">
                            <Rocket className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">PREMIUM</h2>
                        <ul className="text-gray-300 text-lg space-y-2 mb-8 w-full">
                            <li className="flex items-center gap-2">
                                <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                SENSES Accessibility 24/7
                            </li>
                            <li className="flex items-center gap-2">
                                <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                Member Dashboard
                            </li>
                            <li className="flex items-center gap-2">
                                <Square className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                SENSES Guided Meditation
                            </li>
                        </ul>
                        <div className="text-5xl font-bold mb-8">
                            $19<span className="text-2xl font-normal">/Month</span>
                        </div>
                        <button className="w-full py-3 px-6 bg-gradient-to-r from-[#6A00FF] to-[#4A00FF] rounded-lg text-lg font-medium hover:from-[#7A10FF] hover:to-[#5A10FF] transition-colors">
                            Subscribe now
                        </button>
                    </div>
                </div>

                {/* Online Store Card */}
                <div className="bg-[#1a1a332f] backdrop-blur-sm rounded-xl p-8 flex flex-col text-left shadow-lg border border-[#2A2A4A]">
                    <div className="flex flex-col flex-grow w-full">
                        <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                        </div>
                    </div>
                    <img
                        src="/puser.png"
                        alt="Two people wearing SENSES t-shirts"
                        className="w-full object-cover rounded-lg"
                    />
                    <button
                        className="w-full py-3 px-6 bg-[#3A3A6A] rounded-lg text-lg font-medium opacity-70 cursor-not-allowed"
                        disabled
                    >
                        Online Store (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    )
}