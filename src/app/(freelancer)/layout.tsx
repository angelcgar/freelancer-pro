import type { ReactNode } from 'react';

import { Sidebar } from '@/components/layout/sidebar';

export default async function DashboardLayout({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<div className="flex h-screen">
			<aside className="hidden w-64 border-r bg-muted/10 md:block">
				<Sidebar />
			</aside>
			<main className="flex-1 overflow-y-auto">
				<div className="container mx-auto p-6">{children}</div>
			</main>
		</div>
	);
}
