'use client';

import type { ReactNode } from 'react';

import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarProvider, useSidebar } from '@/providers/sidebar-provider';

function DashboardLayoutContent({ children }: { children: ReactNode }) {
	const { isOpen, isMobile, close } = useSidebar();

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Mobile Overlay */}
			{isMobile && isOpen && (
				<button
					type="button"
					className="fixed inset-0 z-40 bg-black/50 md:hidden cursor-default"
					onClick={close}
					onKeyDown={(e) => {
						if (e.key === 'Escape') close();
					}}
					aria-label="Close sidebar"
				/>
			)}

			{/* Desktop Sidebar */}
			<aside className="hidden md:flex border-r bg-muted/10">
				<Sidebar />
			</aside>

			{/* Mobile Sidebar */}
			<aside
				className={`fixed inset-y-0 left-0 z-50 border-r bg-background md:hidden transition-transform duration-300 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<Sidebar />
			</aside>

			{/* Main Content Area */}
			<div className="flex flex-col flex-1 min-w-0">
				<Header />
				<main className="flex-1 overflow-y-auto bg-background">
					<div className="container mx-auto p-4 md:p-6">{children}</div>
				</main>
			</div>
		</div>
	);
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<SidebarProvider>
			<DashboardLayoutContent>{children}</DashboardLayoutContent>
		</SidebarProvider>
	);
}
