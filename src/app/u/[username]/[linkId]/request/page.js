'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Mail, MessageSquare, Send } from 'lucide-react';

export default function GuestRequestForm({ params }) {
    const [selectedSlots, setSelectedSlots] = useState([]);

    const availableSlots = [
        { date: '2025-10-25', time: '10:00 AM', available: true },
        { date: '2025-10-25', time: '2:00 PM', available: true },
        { date: '2025-10-26', time: '9:00 AM', available: true },
        { date: '2025-10-26', time: '3:00 PM', available: true },
        { date: '2025-10-27', time: '11:00 AM', available: true },
    ];

    const toggleSlot = (slot) => {
        const key = `${slot.date}-${slot.time}`;
        setSelectedSlots(prev =>
            prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#22b573] to-[#6e92a0] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calendar className="text-white" size={28} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Request Time with Maya</h1>
                    <p className="text-muted-foreground">Fill out the form below to request a meeting</p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Meeting Request Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            {/* Requester Info */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Your Information</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <Input
                                                id="name"
                                                placeholder="Enter your name"
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                className="pl-10"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Meeting Details */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Meeting Details</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="purpose">Meeting Purpose *</Label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-3 text-muted-foreground" size={18} />
                                        <Input
                                            id="purpose"
                                            placeholder="e.g., Project discussion, Coffee chat"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="duration">Duration *</Label>
                                        <Select defaultValue="30">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="15">15 minutes</SelectItem>
                                                <SelectItem value="30">30 minutes</SelectItem>
                                                <SelectItem value="45">45 minutes</SelectItem>
                                                <SelectItem value="60">1 hour</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="urgency">Urgency</Label>
                                        <Select defaultValue="normal">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                                <SelectItem value="urgent">Urgent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Preferred Time Slots */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Select Preferred Time Slots</h3>
                                <p className="text-sm text-muted-foreground">Choose up to 3 preferred times</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {availableSlots.map((slot, i) => {
                                        const key = `${slot.date}-${slot.time}`;
                                        const isSelected = selectedSlots.includes(key);
                                        const date = new Date(slot.date);
                                        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                                        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => toggleSlot(slot)}
                                                disabled={selectedSlots.length >= 3 && !isSelected}
                                                className={`p-4 rounded-lg border-2 text-left transition-all ${isSelected
                                                        ? 'border-[#6e92a0] bg-[#6e92a0]/10'
                                                        : 'border-gray-200 hover:border-[#6e92a0]/50'
                                                    } ${selectedSlots.length >= 3 && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <Calendar size={20} className="text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{dayName}, {monthDay}</div>
                                                        <div className="text-sm text-muted-foreground">{slot.time}</div>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="ml-auto w-5 h-5 bg-[#6e92a0] rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs">✓</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Additional Message */}
                            <div className="space-y-2">
                                <Label htmlFor="message">Additional Message (Optional)</Label>
                                <Textarea
                                    id="message"
                                    placeholder="Any additional information you'd like to share..."
                                    rows={4}
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex gap-3">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-1 bg-[#6e92a0] hover:bg-[#5a7a85]"
                                >
                                    <Send className="mr-2" size={18} />
                                    Send Request
                                </Button>
                                <Link href={`/u/${params?.username}/${params?.linkId}`}>
                                    <Button type="button" variant="outline" size="lg">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
