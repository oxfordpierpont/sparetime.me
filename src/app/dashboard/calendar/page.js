'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function CalendarView() {
    const [view, setView] = useState('Month');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Mock calendar grid generation
    const generateCalendarDays = () => {
        const daysArr = [];
        for (let i = 1; i <= 31; i++) {
            daysArr.push(i);
        }
        return daysArr;
    };

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-primary">October 2025</h1>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ChevronLeft size={16} />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="flex bg-secondary/30 p-1 rounded-lg">
                        {['Day', 'Week', 'Month'].map((v) => (
                            <button
                                key={v}
                                onClick={() => setView(v)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${view === v
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" size="icon" className="sm:hidden ml-auto">
                        <Filter size={16} />
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* Sidebar Filters - Hidden on mobile */}
                <div className="hidden lg:block w-64 space-y-6 overflow-y-auto pr-2">
                    <Card className="p-4 space-y-4">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Calendars</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                                <span className="text-sm">Work</span>
                                <span className="w-2 h-2 rounded-full bg-blue-500 ml-auto"></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-green-500 focus:ring-green-500" />
                                <span className="text-sm">Personal</span>
                                <span className="w-2 h-2 rounded-full bg-green-500 ml-auto"></span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 space-y-4">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Categories</h3>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                <span className="text-sm">Protected Time</span>
                                <div className="ml-auto px-1.5 py-0.5 bg-gray-200 text-gray-700 text-[10px] rounded">LOCKED</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                <span className="text-sm">Artificial Busy</span>
                                <div className="ml-auto px-1.5 py-0.5 bg-purple-100 text-purple-700 text-[10px] rounded">FAKE</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Calendar Grid */}
                <Card className="flex-1 flex flex-col overflow-hidden">
                    <div className="grid grid-cols-7 border-b">
                        {days.map(day => (
                            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 grid grid-cols-7 grid-rows-5">
                        {generateCalendarDays().map(day => (
                            <div key={day} className="border-b border-r last:border-r-0 p-2 min-h-[100px] relative hover:bg-secondary/5 transition-colors group">
                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{day}</span>

                                {/* Mock Events */}
                                {day === 12 && (
                                    <div className="mt-2 p-1.5 rounded text-xs font-medium bg-blue-100 text-blue-700 truncate">
                                        Team Sync
                                    </div>
                                )}
                                {day === 12 && (
                                    <div className="mt-1 p-1.5 rounded text-xs font-medium bg-gray-100 text-gray-600 truncate border border-gray-200">
                                        Lunch (Protected)
                                    </div>
                                )}
                                {day === 15 && (
                                    <div className="mt-2 p-1.5 rounded text-xs font-medium bg-green-100 text-green-700 truncate">
                                        Dentist Appt
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
