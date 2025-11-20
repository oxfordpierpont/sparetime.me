'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function GuestAvailability({ params }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const availableDates = {
        '2025-10-25': ['10:00 AM', '2:00 PM', '4:00 PM'],
        '2025-10-26': ['9:00 AM', '11:00 AM', '3:00 PM'],
        '2025-10-27': ['10:00 AM', '1:00 PM', '5:00 PM'],
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6e92a0] to-[#36454c] text-white py-12 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-[#36454c] text-2xl font-bold">M</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Maya Smith</h1>
                    <p className="text-gray-100 mb-4">Product Designer & Coffee Enthusiast</p>
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <Clock size={16} />
                        <span>30 min meeting</span>
                    </div>
                </div>
            </div>

            {/* Availability */}
            <div className="max-w-2xl mx-auto px-6 py-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Select a Time</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Calendar Mini View */}
                        <div>
                            <h3 className="font-semibold mb-3">Available Dates</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {Object.keys(availableDates).map(date => {
                                    const dateObj = new Date(date);
                                    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                                    const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                    const isSelected = selectedDate === date;

                                    return (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`p-4 rounded-lg border-2 text-center transition-all ${isSelected
                                                    ? 'border-[#6e92a0] bg-[#6e92a0]/10'
                                                    : 'border-gray-200 hover:border-[#6e92a0]/50'
                                                }`}
                                        >
                                            <div className="font-medium">{dayName}</div>
                                            <div className="text-sm text-muted-foreground">{monthDay}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time Slots */}
                        {selectedDate && (
                            <div>
                                <h3 className="font-semibold mb-3">Available Times - {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {availableDates[selectedDate].map(time => (
                                        <Link
                                            key={time}
                                            href={`/u/${params?.username}/${params?.linkId}/request`}
                                        >
                                            <Button
                                                variant="outline"
                                                className="w-full h-12 hover:bg-[#6e92a0] hover:text-white hover:border-[#6e92a0]"
                                            >
                                                <Clock className="mr-2" size={16} />
                                                {time}
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!selectedDate && (
                            <div className="text-center py-8 text-muted-foreground">
                                <Calendar className="mx-auto mb-2" size={48} />
                                <p>Select a date to view available times</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="mt-6 bg-blue-50 border-blue-100">
                    <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">About this meeting</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Clock size={16} />
                                30 minute duration
                            </li>
                            <li className="flex items-center gap-2">
                                <User size={16} />
                                One-on-one meeting
                            </li>
                            <li>All times shown in your local timezone</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
