'use client';

import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';

import { Users } from 'lucide-react';

import { AddClientDialog } from '@/components/client/AddClientDialog';
import { ClientsTable } from './ClientsTable';

import type { ClientUser } from '@/types';
import { getClients } from './clientStore';

// import { getClientsAction } from './actions';

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';

/**
 * SISTEMA DE PERSISTENCIA SIMULADA - CLIENTES
 *
 * Esta página carga clientes desde el clientStore que usa localStorage
 * para simular persistencia. Los cambios hechos en:
 * - Crear cliente (AddClientDialog)
 * - Editar cliente (página de detalle)
 * - Eliminar cliente (ClientsTable)
 *
 * Se reflejan automáticamente en esta tabla.
 */

export default function ClientsPage() {
	// const { data: clients = [], isLoading } = useQuery<ClientUser[]>({
	// 	queryKey: ['clients'],
	// 	queryFn: getClientsAction,
	// });

	// Estado para clientes con persistencia simulada
	const [clients, setClients] = useState<ClientUser[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Cargar clientes al montar
	useEffect(() => {
		const loadClients = () => {
			const loadedClients = getClients();
			setClients(loadedClients);
			setIsLoading(false);
		};

		loadClients();

		// Escuchar cambios en localStorage
		const handleStorageChange = () => {
			loadClients();
		};

		window.addEventListener('storage', handleStorageChange);

		// También escuchar un evento personalizado para cambios en la misma pestaña
		window.addEventListener('clients-updated', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
			window.removeEventListener('clients-updated', handleStorageChange);
		};
	}, []);

	// Callback para cuando se crea un cliente
	const handleClientCreated = (newClient: ClientUser) => {
		setClients((prev) => [newClient, ...prev]);
	};

	// Callback para cuando se elimina un cliente
	const handleClientDeleted = (clientId: string) => {
		setClients((prev) => prev.filter((c) => c.id !== clientId));
	};

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
				<AddClientDialog onClientCreated={handleClientCreated} />
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
							<AddClientDialog
								variant="outline"
								onClientCreated={handleClientCreated}
							/>
						</CardContent>
					</Card>
				</div>
			) : (
				<ClientsTable data={clients} onClientDeleted={handleClientDeleted} />
			)}
		</div>
	);
}
