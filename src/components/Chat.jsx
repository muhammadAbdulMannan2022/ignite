"use client";

import { useOptimistic, useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";
import { BsSoundwave } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import Voice from "./Voice";

const initialMessages = [
    {
        id: 1,
        text: "Hello! How can I assist you today?",
        time: "10:01 AM",
        isSender: false,
    },
    {
        id: 2,
        text: "Can you help me understand how this works?",
        time: "10:02 AM",
        isSender: true,
    },
    {
        id: 3,
        text: "Sure! It works by processing your input and generating a response.",
        time: "10:03 AM",
        isSender: false,
    },
];

export default function Chat() {
    const [messages, setMessages] = useState(initialMessages);
    const [isVoice, setIsVoice] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        messages,
        (state, newMessage) => [...state, newMessage]
    );
    const [input, setInput] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [optimisticMessages]);

    const handleSend = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const newMessage = {
            id: Date.now(),
            text: trimmed,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            isSender: true,
        };

        addOptimisticMessage(newMessage);
        setInput("");

        setTimeout(() => {
            setMessages((prev) => [...prev, newMessage]);

            setTimeout(() => {
                const aiMessage = {
                    id: Date.now() + 1,
                    text: "Got it! Here's a helpful response to your message.",
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    isSender: false,
                };
                setMessages((prev) => [...prev, aiMessage]);
            }, 800);
        }, 0);
    };

    return (
        <div className="relative flex flex-col h-full bg-transparent rounded-lg overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center relative">
                <div className="max-w-5xl w-full h-[75vh] overflow-y-auto p-2 sm:p-4 space-y-3 sm:space-y-4 hideScrollBar">
                    {isVoice ? (
                        <Voice isVideo={isVideo} />
                    ) : (
                        <>
                            {optimisticMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex w-full gap-1.5 sm:gap-2 ${msg.isSender ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {!msg.isSender && (
                                        <div className="relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 overflow-hidden rounded-full">
                                            <img
                                                className="aspect-square h-full w-full opacity-50"
                                                alt="AI"
                                                src="/userdummy.png"
                                            />
                                            <span className="flex h-full w-full items-center justify-center rounded-full bg-zinc-200 text-[10px] sm:text-xs font-medium text-zinc-600">
                                                AI
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex flex-col max-w-[85%]">
                                        <div
                                            className={`rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm leading-relaxed shadow-sm ${msg.isSender
                                                    ? "bg-[#1f314a34] shadow-2xl shadow-gray-900 backdrop-blur-sm text-[#9DBDE9] rounded-br-none"
                                                    : "bg-black/20 backdrop-blur-sm shadow-gray-900 text-[#9DBDE9] rounded-bl-none"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <span
                                            className={`mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-zinc-500 ${msg.isSender ? "text-right" : "text-left"
                                                }`}
                                        >
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                        </>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center p-2 sm:p-4">
                <div className="max-w-5xl w-full flex items-center bg-[#12233A] p-1.5 sm:p-2 rounded-full">
                    <div
                        className={`relative flex items-center flex-1 max-w-4xl h-12 sm:h-14 bg-[#1F314A] rounded-full border border-[#1F314A] pr-1.5 sm:pr-2 ${isVoice && "cursor-not-allowed"
                            }`}
                    >
                        <input
                            type="text"
                            placeholder="Type a message"
                            className={`flex-1 h-full px-4 sm:px-6 bg-transparent text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none ${isVoice && "cursor-not-allowed"
                                }`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !isVoice) handleSend();
                            }}
                            disabled={isVoice}
                        />
                        <button
                            onClick={handleSend}
                            className={`p-1.5 sm:p-2 text-blue-400 transition-colors ${isVoice ? "cursor-not-allowed" : "hover:cursor-pointer"
                                }`}
                            disabled={isVoice}
                        >
                            <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            setIsVoice((v) => !v);
                        }}
                        className="ml-2 sm:ml-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0A1422] text-white hover:cursor-pointer"
                    >
                        <BsSoundwave className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="sr-only">Voice message</span>
                    </button>
                    <button
                        onClick={() => {
                            if (isVoice) setIsVideo(!isVideo);
                        }}
                        disabled={!isVoice}
                        className={`ml-1.5 sm:ml-2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#0A1422] text-white ${!isVoice ? "cursor-not-allowed" : "hover:cursor-pointer"
                            }`}
                    >
                        <FaVideo className="h-5 w-5 sm:h-6 sm:w-6" />
                        <span className="sr-only">Video call</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
