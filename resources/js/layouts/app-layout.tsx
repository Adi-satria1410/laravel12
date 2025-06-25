import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    pageTitle?: string; // Tambahan props
}

export default function AppLayout({
    children,
    breadcrumbs,
    pageTitle,
    ...props
}: AppLayoutProps) {
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <div className="px-6 py-4 space-y-4">
                {pageTitle && (
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {pageTitle}
                    </h1>
                )}

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    {children}
                </div>

                <footer className="text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                    &copy; {new Date().getFullYear()} Aplikasi Toko Kamu.
                </footer>
            </div>
        </AppLayoutTemplate>
    );
}
