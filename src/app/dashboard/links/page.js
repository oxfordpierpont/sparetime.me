'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, MoreVertical, Eye, Clock, Copy, Share2 } from 'lucide-react';

export default function LinksPage() {
    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Links</h1>
                <Link href="/dashboard/links/create">
                    <Button size="icon" className="rounded-full">
                        <Plus size={20} />
                    </Button>
                </Link>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">12</div>
                    <div className="text-xs text-muted-foreground">Active Links</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">247</div>
                    <div className="text-xs text-muted-foreground">Total Views</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">18</div>
                    <div className="text-xs text-muted-foreground">Requests</div>
                </Card>
            </div>

            {/* Filter Tabs */}
            <div className="bg-secondary/30 p-1 rounded-lg flex gap-1">
                <button className="flex-1 py-2 px-3 text-sm font-medium bg-background text-foreground rounded-md shadow-sm">All</button>
                <button className="flex-1 py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Active</button>
                <button className="flex-1 py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Expired</button>
            </div>

            {/* Links List */}
            <div className="space-y-4">
                {/* Work Team Link */}
                <Card className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">Work Team Meetings</h3>
                            <p className="text-sm text-muted-foreground">For team scheduling and project discussions</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} className="text-muted-foreground" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Eye size={14} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">42 views</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">8 requests</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Expires: Jan 15, 2025</span>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="h-7 text-xs px-2">
                                <Copy size={12} className="mr-1" /> Copy
                            </Button>
                            <Button variant="secondary" size="sm" className="h-7 text-xs px-2">
                                <Share2 size={12} className="mr-1" /> Share
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Client Consultations Link */}
                <Card className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">Client Consultations</h3>
                            <p className="text-sm text-muted-foreground">30-minute consultation slots for new clients</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} className="text-muted-foreground" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Eye size={14} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">156 views</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">23 requests</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">Active</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Expires: Feb 28, 2025</span>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="h-7 text-xs px-2">
                                <Copy size={12} className="mr-1" /> Copy
                            </Button>
                            <Button variant="secondary" size="sm" className="h-7 text-xs px-2">
                                <Share2 size={12} className="mr-1" /> Share
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Expired Link */}
                <Card className="p-4 opacity-60">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <h3 className="font-bold text-foreground mb-1">Holiday Planning</h3>
                            <p className="text-sm text-muted-foreground">December holiday coordination</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical size={16} className="text-muted-foreground" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Eye size={14} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">67 views</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">15 requests</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-neutral-500 rounded-full"></div>
                            <span className="text-xs text-muted-foreground">Expired</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Expired: Dec 31, 2024</span>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" className="h-7 text-xs px-2">Renew</Button>
                            <Button variant="secondary" size="sm" className="h-7 text-xs px-2">Archive</Button>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="pt-4 pb-20">
                <Link href="/dashboard/links/create">
                    <Button className="w-full py-6 text-base flex items-center gap-2">
                        <Plus size={20} />
                        CREATE NEW LINK
                    </Button>
                </Link>
            </div>
        </div>
    );
}
