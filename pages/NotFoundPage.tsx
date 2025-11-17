
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-8xl font-extrabold text-brand-secondary">404</h1>
                <h2 className="text-4xl font-bold text-brand-primary mt-4">Page Not Found</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-md">
                    Sorry, the page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <Link
                    to="/"
                    className="mt-8 bg-brand-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300"
                >
                    Go Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
