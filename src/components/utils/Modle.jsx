import { ArrowLeft } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";
import { FaX } from "react-icons/fa6";

export default function Modal({ isOpen, onClose, title, children, footer }) {
    if (!isOpen) return null;

    // Select the modal root element
    const modalRoot = document.getElementById("root");
    if (!modalRoot) return null; // fallback

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className=" bg-[#0A1422] rounded-lg shadow-lg w-full max-w-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                >
                    <ArrowLeft className="h-10 w-10" />
                </button>

                {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}

                <div>{children}</div>

                {footer && <div className="mt-4">{footer}</div>}
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, modalRoot);
}
