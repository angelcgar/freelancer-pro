'use client';

import { Plus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getClientsAction } from './actions';
import type { ClientUser } from '@/types';
import { ClientsTable } from './ClientsTable';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';

export default function ClientsPage() {
	const [clients, setClients] = useState<ClientUser[]>([]);

	const temclients = [];

	useEffect(() => {
		const load = async () => {
			const data = await getClientsAction();
			setClients(data);
		};
		load();
	}, []);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Clients</h1>
					<p className="text-muted-foreground">
						Manage your client relationships and contact information.
					</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add Client
				</Button>
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
							<Button>
								<Plus className="mr-2 h-4 w-4" />
								Add Client
							</Button>
						</CardContent>
					</Card>
				</div>
			) : (
				<ClientsTable data={clients} />
			)}
		</div>
	);
}
