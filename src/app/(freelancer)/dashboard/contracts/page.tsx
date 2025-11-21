'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

import type { MockContract } from '@/mocks/contracts';
import { getContracts } from './contractsStore';
import { AddContractDialog } from '@/components/contract/AddContractDialog';
import { ContractsTable } from './ContractsTable';

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';

export default function ContractsPage() {
	const [contracts, setContracts] = useState<MockContract[]>([]);

	// Cargar contratos al montar el componente
	useEffect(() => {
		const loadContracts = () => {
			const loadedContracts = getContracts();
			setContracts(loadedContracts);
		};

		loadContracts();

		// Escuchar eventos de actualización de contratos
		const handleContractsUpdate = () => {
			loadContracts();
		};

		window.addEventListener('contracts-updated', handleContractsUpdate);

		return () => {
			window.removeEventListener('contracts-updated', handleContractsUpdate);
		};
	}, []);

	// Handler cuando se crea un nuevo contrato
	const handleContractCreated = (newContract: MockContract) => {
		setContracts((prev) => [newContract, ...prev]);
	};

	// Handler cuando se elimina un contrato
	const handleContractDeleted = (contractId: string) => {
		setContracts((prev) => prev.filter((c) => c.id !== contractId));
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Contratos</h1>
					<p className="text-muted-foreground">
						Crea, gestiona y da seguimiento a tus contratos y propuestas.
					</p>
				</div>
				<AddContractDialog onContractCreated={handleContractCreated} />
			</div>

			{/* Tabla de contratos o estado vacío */}
			{contracts.length > 0 ? (
				<ContractsTable
					data={contracts}
					onContractDeleted={handleContractDeleted}
				/>
			) : (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<FileText className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">No hay contratos aún</CardTitle>
						<CardDescription className="text-center mb-4">
							Crea tu primer contrato o propuesta para formalizar acuerdos con
							tus clientes.
						</CardDescription>
						<AddContractDialog onContractCreated={handleContractCreated} />
					</CardContent>
				</Card>
			)}
		</div>
	);
}
