'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, User, Mail, Link as LinkIcon, MapPin } from 'lucide-react';

export default function ProfileSettings() {
    const [profileImage, setProfileImage] = useState(null);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        <Link href="/dashboard/settings">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2" size={16} />
                                Settings
                            </Button>
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <p className="text-muted-foreground">Manage your public profile information</p>
                </div>
            </div>

            {/* Profile Photo */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Photo</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold text-3xl">
                            M
                        </div>
                        <div className="space-y-2">
                            <Button variant="outline">
                                <Upload className="mr-2" size={16} />
                                Upload Photo
                            </Button>
                            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name *</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                    <Input
                                        id="firstName"
                                        defaultValue="Maya"
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name *</Label>
                                <Input id="lastName" defaultValue="Smith" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="maya@example.com"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username *</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    id="username"
                                    defaultValue="maya-smith"
                                    className="pl-10"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your public URL: sparetime.app/u/maya-smith
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell others about yourself..."
                                rows={4}
                                defaultValue="Product designer and coffee enthusiast. Always happy to chat about design, startups, or grab a coffee!"
                            />
                            <p className="text-xs text-muted-foreground">Brief description for your profile. Max 200 characters.</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    id="location"
                                    placeholder="City, Country"
                                    defaultValue="San Francisco, CA"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                <Input
                                    id="website"
                                    placeholder="https://example.com"
                                    defaultValue="https://mayasmith.com"
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button type="submit" className="bg-[#6e92a0] hover:bg-[#5a7a85]">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Public Profile Preview */}
            <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Public Profile Preview</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        This is how others will see your profile when they view your availability links.
                    </p>
                    <Link href="/u/maya-smith">
                        <Button variant="outline" className="border-blue-300">
                            View Public Profile
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
