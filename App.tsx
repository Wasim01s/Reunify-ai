
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { generateReunificationImage } from './services/geminiService';

const App: React.FC = () => {
    const [childPhoto, setChildPhoto] = useState<File | null>(null);
    const [adultPhoto, setAdultPhoto] = useState<File | null>(null);
    const [childPhotoPreview, setChildPhotoPreview] = useState<string | null>(null);
    const [adultPhotoPreview, setAdultPhotoPreview] = useState<string | null>(null);

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'child' | 'adult') => {
        const file = e.target.files?.[0];
        if (file) {
            const setFile = type === 'child' ? setChildPhoto : setAdultPhoto;
            const setPreview = type === 'child' ? setChildPhotoPreview : setAdultPhotoPreview;
            
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleGenerateClick = useCallback(async () => {
        if (!childPhoto || !adultPhoto) {
            setError("Please upload both photos before generating.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const imageUrl = await generateReunificationImage(childPhoto, adultPhoto);
            setGeneratedImage(imageUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [childPhoto, adultPhoto]);
    
    const isButtonDisabled = !childPhoto || !adultPhoto || isLoading;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Header />

                <main className="mt-8 bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <ImageUploader 
                            id="child-photo"
                            label="Your Childhood Photo"
                            onFileChange={(e) => handleFileChange(e, 'child')}
                            previewUrl={childPhotoPreview}
                        />
                        <ImageUploader 
                            id="adult-photo"
                            label="Your Recent Photo"
                            onFileChange={(e) => handleFileChange(e, 'adult')}
                            previewUrl={adultPhotoPreview}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <button
                            onClick={handleGenerateClick}
                            disabled={isButtonDisabled}
                            className={`px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out
                                ${isButtonDisabled 
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform hover:scale-105'
                                }`}
                        >
                            {isLoading ? 'Creating Magic...' : 'Reunify Photos'}
                        </button>
                    </div>

                    <div className="mt-8">
                       <ResultDisplay 
                            isLoading={isLoading}
                            generatedImage={generatedImage}
                            error={error}
                       />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;
