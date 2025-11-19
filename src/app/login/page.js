'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col">
            <header className="bg-background border-b px-4 py-3">
                <div className="flex items-center justify-between max-w-md mx-auto w-full">
                    <Link href="/" className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="text-sm font-medium text-muted-foreground">Sign In</div>
                    <div className="w-9"></div> {/* Spacer for centering */}
                </div>
            </header>

            <main className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-neutral-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">ST</span>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to access your SpareTime account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" className="h-12" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="h-12 pr-10"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Remember me</label>
                        </div>
                        <button type="button" className="text-sm text-foreground underline hover:text-primary">Forgot password?</button>
                    </div>

                    <Button type="submit" size="lg" className="w-full h-12 text-base mt-6">
                        SIGN IN
                    </Button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-neutral-50 text-muted-foreground">or continue with</span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <Button variant="outline" className="w-full h-12 text-base flex items-center justify-center gap-3 bg-background">
                        {/* Google Icon Placeholder */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>CONTINUE WITH GOOGLE</span>
                    </Button>

                    <Button variant="outline" className="w-full h-12 text-base flex items-center justify-center gap-3 bg-background">
                        {/* Apple Icon Placeholder */}
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24.02-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.67-.74 1.29.29 2.23.82 2.9 1.85-2.53 1.55-2.03 5.71.51 6.85-.48 1.45-1.15 2.86-2.16 4.27zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        <span>CONTINUE WITH APPLE</span>
                    </Button>
                </div>

                <div className="text-center">
                    <p className="text-muted-foreground text-sm">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-foreground underline hover:text-primary">Sign Up</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
