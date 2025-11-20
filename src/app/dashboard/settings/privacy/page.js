'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Shield, Lock, Eye, Trash2, Download } from 'lucide-react';

export default function PrivacySettings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-4 mb-2">
                    <Link href="/dashboard/settings">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2" size={16} />
                            Settings
                        </Button>
                    </Link>
                </div>
                <h1 className="text-3xl font-bold">Privacy & Security</h1>
                <p className="text-muted-foreground">Manage your privacy and security settings</p>
            </div>

            {/* Privacy Controls */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Eye size={20} />
                        Privacy Controls
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Show Profile in Search</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow your profile to appear in search results
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Public Availability</Label>
                            <p className="text-sm text-muted-foreground">
                                Allow anyone with your link to see your availability
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Show Calendar Details</Label>
                            <p className="text-sm text-muted-foreground">
                                Show event titles and descriptions in availability view
                            </p>
                        </div>
                        <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Allow Anonymous Requests</Label>
                            <p className="text-sm text-muted-foreground">
                                Let people request time without creating an account
                            </p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Security */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock size={20} />
                        Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <div className="font-medium">Password</div>
                            <div className="text-sm text-muted-foreground">Last changed 3 months ago</div>
                        </div>
                        <Button variant="outline" size="sm">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-muted-foreground">
                                Add an extra layer of security
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Enable 2FA</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <div className="font-medium">Active Sessions</div>
                            <div className="text-sm text-muted-foreground">
                                Manage devices where you're logged in
                            </div>
                        </div>
                        <Button variant="outline" size="sm">View Sessions</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield size={20} />
                        Data Management
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <div className="font-medium">Download Your Data</div>
                            <div className="text-sm text-muted-foreground">
                                Get a copy of all your SpareTime data
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2" size={16} />
                            Download
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50">
                        <div>
                            <div className="font-medium text-red-900">Delete Account</div>
                            <div className="text-sm text-red-700">
                                Permanently delete your account and all data
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-100">
                            <Trash2 className="mr-2" size={16} />
                            Delete
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Connected Apps */}
            <Card>
                <CardHeader>
                    <CardTitle>Connected Apps & Calendars</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-medium">Google Calendar</div>
                                <div className="text-sm text-muted-foreground">Connected</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600">Disconnect</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
