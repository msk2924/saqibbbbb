
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Faculty, Department } from '../types';
import { getFaculty, getDepartments } from '../services/api';

const FacultyCard: React.FC<{ faculty: Faculty }> = ({ faculty }) => (
    <Link to={`/faculty/${faculty.id}`} className="bg-white rounded-lg shadow-md overflow-hidden group text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <img src={faculty.photo} alt={faculty.name} className="w-full h-64 object-cover" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">{faculty.name}</h3>
            <p className="text-brand-secondary font-medium">{faculty.title}</p>
            <p className="text-gray-500 text-sm mt-2">{faculty.department}</p>
        </div>
    </Link>
);


const FacultyDirectoryPage: React.FC = () => {
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [facultyData, deptData] = await Promise.all([getFaculty(), getDepartments()]);
            setFaculty(facultyData);
            setDepartments(deptData);
            setLoading(false);
        };
        fetchData();
    }, []);

    const filteredFaculty = useMemo(() => {
        return faculty
            .filter(f => selectedDept === 'all' || f.department === selectedDept)
            .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [faculty, searchTerm, selectedDept]);

    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary">Our Faculty</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Meet the brilliant minds and dedicated educators who are shaping the future.</p>
                </div>

                <div className="sticky top-20 z-40 bg-brand-light/90 backdrop-blur-sm py-4 mb-8 rounded-lg shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by name..."
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
                                <option key={dept.id} value={dept.name}>{dept.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">Loading faculty...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredFaculty.map(f => (
                            <FacultyCard key={f.id} faculty={f} />
                        ))}
                    </div>
                )}
                 {filteredFaculty.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-700">No faculty members found matching your criteria.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default FacultyDirectoryPage;
