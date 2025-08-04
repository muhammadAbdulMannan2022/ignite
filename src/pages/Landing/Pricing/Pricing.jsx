import React from 'react'
import GlassyNavbar from '../Hero/Navbar'
import Footer from '../Footer/Footer'
import PricingPlan from './PricingData'

function Pricing() {
    return (
        <div className='min-h-screen bg-[url("/pBg.png")] bg-center bg-cover'>
            <GlassyNavbar className="border-t" />
            <div>
                <PricingPlan />
                <Footer className="bg-transparent" />
            </div>
        </div>
    )
}

export default Pricing
