import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Navbar */}
            <header className="bg-blue-600 text-white px-6 py-4 shadow">
                <h1 className="text-xl font-bold">Toko Online</h1>
            </header>

            {/* Main Content */}
            <main className="p-6">{children}</main>

            {/* Footer */}
            <footer className="mt-12 text-center text-sm text-gray-500 border-t pt-4">
                © 2025 Toko Online. All rights reserved.
            </footer>
        </div>
    );
}
