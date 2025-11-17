
import React from 'react';
import { Link } from 'react-router-dom';

const FacultyPortalPage: React.FC = () => {
    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[60vh]">
                <div className="text-center bg-white p-12 rounded-lg shadow-xl max-w-md w-full">
                    <h1 className="text-3xl font-extrabold text-brand-primary">Faculty Portal</h1>
                    <p className="text-gray-600 mt-4 mb-6">Manage your courses, rosters, and research materials.</p>
                    
                    <form className="space-y-4">
                         <div>
                            <label className="sr-only">Email</label>
                            <input type="email" placeholder="Faculty Email" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-secondary focus:border-brand-secondary transition" />
                        </div>
                         <div>
                            <label className="sr-only">Password</label>
                            <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-secondary focus:border-brand-secondary transition" />
                        </div>
                        <button type="button" className="w-full bg-brand-secondary text-white py-3 rounded-md font-semibold hover:bg-brand-primary transition-colors">
                            Sign In
                        </button>
                    </form>
                    
                    <p className="text-sm text-gray-500 mt-4">
                        This is a placeholder page. Full portal functionality is under development.
                    </p>
                    <Link to="/" className="text-brand-secondary hover:underline mt-6 inline-block">
                        &larr; Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FacultyPortalPage;
