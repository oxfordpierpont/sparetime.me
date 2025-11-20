'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, ChevronDown, Copy, Info, Star, Video,
    Check, Calendar, Clock, Shield, Globe, Lock, Mail,
    Users, Zap, Eye, ChevronUp, Plus
} from 'lucide-react';

export default function CreateLinkPage() {
    const [linkName, setLinkName] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('sparetime.me/you/your-link');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [activeDays, setActiveDays] = useState(['M', 'T', 'W', 'Th', 'F']);
    const [duration, setDuration] = useState('30 min');
    const [customMessage, setCustomMessage] = useState('');
    const [copied, setCopied] = useState(false);

    // Auto-generate URL from link name
    useEffect(() => {
        const slug = linkName.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .substring(0, 50);
        setGeneratedUrl(`sparetime.me/you/${slug || 'your-link'}`);
    }, [linkName]);

    const toggleDay = (day) => {
        if (activeDays.includes(day)) {
            setActiveDays(activeDays.filter(d => d !== day));
        } else {
            setActiveDays([...activeDays, day]);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://${generatedUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const applyTemplate = (text) => {
        setCustomMessage(text);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/dashboard/links" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft className="text-gray-600" size={20} />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">Create Link</h1>
                        <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">Save</button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto pt-6 px-4 space-y-6">

                {/* Link Details Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Link Details</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link Name</label>
                            <input
                                type="text"
                                value={linkName}
                                onChange={(e) => setLinkName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g., Coffee Chats, Work Meetings"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">For (optional)</label>
                            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="e.g., Friends, Team Members" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Expires</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none outline-none bg-white">
                                    <option>Never</option>
                                    <option>In 1 week</option>
                                    <option>In 1 month</option>
                                    <option>In 3 months</option>
                                    <option>Custom date</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Your link will be:</p>
                                    <p className="font-mono text-blue-600 text-sm">{generatedUrl}</p>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    {copied ? <Check className="text-green-500" size={20} /> : <Copy className="text-gray-500" size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visibility Settings Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Visibility Settings</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <h3 className="font-medium text-gray-800">Show event labels</h3>
                                    <p className="text-sm text-gray-600">Display meeting titles and descriptions</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <h3 className="font-medium text-gray-800">Show negotiable times</h3>
                                    <p className="text-sm text-gray-600">Highlight times that are flexible</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <h3 className="font-medium text-gray-800">Show location details</h3>
                                    <p className="text-sm text-gray-600">Display meeting locations when available</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Detail level</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none outline-none bg-white">
                                    <option>Minimal - Just busy/free</option>
                                    <option>Basic - Include time blocks</option>
                                    <option>Detailed - Show event info</option>
                                    <option>Full - All available details</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Settings Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Calendar Settings</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Work Calendar</h3>
                                        <p className="text-sm text-gray-600">12 events this week</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8 outline-none bg-white">
                                        <option>Busy</option>
                                        <option>Negotiable</option>
                                        <option>Hidden</option>
                                        <option>Free</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Personal Calendar</h3>
                                        <p className="text-sm text-gray-600">5 events this week</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8 outline-none bg-white">
                                        <option>Busy</option>
                                        <option>Negotiable</option>
                                        <option selected>Hidden</option>
                                        <option>Free</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Family Calendar</h3>
                                        <p className="text-sm text-gray-600">3 events this week</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8 outline-none bg-white">
                                        <option selected>Busy</option>
                                        <option>Negotiable</option>
                                        <option>Hidden</option>
                                        <option>Free</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={12} />
                                </div>
                            </div>
                        </div>

                        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center">
                            <Plus className="mr-2" size={16} />
                            Add calendar override
                        </button>
                    </div>
                </div>

                {/* Time Preferences Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Time Preferences</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Available hours</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none outline-none bg-white">
                                        <option>8:00 AM</option>
                                        <option selected>9:00 AM</option>
                                        <option>10:00 AM</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none outline-none bg-white">
                                        <option>4:00 PM</option>
                                        <option selected>5:00 PM</option>
                                        <option>6:00 PM</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Available days</label>
                            <div className="flex justify-between">
                                {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => toggleDay(day)}
                                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${activeDays.includes(day)
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Meeting duration preference</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['15 min', '30 min', '60 min'].map((d) => (
                                    <button
                                        key={d}
                                        onClick={() => setDuration(d)}
                                        className={`p-3 border rounded-xl font-medium transition-colors ${duration === d
                                                ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                : 'border-gray-300 text-gray-600 hover:border-gray-400'
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Buffer time between meetings</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none outline-none bg-white">
                                    <option>No buffer</option>
                                    <option>5 minutes</option>
                                    <option selected>15 minutes</option>
                                    <option>30 minutes</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Custom Message Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Custom Message</h2>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Welcome message (optional)</label>
                            <textarea
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                rows="4"
                                placeholder="Hi! Here's my availability. Feel free to request a time that works for both of us. Looking forward to connecting!"
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-2">This message will appear at the top of your availability page</p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-800">Quick templates</h3>
                            <div className="grid gap-3">
                                <button
                                    onClick={() => applyTemplate("Please select a time that works for you. I'll confirm within 24 hours.")}
                                    className="p-3 border border-gray-200 rounded-xl text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                    <p className="text-sm text-gray-800 font-medium">Professional</p>
                                    <p className="text-xs text-gray-600">"Please select a time that works for you. I'll confirm within 24 hours."</p>
                                </button>
                                <button
                                    onClick={() => applyTemplate("Hey! Pick a time that works and let's chat. Can't wait to catch up!")}
                                    className="p-3 border border-gray-200 rounded-xl text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                    <p className="text-sm text-gray-800 font-medium">Casual</p>
                                    <p className="text-xs text-gray-600">"Hey! Pick a time that works and let's chat. Can't wait to catch up!"</p>
                                </button>
                                <button
                                    onClick={() => applyTemplate("Let's grab coffee! Choose a time and I'll suggest a great spot nearby.")}
                                    className="p-3 border border-gray-200 rounded-xl text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                    <p className="text-sm text-gray-800 font-medium">Coffee Chat</p>
                                    <p className="text-xs text-gray-600">"Let's grab coffee! Choose a time and I'll suggest a great spot nearby."</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Options Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Advanced Options</h2>
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="text-blue-600 text-sm font-medium flex items-center"
                            >
                                {showAdvanced ? <ChevronUp size={16} className="mr-1" /> : <ChevronDown size={16} className="mr-1" />}
                                {showAdvanced ? 'Show Less' : 'Show All'}
                            </button>
                        </div>

                        {showAdvanced && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-800">Require approval for requests</h3>
                                        <p className="text-sm text-gray-600">Manually approve each meeting request</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-800">Allow same-day bookings</h3>
                                        <p className="text-sm text-gray-600">People can request meetings for today</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-800">Email notifications</h3>
                                        <p className="text-sm text-gray-600">Get notified when someone requests time</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">Maximum advance booking</label>
                                    <div className="relative">
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none outline-none bg-white">
                                            <option>1 week</option>
                                            <option>2 weeks</option>
                                            <option selected>1 month</option>
                                            <option>3 months</option>
                                            <option>6 months</option>
                                            <option>No limit</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Link Preview Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">Preview</h2>
                            <button className="text-blue-600 text-sm font-medium flex items-center">
                                <Eye size={16} className="mr-1" />
                                Full Preview
                            </button>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">YN</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Your Name's Availability</h3>
                                        <p className="text-sm text-gray-600">Updated 2 minutes ago</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="mb-4">
                                    <p className="text-gray-600 text-sm">{customMessage || "Hi! Here's my availability. Feel free to request a time that works for both of us."}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                            <span className="text-sm text-gray-800">Today, 2:00 PM - 3:00 PM</span>
                                        </div>
                                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Available</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <span className="text-sm text-gray-800">Tomorrow, 10:00 AM - 11:00 AM</span>
                                        </div>
                                        <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Negotiable</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-sm text-gray-800">Tomorrow, 3:00 PM - 4:00 PM</span>
                                        </div>
                                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">Busy</span>
                                    </div>
                                </div>

                                <button className="w-full mt-4 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                                    Request Time
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Analytics Settings Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Analytics & Tracking</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <h3 className="font-medium text-gray-800">Track link views</h3>
                                    <p className="text-sm text-gray-600">See how many people visit your availability page</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <h3 className="font-medium text-gray-800">Request analytics</h3>
                                    <p className="text-sm text-gray-600">Track meeting requests and response rates</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <Info className="text-blue-600 mt-1" size={20} />
                                <div>
                                    <h4 className="font-medium text-blue-800 mb-1">Analytics Preview</h4>
                                    <p className="text-sm text-blue-700">Once your link is active, you'll see detailed analytics including view counts, request patterns, and optimal meeting times.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security & Privacy Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Security & Privacy</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">Link access</label>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input type="radio" name="access" value="public" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                                        <div>
                                            <p className="font-medium text-gray-800 flex items-center">
                                                <Globe size={16} className="mr-2 text-gray-500" /> Public
                                            </p>
                                            <p className="text-sm text-gray-600">Anyone with the link can view your availability</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input type="radio" name="access" value="password" className="text-blue-600 focus:ring-blue-500" />
                                        <div>
                                            <p className="font-medium text-gray-800 flex items-center">
                                                <Lock size={16} className="mr-2 text-gray-500" /> Password Protected
                                            </p>
                                            <p className="text-sm text-gray-600">Require a password to view availability</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                                        <input type="radio" name="access" value="email" className="text-blue-600 focus:ring-blue-500" />
                                        <div>
                                            <p className="font-medium text-gray-800 flex items-center">
                                                <Mail size={16} className="mr-2 text-gray-500" /> Email Verification
                                            </p>
                                            <p className="text-sm text-gray-600">Require email verification before viewing</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-800">Require contact info for requests</h3>
                                        <p className="text-sm text-gray-600">Requesters must provide name and email</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <h3 className="font-medium text-gray-800">Block anonymous requests</h3>
                                        <p className="text-sm text-gray-600">Prevent requests from unverified users</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integration Options Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-800">Integration Options</h2>

                        <div className="space-y-4">
                            <div className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <Video className="text-green-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Google Meet</h3>
                                            <p className="text-sm text-gray-600">Auto-create meeting links</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Users className="text-blue-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Microsoft Teams</h3>
                                            <p className="text-sm text-gray-600">Generate Teams meeting links</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                            <Video className="text-purple-600" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Zoom</h3>
                                            <p className="text-sm text-gray-600">Create Zoom meeting rooms</p>
                                        </div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <Star className="text-yellow-600 mt-1" size={20} />
                                <div>
                                    <h4 className="font-medium text-yellow-800 mb-1">Pro Feature</h4>
                                    <p className="text-sm text-yellow-700">Video integration requires a Pro subscription. <a href="#" className="underline">Upgrade now</a> to unlock these features.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 z-40">
                <div className="max-w-3xl mx-auto space-y-3">
                    <div className="flex space-x-3">
                        <button className="flex-1 border border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors">
                            Preview
                        </button>
                        <button className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors">
                            Create Link
                        </button>
                    </div>
                    <button className="w-full text-gray-600 py-2 font-medium hover:text-gray-800 transition-colors">
                        Save as Draft
                    </button>
                </div>
            </div>
        </div>
    );
}
