import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Plus, Eye, MessageSquare, Clock } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-primary">Welcome, Maya</h1>
                <p className="text-muted-foreground">Tuesday, October 24</p>
            </div>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">Active Links (3)</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link href="/dashboard/links/1" className="block group">
                        <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">Friends Link</CardTitle>
                                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Eye size={16} />
                                        <span>12 views</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare size={16} />
                                        <span>2 requests</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>

                    <Link href="/dashboard/links/2" className="block group">
                        <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">Work Link</CardTitle>
                                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Eye size={16} />
                                        <span>5 views</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MessageSquare size={16} />
                                        <span>1 request</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    </Link>

                    <Link href="/dashboard/links/create" className="block h-full">
                        <Card className="h-full border-dashed flex flex-col items-center justify-center p-6 hover:bg-secondary/10 hover:border-primary transition-all cursor-pointer min-h-[180px]">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-3">
                                <Plus size={24} />
                            </div>
                            <span className="font-medium text-primary">Create New Link</span>
                        </Card>
                    </Link>
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">Pending Requests (2)</h2>
                </div>
                <div className="space-y-3">
                    <Card className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold">Coffee with Sam</h3>
                                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">Tomorrow at 3:30pm</span>
                            </div>
                            <p className="text-sm text-muted-foreground">"Hey! Long time no see. Are you free for a quick coffee?"</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button size="sm" className="flex-1 sm:flex-none">Accept</Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Decline</Button>
                        </div>
                    </Card>

                    <Card className="p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold">Project Sync</h3>
                                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">Mon, Oct 30 at 10:00am</span>
                            </div>
                            <p className="text-sm text-muted-foreground">"Sync up on the Q4 roadmap."</p>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button size="sm" className="flex-1 sm:flex-none">Accept</Button>
                            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Decline</Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
