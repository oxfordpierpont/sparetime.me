'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="space-y-6 pb-20">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
            </header>

            <div className="space-y-8 max-w-2xl mx-auto">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=847291" alt="Profile" />
                            <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md">
                            <Camera size={14} />
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Tap to change profile picture</p>
                </div>

                {/* Form Fields */}
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue="Sarah Johnson" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="sarah.johnson@email.com" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us a little about yourself"
                            className="h-32"
                            defaultValue="Product Designer based in San Francisco. Love coffee and clean code."
                        />
                        <p className="text-xs text-muted-foreground text-right">0/150 characters</p>
                    </div>

                    <div className="pt-4">
                        <Button className="w-full py-6 text-base">SAVE CHANGES</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
