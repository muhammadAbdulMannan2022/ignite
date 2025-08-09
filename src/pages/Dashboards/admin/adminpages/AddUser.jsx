"use client"
import { useState } from "react"
import { Link } from "react-router"
import { ArrowLeft, ImageIcon, Trash } from "lucide-react"

export default function AddUserPage() {
    const [newUser, setNewUser] = useState({
        name: "",
        phoneNumber: "",
        subscriptionPlan: "",
        profession: "",
        photoFile: null,
        photoFileName: "",
    })

    const handleAddUser = (e) => {
        e.preventDefault()
        console.log("New User Data:", newUser)
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewUser((prev) => ({
                ...prev,
                photoFile: file,
                photoFileName: file.name,
            }))
        }
    }

    const handleRemovePhoto = () => {
        setNewUser((prev) => ({
            ...prev,
            photoFile: null,
            photoFileName: "",
        }))
    }

    return (
        <div className="flex flex-col items-center p-4 text-white">
            <div className="max-w-2xl w-xl space-y-6 rounded-lg p-6 shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between">

                    <h1 className="flex-1 text-center text-2xl font-bold text-[#D3DEEC]">Add User</h1>
                    <div className="w-6" /> {/* Spacer to balance the back arrow */}
                </div>

                {/* Form */}
                <form onSubmit={handleAddUser} className="space-y-6">
                    {/* Name of the user */}
                    <div>
                        <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                            Name of the user
                        </label>
                        <input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            placeholder="Anus Kumar"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Phone number */}
                    <div>
                        <label htmlFor="phone-number" className="block text-sm text-gray-400 mb-1">
                            Phone number
                        </label>
                        <input
                            id="phone-number"
                            value={newUser.phoneNumber}
                            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
                            placeholder="01775551325"
                            type="tel"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    {/* Subscription Plan */}
                    <div>
                        <label htmlFor="subscription-plan" className="block text-sm text-gray-400 mb-1">
                            Subscription Plan
                        </label>
                        <select
                            id="subscription-plan"
                            value={newUser.subscriptionPlan}
                            onChange={(e) => setNewUser({ ...newUser, subscriptionPlan: e.target.value })}
                            className="w-full rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="" disabled>Select One</option>
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                            <option value="enterprise">Enterprise</option>
                        </select>
                    </div>

                    {/* Profession */}
                    <div>
                        <label htmlFor="profession" className="block text-sm text-gray-400 mb-1">
                            Profession
                        </label>
                        <input
                            id="profession"
                            value={newUser.profession}
                            onChange={(e) => setNewUser({ ...newUser, profession: e.target.value })}
                            placeholder="Frontend Developer"
                            className="w-full rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4180AD]"
                        />
                    </div>

                    {/* Upload your photo */}
                    <div>
                        <label htmlFor="photo-upload" className="block text-sm text-gray-400 mb-1">
                            Upload your photo
                        </label>
                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="photo-upload"
                                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-white hover:bg-gray-600"
                            >
                                <ImageIcon className="h-5 w-5 text-gray-400" />
                                <span>{newUser.photoFileName || "Choose file"}</span>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                            </label>
                            {newUser.photoFile && (
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    className="text-gray-400 hover:bg-gray-700 hover:text-red-500 p-2 rounded-md"
                                >
                                    <Trash className="h-5 w-5" />
                                    <span className="sr-only">Remove photo</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Done Button */}
                    <button
                        type="submit"
                        className="w-full rounded-md bg-[#4180AD] py-3 text-lg font-semibold text-white hover:bg-[#4180add7] focus:outline-none focus:ring-2 focus:ring-[#4180AD] focus:ring-offset-1 focus:ring-offset-[#4180AD] hover:cursor-pointer"
                    >
                        Done
                    </button>
                </form>
            </div>
        </div>
    )
}