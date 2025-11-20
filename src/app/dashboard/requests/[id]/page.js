'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, MoreVertical, Calendar as CalendarIcon, CalendarPlus, MessageSquare
} from 'lucide-react';

export default function RequestDetail({ params }) {
    const [mounted, setMounted] = useState(false);
    const [selectedDay, setSelectedDay] = useState('today');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const request = {
        id: params?.id || '1',
        requesterName: 'Sarah Johnson',
        requesterEmail: 'sarah.johnson@company.com',
        requesterAvatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg',
        title: 'Project Planning Meeting',
        purpose: 'Need to discuss Q1 project timeline and resource allocation for the new marketing campaign.',
        duration: '60 minutes',
        priority: 'Medium Priority',
        message: 'Hi! I\'d love to schedule some time to go over the project details. I\'m flexible with timing and can work around your schedule. Looking forward to collaborating!'
    };

    const timeSlots = {
        today: [
            { time: '9:00 AM - 10:00 AM', status: 'available', color: 'available' },
            { time: '11:00 AM - 12:00 PM', status: 'available', color: 'available' },
            { time: '2:00 PM - 3:00 PM', status: 'negotiable', color: 'negotiable' },
            { time: '4:00 PM - 5:00 PM', status: 'available', color: 'available' },
        ],
        tomorrow: [
            { time: '10:00 AM - 11:00 AM', status: 'available', color: 'available' },
            { time: '1:00 PM - 2:00 PM', status: 'available', color: 'available' },
            { time: '3:00 PM - 4:00 PM', status: 'negotiable', color: 'negotiable' },
        ],
        thursday: [
            { time: '9:00 AM - 10:00 AM', status: 'available', color: 'available' },
            { time: '2:00 PM - 3:00 PM', status: 'available', color: 'available' },
        ]
    };

    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
        setShowConfirmModal(true);
    };

    return (
        <div className="bg-bg-gray min-h-screen">
            {/* Header */}
            <header id="header" className="bg-white border-b border-light-gray px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/dashboard/requests">
                        <button className="flex items-center text-gray-text hover:text-primary-dark transition-colors">
                            <ArrowLeft className="mr-3 text-lg" size={20} />
                            <span className="text-sm font-medium">Back</span>
                        </button>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-primary-blue rounded grid grid-cols-2 gap-0.5 p-1">
                            <div className="bg-white rounded-sm"></div>
                            <div className="bg-negotiable rounded-sm"></div>
                            <div className="bg-available rounded-sm"></div>
                            <div className="bg-busy rounded-sm"></div>
                        </div>
                        <span className="text-primary-dark font-semibold text-sm">SpareTime</span>
                    </div>
                    <button className="text-gray-text hover:text-primary-dark transition-colors p-2">
                        <MoreVertical className="text-lg" size={20} />
                    </button>
                </div>
            </header>

            {/* Request Details Section */}
            <section id="request-details" className="px-6 py-6">
                {/* Requester Info */}
                <div className="flex items-center space-x-4 mb-6">
                    <img src={request.requesterAvatar} alt="Requester" className="w-14 h-14 rounded-full shadow-card" />
                    <div>
                        <h2 className="text-lg font-semibold text-primary-dark">{request.requesterName}</h2>
                        <p className="text-sm text-gray-text">{request.requesterEmail}</p>
                    </div>
                </div>

                {/* Request Details Card */}
                <div className="bg-white rounded-xl p-5 mb-6 shadow-card border border-light-gray">
                    <div className="mb-5">
                        <h3 className="text-xs font-semibold text-gray-text uppercase tracking-wide mb-2">REQUEST</h3>
                        <p className="text-base font-medium text-primary-dark">{request.title}</p>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-xs font-semibold text-gray-text uppercase tracking-wide mb-2">PURPOSE</h3>
                        <p className="text-sm text-gray-text leading-relaxed">{request.purpose}</p>
                    </div>

                    <div className="mb-5">
                        <h3 className="text-xs font-semibold text-gray-text uppercase tracking-wide mb-2">DURATION</h3>
                        <p className="text-sm text-gray-text">{request.duration}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-negotiable rounded-full"></div>
                        <span className="text-sm text-gray-text font-medium">{request.priority}</span>
                    </div>
                </div>

                {/* Message */}
                <div className="mb-6">
                    <h3 className="text-xs font-semibold text-gray-text uppercase tracking-wide mb-3">MESSAGE</h3>
                    <div className="bg-white border border-light-gray rounded-xl p-4 shadow-card">
                        <p className="text-sm text-gray-text leading-relaxed">{request.message}</p>
                    </div>
                </div>
            </section>

            {/* Available Time Slots */}
            <section id="time-slots" className="px-6 pb-6">
                <h3 className="text-base font-semibold text-primary-dark mb-4">Available Time Slots</h3>

                {/* Date Tabs */}
                <div className="flex space-x-3 mb-5 overflow-x-auto">
                    <button
                        onClick={() => setSelectedDay('today')}
                        className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium shadow-card ${selectedDay === 'today'
                            ? 'bg-primary-blue text-white'
                            : 'border border-light-gray text-gray-text bg-white hover:bg-light-blue transition-colors'
                            }`}
                    >
                        Today, Jan 15
                    </button>
                    <button
                        onClick={() => setSelectedDay('tomorrow')}
                        className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium shadow-card ${selectedDay === 'tomorrow'
                            ? 'bg-primary-blue text-white'
                            : 'border border-light-gray text-gray-text bg-white hover:bg-light-blue transition-colors'
                            }`}
                    >
                        Tomorrow, Jan 16
                    </button>
                    <button
                        onClick={() => setSelectedDay('thursday')}
                        className={`flex-shrink-0 px-4 py-3 rounded-lg text-sm font-medium shadow-card ${selectedDay === 'thursday'
                            ? 'bg-primary-blue text-white'
                            : 'border border-light-gray text-gray-text bg-white hover:bg-light-blue transition-colors'
                            }`}
                    >
                        Thu, Jan 17
                    </button>
                </div>

                {/* Time Slots */}
                <div className="space-y-3">
                    {timeSlots[selectedDay].map((slot, index) => (
                        <div key={index} className="border border-light-gray bg-white rounded-xl p-4 flex items-center justify-between shadow-card hover:shadow-elevated transition-shadow">
                            <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 bg-${slot.color} rounded-full`}></div>
                                <div>
                                    <p className="text-sm font-medium text-primary-dark">{slot.time}</p>
                                    <p className={`text-xs text-${slot.color} font-medium capitalize`}>{slot.status}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleSelectSlot(slot)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${slot.status === 'available'
                                    ? 'bg-primary-blue text-white hover:bg-primary-dark'
                                    : 'border border-primary-blue text-primary-blue hover:bg-light-blue'
                                    }`}
                            >
                                {slot.status === 'available' ? 'SELECT' : 'REQUEST'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Alternative Options */}
            <section id="alternative-options" className="px-6 pb-6">
                <div className="border-t border-light-gray pt-6">
                    <h3 className="text-base font-semibold text-primary-dark mb-4">Can't find a good time?</h3>

                    <div className="space-y-3 mb-6">
                        <button className="w-full border border-light-gray text-gray-text py-3 px-4 rounded-xl text-sm font-medium bg-white flex items-center justify-center space-x-2 hover:bg-light-blue transition-colors shadow-card">
                            <CalendarPlus className="text-primary-blue" size={16} />
                            <span>SUGGEST ALTERNATIVE TIMES</span>
                        </button>

                        <button className="w-full border border-light-gray text-gray-text py-3 px-4 rounded-xl text-sm font-medium bg-white flex items-center justify-center space-x-2 hover:bg-light-blue transition-colors shadow-card">
                            <MessageSquare className="text-primary-blue" size={16} />
                            <span>SEND MESSAGE</span>
                        </button>
                    </div>

                    {/* Request Actions */}
                    <div className="space-y-3">
                        <button className="w-full bg-primary-blue text-white py-4 px-6 rounded-xl text-sm font-semibold shadow-elevated hover:bg-primary-dark transition-colors">
                            APPROVE REQUEST
                        </button>

                        <div className="flex space-x-3">
                            <button className="flex-1 border border-light-gray text-gray-text py-3 px-4 rounded-xl text-sm font-medium bg-white hover:bg-busy-light hover:text-busy transition-colors shadow-card">
                                DECLINE
                            </button>
                            <button className="flex-1 border border-light-gray text-gray-text py-3 px-4 rounded-xl text-sm font-medium bg-white hover:bg-negotiable-light hover:text-primary-dark transition-colors shadow-card">
                                SNOOZE
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div
                    id="confirmation-modal"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
                    onClick={() => setShowConfirmModal(false)}
                >
                    <div
                        className="bg-white rounded-t-2xl w-full max-w-sm mx-4 mb-0 shadow-elevated"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-primary-dark">Confirm Time Slot</h3>
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="text-gray-text hover:text-primary-dark transition-colors p-1"
                                >
                                    <span className="text-lg">×</span>
                                </button>
                            </div>

                            <div className="mb-6">
                                <div className="bg-bg-gray rounded-xl p-4 mb-4">
                                    <p className="text-sm text-gray-text mb-1">Meeting with {request.requesterName}</p>
                                    <p className="text-base font-medium text-primary-dark">
                                        Today, Jan 15 • {selectedSlot?.time}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-text mb-2">
                                        Add a message (optional)
                                    </label>
                                    <textarea
                                        className="w-full border border-light-gray rounded-xl px-4 py-3 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue resize-none"
                                        placeholder="Looking forward to our meeting..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full bg-primary-blue text-white py-3 px-6 rounded-xl text-sm font-semibold shadow-card hover:bg-primary-dark transition-colors">
                                    CONFIRM MEETING
                                </button>
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="w-full border border-light-gray text-gray-text py-3 px-6 rounded-xl text-sm font-medium bg-white hover:bg-light-blue transition-colors"
                                >
                                    CANCEL
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
