'use client';

import { useQuery } from '@tanstack/react-query';

import { Users } from 'lucide-react';

import { AddClientDialog } from '@/components/client/AddClientDialog';
import { ClientsTable } from './ClientsTable';

import type { ClientUser } from '@/types';

import { getClientsAction } from './actions';

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';

export default function ClientsPage() {
	const { data: clients = [], isLoading } = useQuery<ClientUser[]>({
		queryKey: ['clients'],
		queryFn: getClientsAction,
	});

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Clients</h1>
					<p className="text-muted-foreground">
						Manage your client relationships and contact information.
					</p>
				</div>
				<AddClientDialog />
			</div>

			{/* Clients Grid */}
			{/* Empty State */}
			{clients.length === 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card className="col-span-full">
						<CardContent className="flex flex-col items-center justify-center py-12">
							<Users className="h-12 w-12 text-muted-foreground mb-4" />
							<CardTitle className="mb-2">No clients yet</CardTitle>
							<CardDescription className="text-center mb-4">
								Add your first client to start building your professional
								network and managing projects.
							</CardDescription>
							<AddClientDialog variant="outline" />
						</CardContent>
					</Card>
				</div>
			) : (
				<ClientsTable data={clients} />
			)}
		</div>
	);
}
