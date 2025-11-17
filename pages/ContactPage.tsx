
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
        // Simulate form submission
        setSubmitted(true);
    };

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-primary">Contact Us</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">We're here to help. Reach out with any questions or inquiries.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-brand-light p-8 rounded-lg">
                        {submitted ? (
                            <div className="text-center py-12">
                                <h2 className="text-2xl font-bold text-brand-primary">Thank You!</h2>
                                <p className="text-gray-700 mt-2">Your message has been sent. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" name="name" id="name" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" name="email" id="email" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                    <input type="text" name="subject" id="subject" required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea name="message" id="message" rows={5} required onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring-brand-secondary"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-brand-secondary text-white py-3 px-6 rounded-md font-semibold hover:bg-brand-primary transition-colors">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Contact Details & Map */}
                    <div>
                        <div className="space-y-4 mb-8">
                            <h3 className="text-2xl font-bold text-brand-primary">General Inquiries</h3>
                            <p className="text-gray-700"><strong>Phone:</strong> (123) 456-7890</p>
                            <p className="text-gray-700"><strong>Email:</strong> info@kbn-univ.edu</p>
                            <p className="text-gray-700"><strong>Address:</strong> 123 University Drive, Knowledge City, KN 45678</p>
                        </div>
                        <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500">Google Maps Embed Placeholder</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
