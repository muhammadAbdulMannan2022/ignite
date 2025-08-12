import React from 'react'
import PricingPlan from '../../../Landing/Pricing/PricingData'

export default function UserPriccing() {
    return (
        <div>
            <PricingPlan isLoggedIN={true} >
                <div className="text-[#99AEC7] py-12 px-4 flex flex-col items-center w-full max-w-6xl">
                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-2">Our Pricing Plan</h2>
                    <p className="text-gray-400 mb-8">Find your best package here</p>

                    {/* Table container */}
                    <div className="border border-gray-600 rounded-lg overflow-hidden w-full">
                        <div className="grid grid-cols-3 justify-between">
                            <div className="p-4 md:text-start">
                                <p className="text-gray-300 text-sm mb-2">Date of Starting</p>
                                <p className="font-medium">12 July, 2025</p>
                            </div>
                            <div className="p-4 flex flex-col items-center justify-center">
                                <p className="text-gray-300 text-sm mb-2">Membership (Freebie)</p>
                                <button className="bg-[#4180AD] hover:bg-[#4180adc2] text-white px-4 py-1 rounded transition hover:cursor-pointer">
                                    Cancel
                                </button>
                            </div>
                            <div className="p-4 md:text-end">
                                <p className="text-gray-300 text-sm mb-2">Date of end</p>
                                <p className="font-medium">12 July, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>

            </PricingPlan>
        </div>
    )
}
