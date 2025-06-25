import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

interface AppSidebarLayoutProps {
    breadcrumbs?: BreadcrumbItem[];
    pageTitle?: string;
}

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    pageTitle,
}: PropsWithChildren<AppSidebarLayoutProps>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />

            <AppContent variant="sidebar" className="overflow-x-hidden px-6 py-4 space-y-4">
                {/* Breadcrumbs & Header */}
                <AppSidebarHeader breadcrumbs={breadcrumbs} />

                {/* Page title */}
                {pageTitle && (
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {pageTitle}
                    </h1>
                )}

                {/* Alert placeholder */}
                <div className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900/10 dark:text-yellow-400 px-4 py-2 rounded">
                    🔔 Notifikasi sistem akan muncul di sini
                </div>

                {/* Main content */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    {children}
                </div>

                
            </AppContent>
        </AppShell>
    );
}
