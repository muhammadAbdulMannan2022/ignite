import React, { useEffect, useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";
import Animation from "./lib/Animation";
import AnimatedMicButton from "./utils/GradientBorder";

export default function Voice({ isVideo }) {
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const debounceTimeout = useRef(null);
    const animationFrameRef = useRef(null);
    const audioContextRef = useRef(null);
    const micStreamRef = useRef(null);
    const videoStreamRef = useRef(null);

    const [isTalking, setIsTalking] = useState(false);
    const isTalkingRef = useRef(false);
    const [started, setStarted] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const [animValue, setAnimValue] = useState(0.1);
    const [lineHeight, setLineHeight] = useState(150);

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
                } else {
                    if (isTalkingRef.current && !debounceTimeout.current) {
                        debounceTimeout.current = setTimeout(() => {
                            isTalkingRef.current = false;
                            setIsTalking(false);
                            debounceTimeout.current = null;
                        }, debounceDelay);
                    }
                }

                if (micStreamRef.current) {
                    animationFrameRef.current = requestAnimationFrame(checkTalking);
                }
            };

            checkTalking();
        } catch (err) {
            console.error("Mic access error:", err);
            setStarted(false);
        }
    };

    const stopMic = () => {
        if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach((track) => track.stop());
            micStreamRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(console.error);
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

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
            });
            videoStreamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play().catch((err) => {
                    console.error("Video play error:", err);
                });
            }
            setVideoStarted(true);
            console.log("Video started:", stream.active);
        } catch (err) {
            console.error("Video access error:", err);
            setVideoStarted(false);
        }
    };

    const stopVideo = () => {
        if (videoStreamRef.current) {
            videoStreamRef.current.getTracks().forEach((track) => track.stop());
            videoStreamRef.current = null;
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }
        setVideoStarted(false);
        console.log("Video stopped");
    };

    // Handle page visibility changes
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                stopMic();
            } else if (document.visibilityState === "visible" && !micStreamRef.current) {
                // Optionally restart mic when page becomes visible
                const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
                if (!isApple) startMic();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // React to isVideo prop changes
    useEffect(() => {
        if (isVideo) {
            startVideo();
        } else {
            stopVideo();
        }
    }, [isVideo]);



    // Start mic on mount
    useEffect(() => {
        const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
        if (!isApple) startMic();

        return () => {
            stopMic();
            stopVideo();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {isVideo && (
                <div className="w-[400px] h-[300px] bg-black absolute top-10 right-40 overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <audio ref={audioRef} autoPlay muted className="hidden" />

            {started && (
                <div className="relative w-40 h-40">
                    {/* <div
                        className={`absolute inset-0 rounded-full ${isTalking ? "" : "border-gray-300"}`}
                    ></div> */}
                    <div
                        className={`relative z-10 w-full h-full rounded-full flex items-center justify-center text-white 
              ${isTalking ? "" : "bg-gray-400 dark:bg-gray-600"}`}
                        style={{

                            transition: "border-radius 0.3s ease-in-out",
                        }}
                    >
                        {isTalking && <Animation />}


                        {isTalking ? (
                            <Mic className="w-10 h-10" />
                            // <AnimatedMicButton />
                        ) : (
                            <MicOff className="w-10 h-10" />
                        )}
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