
import React, { useState } from 'react';

const steps = ["Personal Info", "Qualifications", "Review & Submit"];

const AdmissionsPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dob: '',
        address: '',
        highSchool: '',
        graduationYear: '',
        gpa: '',
        program: 'cs',
        essay: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would normally call an API service
        console.log("Form submitted:", formData);
        // Simulate API call
        await new Promise(res => setTimeout(res, 1000));
        setReferenceNumber(`KBN-${Date.now()}`);
        setIsSubmitted(true);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-brand-dark">Personal Information</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-brand-dark">Academic Qualifications</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">High School / Previous Institution</label>
                            <input type="text" name="highSchool" value={formData.highSchool} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Program of Interest</label>
                            <select name="program" value={formData.program} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary">
                                <option value="cs">B.S. in Computer Science</option>
                                <option value="phy">B.S. in Physics</option>
                                <option value="bus">B.A. in Business Administration</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Personal Essay</label>
                            <textarea name="essay" value={formData.essay} onChange={handleChange} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" placeholder="Tell us why you want to join KBN University..."></textarea>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3 className="text-xl font-semibold text-brand-dark mb-4">Review Your Application</h3>
                        <div className="space-y-2 bg-gray-50 p-4 rounded-md">
                           <p><strong>Full Name:</strong> {formData.fullName}</p>
                           <p><strong>Email:</strong> {formData.email}</p>
                           <p><strong>Date of Birth:</strong> {formData.dob}</p>
                           <p><strong>Institution:</strong> {formData.highSchool}</p>
                           <p><strong>Program:</strong> {formData.program === 'cs' ? 'Computer Science' : formData.program === 'phy' ? 'Physics' : 'Business'}</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-4">Please review your information carefully. Once submitted, changes cannot be made.</p>
                    </div>
                );
            default: return null;
        }
    };
    
    if (isSubmitted) {
        return (
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-4xl font-extrabold text-brand-primary">Application Submitted!</h1>
                <p className="mt-4 text-lg text-gray-700">Thank you for applying to KBN University.</p>
                <p className="mt-2 text-gray-600">Your application reference number is: <strong className="text-brand-dark">{referenceNumber}</strong></p>
                <p className="mt-2 text-gray-600">You will receive a confirmation email shortly with next steps.</p>
             </div>
        );
    }

    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary">Apply to KBN University</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Take the next step in your academic journey. We're excited to learn more about you.</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Stepper */}
                    <div className="mb-8">
                        <div className="flex items-center">
                            {steps.map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className="flex items-center relative">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentStep >= index ? 'bg-brand-secondary text-white' : 'bg-gray-300 text-gray-600'}`}>
                                            {index + 1}
                                        </div>
                                        <p className={`absolute top-12 w-32 text-center text-sm ${currentStep >= index ? 'text-brand-dark font-semibold' : 'text-gray-500'}`}>{step}</p>
                                    </div>
                                    {index < steps.length - 1 && <div className={`flex-auto border-t-2 transition-colors ${currentStep > index ? 'border-brand-secondary' : 'border-gray-300'}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <form onSubmit={handleSubmit}>
                            {renderStepContent()}
                            <div className="mt-8 flex justify-between">
                                <button type="button" onClick={prevStep} disabled={currentStep === 0} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Back
                                </button>
                                {currentStep < steps.length - 1 ? (
                                    <button type="button" onClick={nextStep} className="bg-brand-secondary text-white px-6 py-2 rounded-md font-semibold hover:bg-brand-primary">
                                        Next
                                    </button>
                                ) : (
                                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700">
                                        Submit Application
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdmissionsPage;
