'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Bell, Settings, CalendarCheck, ChevronLeft, ChevronRight,
    Sun, Moon, Plus, Shield, Clock, Link as LinkIcon, ChartPie, ChartLine,
    TrendingUp, Handshake, Inbox, Calendar, User
} from 'lucide-react';

export default function CalendarWeekView() {
    const [mounted, setMounted] = useState(false);
    const [selectedDay, setSelectedDay] = useState(25);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20">
            {/* Header Section */}
            <div id="header" className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Link href="/dashboard">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ArrowLeft className="text-gray-600 text-lg" />
                                </button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">My Calendar</h1>
                                <p className="text-xs text-gray-500">Manage your availability</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                                <Bell className="text-gray-600" size={20} />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Settings className="text-gray-600" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Banner */}
            <div id="stats-banner" className="bg-gradient-to-r from-blue-50 to-purple-50 mx-4 mt-4 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <CalendarCheck className="text-white text-lg" size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Today's Availability</p>
                            <p className="text-lg font-bold text-gray-800">4 hours free</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">Next available</p>
                        <p className="text-sm font-semibold text-blue-600">2:30 PM</p>
                    </div>
                </div>
            </div>

            {/* View Toggle Section */}
            <div id="view-toggle" className="px-4 py-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1">
                    <div className="flex">
                        <Link href="/dashboard/calendar/day" className="flex-1">
                            <button className="w-full py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors rounded-lg">
                                Day
                            </button>
                        </Link>
                        <button className="flex-1 py-3 px-4 text-sm font-medium bg-blue-600 text-white rounded-lg shadow-sm">
                            Week
                        </button>
                        <Link href="/dashboard/calendar" className="flex-1">
                            <button className="w-full py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors rounded-lg">
                                Month
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Date Navigation */}
            <div id="date-navigation" className="px-4 pb-4">
                <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronLeft className="text-gray-600" size={20} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-gray-800">October 24, 2025</h2>
                        <p className="text-sm text-gray-500">Friday</p>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight className="text-gray-600" size={20} />
                    </button>
                </div>
            </div>

            {/* Mini Week Calendar */}
            <div id="mini-week-calendar" className="px-4 pb-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-700 text-sm">This Week</h3>
                        <button className="text-blue-600 text-xs font-medium">Today</button>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {[
                            { day: 'Mon', date: 21 },
                            { day: 'Tue', date: 22 },
                            { day: 'Wed', date: 23 },
                            { day: 'Thu', date: 24 },
                            { day: 'Fri', date: 25 },
                            { day: 'Sat', date: 26 },
                            { day: 'Sun', date: 27 },
                        ].map((item) => (
                            <div key={item.day} className="text-center">
                                <p className="text-xs text-gray-500 mb-2">{item.day}</p>
                                <div
                                    className={`calendar-day w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium cursor-pointer ${selectedDay === item.date ? 'selected' : ''
                                        } ${['Sat', 'Sun'].includes(item.day) ? 'text-gray-400' : ''}`}
                                    onClick={() => setSelectedDay(item.date)}
                                >
                                    {item.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Time Slots Section */}
            <div id="time-slots" className="px-4 pb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800">Today's Schedule</h3>
                            <div className="flex space-x-2">
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <span className="text-xs text-gray-500">Busy</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <span className="text-xs text-gray-500">Flexible</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    <span className="text-xs text-gray-500">Free</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Morning Section */}
                    <div className="p-4 border-b border-gray-50">
                        <div className="flex items-center space-x-2 mb-4">
                            <Sun className="text-yellow-500" size={16} />
                            <h4 className="font-medium text-gray-700 text-sm">Morning</h4>
                        </div>

                        <div className="space-y-3">
                            <div className="time-slot bg-red-50 border border-red-200 rounded-xl p-4 cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="availability-indicator bg-red-400"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-gray-800">9:00 - 10:30 AM</span>
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Busy</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Team Standup Meeting</p>
                                        <p className="text-xs text-gray-500 mt-1">Conference Room A</p>
                                    </div>
                                </div>
                            </div>

                            <div className="time-slot bg-yellow-50 border border-yellow-200 rounded-xl p-4 cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="availability-indicator bg-yellow-400"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-gray-800">11:00 AM - 12:00 PM</span>
                                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Negotiable</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Protected Focus Time</p>
                                        <p className="text-xs text-gray-500 mt-1">Can be moved if urgent</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Afternoon Section */}
                    <div className="p-4 border-b border-gray-50">
                        <div className="flex items-center space-x-2 mb-4">
                            <Sun className="text-orange-500" size={16} />
                            <h4 className="font-medium text-gray-700 text-sm">Afternoon</h4>
                        </div>

                        <div className="space-y-3">
                            <div className="time-slot bg-green-50 border border-green-200 rounded-xl p-4 cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="availability-indicator bg-green-400"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-gray-800">1:00 - 2:00 PM</span>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Available</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Open for meetings</p>
                                        <button className="text-xs text-blue-600 hover:underline mt-1">+ Schedule something</button>
                                    </div>
                                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors">
                                        <Plus className="text-green-600" size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="time-slot bg-red-50 border border-red-200 rounded-xl p-4 cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="availability-indicator bg-red-400"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-gray-800">2:30 - 3:30 PM</span>
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Busy</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Client Presentation</p>
                                        <p className="text-xs text-gray-500 mt-1">Zoom Meeting • High Priority</p>
                                    </div>
                                </div>
                            </div>

                            <div className="time-slot bg-blue-50 border border-blue-200 rounded-xl p-4 cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="availability-indicator bg-blue-400"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-gray-800">4:00 - 5:00 PM</span>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Protected</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Deep Work Block</p>
                                        <p className="text-xs text-gray-500 mt-1">Appears as busy to others</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Evening Section */}
                    <div className="p-4">
                        <div className="flex items-center space-x-2 mb-4">
                            <Moon className="text-indigo-500" size={16} />
                            <h4 className="font-medium text-gray-700 text-sm">Evening</h4>
                        </div>

                        <div className="space-y-3">
                            <div className="time-slot bg-green-50 border border-green-200 rounded-xl p-4 cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="availability-indicator bg-green-400"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-gray-800">6:00 - 7:00 PM</span>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Available</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Free for dinner plans</p>
                                        <button className="text-xs text-blue-600 hover:underline mt-1">+ Add event</button>
                                    </div>
                                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors">
                                        <Plus className="text-green-600" size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="time-slot bg-yellow-50 border border-yellow-200 rounded-xl p-4 cursor-pointer transition-all duration-300">
                                <div className="flex items-center space-x-3">
                                    <div className="availability-indicator bg-yellow-400"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-gray-800">8:00 - 9:00 PM</span>
                                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Maybe</span>
                                        </div>
                                        <p className="text-xs text-gray-600">Gym session (flexible)</p>
                                        <p className="text-xs text-gray-500 mt-1">Can skip if needed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div id="quick-actions" className="px-4 pb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl p-4 transition-colors">
                            <div className="text-center flex flex-col items-center">
                                <Plus className="text-blue-600 mb-2" size={24} />
                                <p className="text-sm font-medium text-blue-700">Add Event</p>
                            </div>
                        </button>
                        <button className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl p-4 transition-colors">
                            <div className="text-center flex flex-col items-center">
                                <Shield className="text-purple-600 mb-2" size={24} />
                                <p className="text-sm font-medium text-purple-700">Protected Time</p>
                            </div>
                        </button>
                        <button className="bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 rounded-xl p-4 transition-colors">
                            <div className="text-center flex flex-col items-center">
                                <Clock className="text-yellow-600 mb-2" size={24} />
                                <p className="text-sm font-medium text-yellow-700">Artificial Busy</p>
                            </div>
                        </button>
                        <button className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-4 transition-colors">
                            <div className="text-center flex flex-col items-center">
                                <LinkIcon className="text-green-600 mb-2" size={24} />
                                <p className="text-sm font-medium text-green-700">Share Link</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Upcoming Requests Section */}
            <div id="upcoming-requests" className="px-4 pb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Pending Requests</h3>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">2 new</span>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800 text-sm">Coffee Chat with Alex</h4>
                                    <p className="text-xs text-gray-600 mt-1">Tomorrow at 3:00 PM • 30 minutes</p>
                                    <p className="text-xs text-gray-500 mt-1">"Would love to catch up and discuss the project"</p>
                                </div>
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Urgent</span>
                            </div>
                            <div className="flex space-x-2 mt-3">
                                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors">
                                    Accept
                                </button>
                                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors">
                                    Propose
                                </button>
                                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors">
                                    Decline
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-800 text-sm">Team Sync</h4>
                                    <p className="text-xs text-gray-600 mt-1">Monday at 10:00 AM • 1 hour</p>
                                    <p className="text-xs text-gray-500 mt-1">"Weekly team alignment meeting"</p>
                                </div>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Regular</span>
                            </div>
                            <div className="flex space-x-2 mt-3">
                                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors">
                                    Accept
                                </button>
                                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-3 rounded-lg text-xs font-medium transition-colors">
                                    Propose
                                </button>
                                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors">
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 transition-colors">
                        View all requests →
                    </button>
                </div>
            </div>

            {/* Calendar Sources Section */}
            <div id="calendar-sources" className="px-4 pb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">Calendar Sources</h3>
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">Manage</button>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Work Calendar</p>
                                    <p className="text-xs text-gray-500">Google Calendar • Synced 2m ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600">●</span>
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Personal Calendar</p>
                                    <p className="text-xs text-gray-500">Google Calendar • Synced 5m ago</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-green-600">●</span>
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Protected Time</p>
                                    <p className="text-xs text-gray-500">spareTime • Always visible</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-blue-600">●</span>
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Artificial Busy</p>
                                    <p className="text-xs text-gray-500">spareTime • Manual blocks</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-xs text-yellow-600">●</span>
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Availability Summary */}
            <div id="availability-summary" className="px-4 pb-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                            <ChartPie className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Today's Summary</h3>
                            <p className="text-xs text-gray-600">Your availability breakdown</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center">
                            <div className="w-8 h-8 bg-red-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">4h</span>
                            </div>
                            <p className="text-xs text-gray-600">Busy</p>
                        </div>
                        <div className="text-center">
                            <div className="w-8 h-8 bg-yellow-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">2h</span>
                            </div>
                            <p className="text-xs text-gray-600">Flexible</p>
                        </div>
                        <div className="text-center">
                            <div className="w-8 h-8 bg-green-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">3h</span>
                            </div>
                            <p className="text-xs text-gray-600">Free</p>
                        </div>
                    </div>

                    <div className="mt-4 bg-white bg-opacity-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-600">Availability Score</span>
                            <span className="text-sm font-bold text-green-600">75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Good availability for meetings</p>
                    </div>
                </div>
            </div>

            {/* Weekly Insights */}
            <div id="weekly-insights" className="px-4 pb-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-800">This Week's Insights</h3>
                        <ChartLine className="text-blue-600" size={20} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <TrendingUp className="text-blue-600" size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">Meeting Load</p>
                                <p className="text-xs text-gray-500">15% lighter than last week</p>
                            </div>
                            <span className="text-xs text-green-600 font-medium">↓ 15%</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Clock className="text-purple-600" size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">Focus Time</p>
                                <p className="text-xs text-gray-500">12 hours protected this week</p>
                            </div>
                            <span className="text-xs text-blue-600 font-medium">+3h</span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Handshake className="text-yellow-600" size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">Requests</p>
                                <p className="text-xs text-gray-500">8 requests received</p>
                            </div>
                            <span className="text-xs text-green-600 font-medium">87% accepted</span>
                        </div>
                    </div>

                    <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                        View detailed analytics
                    </button>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="floating-action">
                <button className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                    <Plus size={24} />
                </button>
            </div>

            {/* Bottom Navigation */}
            <div id="bottom-navigation" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
                <div className="flex justify-around items-center">
                    <Link href="/dashboard/links">
                        <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                            <LinkIcon size={20} />
                            <span className="text-xs">Links</span>
                        </button>
                    </Link>
                    <Link href="/dashboard/calendar">
                        <button className="flex flex-col items-center space-y-1 py-2 px-3 text-blue-600 transition-colors">
                            <Calendar size={20} />
                            <span className="text-xs font-medium">Calendar</span>
                            <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                        </button>
                    </Link>
                    <Link href="/dashboard/requests">
                        <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors relative">
                            <Inbox size={20} />
                            <span className="text-xs">Requests</span>
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                        </button>
                    </Link>
                    <Link href="/dashboard/settings/profile">
                        <button className="flex flex-col items-center space-y-1 py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
                            <User size={20} />
                            <span className="text-xs">Profile</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
