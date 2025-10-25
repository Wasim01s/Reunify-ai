import React from 'react';
import { Spinner } from './Spinner';

interface ResultDisplayProps {
    isLoading: boolean;
    generatedImage: string | null;
    error: string | null;
}

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error }) => {
    return (
        <div className="w-full min-h-[400px] bg-gray-100 rounded-lg flex flex-col justify-center items-center p-4 border border-gray-200">
            {isLoading && (
                <div className="text-center text-gray-600">
                    <Spinner />
                    <p className="mt-4 text-lg font-medium">Creating your special moment...</p>
                    <p className="text-sm text-gray-500">This may take a moment. Please wait.</p>
                </div>
            )}

            {error && (
                <div className="text-center text-red-600 bg-red-50 p-6 rounded-lg">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 font-semibold">An Error Occurred</p>
                    <p className="mt-1 text-sm">{error}</p>
                </div>
            )}
            
            {!isLoading && !generatedImage && !error && (
                 <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-4 text-lg">Your generated image will appear here</p>
                </div>
            )}

            {generatedImage && (
                <div className="w-full text-center">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Your Reunion Portrait</h3>
                    <img src={generatedImage} alt="Generated reunion" className="rounded-lg shadow-xl mx-auto max-w-full max-h-[60vh] object-contain" />
                    <a
                        href={generatedImage}
                        download="reunify-portrait.png"
                        className="mt-8 inline-flex items-center justify-center gap-3 bg-indigo-600 text-white font-semibold text-lg py-4 px-8 rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <DownloadIcon />
                        <span>Download Image</span>
                    </a>
                </div>
            )}
        </div>
    );
};
