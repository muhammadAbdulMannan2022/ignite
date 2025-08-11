import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, SortAsc, SortDesc } from "lucide-react";
import Modal from "../../../../components/utils/Modle"
import Row from "../../../../components/lib/Row";
import AddUserPage from "./AddUser";

const sampleUsers = [
    { id: "55-1234", name: "Takács Bianka", startDate: "2024-07-12", tier: "subscriber" },
    { id: "55-2234", name: "Sipos Veronika", startDate: "2024-06-15", tier: "subscriber" },
    { id: "55-3234", name: "Nagy Tímea", startDate: "2024-08-01", tier: "subscriber" },
    { id: "55-4234", name: "Kende Lili", startDate: "2024-07-12", tier: "subscriber" },
    { id: "55-5234", name: "Pásztor Kíra", startDate: "2024-05-20", tier: "subscriber" },
    { id: "55-6234", name: "Virág Mercédesz", startDate: "2024-07-12", tier: "subscriber" },
    { id: "55-7234", name: "Hajdú Dominika", startDate: "2024-04-10", tier: "free" },
    { id: "55-8234", name: "Balázs Annamária", startDate: "2024-07-12", tier: "free" },
    { id: "55-9234", name: "Kelemen Krisztina", startDate: "2024-03-25", tier: "free" },
];

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState("subscriber");
    const [q, setQ] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [users, setUsers] = useState(sampleUsers);

    useEffect(() => {
        document.title = "User Management – Subscribers & Free Members";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Manage subscribers and free members with search and sort functionality.");
        }
    }, []);

    const sortedUsers = useMemo(() => {
        let filtered = users.filter((u) => u.tier === activeTab);
        if (q.trim()) {
            const s = q.trim().toLowerCase();
            filtered = filtered.filter((u) => u.name.toLowerCase().includes(s) || u.id.toLowerCase().includes(s));
        }
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [activeTab, q, users, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };


    return (
        <div className="md:min-h-[85vh] text-white bg-blue-950/10 backdrop-blur-xl shadow-2xl md:p-6">
            <header className="container mx-auto py-3 md:py-8">
                <h1 className="text-3xl font-semibold tracking-tight text-center">User Management</h1>
            </header>
            <div className="flex flex-col md:hidden md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="inline-flex p-1">
                    <button
                        onClick={() => setActiveTab("subscriber")}
                        className={`px-4 py-2 rounded-md hover:cursor-pointer ${activeTab === "subscriber" ? "border-b-2 border-[#4180AD] text-[#4180AD] font-semibold" : "text-white"}`}
                    >
                        Subscriber
                    </button>
                    <button
                        onClick={() => setActiveTab("free")}
                        className={`px-4 py-2 rounded-md hover:cursor-pointer ${activeTab === "free" ? "border-b-2 border-[#4180AD] text-[#4180AD] font-semibold" : "text-white"}`}
                    >
                        Free Member
                    </button>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-[#4180AD] text-white px-4 py-2 hover:bg-[#4180add8] transition hover:cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Add User
                    </button>
                    <div className="relative flex-1 md:flex-none">
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by username or ID"
                            className="w-full md:w-80 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            <main className="container max-w-[88vw] md:max-w-full overflow-x-auto mx-auto pb-16">
                <div className="md:flex flex-col hidden md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="inline-flex p-1">
                        <button
                            onClick={() => setActiveTab("subscriber")}
                            className={`px-4 py-2 rounded-md hover:cursor-pointer ${activeTab === "subscriber" ? "border-b-2 border-[#4180AD] text-[#4180AD] font-semibold" : "text-white"}`}
                        >
                            Subscriber
                        </button>
                        <button
                            onClick={() => setActiveTab("free")}
                            className={`px-4 py-2 rounded-md hover:cursor-pointer ${activeTab === "free" ? "border-b-2 border-[#4180AD] text-[#4180AD] font-semibold" : "text-white"}`}
                        >
                            Free Member
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center gap-2 rounded-md bg-[#4180AD] text-white px-4 py-2 hover:bg-[#4180add8] transition hover:cursor-pointer"
                        >
                            <Plus className="h-4 w-4" />
                            Add User
                        </button>
                        <div className="relative flex-1 md:flex-none">
                            <input
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search by username or ID"
                                className="w-full md:w-80 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-700 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                >
                    <AddUserPage />
                </Modal>

                <section className="rounded-xl border border-gray-700 bg-gray-800/20 shadow min-w-5xl">
                    <div className="grid grid-cols-12 px-4 py-3 text-sm font-medium text-gray-300 bg-[#1A2137] ">
                        <div className="col-span-3 flex items-center gap-1 cursor-pointer" onClick={() => handleSort("id")}>
                            User ID{" "}
                            {sortConfig.key === "id" &&
                                (sortConfig.direction === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
                        </div>
                        <div className="col-span-4 flex items-center gap-1 cursor-pointer" onClick={() => handleSort("name")}>
                            Name{" "}
                            {sortConfig.key === "name" &&
                                (sortConfig.direction === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
                        </div>
                        <div className="col-span-3 flex items-center gap-1 cursor-pointer" onClick={() => handleSort("startDate")}>
                            Starting Date{" "}
                            {sortConfig.key === "startDate" &&
                                (sortConfig.direction === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
                        </div>
                        <div className="col-span-1">User Info</div>
                        <div className="col-span-1 text-right">Action</div>
                    </div>
                    <ul className="divide-y divide-gray-700 pb-20 overflow-auto h-[60vh]">
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((u, index) => (
                                <Row
                                    key={`${u.id}-${index}`}
                                    user={u}
                                    onEdit={(id, newName) =>
                                        setUsers(users.map((u) => (u.id === id ? { ...u, name: newName } : u)))
                                    }
                                    onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
                                />
                            ))
                        ) : (
                            <li className="px-4 py-10 text-center text-gray-400">No users found.</li>
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default UserManagement;
