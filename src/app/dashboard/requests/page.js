'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Filter, Search, Clock, AlertTriangle, Calendar as CalendarIcon,
    Check, X, MapPin, Users, Video, Building, Handshake, ChartLine, Percent,
    ChevronRight, ChevronDown, Settings, Plus, Home, Link as LinkIcon,
    Calendar, User, Inbox
} from 'lucide-react';

export default function RequestsPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedTab, setSelectedTab] = useState('incoming');
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Section */}
            <div id="header" className="bg-white shadow-sm border-b border-gray-100">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/dashboard">
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <ArrowLeft className="text-gray-600 text-lg" size={20} />
                                </button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">Time Requests</h1>
                                <p className="text-sm text-gray-500">Manage incoming and outgoing requests</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                                <Filter className="text-gray-600" size={20} />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Search className="text-gray-600" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs Section */}
            <div id="filter-tabs" className="bg-white border-b border-gray-100">
                <div className="px-4 py-3">
                    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setSelectedTab('incoming')}
                            className={`flex-1 py-2 px-4 rounded-md transition-all ${selectedTab === 'incoming'
                                ? 'bg-white text-blue-600 font-semibold shadow-sm'
                                : 'text-gray-600 font-medium hover:bg-gray-50'
                                }`}
                        >
                            <span>Incoming</span>
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${selectedTab === 'incoming'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-200 text-gray-600'
                                }`}>4</span>
                        </button>
                        <button
                            onClick={() => setSelectedTab('outgoing')}
                            className={`flex-1 py-2 px-4 rounded-md transition-all ${selectedTab === 'outgoing'
                                ? 'bg-white text-blue-600 font-semibold shadow-sm'
                                : 'text-gray-600 font-medium hover:bg-gray-50'
                                }`}
                        >
                            <span>Outgoing</span>
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${selectedTab === 'outgoing'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-200 text-gray-600'
                                }`}>2</span>
                        </button>
                        <button
                            onClick={() => setSelectedTab('past')}
                            className={`flex-1 py-2 px-4 rounded-md transition-all ${selectedTab === 'past'
                                ? 'bg-white text-blue-600 font-semibold shadow-sm'
                                : 'text-gray-600 font-medium hover:bg-gray-50'
                                }`}
                        >
                            <span>Past</span>
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${selectedTab === 'past'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-200 text-gray-600'
                                }`}>12</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div id="quick-actions" className="bg-white border-b border-gray-100">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Clock className="text-blue-600" size={16} />
                                <span className="text-sm font-medium text-gray-700">Today's Requests</span>
                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-semibold">3</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <AlertTriangle className="text-red-500" size={16} />
                                <span className="text-sm font-medium text-gray-700">Urgent</span>
                                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-semibold">1</span>
                            </div>
                        </div>
                        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                            Mark All Read
                        </button>
                    </div>
                </div>
            </div>

            {/* Priority Requests Section */}
            <div id="priority-requests" className="px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">Priority Requests</h2>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                        View All
                    </button>
                </div>

                {/* Urgent Request Card */}
                <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 mb-4 slide-up">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">AK</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Alex Kim</h3>
                                <p className="text-sm text-gray-500">alex.kim@company.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="urgent-indicator text-white text-xs px-2 py-1 rounded-full font-semibold pulse-animation">
                                URGENT
                            </div>
                            <span className="text-xs text-gray-400">2 min ago</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Emergency Project Discussion</h4>
                        <div className="flex items-center space-x-2 mb-2">
                            <CalendarIcon className="text-blue-600" size={14} />
                            <span className="text-sm font-medium text-gray-700">Today, November 15</span>
                            <Clock className="text-green-600 ml-2" size={14} />
                            <span className="text-sm font-medium text-gray-700">2:00 PM - 3:00 PM</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            "Hi! We have a critical client issue that needs immediate attention. Can we discuss the mitigation strategy this afternoon? This is blocking their go-live."
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <Check className="inline mr-2" size={16} />Accept
                        </button>
                        <button className="flex-1 bg-yellow-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                            <Clock className="inline mr-2" size={16} />Propose
                        </button>
                        <button className="flex-1 bg-red-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors">
                            <X className="inline mr-2" size={16} />Decline
                        </button>
                    </div>
                </div>
            </div>

            {/* Regular Requests Section */}
            <div id="regular-requests" className="px-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Regular Requests</h2>

                {/* Coffee Chat Request */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 slide-up">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">SM</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Sarah Martinez</h3>
                                <p className="text-sm text-gray-500">sarah.m@designco.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="priority-normal text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                                NORMAL
                            </div>
                            <span className="text-xs text-gray-400">1 hour ago</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Coffee & Design Chat</h4>
                        <div className="flex items-center space-x-2 mb-2">
                            <CalendarIcon className="text-blue-600" size={14} />
                            <span className="text-sm font-medium text-gray-700">Friday, November 17</span>
                            <Clock className="text-green-600 ml-2" size={14} />
                            <span className="text-sm font-medium text-gray-700">4:00 PM - 5:00 PM</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            "Would love to catch up and discuss some design trends I've been exploring. The new coffee shop downtown has amazing espresso!"
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                            <MapPin className="text-red-500" size={12} />
                            <span className="text-xs text-gray-600">Downtown Coffee Co.</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <Check className="inline mr-2" size={16} />Accept
                        </button>
                        <button className="flex-1 bg-yellow-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                            <Clock className="inline mr-2" size={16} />Propose
                        </button>
                        <button className="flex-1 bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-500 transition-colors">
                            <X className="inline mr-2" size={16} />Decline
                        </button>
                    </div>
                </div>

                {/* Team Sync Request */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 slide-up">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">MT</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Marketing Team</h3>
                                <p className="text-sm text-gray-500">team@company.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="priority-high text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                HIGH
                            </div>
                            <span className="text-xs text-gray-400">3 hours ago</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Weekly Marketing Sync</h4>
                        <div className="flex items-center space-x-2 mb-2">
                            <CalendarIcon className="text-blue-600" size={14} />
                            <span className="text-sm font-medium text-gray-700">Monday, November 20</span>
                            <Clock className="text-green-600 ml-2" size={14} />
                            <span className="text-sm font-medium text-gray-700">10:00 AM - 11:00 AM</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            "Our regular weekly sync to discuss campaign performance, upcoming launches, and Q4 planning. We'll cover the new product launch timeline."
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                                <Users className="text-blue-500" size={12} />
                                <span className="text-xs text-gray-600">5 attendees</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Video className="text-purple-500" size={12} />
                                <span className="text-xs text-gray-600">Zoom Meeting</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <Check className="inline mr-2" size={16} />Accept
                        </button>
                        <button className="flex-1 bg-yellow-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                            <Clock className="inline mr-2" size={16} />Propose
                        </button>
                        <button className="flex-1 bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-500 transition-colors">
                            <X className="inline mr-2" size={16} />Decline
                        </button>
                    </div>
                </div>

                {/* Client Meeting Request */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 slide-up">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">JD</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">John Davis</h3>
                                <p className="text-sm text-gray-500">john@clientcorp.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="priority-normal text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                                NORMAL
                            </div>
                            <span className="text-xs text-gray-400">5 hours ago</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Q4 Strategy Review</h4>
                        <div className="flex items-center space-x-2 mb-2">
                            <CalendarIcon className="text-blue-600" size={14} />
                            <span className="text-sm font-medium text-gray-700">Tuesday, November 21</span>
                            <Clock className="text-green-600 ml-2" size={14} />
                            <span className="text-sm font-medium text-gray-700">2:00 PM - 3:30 PM</span>
                        </div>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            "Let's review our Q4 performance and discuss strategic initiatives for next year. I'd like to explore some new partnership opportunities."
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                                <Building className="text-gray-500" size={12} />
                                <span className="text-xs text-gray-600">ClientCorp HQ</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Handshake className="text-blue-500" size={12} />
                                <span className="text-xs text-gray-600">Business Meeting</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <button className="flex-1 bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <Check className="inline mr-2" size={16} />Accept
                        </button>
                        <button className="flex-1 bg-yellow-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors">
                            <Clock className="inline mr-2" size={16} />Propose
                        </button>
                        <button className="flex-1 bg-gray-400 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-gray-500 transition-colors">
                            <X className="inline mr-2" size={16} />Decline
                        </button>
                    </div>
                </div>
            </div>

            {/* Request Analytics Section */}
            <div id="request-analytics" className="px-4 py-6 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Request Insights</h2>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">This Week</span>
                            <ChartLine className="text-green-500" size={16} />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">12</div>
                        <div className="text-xs text-green-600 font-medium">+3 from last week</div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Response Rate</span>
                            <Percent className="text-blue-500" size={16} />
                        </div>
                        <div className="text-2xl font-bold text-gray-800">94%</div>
                        <div className="text-xs text-blue-600 font-medium">Above average</div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Popular Request Times</h3>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">2:00 PM - 4:00 PM</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                                <span className="text-xs text-gray-500">85%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">10:00 AM - 12:00 PM</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                                </div>
                                <span className="text-xs text-gray-500">72%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">4:00 PM - 6:00 PM</span>
                            <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                                </div>
                                <span className="text-xs text-gray-500">58%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Responses Section */}
            <div id="quick-responses" className="px-4 py-4 bg-white">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Response Templates</h2>

                <div className="space-y-3">
                    <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">Accept with enthusiasm</span>
                            <ChevronRight className="text-gray-400" size={16} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">"Looking forward to our meeting! I'll send a calendar invite shortly."</p>
                    </button>

                    <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">Propose alternative time</span>
                            <ChevronRight className="text-gray-400" size={16} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">"I have a conflict at that time. Would [alternative time] work better for you?"</p>
                    </button>

                    <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">Polite decline</span>
                            <ChevronRight className="text-gray-400" size={16} />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">"Thank you for thinking of me. Unfortunately, I won't be able to make it."</p>
                    </button>
                </div>
            </div>

            {/* Batch Actions Section */}
            <div id="batch-actions" className="px-4 py-4 bg-gray-50">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-800 mb-3">Bulk Actions</h3>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={(e) => setSelectAll(e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">Select all visible requests</span>
                        </div>
                        <span className="text-xs text-gray-400">4 selected</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center py-2.5 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                            <Check className="mr-2" size={16} />Accept All
                        </button>
                        <button className="flex items-center justify-center py-2.5 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
                            <X className="mr-2" size={16} />Decline All
                        </button>
                    </div>
                </div>
            </div>

            {/* Settings & Preferences Section */}
            <div id="request-settings" className="px-4 py-4 bg-white">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Request Settings</h2>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <span className="font-medium text-gray-800">Auto-accept recurring meetings</span>
                            <p className="text-sm text-gray-600">Automatically accept requests from trusted contacts</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <span className="font-medium text-gray-800">Require approval for urgent requests</span>
                            <p className="text-sm text-gray-600">Get notified immediately for urgent requests</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <span className="font-medium text-gray-800">Send response reminders</span>
                            <p className="text-sm text-gray-600">Remind me to respond to requests after 24 hours</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="mt-6">
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        <Settings className="inline mr-2" size={16} />Advanced Request Settings
                    </button>
                </div>
            </div>

            {/* Load More Section */}
            <div id="load-more" className="px-4 py-6 text-center">
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    <ChevronDown className="inline mr-2" size={16} />Load more requests
                </button>
                <p className="text-sm text-gray-500 mt-2">Showing 4 of 23 total requests</p>
            </div>

            {/* Bottom Navigation */}
            <div id="bottom-navigation" className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
                <div className="px-4 py-3">
                    <div className="grid grid-cols-4 gap-1">
                        <Link href="/dashboard">
                            <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <Home className="text-gray-400 mb-1" size={20} />
                                <span className="text-xs text-gray-600">Dashboard</span>
                            </button>
                        </Link>
                        <Link href="/dashboard/links">
                            <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <LinkIcon className="text-gray-400 mb-1" size={20} />
                                <span className="text-xs text-gray-600">Links</span>
                            </button>
                        </Link>
                        <button className="flex flex-col items-center py-2 px-3 rounded-lg bg-blue-50 border border-blue-200 relative">
                            <Inbox className="text-blue-600 mb-1" size={20} />
                            <span className="text-xs text-blue-600 font-medium">Requests</span>
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">4</span>
                        </button>
                        <Link href="/dashboard/settings/profile">
                            <button className="flex flex-col items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <User className="text-gray-400 mb-1" size={20} />
                                <span className="text-xs text-gray-600">Profile</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div id="fab" className="fixed bottom-20 right-4">
                <button className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center">
                    <Plus size={24} />
                </button>
            </div>
        </div>
    );
}
