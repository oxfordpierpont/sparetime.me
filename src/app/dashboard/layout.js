'use client';

import { AppSidebar } from '@/components/app-sidebar';
import {
    SidebarInset,
    SidebarProvider,
} from '@/components/ui/sidebar';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar />
                <SidebarInset className="bg-[#f6fbff]">
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
