'use client'
import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

export default function ImageUploader({ images, onImagesChange, maxFiles = 3 }) {
    const [dragging, setDragging] = useState(false)

    const handleFiles = (files) => {
        const remainingSlots = maxFiles - images.length
        if (remainingSlots <= 0) return

        const newFiles = Array.from(files)
            .slice(0, remainingSlots)
            .filter(file => file.type.startsWith('image/'))

        onImagesChange([...images, ...newFiles])
    }

    const onDragOver = useCallback((e) => {
        e.preventDefault()
        setDragging(true)
    }, [])

    const onDragLeave = useCallback((e) => {
        e.preventDefault()
        setDragging(false)
    }, [])

    const onDrop = useCallback((e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
    }, [images, maxFiles])

    const onFileInput = (e) => {
        handleFiles(e.target.files)
    }

    const removeImage = (index) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        onImagesChange(newImages)
    }

    // Helper to cleanup object URLs to avoid memory leaks could be added,
    // but for simple file previews this suffices for now. 
    // Ideally we'd use useEffect to revokeObjectURL.

    return (
        <div className="w-full">
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`
                    border-2 border-dashed rounded-xl p-8 text-center transition-all
                    ${dragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400 bg-white'}
                    ${images.length >= maxFiles ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
                `}
            >
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="image-upload"
                    onChange={onFileInput}
                    disabled={images.length >= maxFiles}
                />

                <label htmlFor="image-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-gray-900 font-semibold text-lg">Subir fotos</p>
                    <p className="text-gray-500 text-sm mt-1">Arrastrá o hacé clic para elegir (Máx {maxFiles})</p>
                </label>
            </div>

            {/* Previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                    {images.map((file, idx) => (
                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${idx}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-600 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
