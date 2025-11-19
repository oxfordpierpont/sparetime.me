'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Clock, Check } from 'lucide-react';

export default function PublicLinkView() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center p-4 sm:p-8">
            <header className="w-full max-w-3xl flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">
                        M
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-foreground">Maya Smith</h1>
                        <p className="text-sm text-muted-foreground">Work Schedule</p>
                    </div>
                </div>
                <Button variant="outline" size="sm">
                    Powered by SpareTime
                </Button>
            </header>

            <main className="w-full max-w-3xl space-y-6">
                <Card>
                    <div className="p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon">
                                <ChevronLeft size={20} />
                            </Button>
                            <h2 className="font-bold text-lg">October 24, 2025</h2>
                            <Button variant="ghost" size="icon">
                                <ChevronRight size={20} />
                            </Button>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                <span>Busy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                <span>Negotiable</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span>Available</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Timeline */}
                        <div className="relative pl-8 border-l-2 border-border space-y-8">
                            {/* 9:00 AM - Busy */}
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 text-sm text-muted-foreground w-12 text-right">9:00 AM</div>
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-800 text-sm font-medium">
                                    Busy
                                </div>
                            </div>

                            {/* 10:00 AM - Negotiable */}
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 text-sm text-muted-foreground w-12 text-right">10:00 AM</div>
                                <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-100 text-yellow-800 text-sm font-medium flex justify-between items-center">
                                    <span>Busy (Negotiable)</span>
                                    <span className="text-xs bg-yellow-200 px-2 py-0.5 rounded text-yellow-900">High Priority Only</span>
                                </div>
                            </div>

                            {/* 11:00 AM - Available */}
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 text-sm text-muted-foreground w-12 text-right">11:00 AM</div>
                                <div className="h-12 border-2 border-dashed border-green-200 rounded-lg bg-green-50/50 flex items-center justify-center text-green-600 text-sm font-medium hover:bg-green-50 transition-colors cursor-pointer">
                                    Available
                                </div>
                            </div>

                            {/* 12:00 PM - Busy */}
                            <div className="relative">
                                <div className="absolute -left-[41px] top-0 text-sm text-muted-foreground w-12 text-right">12:00 PM</div>
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-800 text-sm font-medium">
                                    Busy
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="bg-secondary/10 border-primary/20">
                    <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-center">
                        <div className="flex-1 w-full">
                            <h3 className="font-bold text-lg mb-1">Request a time</h3>
                            <p className="text-sm text-muted-foreground mb-4">Propose a meeting time with Maya</p>
                            <div className="flex gap-2 flex-wrap mb-4">
                                <span className="px-3 py-1 rounded-full bg-background border text-sm cursor-pointer hover:border-primary hover:text-primary transition-colors">11:00 AM</span>
                                <span className="px-3 py-1 rounded-full bg-background border text-sm cursor-pointer hover:border-primary hover:text-primary transition-colors">2:00 PM</span>
                                <span className="px-3 py-1 rounded-full bg-background border text-sm cursor-pointer hover:border-primary hover:text-primary transition-colors">4:30 PM</span>
                            </div>
                            <div className="flex gap-2">
                                <Input placeholder="Or type a message..." className="bg-background" />
                                <Button>Send</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
