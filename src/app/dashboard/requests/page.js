'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Filter, Calendar, Check, X, ChevronRight, CheckCircle, XCircle, Eye } from 'lucide-react';

export default function RequestsPage() {
    return (
        <div className="space-y-6 pb-20">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Requests</h1>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <Filter size={16} />
                </Button>
            </header>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="approved">Approved</TabsTrigger>
                    <TabsTrigger value="declined">Declined</TabsTrigger>
                </TabsList>

                <div className="py-3 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">12 requests</span>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-neutral-500 rounded-full"></span>
                        <span className="text-sm text-muted-foreground">3 urgent</span>
                    </div>
                </div>

                <TabsContent value="all" className="space-y-4 mt-0">
                    {/* Urgent Request */}
                    <Card className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=1234" />
                                    <AvatarFallback>SJ</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-foreground text-sm">Sarah Johnson</h3>
                                    <p className="text-xs text-muted-foreground">sarah.j@company.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">Urgent</span>
                                <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">Pending</span>
                            </div>
                        </div>

                        <div className="mb-3">
                            <p className="font-medium text-foreground text-sm mb-1">Project Planning Meeting</p>
                            <p className="text-xs text-muted-foreground mb-2">Need 1 hour to discuss Q1 roadmap priorities</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar size={12} className="mr-1" />
                                <span>Requested for: Jan 15-17, 2025</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button className="flex-1 h-9 text-sm">
                                <Check size={14} className="mr-1" /> Approve
                            </Button>
                            <Button variant="outline" className="flex-1 h-9 text-sm">
                                <X size={14} className="mr-1" /> Decline
                            </Button>
                            <Button variant="outline" size="icon" className="h-9 w-10">
                                <ChevronRight size={16} className="text-muted-foreground" />
                            </Button>
                        </div>
                    </Card>

                    {/* Regular Request */}
                    <Card className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=5678" />
                                    <AvatarFallback>MC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-foreground text-sm">Mike Chen</h3>
                                    <p className="text-xs text-muted-foreground">mike.chen@partner.com</p>
                                </div>
                            </div>
                            <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">Pending</span>
                        </div>

                        <div className="mb-3">
                            <p className="font-medium text-foreground text-sm mb-1">Coffee Chat</p>
                            <p className="text-xs text-muted-foreground mb-2">Catch up and discuss potential collaboration</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar size={12} className="mr-1" />
                                <span>Requested for: Jan 20-22, 2025</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button className="flex-1 h-9 text-sm">
                                <Check size={14} className="mr-1" /> Approve
                            </Button>
                            <Button variant="outline" className="flex-1 h-9 text-sm">
                                <X size={14} className="mr-1" /> Decline
                            </Button>
                            <Button variant="outline" size="icon" className="h-9 w-10">
                                <ChevronRight size={16} className="text-muted-foreground" />
                            </Button>
                        </div>
                    </Card>

                    {/* Approved Request */}
                    <Card className="p-4 opacity-75">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=9101" />
                                    <AvatarFallback>ED</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-foreground text-sm">Emma Davis</h3>
                                    <p className="text-xs text-muted-foreground">emma.d@startup.io</p>
                                </div>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Approved</span>
                        </div>

                        <div className="mb-3">
                            <p className="font-medium text-foreground text-sm mb-1">Design Review</p>
                            <p className="text-xs text-muted-foreground mb-2">Review new app mockups and provide feedback</p>
                            <div className="flex items-center text-xs text-muted-foreground mb-2">
                                <Calendar size={12} className="mr-1" />
                                <span>Scheduled: Jan 14, 2025 at 2:00 PM</span>
                            </div>
                            <div className="flex items-center text-xs text-green-600">
                                <CheckCircle size={12} className="mr-1" />
                                <span>Calendar event created</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full h-9 text-sm">
                            <Eye size={14} className="mr-1" /> View Details
                        </Button>
                    </Card>

                    {/* Declined Request */}
                    <Card className="p-4 opacity-75">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=1122" />
                                    <AvatarFallback>AR</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-foreground text-sm">Alex Rodriguez</h3>
                                    <p className="text-xs text-muted-foreground">alex.r@agency.com</p>
                                </div>
                            </div>
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">Declined</span>
                        </div>

                        <div className="mb-3">
                            <p className="font-medium text-foreground text-sm mb-1">Strategy Session</p>
                            <p className="text-xs text-muted-foreground mb-2">Discuss marketing approach for new product</p>
                            <div className="flex items-center text-xs text-muted-foreground mb-2">
                                <Calendar size={12} className="mr-1" />
                                <span>Requested for: Jan 10-12, 2025</span>
                            </div>
                            <div className="flex items-center text-xs text-red-600">
                                <XCircle size={12} className="mr-1" />
                                <span>Declined - Schedule conflict</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full h-9 text-sm">
                            <Eye size={14} className="mr-1" /> View Details
                        </Button>
                    </Card>

                    <div className="text-center py-4">
                        <button className="text-sm text-muted-foreground underline hover:text-foreground">Load more requests</button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
