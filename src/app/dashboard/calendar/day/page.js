'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Menu, Bell, ChevronLeft, ChevronRight, Shield, Brain, Video,
    RotateCw, Plus, Home, Link as LinkIcon, Calendar, Clock, User
} from 'lucide-react';

export default function CalendarDayView() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex flex-col h-screen overflow-hidden">
            {/* Header */}
            <header id="header" className="flex items-center justify-between p-4 bg-white shadow-sm z-10">
                <button className="text-gray-500 hover:text-gray-800 transition-colors">
                    <Menu size={24} />
                </button>
                <div className="text-lg font-semibold text-gray-800">Calendar</div>
                <div className="flex items-center space-x-3">
                    <button className="text-gray-500 hover:text-gray-800 transition-colors relative">
                        <Bell size={24} />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </button>
                    <button className="text-gray-500 hover:text-gray-800 transition-colors">
                        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                            {/* Placeholder for avatar */}
                            <div className="w-full h-full bg-gray-300"></div>
                        </div>
                    </button>
                </div>
            </header>

            {/* Calendar Controls */}
            <div id="calendar-controls" className="px-4 py-3 bg-white border-b border-gray-200 z-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                        <button className="text-gray-500 hover:text-gray-800 transition-colors p-2">
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-lg font-semibold text-gray-800">January 2025</h2>
                        <button className="text-gray-500 hover:text-gray-800 transition-colors p-2">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <button className="text-primary-blue text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">Today</button>
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button className="flex-1 py-2 px-3 text-sm font-medium text-gray-800 bg-white rounded-md shadow-sm">Day</button>
                    <Link href="/dashboard/calendar/week" className="flex-1">
                        <button className="w-full py-2 px-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">Week</button>
                    </Link>
                    <Link href="/dashboard/calendar" className="flex-1">
                        <button className="w-full py-2 px-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">Month</button>
                    </Link>
                </div>
            </div>

            {/* Calendar Content */}
            <div id="calendar-content" className="flex-1 overflow-y-auto pb-24">
                {/* Date Header */}
                <div id="date-header" className="px-4 py-4 bg-light-blue border-b border-gray-200">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-800">15</div>
                        <div className="text-sm font-medium text-gray-500">Wednesday</div>
                    </div>
                </div>

                {/* Time Slots */}
                <div id="time-slots" className="px-4 bg-white">
                    {/* Morning */}
                    <div id="slot-9am" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">9:00 AM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-available-light border-l-4 border-available rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Available</div>
                                            <div className="text-xs text-gray-500">Open for meetings</div>
                                        </div>
                                        <div className="w-2 h-2 bg-available rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="slot-10am" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">10:00 AM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-busy-light border-l-4 border-busy rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Team Meeting</div>
                                            <div className="text-xs text-gray-500">Conference Room A</div>
                                        </div>
                                        <div className="w-2 h-2 bg-busy rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="slot-11am" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">11:00 AM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-negotiable-light border-l-4 border-negotiable rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Negotiable</div>
                                            <div className="text-xs text-gray-500">Can reschedule if needed</div>
                                        </div>
                                        <RotateCw className="text-negotiable" size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lunch */}
                    <div id="slot-12pm" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">12:00 PM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-light-blue border-l-4 border-primary-blue rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Protected Time</div>
                                            <div className="text-xs text-gray-500">Lunch break</div>
                                        </div>
                                        <Shield className="text-primary-blue" size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Afternoon */}
                    <div id="slot-1pm" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">1:00 PM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-available-light border-l-4 border-available rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Available</div>
                                            <div className="text-xs text-gray-500">Open for meetings</div>
                                        </div>
                                        <div className="w-2 h-2 bg-available rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="slot-2pm" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">2:00 PM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-busy-light border-l-4 border-busy rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Client Call</div>
                                            <div className="text-xs text-gray-500">Project review</div>
                                        </div>
                                        <Video className="text-busy" size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="slot-3pm" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">3:00 PM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-available-light border-l-4 border-available rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Available</div>
                                            <div className="text-xs text-gray-500">Open for meetings</div>
                                        </div>
                                        <div className="w-2 h-2 bg-available rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="slot-4pm" className="border-b border-gray-100 py-3">
                        <div className="flex items-center">
                            <div className="w-16 text-sm font-medium text-gray-500">4:00 PM</div>
                            <div className="flex-1 ml-4">
                                <div className="bg-light-blue border-l-4 border-primary-blue rounded-r-lg p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-semibold text-gray-800">Focus Time</div>
                                            <div className="text-xs text-gray-500">Deep work block</div>
                                        </div>
                                        <Brain className="text-primary-blue" size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-8"></div>
                </div>
            </div>

            {/* Floating Add Button */}
            <button id="add-button" className="fixed bottom-24 right-4 w-14 h-14 bg-primary-blue text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors z-20">
                <Plus size={24} />
            </button>

            {/* Bottom Navigation */}
            <nav id="bottom-nav" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
                <div className="flex">
                    <Link href="/dashboard" className="flex-1">
                        <button className="w-full py-3 flex flex-col items-center text-gray-500 hover:text-primary-blue transition-colors">
                            <Home size={20} className="mb-1" />
                            <span className="text-xs font-medium">Dashboard</span>
                        </button>
                    </Link>
                    <Link href="/dashboard/links" className="flex-1">
                        <button className="w-full py-3 flex flex-col items-center text-gray-500 hover:text-primary-blue transition-colors">
                            <LinkIcon size={20} className="mb-1" />
                            <span className="text-xs font-medium">Links</span>
                        </button>
                    </Link>
                    <Link href="/dashboard/calendar" className="flex-1">
                        <button className="w-full py-3 flex flex-col items-center text-primary-blue">
                            <Calendar size={20} className="mb-1" />
                            <span className="text-xs font-medium">Calendar</span>
                        </button>
                    </Link>
                    <Link href="/dashboard/requests" className="flex-1">
                        <button className="w-full py-3 flex flex-col items-center text-gray-500 hover:text-primary-blue transition-colors relative">
                            <Clock size={20} className="mb-1" />
                            <span className="text-xs font-medium">Requests</span>
                            <div className="absolute top-1 right-6 w-2 h-2 bg-red-500 rounded-full"></div>
                        </button>
                    </Link>
                    <Link href="/dashboard/settings/profile" className="flex-1">
                        <button className="w-full py-3 flex flex-col items-center text-gray-500 hover:text-primary-blue transition-colors">
                            <User size={20} className="mb-1" />
                            <span className="text-xs font-medium">Profile</span>
                        </button>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
