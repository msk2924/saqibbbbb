
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, LinkedInIcon, GlobeIcon } from './icons';

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 mb-6 md:mb-0">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <BookOpenIcon className="w-8 h-8 text-brand-secondary" />
                            <span className="text-2xl font-bold">KBN University</span>
                        </Link>
                        <p className="text-gray-400 max-w-sm">
                            Fostering innovation and knowledge for a better future. Join a community of learners and leaders.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/admissions" className="text-gray-400 hover:text-white">Admissions</Link></li>
                            <li><Link to="/courses" className="text-gray-400 hover:text-white">Course Catalog</Link></li>
                            <li><Link to="/faculty" className="text-gray-400 hover:text-white">Faculty Directory</Link></li>
                            <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Portals</h3>
                        <ul className="space-y-2">
                           <li><Link to="/student-portal" className="text-gray-400 hover:text-white">Student Portal</Link></li>
                           <li><Link to="/faculty-portal" className="text-gray-400 hover:text-white">Faculty Portal</Link></li>
                           <li><a href="#" className="text-gray-400 hover:text-white">Library</a></li>
                           <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Contact Us</h3>
                        <address className="not-italic text-gray-400 space-y-2">
                            <p>123 University Drive</p>
                            <p>Knowledge City, KN 45678</p>
                            <p>Email: <a href="mailto:info@kbn-univ.edu" className="hover:text-white">info@kbn-univ.edu</a></p>
                            <p>Phone: <a href="tel:+11234567890" className="hover:text-white">(123) 456-7890</a></p>
                        </address>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 sm:mb-0">
                        &copy; {new Date().getFullYear()} KBN University. All Rights Reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white"><LinkedInIcon className="w-6 h-6"/></a>
                        <a href="#" className="text-gray-400 hover:text-white"><GlobeIcon className="w-6 h-6"/></a>
                        {/* Add more social icons here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
