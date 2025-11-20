'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Integrate with API to send reset email
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#f8faff] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center mb-6">
                        <Link href="/">
                            <Image
                                src="/logos/spareTme-logo-horizontal-header.png"
                                alt="SpareTime"
                                width={180}
                                height={45}
                                className="h-10 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <Card className="ios-card shadow-xl border-0">
                        <CardContent className="p-8 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <h2 className="text-title2 font-bold tracking-tight text-[#1a202c] mb-2">
                                Check your email
                            </h2>
                            <p className="text-sm text-muted-foreground mb-6">
                                We've sent password reset instructions to <strong>{email}</strong>
                            </p>
                            <p className="text-xs text-muted-foreground mb-6">
                                Didn't receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-[#2e95f3] hover:underline font-medium"
                                >
                                    try another email address
                                </button>
                            </p>
                            <Link href="/login">
                                <Button className="w-full ios-btn-primary">
                                    Back to Sign In
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8faff] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <Link href="/">
                        <Image
                            src="/logos/spareTme-logo-horizontal-header.png"
                            alt="SpareTime"
                            width={180}
                            height={45}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>
                <h2 className="text-center text-title2 font-bold tracking-tight text-[#1a202c]">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    Enter your email and we'll send you instructions to reset your password
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Card className="ios-card shadow-xl border-0">
                    <CardContent className="p-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-medium">Email address</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="ios-input pl-10"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <Button type="submit" className="w-full ios-btn-primary">
                                    Send reset instructions
                                </Button>
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="inline-flex items-center text-sm font-medium text-[#2e95f3] hover:text-[#1e85e3]">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Sign In
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
