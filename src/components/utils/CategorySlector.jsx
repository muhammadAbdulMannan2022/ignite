import React, { useState } from 'react';

const CategorySelector = ({ changeCategory, id }) => {
    const [selectedCategory, setSelectedCategory] = useState('Select One');

    const categories = [
        'Spirituality',
        'Energy',
        'Naturopathy',
        'Sciences',
        'Equity',
        'Singularity'
    ];

    return (
        <div className="flex flex-col items-center rounded-2xl justify-center py-10 bg-gray-900 text-[#D3DEEC]">
            <h2 className="text-2xl mb-6">Select category</h2>
            <div className='w-full items-center justify-center  px-4 md:px-14'>
                <div className="relative w-full flex flex-col py-10">
                    <label htmlFor="selector" className='text-sm'>Categorize</label>
                    <select
                        id='selector'
                        className="w-full p-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="Select One" disabled>Select One</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
                <button
                    className="mt-6 px-6 py-3 bg-[#4180AD] hover:bg-[#4180AD] w-full rounded-lg text-white font-semibold hover:cursor-pointer"
                    onClick={() => {
                        if (selectedCategory !== "Select One" && selectedCategory) {
                            changeCategory?.(selectedCategory, id)
                        }
                    }}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default CategorySelector;