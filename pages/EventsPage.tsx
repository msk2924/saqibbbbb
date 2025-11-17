
import React, { useState, useEffect } from 'react';
import { Event } from '../types';
import { getEvents } from '../services/api';

const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="text-center bg-brand-secondary text-white p-4 rounded-lg w-full md:w-auto">
            <p className="text-lg font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</p>
            <p className="text-4xl font-extrabold">{new Date(event.date).getDate()}</p>
            <p className="text-sm">{new Date(event.date).getFullYear()}</p>
        </div>
        <div className="flex-grow">
            <h3 className="text-2xl font-bold text-brand-dark">{event.title}</h3>
            <p className="text-gray-600 mt-1">
                <span className="font-semibold">{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span> at {event.location}
            </p>
            <p className="text-gray-700 mt-3">{event.description}</p>
        </div>
    </div>
);

const EventsPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            const eventData = await getEvents(20); // Get more events for the dedicated page
            setEvents(eventData);
            setLoading(false);
        };
        fetchEvents();
    }, []);

    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary">University Events</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Stay connected with the KBN community. Find lectures, workshops, and social gatherings.</p>
                </div>
                
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">Loading events...</p>
                    </div>
                ) : (
                    <div className="space-y-8 max-w-4xl mx-auto">
                        {events.length > 0 ? events.map(event => (
                            <EventCard key={event.id} event={event} />
                        )) : (
                            <p className="text-center text-xl text-gray-700 py-12">No upcoming events found. Please check back later.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;
