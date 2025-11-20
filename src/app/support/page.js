'use client';

import { useState } from 'react';
import { Mail, MessageSquare, Book, Send } from 'lucide-react';

export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send the form data to a backend
        alert('Thank you for contacting us! We\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6e92a0] to-[#36454c] text-white py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Support Center</h1>
                    <p className="text-gray-100 text-lg">We're here to help! Get in touch with us.</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Quick Help Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Book className="text-blue-600" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Documentation</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Browse our comprehensive guides and tutorials to get the most out of SpareTime.
                        </p>
                        <a href="#" className="text-[#6e92a0] hover:text-[#36454c] font-semibold text-sm">
                            View Docs →
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <MessageSquare className="text-green-600" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Forum</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Join our community to ask questions and share tips with other users.
                        </p>
                        <a href="#" className="text-[#6e92a0] hover:text-[#36454c] font-semibold text-sm">
                            Visit Forum →
                        </a>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Mail className="text-purple-600" size={24} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Send us an email and we'll respond within 24 hours.
                        </p>
                        <a href="mailto:support@sparetime.me" className="text-[#6e92a0] hover:text-[#36454c] font-semibold text-sm">
                            support@sparetime.me →
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6e92a0] focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6e92a0] focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6e92a0] focus:border-transparent"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6e92a0] focus:border-transparent resize-none"
                                    placeholder="Tell us more about your question or issue..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#6e92a0] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#36454c] transition-colors flex items-center justify-center"
                            >
                                <Send className="mr-2" size={18} />
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">How do I create a scheduling link?</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Go to the Links page from your dashboard, click "Create New Link", fill in your preferences
                                        for availability, duration, and other settings, then save. You'll get a shareable link you
                                        can send to anyone.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Can I connect multiple calendars?</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Yes! You can connect Google Calendar, Apple Calendar, and Outlook Calendar. Go to Settings →
                                        Privacy & Security → Connected Apps to manage your calendar connections.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">What is Protected Time?</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Protected Time allows you to block out periods in your calendar that should never be available
                                        for scheduling, such as personal time, focus hours, or recurring commitments.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">How do I handle time requests?</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        When someone requests a meeting time through your link, you'll receive a notification. Go to
                                        the Requests page to accept, propose an alternative time, or decline the request.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Is my calendar data secure?</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Absolutely. We use industry-standard encryption for all data transmission and storage. Your
                                        calendar data is encrypted both in transit and at rest. Read our Privacy Policy for more details.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h3 className="font-semibold text-gray-800 mb-4">Other Ways to Reach Us</h3>
                            <div className="space-y-3 text-sm">
                                <p className="text-gray-600">
                                    <strong className="text-gray-800">Email:</strong> support@sparetime.me
                                </p>
                                <p className="text-gray-600">
                                    <strong className="text-gray-800">Response Time:</strong> Within 24 hours
                                </p>
                                <p className="text-gray-600">
                                    <strong className="text-gray-800">Business Hours:</strong> Mon-Fri, 9AM-6PM PST
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="mt-12 text-center">
                    <a href="/" className="text-[#6e92a0] hover:text-[#36454c] font-semibold">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
