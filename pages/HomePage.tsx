
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { News, Event } from '../types';
import { getNews, getEvents } from '../services/api';
import { BookOpenIcon, UserGroupIcon, AcademicCapIcon, ArrowRightIcon } from '../components/icons';

const Hero = () => (
    <div className="relative bg-brand-primary h-[60vh] md:h-[80vh] flex items-center justify-center text-white">
        {/* Background image is set here. The brightness filter ensures text is readable. */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://static.wixstatic.com/media/00e3a9_00e2bfd9f1e64c39870039012806b065~mv2.jpg')", filter: 'brightness(0.4)' }}></div>
        <div className="relative z-10 text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Excellence in Education</h1>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">Discover your potential at KBN University, a place for innovation, research, and growth.</p>
            <div className="space-x-4">
                <Link to="/admissions" className="bg-brand-secondary hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">Apply Now</Link>
                <a href="#" className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 backdrop-blur-sm">Virtual Tour</a>
            </div>
        </div>
    </div>
);

const QuickLinks = () => {
    const links = [
        { title: 'Admissions', icon: <AcademicCapIcon className="w-12 h-12 text-brand-secondary" />, href: '/admissions' },
        { title: 'Courses', icon: <BookOpenIcon className="w-12 h-12 text-brand-secondary" />, href: '/courses' },
        { title: 'Faculty', icon: <UserGroupIcon className="w-12 h-12 text-brand-secondary" />, href: '/faculty' },
    ];
    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {links.map(link => (
                        <Link key={link.title} to={link.href} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center">
                            {link.icon}
                            <h3 className="text-2xl font-bold mt-4 text-brand-primary">{link.title}</h3>
                            <p className="text-gray-600 mt-2">Find out more about our {link.title.toLowerCase()}.</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const NewsSection: React.FC = () => {
    const [news, setNews] = useState<News[]>([]);
    useEffect(() => {
        getNews(3).then(setNews);
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-brand-primary mb-12">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="p-6">
                                <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                                <h3 className="text-xl font-bold text-brand-dark mb-3">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.summary}</p>
                                <a href="#" className="font-semibold text-brand-secondary hover:text-brand-primary flex items-center space-x-1">
                                    <span>Read More</span>
                                    <ArrowRightIcon className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const EventsSection: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
        getEvents(3).then(setEvents);
    }, []);

    return (
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-brand-primary mb-12">Upcoming Events</h2>
                <div className="space-y-6 max-w-3xl mx-auto">
                    {events.map(event => (
                        <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex items-center space-x-6">
                            <div className="text-center bg-brand-secondary text-white p-4 rounded-lg">
                                <p className="text-sm font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</p>
                                <p className="text-3xl font-extrabold">{new Date(event.date).getDate()}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-brand-dark">{event.title}</h3>
                                <p className="text-gray-600 mt-1">{event.location}</p>
                                <p className="text-sm text-gray-500 mt-2">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Link to="/events" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition duration-300">View All Events</Link>
                </div>
            </div>
        </section>
    );
};

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <QuickLinks />
            <NewsSection />
            <EventsSection />
        </>
    );
};

export default HomePage;
