'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function SignUp() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate signup
        router.push('/connect-calendar');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="p-4 border-b flex items-center justify-between bg-card">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <span className="text-sm font-medium text-muted-foreground">Step 1 of 3</span>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full p-6 flex flex-col justify-center">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-primary mb-2">Create Your Account</h1>
                    <p className="text-muted-foreground">Join SpareTime to start managing your availability</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter your full name" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Create a password" />
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                        <input type="checkbox" id="terms" required className="mt-1" />
                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                        </label>
                    </div>

                    <Button type="submit" size="lg" className="w-full">Create Account</Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                        Google
                    </Button>
                    <Button variant="outline" className="w-full">
                        Apple
                    </Button>
                </div>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Already have an account? <a href="#" className="text-primary font-medium hover:underline">Sign In</a>
                </p>
            </main>
        </div>
    );
}
