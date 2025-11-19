'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
    ChevronRight,
    Bell,
    Shield,
    Lock,
    Calendar,
    Clock,
    RefreshCw,
    Palette,
    Globe,
    Moon,
    HelpCircle,
    Mail,
    Star,
    LogOut,
    Trash2
} from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-6 pb-20">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            </header>

            {/* Profile Section */}
            <Card className="p-4">
                <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=847291" alt="Profile" />
                        <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-foreground">Sarah Johnson</h2>
                        <p className="text-sm text-muted-foreground">sarah.johnson@email.com</p>
                    </div>
                    <Button variant="ghost" size="icon">
                        <ChevronRight size={20} className="text-muted-foreground" />
                    </Button>
                </div>
                <Button variant="secondary" className="w-full">EDIT PROFILE</Button>
            </Card>

            <div className="space-y-6">
                {/* Account Settings */}
                <Card className="overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-medium text-foreground">Account</h3>
                    </div>
                    <div className="divide-y divide-border">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Bell size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Notifications</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Shield size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Privacy</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Lock size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Password & Security</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                    </div>
                </Card>

                {/* Calendar Settings */}
                <Card className="overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-medium text-foreground">Calendar & Sync</h3>
                    </div>
                    <div className="divide-y divide-border">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Connected Calendars</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded">2</span>
                                <ChevronRight size={20} className="text-muted-foreground" />
                            </div>
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Time Preferences</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <RefreshCw size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Sync Settings</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                    </div>
                </Card>

                {/* App Preferences */}
                <Card className="overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-medium text-foreground">App Preferences</h3>
                    </div>
                    <div className="divide-y divide-border">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <Palette size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Theme</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">Light</span>
                                <ChevronRight size={20} className="text-muted-foreground" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <Globe size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Language</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">English</span>
                                <ChevronRight size={20} className="text-muted-foreground" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <Moon size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Reduce Motion</span>
                            </div>
                            <Switch />
                        </div>
                    </div>
                </Card>

                {/* Subscription */}
                <Card className="overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-medium text-foreground">Subscription</h3>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-foreground">Current Plan</span>
                            <span className="text-sm bg-secondary text-muted-foreground px-3 py-1 rounded-full">Free</span>
                        </div>
                        <Button className="w-full">UPGRADE TO PRO</Button>
                    </div>
                </Card>

                {/* Support */}
                <Card className="overflow-hidden">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-medium text-foreground">Help & Support</h3>
                    </div>
                    <div className="divide-y divide-border">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <HelpCircle size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Help Center</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Mail size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Contact Support</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Star size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Rate App</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                    </div>
                </Card>

                {/* Account Actions */}
                <Card className="overflow-hidden">
                    <div className="divide-y divide-border">
                        <button className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <LogOut size={20} className="text-muted-foreground" />
                                <span className="text-foreground">Sign Out</span>
                            </div>
                            <ChevronRight size={20} className="text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600">
                            <div className="flex items-center gap-3">
                                <Trash2 size={20} />
                                <span>Delete Account</span>
                            </div>
                            <ChevronRight size={20} className="text-red-400" />
                        </button>
                    </div>
                </Card>
            </div>

            <div className="text-center mt-8">
                <p className="text-xs text-muted-foreground">SpareTime v1.2.3</p>
            </div>
        </div>
    );
}
