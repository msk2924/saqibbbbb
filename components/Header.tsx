
import React, { useState, useEffect } from 'react';
import { HashRouter, Link, NavLink } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon } from './icons';

const navLinks = [
    { name: 'Admissions', href: '/admissions' },
    { name: 'Courses', href: '/courses' },
    { name: 'Faculty', href: '/faculty' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeLinkStyle = {
      color: '#3B82F6',
      fontWeight: '600',
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2 text-brand-primary hover:text-brand-secondary transition">
                            <BookOpenIcon className="w-8 h-8" />
                            <span className="text-2xl font-bold">KBN University</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.name} 
                                to={link.href}
                                style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                                className="text-gray-600 hover:text-brand-secondary font-medium transition-colors"
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                    
                    <div className="hidden md:flex items-center space-x-4">
                         <Link to="/student-portal" className="text-gray-600 hover:text-brand-secondary text-sm font-medium">Student Portal</Link>
                         <Link to="/admissions" className="bg-brand-secondary text-white px-4 py-2 rounded-md font-semibold hover:bg-brand-primary transition-colors">
                            Apply Now
                         </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-brand-primary">
                            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-lg`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-brand-light hover:text-brand-secondary"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                     <div className="border-t border-gray-200 my-2"></div>
                     <Link to="/student-portal" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-brand-light hover:text-brand-secondary">
                        Student Portal
                     </Link>
                     <Link to="/admissions" onClick={() => setIsOpen(false)} className="block w-full text-left mt-2 px-4 py-3 bg-brand-secondary text-white rounded-md font-semibold hover:bg-brand-primary transition-colors">
                        Apply Now
                     </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
