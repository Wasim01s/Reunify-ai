
import React from 'react';

interface ImageUploaderProps {
    id: string;
    label: string;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrl: string | null;
}

const CameraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, onFileChange, previewUrl }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 text-center mb-2">{label}</label>
            <div className="mt-1">
                <label 
                    htmlFor={id} 
                    className="relative flex justify-center items-center w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-500 hover:bg-gray-50 transition-colors duration-200"
                >
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                        <div className="text-center p-4">
                            <CameraIcon />
                            <p className="mt-2 text-sm text-gray-600">
                                Click to upload an image
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
                        </div>
                    )}
                    <input id={id} name={id} type="file" className="sr-only" accept="image/*" onChange={onFileChange} />
                </label>
            </div>
        </div>
    );
};
