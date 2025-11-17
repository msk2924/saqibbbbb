
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course, Faculty } from '../types';
import { getCourseById, getFaculty } from '../services/api';

const CourseDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [course, setCourse] = useState<Course | null>(null);
    const [instructors, setInstructors] = useState<Faculty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true);
                const courseData = await getCourseById(id);
                setCourse(courseData || null);

                if (courseData) {
                    const allFaculty = await getFaculty();
                    const courseInstructors = allFaculty.filter(f => courseData.instructorIds.includes(f.id));
                    setInstructors(courseInstructors);
                }
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return <div className="text-center py-20">Loading course details...</div>;
    }

    if (!course) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">Course Not Found</h1>
                <Link to="/courses" className="text-brand-secondary hover:underline mt-4 inline-block">Back to Catalog</Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <p className="text-brand-secondary font-semibold">{course.code} &bull; {course.department}</p>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary mt-2">{course.title}</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
                        <div className="bg-brand-light p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Credits</p>
                            <p className="text-2xl font-bold text-brand-primary">{course.credits}</p>
                        </div>
                        <div className="bg-brand-light p-4 rounded-lg col-span-2">
                            <p className="text-sm text-gray-600">Prerequisites</p>
                            <p className="text-lg font-bold text-brand-primary">{course.prerequisites.join(', ')}</p>
                        </div>
                    </div>

                    <section id="description" className="mb-10">
                        <h2 className="text-3xl font-bold text-brand-primary border-b-2 border-brand-secondary pb-2 mb-4">Course Description</h2>
                        <p className="text-gray-700 leading-relaxed">{course.description}</p>
                    </section>

                    <section id="instructors">
                        <h2 className="text-3xl font-bold text-brand-primary border-b-2 border-brand-secondary pb-2 mb-4">Instructors</h2>
                        <div className="space-y-4">
                            {instructors.length > 0 ? (
                                instructors.map(instructor => (
                                    <Link key={instructor.id} to={`/faculty/${instructor.id}`} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                        <img src={instructor.photo} alt={instructor.name} className="w-16 h-16 rounded-full object-cover"/>
                                        <div>
                                            <p className="font-bold text-lg text-brand-dark">{instructor.name}</p>
                                            <p className="text-gray-600">{instructor.title}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-600">Instructor information is not available.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
