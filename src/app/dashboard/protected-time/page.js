'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Shield, Calendar, Info, ChevronDown, Users, Briefcase, Heart,
    Plus, Star, Tag, Bookmark, Eye, ExternalLink, Save, Copy, Check, Lightbulb,
    Repeat, X
} from 'lucide-react';

export default function ProtectedTime() {
    const [mounted, setMounted] = useState(false);
    const [repeatEnabled, setRepeatEnabled] = useState(false);
    const [templateEnabled, setTemplateEnabled] = useState(false);
    const [selectedDays, setSelectedDays] = useState(['tuesday', 'thursday', 'friday']);
    const [selectedCategory, setSelectedCategory] = useState('focus');
    const [tags, setTags] = useState(['deep-work', 'no-interruptions']);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const addTag = (e) => {
        if (e.key === 'Enter' && newTag.trim()) {
            e.preventDefault();
            const newTags = newTag.split(',').map(t => t.trim()).filter(t => t);
            setTags([...tags, ...newTags]);
            setNewTag('');
        }
    };

    if (!mounted) return null;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Header Section */}
            <div id="header" className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/dashboard">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <ArrowLeft className="text-gray-600 text-lg" />
                        </button>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-800">Add Protected Time</h1>
                    <button className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors">Save</button>
                </div>
            </div>

            {/* Protected Time Hero Section */}
            <div id="protected-time-hero" className="bg-gradient-to-br from-green-50 to-teal-50 px-6 py-8">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 protected-time-bg rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                        <Shield className="text-white text-2xl" size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Protect Your Focus Time</h2>
                        <p className="text-gray-600 leading-relaxed">Block out time that's important to you. Others will see this as busy time, keeping your boundaries intact.</p>
                    </div>
                </div>
            </div>

            {/* Basic Details Section */}
            <div id="basic-details" className="bg-white px-6 py-6 space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Title</label>
                        <input type="text" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg" placeholder="e.g., Deep Focus Time, Lunch Break, Gym" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Description (optional)</label>
                        <textarea className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" rows="3" placeholder="Add notes about this protected time..."></textarea>
                    </div>
                </div>
            </div>

            {/* Date & Time Section */}
            <div id="date-time-section" className="bg-gray-50 px-6 py-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Calendar className="text-blue-600 mr-3" size={20} />
                        When
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Date</label>
                            <div className="relative">
                                <input type="date" className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg" defaultValue="2025-10-24" />
                                <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Time</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <label className="block text-xs text-gray-500 mb-1">From</label>
                                    <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" defaultValue="13:00" />
                                </div>
                                <div className="relative">
                                    <label className="block text-xs text-gray-500 mb-1">To</label>
                                    <input type="time" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" defaultValue="15:00" />
                                </div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg flex items-center">
                                <Info className="text-blue-500 mr-2" size={16} />
                                Duration: 2 hours
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Time Presets Section */}
            <div id="time-presets" className="bg-white px-6 py-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800">Quick Presets</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors text-left">
                            <div className="font-semibold text-gray-800 text-sm">Lunch Break</div>
                            <div className="text-xs text-gray-500">12:00 - 13:00</div>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors text-left">
                            <div className="font-semibold text-gray-800 text-sm">Focus Block</div>
                            <div className="text-xs text-gray-500">2 hours</div>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors text-left">
                            <div className="font-semibold text-gray-800 text-sm">Morning Routine</div>
                            <div className="text-xs text-gray-500">07:00 - 09:00</div>
                        </button>
                        <button className="p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors text-left">
                            <div className="font-semibold text-gray-800 text-sm">Evening Wind Down</div>
                            <div className="text-xs text-gray-500">19:00 - 21:00</div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Repeat Settings Section */}
            <div id="repeat-settings" className="bg-gray-50 px-6 py-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <Repeat className="text-purple-600 mr-3" size={20} />
                                Repeat
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">Make this a recurring protected time</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={repeatEnabled}
                                onChange={() => setRepeatEnabled(!repeatEnabled)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    <div id="repeat-options" className={`space-y-4 transition-opacity duration-200 ${repeatEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Frequency</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white">
                                    <option>Weekly</option>
                                    <option>Daily</option>
                                    <option>Monthly</option>
                                    <option>Custom</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Repeat on</label>
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
                                        className={`flex-1 py-3 rounded-lg font-medium text-sm transition-colors ${selectedDays.includes(day.id)
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Ends</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white">
                                    <option>Never</option>
                                    <option>After 10 occurrences</option>
                                    <option>On specific date</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visibility Settings Section */}
            <div id="visibility-settings" className="bg-white px-6 py-6">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                            <Eye className="text-indigo-600 mr-3" size={20} />
                            How Others See This
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">Choose how this appears to different audiences</p>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Users className="text-gray-600" size={14} />
                                    </div>
                                    <span className="font-semibold text-gray-800">Default (Everyone)</span>
                                </div>
                                <div className="relative">
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-sm bg-white pr-8">
                                        <option>Busy</option>
                                        <option>Negotiable</option>
                                        <option>Free</option>
                                        <option>Hidden</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 busy-bg rounded-full"></div>
                                <span className="text-xs text-gray-600">Appears as busy time to everyone</span>
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <Briefcase className="text-blue-600" size={14} />
                                    </div>
                                    <span className="font-semibold text-gray-800">Work Colleagues</span>
                                </div>
                                <div className="relative">
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-sm bg-white pr-8">
                                        <option>Negotiable</option>
                                        <option>Busy</option>
                                        <option>Free</option>
                                        <option>Hidden</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 negotiable-bg rounded-full"></div>
                                <span className="text-xs text-gray-600">Can request to move if urgent</span>
                            </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Heart className="text-green-600" size={14} />
                                    </div>
                                    <span className="font-semibold text-gray-800">Close Friends</span>
                                </div>
                                <div className="relative">
                                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-sm bg-white pr-8">
                                        <option>Free</option>
                                        <option>Negotiable</option>
                                        <option>Busy</option>
                                        <option>Hidden</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                <span className="text-xs text-gray-600">Appears as free time</span>
                            </div>
                        </div>

                        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center">
                            <Plus className="mr-2" size={16} />
                            Add audience override
                        </button>
                    </div>
                </div>
            </div>

            {/* Priority & Flexibility Section */}
            <div id="priority-flexibility" className="bg-gray-50 px-6 py-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Star className="text-yellow-600 mr-3" size={20} />
                        Priority & Flexibility
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Priority Level</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white">
                                    <option>High - Cannot be moved</option>
                                    <option>Medium - Can be moved if necessary</option>
                                    <option>Low - Flexible timing</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                            <div className="mt-2 text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg flex items-center">
                                <Info className="text-yellow-500 mr-2" size={16} />
                                High priority blocks are protected from scheduling conflicts
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-gray-800">Allow moving if urgent</h4>
                                <p className="text-sm text-gray-600">Others can request to reschedule this time</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-gray-800">Buffer time</h4>
                                <p className="text-sm text-gray-600">Add extra time before/after this block</p>
                            </div>
                            <div className="relative">
                                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none text-sm bg-white pr-8">
                                    <option>None</option>
                                    <option>15 minutes</option>
                                    <option>30 minutes</option>
                                    <option>1 hour</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories & Tags Section */}
            <div id="categories-tags" className="bg-white px-6 py-6">
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Tag className="text-purple-600 mr-3" size={20} />
                        Organization
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setSelectedCategory('work')}
                                    className={`p-3 border rounded-xl text-left transition-colors ${selectedCategory === 'work' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'}`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Work</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setSelectedCategory('personal')}
                                    className={`p-3 border rounded-xl text-left transition-colors ${selectedCategory === 'personal' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'}`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Personal</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setSelectedCategory('focus')}
                                    className={`p-3 border rounded-xl text-left transition-colors ${selectedCategory === 'focus' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'}`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Focus</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setSelectedCategory('health')}
                                    className={`p-3 border rounded-xl text-left transition-colors ${selectedCategory === 'health' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'}`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                        <span className="text-sm font-medium">Health</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Tags (optional)</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
                                        {tag}
                                        <button onClick={() => removeTag(tag)} className="ml-2 text-blue-600 hover:text-blue-800">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="Add tags separated by commas..."
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={addTag}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div id="templates" className="bg-gray-50 px-6 py-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                <Bookmark className="text-orange-600 mr-3" size={20} />
                                Save as Template
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">Reuse these settings for future protected time</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={templateEnabled}
                                onChange={() => setTemplateEnabled(!templateEnabled)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                    </div>

                    <div id="template-options" className={`space-y-4 transition-opacity duration-200 ${templateEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Name</label>
                            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder="e.g., Daily Focus Block" />
                        </div>

                        <div className="bg-orange-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-orange-800 text-sm mb-2">Template will include:</h4>
                            <ul className="text-sm text-orange-700 space-y-1">
                                <li>• Duration and time preferences</li>
                                <li>• Visibility settings for all audiences</li>
                                <li>• Priority and flexibility options</li>
                                <li>• Category and tags</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preview Section */}
            <div id="preview-section" className="bg-white px-6 py-6">
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                        <Eye className="text-indigo-600 mr-3" size={20} />
                        Preview
                    </h3>

                    <div className="bg-gray-50 rounded-2xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-3">How this appears to others:</h4>

                        <div className="space-y-3">
                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-800">Work Colleagues</span>
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Negotiable</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 negotiable-bg rounded-full"></div>
                                    <span className="text-sm text-gray-600">1:00 PM - 3:00 PM • Busy (movable if urgent)</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-800">Close Friends</span>
                                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Free</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                    <span className="text-sm text-gray-600">1:00 PM - 3:00 PM • Available</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-800">Everyone Else</span>
                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Busy</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 busy-bg rounded-full"></div>
                                    <span className="text-sm text-gray-600">1:00 PM - 3:00 PM • Busy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <ExternalLink className="mr-2" size={16} />
                        Preview in Calendar View
                    </button>
                </div>
            </div>

            {/* Action Buttons Section */}
            <div id="action-buttons" className="bg-white px-6 py-8 border-t border-gray-100">
                <div className="space-y-4">
                    <button className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center">
                        <Shield className="mr-2" size={20} />
                        Create Protected Time
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                            <Save className="mr-2" size={16} />
                            Save Draft
                        </button>
                        <button className="border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                            <Copy className="mr-2" size={16} />
                            Duplicate
                        </button>
                    </div>

                    <button className="w-full text-gray-500 py-2 font-medium hover:text-gray-700 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>

            {/* Tips Section */}
            <div id="tips-section" className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-8">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Lightbulb className="text-white" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">Pro Tips</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Check className="text-green-600" size={12} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Use Different Priorities</h4>
                                    <p className="text-xs text-gray-600">Set high priority for non-negotiable time, medium for flexible blocks</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Users className="text-blue-600" size={12} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Audience-Specific Settings</h4>
                                    <p className="text-xs text-gray-600">Show family your gym time as free, but work colleagues as busy</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <Repeat className="text-purple-600" size={12} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Create Recurring Blocks</h4>
                                    <p className="text-xs text-gray-600">Set up daily focus time or weekly planning sessions automatically</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div id="footer" className="bg-gray-100 px-6 py-4 text-center">
                <p className="text-xs text-gray-500">spareTime Calendar • Your Availability, Your Way</p>
            </div>
        </div>
    );
}
