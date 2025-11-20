'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, Users, Calendar, Link as LinkIcon, Clock, ChevronRight } from 'lucide-react';

export default function Analytics() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Analytics & Insights</h1>
                    <p className="text-muted-foreground">Track your availability performance</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Last 7 Days</Button>
                    <Button variant="outline" size="sm">Last 30 Days</Button>
                    <Button variant="outline" size="sm">All Time</Button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Eye className="text-blue-600" size={20} />
                            </div>
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <TrendingUp size={12} />
                                +23%
                            </span>
                        </div>
                        <div className="text-3xl font-bold">248</div>
                        <div className="text-sm text-muted-foreground">Total Views</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Users className="text-green-600" size={20} />
                            </div>
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <TrendingUp size={12} />
                                +15%
                            </span>
                        </div>
                        <div className="text-3xl font-bold">42</div>
                        <div className="text-sm text-muted-foreground">Time Requests</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Calendar className="text-purple-600" size={20} />
                            </div>
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <TrendingUp size={12} />
                                +8%
                            </span>
                        </div>
                        <div className="text-3xl font-bold">28</div>
                        <div className="text-sm text-muted-foreground">Meetings Scheduled</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                <LinkIcon className="text-orange-600" size={20} />
                            </div>
                        </div>
                        <div className="text-3xl font-bold">67%</div>
                        <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    </CardContent>
                </Card>
            </div>

            {/* Link Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Link Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: 'Coffee Chats', views: 98, requests: 18, conversions: '18%', color: 'bg-purple-500' },
                            { name: 'Work Meetings', views: 76, requests: 12, conversions: '16%', color: 'bg-blue-500' },
                            { name: 'Family Time', views: 45, requests: 8, conversions: '18%', color: 'bg-green-500' },
                            { name: '1-on-1s', views: 29, requests: 4, conversions: '14%', color: 'bg-orange-500' },
                        ].map((link, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`w-2 h-12 ${link.color} rounded-full`}></div>
                                    <div className="flex-1">
                                        <div className="font-semibold mb-1">{link.name}</div>
                                        <div className="flex gap-4 text-sm text-muted-foreground">
                                            <span>{link.views} views</span>
                                            <span>{link.requests} requests</span>
                                            <span>{link.conversions} conversion</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="text-muted-foreground" size={20} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Time Insights */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Peak Request Times</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { time: '2:00 PM - 3:00 PM', count: 12, percentage: 100 },
                                { time: '10:00 AM - 11:00 AM', count: 9, percentage: 75 },
                                { time: '3:00 PM - 4:00 PM', count: 7, percentage: 58 },
                                { time: '11:00 AM - 12:00 PM', count: 6, percentage: 50 },
                            ].map((slot, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{slot.time}</span>
                                        <span className="text-muted-foreground">{slot.count} requests</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${slot.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Response Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-[#6e92a0] mb-2">2.4h</div>
                                <div className="text-sm text-muted-foreground">Average Response Time</div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span>Within 1 hour</span>
                                    <span className="font-medium">45%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>1-4 hours</span>
                                    <span className="font-medium">30%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>4-24 hours</span>
                                    <span className="font-medium">20%</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span>24+ hours</span>
                                    <span className="font-medium">5%</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recommendations */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
                <CardContent className="p-6">
                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Recommendation</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Your "Coffee Chats" link has a 18% conversion rate, the highest among your links. Consider creating similar casual meeting links to increase engagement!
                            </p>
                            <Button size="sm" variant="outline" className="border-blue-300">
                                Create Similar Link
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
