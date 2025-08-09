import { useState } from "react";
import { Info, MoreVertical, Trash2 } from "lucide-react";
import Modal from "../utils/Modle";

function Row({ user, onDelete }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isQuestionOpen, setIsQuestionOpen] = useState(false)

    const formattedDate = new Date(user.startDate).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const handleDelete = () => {
        setIsQuestionOpen(true)
    }
    const confurmDelete = (id) => {
        onDelete(id);
        setIsMenuOpen(false)
    }

    return (
        <li className="grid grid-cols-12 items-center px-4 py-4 hover:bg-gray-700/40 transition">
            <Modal isOpen={isQuestionOpen} onClose={() => setIsQuestionOpen(false)}>
                <div className="flex items-center justify-center p-5 py-20 flex-col">
                    <h1 className="text-2xl text-white font-semibold text-center">Are you sure <br />
                        about deleting The user?</h1>
                    <div className="flex w-[70%] gap-5 items-center justify-center mt-10">
                        <button onClick={() => confurmDelete(user.id)} className="text-white px-4 py-2 w-1/2 text-center border border-[#4180AD] rounded-md hover:cursor-pointer">Yes</button>
                        <button onClick={() => setIsQuestionOpen(false)} className="text-white px-4 py-2 w-1/2 text-center bg-[#4180AD] rounded-md hover:cursor-pointer">No</button>
                    </div>
                </div>
            </Modal>
            <div className="col-span-3 text-sm text-white">{user.id}</div>
            <div className="col-span-4 text-sm text-white">

                {user.name}

            </div>
            <div className="col-span-3 text-sm text-gray-400">{formattedDate}</div>
            <div className="col-span-1">
                <button
                    className="inline-flex items-center gap-1 rounded-md border border-gray-600 bg-gray-700/40 px-2 py-1 text-xs text-white hover:bg-gray-600 transition"
                    onClick={() => alert(`Info: ${user.name} (ID: ${user.id}, Tier: ${user.tier}, Start Date: ${formattedDate})`)}
                >
                    <Info className="h-3.5 w-3.5" />
                    Click
                </button>
            </div>
            <div className="col-span-1 flex justify-end relative">
                <button
                    aria-haspopup="menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center rounded-md border border-transparent px-2 py-1 hover:bg-gray-600/60 transition hover:cursor-pointer"
                >
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
                {isMenuOpen && (
                    <div
                        role="menu"
                        className="absolute right-0 top-8 z-50 w-40 rounded-lg border border-gray-700 bg-gray-800 text-white shadow-lg transition-opacity duration-200"
                    >
                        <button
                            onClick={() => {
                                handleDelete(user.id)
                                // setIsMenuOpen(false);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 transition hover:cursor-pointer"
                            role="menuitem"
                        >
                            <Trash2 className="h-4 w-4" /> Delete
                        </button>
                    </div>
                )}
            </div>
        </li>
    );
}

export default Row;