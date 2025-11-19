import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Shield, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="font-bold text-2xl text-primary">SpareTime</div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full">
        <h1 className="text-5xl font-bold text-primary mb-6 leading-tight">
          Your Time, <span className="text-secondary-foreground">Protected.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          The social availability layer that lets you share your schedule without sharing your life.
          Set boundaries, negotiate times, and keep your calendar private.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-16">
          <Link href="/signup" className="w-full">
            <Button size="lg" className="w-full text-lg h-12">Get Started</Button>
          </Link>
          <div className="flex items-center justify-center text-muted-foreground font-medium">or</div>
          <Button variant="secondary" size="lg" className="w-full text-lg h-12">Log In</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full text-left">
          <Card>
            <CardContent className="pt-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Smart Availability</h3>
                <p className="text-muted-foreground text-sm">
                  Share different views of your calendar with different groups of people.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Privacy First</h3>
                <p className="text-muted-foreground text-sm">
                  Keep your event details private while still showing when you're busy.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Negotiable Time</h3>
                <p className="text-muted-foreground text-sm">
                  Mark busy slots as "negotiable" for high-priority requests.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="p-6 text-center text-muted-foreground text-sm">
        © 2025 SpareTime. All rights reserved.
      </footer>
    </div>
  );
}
