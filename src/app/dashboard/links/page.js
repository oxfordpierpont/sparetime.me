'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search, Filter, Star, Eye, CalendarCheck, Copy, Coffee, MoreVertical,
    Briefcase, Shield, Heart, Calendar, GraduationCap, Pause, CalendarX,
    AlertTriangle, Clock, Zap, User, Lock, Plus, Share2, Edit, Trash2,
    BarChart, Check
} from 'lucide-react';

export default function LinksPage() {
    const [activeTab, setActiveTab] = useState('All Links');
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [showLinkOptions, setShowLinkOptions] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (id, text) => {
        navigator.clipboard.writeText(`https://${text}`);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#f6fbff] text-[#021220] flex flex-col font-['Poppins',_system-ui,_sans-serif]">
            {/* White container with border radius - matches Dashboard */}
            <div className="bg-white rounded-[15px] flex-1 flex flex-col overflow-hidden shadow-sm">
                {/* Header - matches Dashboard header structure */}
                <header className="bg-white/80 backdrop-blur sticky top-0 z-20">
                    <div className="px-6 py-3 flex items-center justify-between gap-4">
                        {/* Left: Page Title */}
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-lg font-semibold text-[#021220]">My Links</h1>
                                <p className="text-xs text-[#839aac]">Manage your availability links</p>
                            </div>
                        </div>

                        {/* Center: Search */}
                        <div className="flex-1 max-w-xl hidden md:block">
                            <label className="relative block">
                                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <Search className="h-4 w-4" />
                                </span>
                                <input
                                    type="search"
                                    placeholder="Search links..."
                                    className="w-full rounded-full bg-[#eff5f9] py-2 pl-9 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                            </label>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-3">
                            <button className="inline-flex items-center gap-1 rounded-full bg-[#2e95f3] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#145589]">
                                <Plus className="h-4 w-4" />
                                <span>New Link</span>
                            </button>
                            <button className="p-2 rounded-full hover:bg-slate-100">
                                <Filter className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="px-6 py-5">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-4 bg-[#eff5f9] rounded-2xl shadow-sm">
                                <div className="text-2xl font-bold text-[#2e95f3]">7</div>
                                <div className="text-xs text-[#839aac] font-medium">Active Links</div>
                            </div>
                            <div className="text-center p-4 bg-[#eff5f9] rounded-2xl shadow-sm">
                                <div className="text-2xl font-bold text-emerald-600">142</div>
                                <div className="text-xs text-[#839aac] font-medium">Total Views</div>
                            </div>
                            <div className="text-center p-4 bg-[#eff5f9] rounded-2xl shadow-sm">
                                <div className="text-2xl font-bold text-purple-600">23</div>
                                <div className="text-xs text-[#839aac] font-medium">Requests</div>
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex space-x-1 bg-[#eff5f9] rounded-lg p-1 mb-6">
                            {['All Links', 'Active', 'Paused', 'Expired'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === tab
                                        ? 'bg-[#2e95f3] text-white'
                                        : 'text-slate-600 hover:bg-white'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Featured Link */}
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden shadow-md mb-6">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
                            <div className="relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                                            <Star className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Most Popular Link</h3>
                                            <p className="text-purple-100 text-sm">Coffee Chats</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold">87</div>
                                        <div className="text-purple-100 text-xs">views this week</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Eye className="text-purple-200" size={16} />
                                            <span>87 views</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <CalendarCheck className="text-purple-200" size={16} />
                                            <span>12 requests</span>
                                        </div>
                                    </div>
                                    <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Links Grid */}
                        <div className="space-y-4">
                            {/* Link Card Example */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                                            <Coffee className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-lg">Coffee Chats</h3>
                                            <p className="text-gray-500 text-sm mb-2">For friends and networking</p>
                                            <div className="flex items-center space-x-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-green-600 text-xs font-medium">Active</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <MoreVertical className="text-gray-400" size={20} />
                                    </button>
                                </div>

                                <div className="bg-[#eff5f9] rounded-xl p-4 mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500 font-medium">LINK URL</span>
                                        <button
                                            onClick={() => handleCopy('coffee', 'sparetime.me/you/coffee-chats')}
                                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                                        >
                                            {copiedId === 'coffee' ? <Check className="text-green-500" size={14} /> : <Copy className="text-gray-500" size={14} />}
                                        </button>
                                    </div>
                                    <p className="text-blue-600 font-mono text-sm">sparetime.me/you/coffee-chats</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-800">87</div>
                                        <div className="text-xs text-gray-500">Views</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-800">12</div>
                                        <div className="text-xs text-gray-500">Requests</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-gray-800">8</div>
                                        <div className="text-xs text-gray-500">Booked</div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Eye className="text-blue-600" size={12} />
                                        </div>
                                        <span className="text-sm text-gray-600">Shows busy times</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button className="px-4 py-2 bg-white border border-[#c3d5e0] text-slate-700 rounded-full text-sm font-medium hover:text-sky-700 transition-colors">
                                            Edit
                                        </button>
                                        <button className="px-4 py-2 bg-white border border-[#c3d5e0] text-slate-700 rounded-full text-sm font-medium hover:text-sky-700 transition-colors">
                                            Share
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Add more link cards here with similar structure... */}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
