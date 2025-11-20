'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Shield, Bell, Palette, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';

export default function Settings() {
    const settingsSections = [
        { icon: User, title: 'Profile Settings', description: 'Manage your account and public profile', href: '/dashboard/settings/profile', color: 'bg-blue-100 text-blue-600' },
        { icon: Shield, title: 'Privacy & Security', description: 'Control your privacy and security settings', href: '/dashboard/settings/privacy', color: 'bg-green-100 text-green-600' },
        { icon: Bell, title: 'Notifications', description: 'Manage email and push notifications', href: '/dashboard/settings/notifications', color: 'bg-purple-100 text-purple-600' },
        { icon: Palette, title: 'Appearance', description: 'Customize your SpareTime experience', href: '/dashboard/settings/appearance', color: 'bg-orange-100 text-orange-600' },
        { icon: Globe, title: 'Language & Region', description: 'Set your language and timezone', href: '/dashboard/settings/region', color: 'bg-teal-100 text-teal-600' },
        { icon: HelpCircle, title: 'Help & Support', description: 'Get help and contact support', href: '/dashboard/settings/support', color: 'bg-pink-100 text-pink-600' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {settingsSections.map((section, i) => (
                    <Link key={i} href={section.href}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.color}`}>
                                            <section.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{section.title}</h3>
                                            <p className="text-sm text-muted-foreground">{section.description}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-muted-foreground" size={20} />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                                <LogOut size={24} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Log Out</h3>
                                <p className="text-sm text-muted-foreground">Sign out of your account</p>
                            </div>
                        </div>
                        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-100">
                            Log Out
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
