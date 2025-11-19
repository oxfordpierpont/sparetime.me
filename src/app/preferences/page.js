'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';

export default function Preferences() {
    const router = useRouter();
    const [workDays, setWorkDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const toggleDay = (day) => {
        if (workDays.includes(day)) {
            setWorkDays(workDays.filter(d => d !== day));
        } else {
            setWorkDays([...workDays, day]);
        }
    };

    const handleFinish = () => {
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="p-4 border-b flex items-center justify-between bg-card">
                <Link href="/connect-calendar" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <span className="text-sm font-medium text-muted-foreground">Step 3 of 3</span>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full p-6 flex flex-col justify-center">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-primary mb-2">Set Your Preferences</h1>
                    <p className="text-muted-foreground">Define when you're generally available for work</p>
                </div>

                <div className="space-y-6 mb-8">
                    <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select defaultValue="pst">
                            <SelectTrigger>
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pst">Pacific Time (US & Canada) (GMT-7)</SelectItem>
                                <SelectItem value="est">Eastern Time (US & Canada) (GMT-4)</SelectItem>
                                <SelectItem value="gmt">London (GMT+1)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Work Days</Label>
                        <div className="grid grid-cols-7 gap-2">
                            {days.map(day => (
                                <button
                                    key={day}
                                    className={`aspect-square rounded-md flex items-center justify-center text-sm font-medium transition-colors ${workDays.includes(day)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50'
                                        }`}
                                    onClick={() => toggleDay(day)}
                                >
                                    {day.charAt(0)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Default Work Hours</Label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="time"
                                    defaultValue="09:00"
                                    className="w-full p-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <span className="text-muted-foreground">to</span>
                            <div className="relative flex-1">
                                <input
                                    type="time"
                                    defaultValue="17:00"
                                    className="w-full p-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Protected Time</Label>
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
                                <Plus size={16} className="mr-1" /> Add
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                <div>
                                    <div className="font-medium text-sm">Lunch Break</div>
                                    <div className="text-xs text-muted-foreground">Every day • 12:00 PM - 1:00 PM</div>
                                </div>
                                <button className="text-muted-foreground hover:text-destructive transition-colors">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Button size="lg" className="w-full" onClick={handleFinish}>Let's Start</Button>
            </main>

            <div className="h-2 bg-secondary w-full">
                <div className="h-full bg-primary w-full transition-all duration-500"></div>
            </div>
        </div>
    );
}
