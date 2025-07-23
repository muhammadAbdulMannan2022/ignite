// HomePage.jsx
import BG from "/herobg.jpg";
import HeroSvg from "./herosvg";
import GradientText from "../../../components/utils/GradientText";
import GradientButton from "../../../components/utils/GradientButton";
import AnimatedMicButton from "../../../components/utils/GradientBorder";
import GlassyNavbar from "./Navbar";

export default function Hero() {
    return (
        <div
            className="h-screen w-full bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${BG})` }}
        >
            <div className="h-full relative w-full bg-gradient-to-b from-transparent via-10% to-black">
                <div className="h-[90%] z-10 relative w-full flex justify-center items-center">
                    <GlassyNavbar />
                    <div className="flex flex-col items-center text-center space-y-6 px-4">
                        {/* Logo */}
                        <div className="h-20 flex items-center justify-center">
                            <img src="/logo.png" alt="S.E.N.S.E.S" className="h-40 md:h-64 sm:h-20 md:h-24" />
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl font-[900] sm:text-4xl md:text-6xl leading-tight text-[#CCD8E5] max-w-4xl">
                            <GradientText className="inline-block" text="Spiritual" />{" "}
                            Growth Starts with a Conversation
                        </h1>

                        {/* Subtitle */}
                        <p className="text-[#D8E1EB] text-base sm:text-lg md:text-xl max-w-xl">
                            Powered by our advanced AI Voice Assistant. Ask questions, get clear answers,
                            instantly.
                        </p>
                        <div className="relative flex items-center rounded-4xl shadow-2xl shadow-[#8B22CD]">
                            <GradientButton className="pe-20 px-8 py-3 text-2xl shadow-md shadow-[#8b22cd98]" onClick={() => { }}>
                                Get Started Now
                            </GradientButton>

                            <div className="absolute -right-5">
                                <AnimatedMicButton />
                            </div>
                        </div>
                    </div>

                    {/* Animated waveform */}
                    <HeroSvg />
                </div>

                {/* Bottom fade overlay */}
                <div className="w-full h-[30%] absolute bottom-0 bg-gradient-to-b from-transparent via-black to-black" />
            </div>
        </div>
    );
}
