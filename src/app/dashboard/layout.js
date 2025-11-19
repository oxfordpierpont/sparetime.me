import Link from 'next/link';
import { Home, Calendar, Link as LinkIcon, Settings, Bell, User } from 'lucide-react';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-card h-screen sticky top-0">
                <div className="p-6 border-b">
                    <div className="font-bold text-2xl text-primary">SpareTime</div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary font-medium">
                        <Home size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/dashboard/calendar" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                        <Calendar size={20} />
                        <span>My Calendar</span>
                    </Link>
                    <Link href="/dashboard/links" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                        <LinkIcon size={20} />
                        <span>My Links</span>
                    </Link>
                </nav>

                <div className="p-4 border-t space-y-2">
                    <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-lg text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                    <div className="flex items-center gap-3 p-3 mt-2">
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary font-bold">
                            M
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="font-medium truncate">Maya Smith</div>
                            <div className="text-xs text-muted-foreground truncate">maya@example.com</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden p-4 bg-card border-b flex items-center justify-between sticky top-0 z-10">
                <div className="font-bold text-xl text-primary">SpareTime</div>
                <div className="flex items-center gap-4">
                    <button className="text-muted-foreground">
                        <Bell size={24} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm">
                        M
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around p-4 z-10 safe-area-pb">
                <Link href="/dashboard" className="flex flex-col items-center gap-1 text-primary">
                    <Home size={24} />
                    <span className="text-[10px] font-medium">Home</span>
                </Link>
                <Link href="/dashboard/calendar" className="flex flex-col items-center gap-1 text-muted-foreground">
                    <Calendar size={24} />
                    <span className="text-[10px] font-medium">Calendar</span>
                </Link>
                <Link href="/dashboard/links" className="flex flex-col items-center gap-1 text-muted-foreground">
                    <LinkIcon size={24} />
                    <span className="text-[10px] font-medium">Links</span>
                </Link>
                <Link href="/dashboard/profile" className="flex flex-col items-center gap-1 text-muted-foreground">
                    <User size={24} />
                    <span className="text-[10px] font-medium">Profile</span>
                </Link>
            </nav>
        </div>
    );
}
