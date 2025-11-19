'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, ChevronRight, Calendar } from 'lucide-react';

export default function ConnectCalendar() {
    const router = useRouter();
    const [connected, setConnected] = useState({
        google: false,
        apple: false,
        outlook: false
    });

    const toggleConnect = (provider) => {
        setConnected(prev => ({ ...prev, [provider]: !prev[provider] }));
    };

    const handleContinue = () => {
        router.push('/preferences');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="p-4 border-b flex items-center justify-between bg-card">
                <Link href="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <span className="text-sm font-medium text-muted-foreground">Step 2 of 3</span>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full p-6 flex flex-col justify-center">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-primary mb-2">Connect Your Calendar</h1>
                    <p className="text-muted-foreground">Connect your calendar to automatically show your availability</p>
                </div>

                <div className="space-y-4 mb-8">
                    {[
                        { id: 'google', name: 'Google Calendar' },
                        { id: 'apple', name: 'Apple Calendar' },
                        { id: 'outlook', name: 'Outlook Calendar' }
                    ].map((provider) => (
                        <button
                            key={provider.id}
                            className={`w-full p-4 rounded-lg border-2 flex items-center justify-between transition-all ${connected[provider.id]
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border bg-card hover:border-primary/50'
                                }`}
                            onClick={() => toggleConnect(provider.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                                    <Calendar size={20} />
                                </div>
                                <span className="font-medium text-foreground">{provider.name}</span>
                            </div>
                            {connected[provider.id] ? (
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                    <Check size={14} />
                                </div>
                            ) : (
                                <ChevronRight size={20} className="text-muted-foreground" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="text-center mb-6">
                    <Link href="/preferences" className="text-sm text-muted-foreground hover:text-primary underline">
                        Skip for now
                    </Link>
                </div>

                <Button size="lg" className="w-full" onClick={handleContinue}>Continue</Button>
            </main>

            <div className="h-2 bg-secondary w-full">
                <div className="h-full bg-primary w-2/3 transition-all duration-500"></div>
            </div>
        </div>
    );
}
