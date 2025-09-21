import type { ReactNode } from 'react';

import { Navbar } from '@/components/layout/navbar';
import { Sidebar } from '@/components/layout/sidebar';

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<div className="flex flex-1">
				<aside className="hidden w-64 border-r bg-muted/10 md:block">
					<Sidebar />
				</aside>
				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-6">{children}</div>
				</main>
			</div>
		</div>
	);
}
