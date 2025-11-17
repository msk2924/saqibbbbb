
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Course, Department } from '../types';
import { getCourses, getDepartments } from '../services/api';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-brand-primary mb-2 pr-4">{course.title}</h3>
            <span className="text-sm font-semibold bg-brand-light text-brand-primary px-2 py-1 rounded-full whitespace-nowrap">{course.code}</span>
        </div>
        <p className="text-brand-secondary font-medium mb-3">{course.department}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{course.description}</p>
        <Link to={`/courses/${course.id}`} className="font-semibold text-brand-secondary hover:text-brand-primary">View Details &rarr;</Link>
    </div>
);

const CoursesPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [courseData, deptData] = await Promise.all([getCourses(), getDepartments()]);
            setCourses(courseData);
            setDepartments(deptData);
            setLoading(false);
        };
        fetchData();
    }, []);
    
    const filteredCourses = useMemo(() => {
        return courses
            .filter(c => selectedDept === 'all' || c.department === departments.find(d => d.id === selectedDept)?.name)
            .filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [courses, searchTerm, selectedDept, departments]);

    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary">Course Catalog</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Explore our wide range of programs and find the perfect path for your academic career.</p>
                </div>

                <div className="sticky top-20 z-40 bg-brand-light/90 backdrop-blur-sm py-4 mb-8 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by course name or code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-2/3 px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-secondary focus:border-brand-secondary transition"
                        />
                        <select
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                            className="w-full md:w-1/3 px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-secondary focus:border-brand-secondary transition bg-white"
                        >
                            <option value="all">All Departments</option>
                            {departments.map(dept => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                     <div className="text-center py-12">
                        <p className="text-lg text-gray-600">Loading courses...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                )}
                {filteredCourses.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-700">No courses found matching your criteria.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default CoursesPage;
