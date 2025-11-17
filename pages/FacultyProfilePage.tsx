
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Faculty } from '../types';
import { getFacultyById } from '../services/api';
import { LinkedInIcon, GlobeIcon } from '../components/icons';

const FacultyProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [faculty, setFaculty] = useState<Faculty | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getFacultyById(id).then(data => {
                setFaculty(data || null);
                setLoading(false);
            });
        }
    }, [id]);

    if (loading) {
        return <div className="text-center py-20">Loading profile...</div>;
    }

    if (!faculty) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Faculty Member Not Found</h1>
                <Link to="/faculty" className="text-brand-secondary hover:underline mt-4 inline-block">Back to Directory</Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Left Column - Photo and Contact */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <img src={faculty.photo} alt={faculty.name} className="w-full rounded-lg shadow-2xl aspect-square object-cover" />
                            <div className="mt-6 bg-brand-light p-6 rounded-lg">
                                <h3 className="text-xl font-bold text-brand-primary mb-4">Contact Information</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>Email:</strong> <a href={`mailto:${faculty.email}`} className="text-brand-secondary hover:underline">{faculty.email}</a></p>
                                    <p><strong>Phone:</strong> {faculty.phone}</p>
                                    <p><strong>Office:</strong> {faculty.office}</p>
                                    <p><strong>Office Hours:</strong> {faculty.office_hours}</p>
                                </div>
                                <div className="flex space-x-4 mt-6">
                                    {faculty.social.linkedin && <a href={faculty.social.linkedin} className="text-gray-500 hover:text-brand-primary"><LinkedInIcon className="w-6 h-6"/></a>}
                                    {faculty.social.google_scholar && <a href={faculty.social.google_scholar} className="text-gray-500 hover:text-brand-primary"><GlobeIcon className="w-6 h-6"/></a>}
                                    {faculty.social.orcid && <a href={faculty.social.orcid} className="text-gray-500 hover:text-brand-primary">ORCID</a>}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Column - Bio, Research, Publications */}
                    <main className="lg:col-span-2">
                        <div className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary">{faculty.name}</h1>
                            <p className="text-2xl text-brand-secondary mt-1">{faculty.title}</p>
                            <p className="text-lg text-gray-600 mt-1">{faculty.department}</p>
                        </div>

                        <section id="bio" className="mb-10">
                            <h2 className="text-3xl font-bold text-brand-primary border-b-2 border-brand-secondary pb-2 mb-4">Biography</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faculty.bio}</p>
                        </section>

                        <section id="research" className="mb-10">
                            <h2 className="text-3xl font-bold text-brand-primary border-b-2 border-brand-secondary pb-2 mb-4">Research Areas</h2>
                            <div className="flex flex-wrap gap-2">
                                {faculty.research_areas.map(area => (
                                    <span key={area} className="bg-brand-light text-brand-primary text-sm font-semibold px-3 py-1 rounded-full">{area}</span>
                                ))}
                            </div>
                        </section>

                        <section id="publications">
                            <h2 className="text-3xl font-bold text-brand-primary border-b-2 border-brand-secondary pb-2 mb-4">Selected Publications</h2>
                            {faculty.publications.length > 0 ? (
                                <ul className="space-y-4">
                                    {faculty.publications.map((pub, index) => (
                                        <li key={index} className="bg-gray-50 p-4 rounded-md">
                                            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-dark hover:text-brand-secondary">{pub.title}</a>
                                            <p className="text-sm text-gray-500">({pub.year})</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-600">No publications listed.</p>
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default FacultyProfilePage;
