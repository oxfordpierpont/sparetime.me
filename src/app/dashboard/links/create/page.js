'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, Eye } from 'lucide-react';

export default function CreateLink() {
    const [settings, setSettings] = useState({
        showEventLabels: false,
        showNegotiable: true,
        detailLevel: 'minimal'
    });

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold text-primary">Create Link</h1>
                </div>
                <Button>Save Link</Button>
            </header>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Link Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="linkName">Link Name</Label>
                                <Input id="linkName" placeholder="e.g. Work, Friends, Family" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="target">For (optional)</Label>
                                <Input id="target" placeholder="Specific person or group" />
                            </div>

                            <div className="space-y-2">
                                <Label>Custom URL</Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-sm whitespace-nowrap">sparetime.me/maya/</span>
                                    <div className="relative flex-1">
                                        <Input placeholder="link-id" defaultValue="work-schedule" className="pr-10" />
                                        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Visibility Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Show event labels</Label>
                                    <p className="text-sm text-muted-foreground">Allow viewers to see titles of your events</p>
                                </div>
                                <Switch
                                    checked={settings.showEventLabels}
                                    onCheckedChange={(checked) => updateSetting('showEventLabels', checked)}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Show negotiable status</Label>
                                    <p className="text-sm text-muted-foreground">Reveal which busy times are actually flexible</p>
                                </div>
                                <Switch
                                    checked={settings.showNegotiable}
                                    onCheckedChange={(checked) => updateSetting('showNegotiable', checked)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Detail level</Label>
                                <Select
                                    value={settings.detailLevel}
                                    onValueChange={(value) => updateSetting('detailLevel', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select detail level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="minimal">Minimal (Busy/Free only)</SelectItem>
                                        <SelectItem value="standard">Standard (Time blocks)</SelectItem>
                                        <SelectItem value="full">Full (Event details)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-sm text-muted-foreground">Controls how much information is shared with viewers</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Custom Message</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="Add a message for people viewing this link..."
                                rows={4}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Calendars</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                    <span className="font-medium text-sm">Work Calendar</span>
                                </div>
                                <Select defaultValue="busy">
                                    <SelectTrigger className="w-[100px] h-8 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="busy">Busy</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="hidden">Hidden</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span className="font-medium text-sm">Personal Calendar</span>
                                </div>
                                <Select defaultValue="hidden">
                                    <SelectTrigger className="w-[100px] h-8 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="busy">Busy</SelectItem>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="hidden">Hidden</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                            <Eye size={16} className="mr-2" /> Preview Link
                        </Button>
                        <Button className="w-full">Share Link</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
