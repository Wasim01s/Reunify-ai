
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Reunify
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
                Meet your younger self. Upload two photos to create a timeless, AI-generated portrait.
            </p>
        </header>
    );
};
