import React, { useState, useMemo } from "react";
import { Plus, Search, SortAsc, SortDesc, Trash2, Edit } from "lucide-react";
import Modal from "../../../../components/utils/Modle"; // Note: Typo in "Modle" (should be "Modal")
import { FileUploadModal } from "../../../../components/utils/FileUploadModal";
import CategorySelector from "../../../../components/utils/CategorySlector"; // Note: Typo in "CategorySlector" (should be "CategorySelector")

const FileManagement = () => {
    const [q, setQ] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(null); // New state to track selected file ID
    const [files, setFiles] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
        setSortConfig({ key, direction });
    };

    const sortedFiles = useMemo(() => {
        let filtered = files.filter(
            (file) =>
                file.name &&
                file.name.toLowerCase().includes(q.toLowerCase())
        );

        filtered.sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === "startDate") {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [files, sortConfig, q]);

    const handleDelete = (id) => {
        setFiles((prev) => prev.filter((file) => file.id !== id));
    };

    const uploadComplete = (data) => {
        if (!Array.isArray(data)) {
            console.error("Expected an array of files");
            return;
        }
        const newFiles = data
            .filter((file) => file && file.name)
            .map((file, index) => ({
                id: `55-${Date.now()}-${index}`,
                name: file.name,
                startDate: new Date().toISOString().split("T")[0],
                category: "",
            }));

        setFiles((prev) => [...prev, ...newFiles]);
        setIsAddModalOpen(false);
    };

    const changeCategory = (category, id) => {
        console.log(category, id)
        setFiles((prev) =>
            prev.map((file) =>
                file.id === id ? { ...file, category } : file
            )
        );
        setIsCategoryOpen(false); // Close the modal after updating the category
    };

    return (
        <div className="md:min-h-[85vh] text-white bg-blue-950/10 backdrop-blur-xl shadow-2xl md:p-6">
            <header className="container mx-auto py-3 md:py-8">
                <h1 className="text-3xl font-semibold tracking-tight text-center">File Management</h1>
            </header>

            <div className="flex flex-col md:hidden md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-[#4180AD] text-white px-4 py-2 hover:bg-[#4180add8] transition hover:cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Upload
                    </button>
                    <div className="relative flex-1 md:flex-none">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by filename"
                            className="w-full md:w-80 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            <main className="container max-w-[88vw] md:max-w-full overflow-x-auto mx-auto pb-16">
                <div className="md:flex flex-col hidden md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-md bg-[#4180AD] text-white px-4 py-2 hover:bg-[#4180add8] transition hover:cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                            Upload
                        </button>
                        <div className="relative flex-1 md:flex-none">
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search by filename"
                                className="w-full md:w-80 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                    <FileUploadModal onUploadComplete={uploadComplete} />
                </Modal>
                <Modal isOpen={isCategoryOpen} onClose={() => setIsCategoryOpen(false)}>
                    <CategorySelector changeCategory={changeCategory} id={selectedFileId} />
                </Modal>

                <section className="rounded-xl border border-gray-700 bg-gray-800/20 shadow min-w-5xl">
                    <div className="grid grid-cols-12 px-4 py-3 text-sm font-medium text-gray-300 bg-[#1A2137] md:px-10">
                        <div
                            className="col-span-3 flex items-center gap-1 cursor-pointer"
                            onClick={() => handleSort("id")}
                        >
                            File No.{" "}
                            {sortConfig.key === "id" &&
                                (sortConfig.direction === "asc" ? (
                                    <SortAsc className="h-4 w-4" />
                                ) : (
                                    <SortDesc className="h-4 w-4" />
                                ))}
                        </div>
                        <div
                            className="col-span-4 flex items-center gap-1 cursor-pointer"
                            onClick={() => handleSort("name")}
                        >
                            Name{" "}
                            {sortConfig.key === "name" &&
                                (sortConfig.direction === "asc" ? (
                                    <SortAsc className="h-4 w-4" />
                                ) : (
                                    <SortDesc className="h-4 w-4" />
                                ))}
                        </div>
                        <div
                            className="col-span-3 flex items-center gap-1 cursor-pointer"
                            onClick={() => handleSort("startDate")}
                        >
                            Date of Upload{" "}
                            {sortConfig.key === "startDate" &&
                                (sortConfig.direction === "asc" ? (
                                    <SortAsc className="h-4 w-4" />
                                ) : (
                                    <SortDesc className="h-4 w-4" />
                                ))}
                        </div>
                        <div className="col-span-1 flex items-center justify-center">Categorize</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>

                    <ul className="divide-y divide-gray-700 pb-20 overflow-auto h-[55vh] md:h-[70vh] md:px-10">
                        {sortedFiles.length > 0 ? (
                            sortedFiles.map((file) => (
                                <li
                                    key={file.id}
                                    className="grid grid-cols-12 px-4 py-3 text-sm items-center transition"
                                >
                                    <div className="col-span-3">{file.id}</div>
                                    <div className="col-span-4">{file.name || "Unnamed File"}</div>
                                    <div className="col-span-3">{file.startDate}</div>

                                    <div className="col-span-1 flex items-center justify-center">
                                        {file.category ? (
                                            <div className="flex items-center justify-center">
                                                <span>{file.category}</span>
                                                <button
                                                    onClick={() => {
                                                        setSelectedFileId(file.id);
                                                        setIsCategoryOpen(true);
                                                    }}
                                                    className="ml-2 text-gray-400 hover:text-gray-200 hover:cursor-pointer"
                                                    title="Edit category"
                                                >
                                                    <Edit className="h-4 w-4 text-[#9628E1]" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setSelectedFileId(file.id); // Set the selected file ID
                                                    setIsCategoryOpen(true); // Open the CategorySelector modal
                                                }}
                                                className="text-[#9628E1] hover:cursor-pointer underline"
                                            >
                                                Click
                                            </button>
                                        )}
                                    </div>

                                    <div className="col-span-1 text-right">
                                        <button
                                            onClick={() => handleDelete(file.id)}
                                            className="text-red-500 hover:text-red-600 transition hover:cursor-pointer"
                                            title="Delete file"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-10 text-center text-gray-400">No files found.</li>
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default FileManagement;