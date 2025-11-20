'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarMain() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Calendar</h1>
                <div className="flex gap-2">
                    <Link href="/dashboard/calendar/day">
                        <Button variant="outline" size="sm">Day</Button>
                    </Link>
                    <Link href="/dashboard/calendar/week">
                        <Button variant="outline" size="sm">Week</Button>
                    </Link>
                    <Button variant="default" size="sm">Month</Button>
                </div>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                    <ChevronLeft size={16} className="mr-1" />
                    Previous
                </Button>
                <h2 className="text-xl font-semibold">October 2025</h2>
                <Button variant="ghost" size="sm">
                    Next
                    <ChevronRight size={16} className="ml-1" />
                </Button>
            </div>

            {/* Calendar Grid - Simple Month View */}
            <div className="bg-white rounded-lg border p-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 2; // Start from -2 to show previous month days
                        const isCurrentMonth = day >= 1 && day <= 31;
                        const isToday = day === 24;

                        return (
                            <div
                                key={i}
                                className={`aspect-square p-2 rounded-lg border ${isCurrentMonth ? 'hover:bg-accent cursor-pointer' : 'opacity-30'
                                    } ${isToday ? 'bg-blue-100 border-blue-300' : ''}`}
                            >
                                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                                    {isCurrentMonth ? day : ''}
                                </div>
                                {isCurrentMonth && day === 24 && (
                                    <div className="mt-1 space-y-1">
                                        <div className="w-full h-1 bg-red-400 rounded"></div>
                                        <div className="w-full h-1 bg-green-400 rounded"></div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-red-400 rounded"></div>
                    <span>Busy</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-green-400 rounded"></div>
                    <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-1 bg-yellow-400 rounded"></div>
                    <span>Negotiable</span>
                </div>
            </div>
        </div>
    );
}
