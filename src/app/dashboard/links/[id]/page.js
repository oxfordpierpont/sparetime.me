'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, MoreVertical, ChevronDown } from 'lucide-react';

export default function LinkEditPage({ params }) {
    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200 px-4 py-3 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <Link href="/dashboard/links" className="flex items-center text-neutral-600 hover:text-neutral-900">
                        <ArrowLeft size={20} className="mr-2" />
                        <span className="text-sm font-medium">Back</span>
                    </Link>
                    <h1 className="text-lg font-semibold text-neutral-900">Create Link</h1>
                    <Button variant="ghost" size="icon">
                        <MoreVertical size={20} className="text-neutral-600" />
                    </Button>
                </div>
            </header>

            {/* Form Section */}
            <section className="px-6 py-6 max-w-2xl mx-auto">
                <form className="space-y-8">
                    {/* Link Name */}
                    <div className="space-y-2">
                        <Label htmlFor="linkName">Link Name</Label>
                        <Input id="linkName" placeholder="e.g., Coffee Chat, Team Meeting" className="text-base" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea id="description" placeholder="Brief description of what this availability is for" className="h-24 text-base" />
                    </div>

                    {/* Recipients */}
                    <div className="space-y-3">
                        <Label>Who can use this link?</Label>
                        <RadioGroup defaultValue="specific">
                            <div className="flex items-start space-x-3 space-y-0">
                                <RadioGroupItem value="anyone" id="anyone" className="mt-1" />
                                <div className="grid gap-0.5">
                                    <Label htmlFor="anyone" className="font-medium text-neutral-900">Anyone with the link</Label>
                                    <p className="text-xs text-neutral-600">Public - anyone can book time</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3 space-y-0 mt-3">
                                <RadioGroupItem value="specific" id="specific" className="mt-1" />
                                <div className="grid gap-0.5">
                                    <Label htmlFor="specific" className="font-medium text-neutral-900">Specific people only</Label>
                                    <p className="text-xs text-neutral-600">Private - only people you share with</p>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Duration Options */}
                    <div className="space-y-3">
                        <Label>Meeting Duration Options</Label>
                        <div className="grid grid-cols-3 gap-3">
                            <Button type="button" variant="default" className="w-full text-sm">15 min</Button>
                            <Button type="button" variant="outline" className="w-full text-sm">30 min</Button>
                            <Button type="button" variant="outline" className="w-full text-sm">45 min</Button>
                            <Button type="button" variant="outline" className="w-full text-sm">1 hour</Button>
                            <Button type="button" variant="outline" className="w-full text-sm">2 hours</Button>
                            <Button type="button" variant="outline" className="w-full text-sm">Custom</Button>
                        </div>
                    </div>

                    {/* Calendar Selection */}
                    <div className="space-y-3">
                        <Label>Show availability from</Label>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="cal-work" defaultChecked />
                                    <div>
                                        <Label htmlFor="cal-work" className="text-sm font-medium text-neutral-900">Work Calendar</Label>
                                        <p className="text-xs text-neutral-600">john@company.com</p>
                                    </div>
                                </div>
                                {/* Google Icon Placeholder */}
                                <div className="w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center text-[10px] text-neutral-600">G</div>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Checkbox id="cal-personal" />
                                    <div>
                                        <Label htmlFor="cal-personal" className="text-sm font-medium text-neutral-900">Personal Calendar</Label>
                                        <p className="text-xs text-neutral-600">john.personal@gmail.com</p>
                                    </div>
                                </div>
                                {/* Google Icon Placeholder */}
                                <div className="w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center text-[10px] text-neutral-600">G</div>
                            </div>
                        </div>
                    </div>

                    {/* Availability Window */}
                    <div className="space-y-3">
                        <Label>Availability Window</Label>
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs text-neutral-600">From</Label>
                                <Select defaultValue="today">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select start" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                                        <SelectItem value="3days">In 3 days</SelectItem>
                                        <SelectItem value="nextweek">Next week</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs text-neutral-600">Until</Label>
                                <Select defaultValue="noend">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select end" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="noend">No end date</SelectItem>
                                        <SelectItem value="1week">In 1 week</SelectItem>
                                        <SelectItem value="2weeks">In 2 weeks</SelectItem>
                                        <SelectItem value="1month">In 1 month</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Time Preferences */}
                    <div className="space-y-4">
                        <Label>Time Preferences</Label>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="work-hours" className="text-sm font-medium text-neutral-700">Use my work hours (9 AM - 5 PM)</Label>
                                <Switch id="work-hours" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="weekend" className="text-sm font-medium text-neutral-700">Allow weekend bookings</Label>
                                <Switch id="weekend" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="buffer" className="text-sm font-medium text-neutral-700">Buffer time between meetings</Label>
                                <Select defaultValue="15min">
                                    <SelectTrigger className="w-[100px]">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                        <SelectItem value="15min">15 min</SelectItem>
                                        <SelectItem value="30min">30 min</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Settings */}
                    <div>
                        <Button variant="ghost" type="button" className="w-full flex items-center justify-between px-0 hover:bg-transparent">
                            <span className="text-sm font-medium text-neutral-700">Advanced Settings</span>
                            <ChevronDown size={16} className="text-neutral-500" />
                        </Button>
                    </div>

                    {/* Message Template */}
                    <div className="space-y-2">
                        <Label htmlFor="message">Custom Message (Optional)</Label>
                        <Textarea id="message" placeholder="Add a personal message that recipients will see when booking" className="h-24 text-base" />
                    </div>
                </form>
            </section>

            {/* Action Buttons */}
            <section className="px-6 py-4 border-t border-neutral-200 bg-white sticky bottom-0">
                <div className="max-w-2xl mx-auto space-y-3">
                    <Button className="w-full py-6 text-base">CREATE LINK</Button>
                    <Button variant="outline" className="w-full py-6 text-base">SAVE AS DRAFT</Button>
                </div>
            </section>
        </div>
    );
}
