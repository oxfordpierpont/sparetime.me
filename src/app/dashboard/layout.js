'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="bg-[#f6fbff]">
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
