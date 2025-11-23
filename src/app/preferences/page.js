'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Globe, ChevronDown, Briefcase, Coffee, Utensils, Clock, Pause,
    Shield, Brain, Dumbbell, MoreHorizontal, Plus, Handshake, Calendar,
    Lightbulb, Wand2, Bot, Minimize2, LineChart, Bell, Eye, ExternalLink,
    Save, RotateCcw, HelpCircle, Check
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

function PreferencesContent() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [workDays, setWorkDays] = useState(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']);
    const [minDuration, setMinDuration] = useState(30);
    const [maxDuration, setMaxDuration] = useState(2);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleDay = (day) => {
        if (workDays.includes(day)) {
            setWorkDays(workDays.filter(d => d !== day));
        } else {
            setWorkDays([...workDays, day]);
        }
    };

    if (!mounted) return null;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Header Section */}
            <div id="header" className="bg-white shadow-sm sticky top-0 z-50">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/connect-calendar">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors ripple-effect">
                                <ArrowLeft className="text-gray-600 text-lg" />
                            </button>
                        </Link>
                        <div className="text-center">
                            <h1 className="text-xl font-bold text-gray-800">Time Preferences</h1>
                            <p className="text-xs text-gray-500 mt-1">Customize your availability</p>
                        </div>
                        <button className="text-blue-600 font-semibold px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors">
                            Save
                        </button>
                    </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"></div>
            </div>

            {/* Progress Indicator */}
            <div id="progress-section" className="px-6 py-4 bg-white border-b border-gray-100">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Step 3 of 4</span>
                    <span className="text-blue-600 font-medium">75% Complete</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-6 py-6 space-y-8 pb-32">

                {/* Timezone Section */}
                <div id="timezone-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                            <Globe className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Your Timezone</h2>
                            <p className="text-sm text-gray-500">Set your local timezone</p>
                        </div>
                    </div>
                    <div className="relative">
                        <select className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-800 font-medium">
                            <optgroup label="United States">
                                <option value="us-eastern">🇺🇸 US Eastern (GMT-5) - New York, Washington DC</option>
                                <option value="us-central">🇺🇸 US Central (GMT-6) - Chicago, Dallas</option>
                                <option value="us-mountain">🇺🇸 US Mountain (GMT-7) - Denver, Phoenix</option>
                                <option value="us-pacific">🇺🇸 US Pacific (GMT-8) - Los Angeles, San Francisco</option>
                                <option value="us-alaska">🇺🇸 US Alaska (GMT-9) - Anchorage</option>
                                <option value="us-hawaii">🇺🇸 US Hawaii (GMT-10) - Honolulu</option>
                            </optgroup>
                            <optgroup label="Global">
                                <option value="utc">🌍 UTC (GMT+0) - London</option>
                                <option value="europe-paris">🇫🇷 Europe/Paris (GMT+1)</option>
                                <option value="asia-tokyo">🇯🇵 Asia/Tokyo (GMT+9)</option>
                                <option value="australia-sydney">🇦🇺 Australia/Sydney (GMT+11)</option>
                            </optgroup>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* Work Hours Section */}
                <div id="work-hours-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 work-hours-gradient rounded-xl flex items-center justify-center">
                            <Briefcase className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Work Hours</h2>
                            <p className="text-sm text-gray-500">Define your default working schedule</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Default work hours:</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-xs text-gray-500 mb-2">Start Time</label>
                                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white time-picker-input">
                                        <option>6:00 AM</option>
                                        <option>7:00 AM</option>
                                        <option>8:00 AM</option>
                                        <option selected>9:00 AM</option>
                                        <option>10:00 AM</option>
                                        <option>11:00 AM</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-8 text-gray-400 pointer-events-none" size={16} />
                                </div>
                                <div className="relative">
                                    <label className="block text-xs text-gray-500 mb-2">End Time</label>
                                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white time-picker-input">
                                        <option>3:00 PM</option>
                                        <option>4:00 PM</option>
                                        <option selected>5:00 PM</option>
                                        <option>6:00 PM</option>
                                        <option>7:00 PM</option>
                                        <option>8:00 PM</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-8 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Work days:</label>
                            <div className="flex justify-between space-x-2">
                                {[
                                    { id: 'monday', label: 'M' },
                                    { id: 'tuesday', label: 'T' },
                                    { id: 'wednesday', label: 'W' },
                                    { id: 'thursday', label: 'Th' },
                                    { id: 'friday', label: 'F' },
                                    { id: 'saturday', label: 'Sa' },
                                    { id: 'sunday', label: 'Su' }
                                ].map((day) => (
                                    <button
                                        key={day.id}
                                        onClick={() => toggleDay(day.id)}
                                        className={`w-12 h-12 rounded-xl font-semibold text-sm custom-toggle ripple-effect ${workDays.includes(day.id)
                                                ? 'bg-green-600 text-white active'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-center">Tap to toggle work days</p>
                        </div>
                    </div>
                </div>

                {/* Break Preferences Section */}
                <div id="break-preferences-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 break-time-gradient rounded-xl flex items-center justify-center">
                            <Coffee className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Break Preferences</h2>
                            <p className="text-sm text-gray-500">Customize your break and buffer times</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                                    <Utensils className="text-white" size={14} />
                                </div>
                                <div>
                                    <span className="text-gray-800 font-medium">Lunch break (12:00 - 1:00 PM)</span>
                                    <p className="text-xs text-gray-600">Daily lunch break protection</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <Clock className="text-white" size={14} />
                                </div>
                                <div>
                                    <span className="text-gray-800 font-medium">15-min buffer between meetings</span>
                                    <p className="text-xs text-gray-600">Automatic buffer time</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <Pause className="text-white" size={14} />
                                </div>
                                <div>
                                    <span className="text-gray-800 font-medium">5-min prep time before meetings</span>
                                    <p className="text-xs text-gray-600">Preparation buffer</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Protected Time Section */}
                <div id="protected-time-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 protected-time-gradient rounded-xl flex items-center justify-center">
                            <Shield className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Protected Time Blocks</h2>
                            <p className="text-sm text-gray-500">Set recurring protected time periods</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200 time-slot-hover">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                        <Brain className="text-white" size={14} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Deep Work Focus</h3>
                                        <p className="text-xs text-gray-600">Daily 9:00 AM - 11:00 AM</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="text-gray-600" size={16} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">Weekdays</span>
                                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">High Priority</span>
                                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">Non-movable</span>
                            </div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200 time-slot-hover">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                        <Dumbbell className="text-white" size={14} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Workout Time</h3>
                                        <p className="text-xs text-gray-600">Mon, Wed, Fri 6:00 PM - 7:30 PM</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-green-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="text-gray-600" size={16} />
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">3x per week</span>
                                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">Medium Priority</span>
                                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">Negotiable</span>
                            </div>
                        </div>

                        <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-200 ripple-effect flex flex-col items-center justify-center">
                            <Plus className="text-lg mb-2" size={24} />
                            <div className="font-medium">Add Protected Time Block</div>
                            <p className="text-xs text-gray-400 mt-1">Create recurring time that appears busy to others</p>
                        </button>
                    </div>
                </div>

                {/* Meeting Preferences Section */}
                <div id="meeting-preferences-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 focus-time-gradient rounded-xl flex items-center justify-center">
                            <Handshake className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Meeting Preferences</h2>
                            <p className="text-sm text-gray-500">Set your meeting availability preferences</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Minimum meeting duration:</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[15, 30, 60].map((duration) => (
                                    <button
                                        key={duration}
                                        onClick={() => setMinDuration(duration)}
                                        className={`p-3 border-2 rounded-xl text-center transition-all duration-200 ripple-effect ${minDuration === duration
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                                            }`}
                                    >
                                        <div className={`font-semibold ${minDuration === duration ? 'text-blue-600' : 'text-gray-800'}`}>
                                            {duration} min
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Maximum meeting duration:</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 4].map((duration) => (
                                    <button
                                        key={duration}
                                        onClick={() => setMaxDuration(duration)}
                                        className={`p-3 border-2 rounded-xl text-center transition-all duration-200 ripple-effect ${maxDuration === duration
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                                            }`}
                                    >
                                        <div className={`font-semibold ${maxDuration === duration ? 'text-blue-600' : 'text-gray-800'}`}>
                                            {duration} {duration === 1 ? 'hour' : 'hours'}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Advance notice required:</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
                                    <option>No advance notice needed</option>
                                    <option>At least 1 hour</option>
                                    <option>At least 4 hours</option>
                                    <option selected>At least 24 hours</option>
                                    <option>At least 48 hours</option>
                                    <option>At least 1 week</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Availability Window Section */}
                <div id="availability-window-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Calendar className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Availability Window</h2>
                            <p className="text-sm text-gray-500">How far ahead to show availability</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Show availability for:</label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white">
                                        <option>1 week ahead</option>
                                        <option>2 weeks ahead</option>
                                        <option selected>1 month ahead</option>
                                        <option>2 months ahead</option>
                                        <option>3 months ahead</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Booking cutoff:</label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none bg-white">
                                        <option>Same day</option>
                                        <option selected>24 hours</option>
                                        <option>48 hours</option>
                                        <option>1 week</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                            <div className="flex items-start space-x-3">
                                <Lightbulb className="text-indigo-600 mt-1" size={16} />
                                <div>
                                    <p className="text-sm text-indigo-800 font-medium">Pro Tip</p>
                                    <p className="text-xs text-indigo-600 mt-1">Longer availability windows help people plan better, but shorter windows give you more flexibility.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Smart Scheduling Section */}
                <div id="smart-scheduling-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                            <Wand2 className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Smart Scheduling</h2>
                            <p className="text-sm text-gray-500">AI-powered scheduling preferences</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <Bot className="text-white" size={14} />
                                </div>
                                <div>
                                    <span className="text-gray-800 font-medium">Auto-suggest optimal times</span>
                                    <p className="text-xs text-gray-600">AI suggests best meeting times</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-teal-50 rounded-xl border border-teal-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                                    <Minimize2 className="text-white" size={14} />
                                </div>
                                <div>
                                    <span className="text-gray-800 font-medium">Group similar meetings</span>
                                    <p className="text-xs text-gray-600">Batch similar meeting types</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <LineChart className="text-white" size={14} />
                                </div>
                                <div>
                                    <span className="text-gray-800 font-medium">Learn from patterns</span>
                                    <p className="text-xs text-gray-600">Adapt to your scheduling habits</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Notification Preferences Section */}
                <div id="notification-preferences-section" className="bg-white rounded-2xl shadow-lg p-6 slide-up">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
                            <Bell className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">Notification Preferences</h2>
                            <p className="text-sm text-gray-500">Choose when and how to be notified</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <h3 className="font-semibold text-gray-800 mb-3">Time Request Notifications</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Instant notifications</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Daily digest (8:00 AM)</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                            <h3 className="font-semibold text-gray-800 mb-3">Schedule Change Notifications</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Calendar sync updates</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Conflict alerts</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div id="preview-section" className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 slide-up">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Eye className="text-white" size={32} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Preview Your Settings</h2>
                        <p className="text-sm text-gray-600">See how your preferences will look to others</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800">Sample Availability View</h3>
                            <span className="text-xs text-gray-500">Your Link Preview</span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Monday, Oct 28</span>
                                    <p className="text-xs text-gray-600">9:00 AM - 12:00 PM Available</p>
                                </div>
                                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">Open</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Monday, Oct 28</span>
                                    <p className="text-xs text-gray-600">12:00 PM - 1:00 PM Lunch</p>
                                </div>
                                <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">Busy</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <div>
                                    <span className="text-sm font-medium text-gray-800">Monday, Oct 28</span>
                                    <p className="text-xs text-gray-600">2:00 PM - 5:00 PM Available</p>
                                </div>
                                <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">Flexible</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 ripple-effect flex items-center justify-center">
                        <ExternalLink className="mr-2" size={20} />
                        View Full Preview
                    </button>
                </div>

            </div>

            {/* Bottom Action Section */}
            <div id="bottom-actions" className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 z-40">
                <div className="flex space-x-4">
                    <Link href="/connect-calendar" className="flex-1">
                        <button className="w-full border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 ripple-effect flex items-center justify-center">
                            <ArrowLeft className="mr-2" size={20} />
                            Back
                        </button>
                    </Link>
                    <Link href="/dashboard" className="flex-1">
                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 ripple-effect flex items-center justify-center">
                            Save & Continue
                            <Check className="ml-2" size={20} />
                        </button>
                    </Link>
                </div>

                <div className="flex items-center justify-center mt-4 space-x-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                        <Save className="mr-1" size={14} />
                        Save Draft
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-gray-600 hover:text-gray-700 font-medium flex items-center">
                        <RotateCcw className="mr-1" size={14} />
                        Reset to Defaults
                    </button>
                </div>
            </div>

            {/* Quick Access Floating Button */}
            <div id="floating-actions" className="fixed bottom-24 right-6 z-40">
                <div className="relative">
                    <button
                        onClick={() => setShowHelp(!showHelp)}
                        className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pulse-subtle ripple-effect flex items-center justify-center"
                    >
                        <HelpCircle className="text-xl" size={24} />
                    </button>
                    {showHelp && (
                        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-4 w-48" id="help-tooltip">
                            <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>
                            <p className="text-xs text-gray-600 mb-3">Get assistance with setting up your time preferences</p>
                            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-xs font-medium">
                                Get Support
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function Preferences() {
    return (
        <ProtectedRoute>
            <PreferencesContent />
        </ProtectedRoute>
    );
}
