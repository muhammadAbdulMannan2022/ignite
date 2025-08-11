import React, { useState, useRef, useCallback } from 'react';
import { Upload, Check } from 'lucide-react';

export const FileUploadModal = ({
    onUploadComplete,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            setSelectedFiles(files.map(file => ({
                file,
                status: 'selected',
            })));
        }
    }, []);

    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setSelectedFiles(files.map(file => ({
                file,
                status: 'selected',
            })));
        }
    };

    const handleUpload = async () => {
        setIsUploading(true);

        // Simulate upload process
        await new Promise(resolve => setTimeout(resolve, 1000));

        setSelectedFiles(prev =>
            prev.map(file => ({ ...file, status: 'completed' }))
        );

        setIsUploading(false);
        onUploadComplete?.(selectedFiles.map(f => f.file));
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (file) => {
        const type = file.type;
        if (type.startsWith('image/')) return '🖼️';
        if (type.startsWith('video/')) return '🎥';
        if (type.startsWith('audio/')) return '🎵';
        if (type.includes('pdf')) return '📄';
        if (type.includes('word')) return '📝';
        if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
        if (type.includes('zip') || type.includes('rar')) return '📦';
        return '📄';
    };

    return (
        <div className="w-full bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-700">
                <div className="flex items-center space-x-4 justify-center w-full">
                    <h2 className="text-xl font-semibold text-white">
                        Enrich your Knowledge base
                    </h2>
                </div>
            </div>

            {/* Content */}
            <div className="p-8">
                {selectedFiles.length === 0 ? (
                    <>
                        {/* Upload Zone */}
                        <div
                            className={`relative border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${isDragOver
                                ? 'border-purple-400 bg-purple-400 bg-opacity-10'
                                : 'border-slate-600 hover:border-purple-500'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="mb-6">
                                <div className="relative inline-block">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-800/20 bg-opacity-20 flex items-center justify-center">
                                        <Upload className="w-10 h-10 text-purple-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-lg text-gray-300">
                                    Drag & drop files or{' '}
                                    <button
                                        onClick={handleFileSelect}
                                        className="text-purple-400 hover:text-purple-300 underline font-medium"
                                    >
                                        Browse
                                    </button>
                                </p>
                                <p className="text-sm text-gray-500">
                                    Support for any file type
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    /* File List */
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-white">
                                Selected Files ({selectedFiles.length})
                            </h3>
                            <button
                                onClick={() => setSelectedFiles([])}
                                className="text-sm text-gray-400 hover:text-white hover:cursor-pointer"
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-3">
                            {selectedFiles.map((selectedFile, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg"
                                >
                                    <div className="text-2xl">
                                        {getFileIcon(selectedFile.file)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">
                                            {selectedFile.file.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {formatFileSize(selectedFile.file.size)}
                                        </p>
                                    </div>

                                    {selectedFile.status === 'completed' && (
                                        <div className="flex items-center space-x-2 text-green-400">
                                            <Check className="w-4 h-4" />
                                            <span className="text-xs">Completed</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Upload Button */}
                        <div className="flex justify-center pt-4 border-t border-slate-700">
                            <button
                                onClick={handleUpload}
                                disabled={isUploading}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 text-sm"
                            >
                                {isUploading ? 'UPLOADING...' : 'UPLOAD FILES'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                    accept="*/*"
                />
            </div>
        </div>
    );
};