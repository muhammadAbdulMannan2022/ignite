import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

export default function Voice() {
    const audioRef = useRef(null);
    const debounceTimeout = useRef(null);
    const animationFrameRef = useRef(null);
    const audioContextRef = useRef(null);
    const micStreamRef = useRef(null);
    const [isTalking, setIsTalking] = useState(false);
    const isTalkingRef = useRef(false);
    const [started, setStarted] = useState(false);
    const [borderRadius, setBorderRadius] = useState(
        "57% 43% 70% 30% / 30% 37% 63% 70%"
    );

    const generateRandomBorderRadius = () => {
        const randomPercents = Array.from({ length: 8 }, () =>
            Math.floor(Math.random() * (90 - 10 + 1)) + 40
        );
        return `${randomPercents[0]}% ${randomPercents[1]}% ${randomPercents[2]}% ${randomPercents[3]}% / ${randomPercents[4]}% ${randomPercents[5]}% ${randomPercents[6]}% ${randomPercents[7]}%`;
    };

    const startMic = async () => {
        try {
            const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            micStreamRef.current = micStream;
            setStarted(true);

            if (audioRef.current) {
                audioRef.current.srcObject = micStream;
            }

            const context = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = context;

            if (context.state === "suspended") {
                await context.resume();
            }

            const source = context.createMediaStreamSource(micStream);
            const analyser = context.createAnalyser();
            analyser.fftSize = 512;
            const bufferLength = analyser.fftSize;
            const dataArray = new Uint8Array(bufferLength);

            source.connect(analyser);

            const debounceDelay = 4000;
            const threshold = 0.02;

            const checkTalking = () => {
                analyser.getByteTimeDomainData(dataArray);

                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    const val = (dataArray[i] - 128) / 128;
                    sum += val * val;
                }

                const rms = Math.sqrt(sum / bufferLength);

                if (rms > threshold) {
                    if (debounceTimeout.current) {
                        clearTimeout(debounceTimeout.current);
                        debounceTimeout.current = null;
                    }
                    if (!isTalkingRef.current) {
                        isTalkingRef.current = true;
                        setIsTalking(true);
                    }
                    // console.log("🎤 Talking detected, RMS:", rms.toFixed(4));
                } else {
                    if (isTalkingRef.current && !debounceTimeout.current) {
                        debounceTimeout.current = setTimeout(() => {
                            isTalkingRef.current = false;
                            setIsTalking(false);
                            debounceTimeout.current = null;
                        }, debounceDelay);
                    }
                    // console.log("🤫 Silence detected, RMS:", rms.toFixed(4));
                }

                if (micStreamRef.current) {
                    animationFrameRef.current = requestAnimationFrame(checkTalking);
                }
            };

            checkTalking();
        } catch (err) {
            console.error("Mic access error:", err);
        }
    };

    useEffect(() => {
        if (!isTalking) return;

        const interval = setInterval(() => {
            setBorderRadius(generateRandomBorderRadius());
        }, 200);

        return () => clearInterval(interval);
    }, [isTalking]);

    useEffect(() => {
        const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
        if (!isApple) startMic();

        return () => {
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach((track) => track.stop());
                micStreamRef.current = null;
            }
            if (audioContextRef.current) {
                audioContextRef.current.close().catch((err) => console.error("Error closing AudioContext:", err));
                audioContextRef.current = null;
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
                debounceTimeout.current = null;
            }
            setStarted(false);
            setIsTalking(false);
            isTalkingRef.current = false;
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {!started && (
                <button
                    onClick={startMic}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl mb-6 transition-all"
                >
                    <Mic className="inline w-5 h-5 mr-2" />
                    Start Mic
                </button>
            )}

            <audio ref={audioRef} autoPlay muted className="hidden" />

            {started && (
                <div className="relative w-40 h-40">
                    <div
                        className={`absolute inset-0 rounded-full border-4 ${isTalking ? "" : "border-gray-300"}`}
                    ></div>
                    <div
                        className={`relative z-10 w-full h-full rounded-full flex items-center justify-center text-white 
              ${isTalking ? "bg-gradient-to-br from-blue-700 to-pink-300 shadow-lg" : "bg-gray-400 dark:bg-gray-600"}`}
                        style={{
                            borderRadius: isTalking ? borderRadius : "",
                            transition: "border-radius 0.3s ease-in-out",
                        }}
                    >
                        {isTalking ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
                    </div>
                </div>
            )}

            {started && (
                <div className="mt-4 text-gray-700 dark:text-gray-300 text-lg font-medium">
                    {isTalking ? "Talking..." : "Silent"}
                </div>
            )}
        </div>
    );
}