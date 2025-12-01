'use client';

import { useEffect, useState } from 'react';
import { Receipt } from 'lucide-react';

import type { MockInvoice } from '@/mocks/invoices';
import { getInvoices } from './invoicesStore';
import { AddInvoiceDialog } from '@/components/invoice/AddInvoiceDialog';
import { InvoicesTable } from './InvoicesTable';

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';

export default function InvoicesPage() {
	const [invoices, setInvoices] = useState<MockInvoice[]>([]);

	// Cargar facturas al montar el componente
	useEffect(() => {
		const loadInvoices = () => {
			const loadedInvoices = getInvoices();
			setInvoices(loadedInvoices);
		};

		loadInvoices();

		// Escuchar eventos de actualización de facturas
		const handleInvoicesUpdate = () => {
			loadInvoices();
		};

		window.addEventListener('invoices-updated', handleInvoicesUpdate);

		return () => {
			window.removeEventListener('invoices-updated', handleInvoicesUpdate);
		};
	}, []);

	// Handler cuando se crea una nueva factura
	const handleInvoiceCreated = (newInvoice: MockInvoice) => {
		setInvoices((prev) => [newInvoice, ...prev]);
	};

	// Handler cuando se elimina una factura
	const handleInvoiceDeleted = (invoiceId: string) => {
		setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId));
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Facturas</h1>
					<p className="text-muted-foreground">
						Crea, envía y da seguimiento a tus facturas y pagos.
					</p>
				</div>
				<AddInvoiceDialog onInvoiceCreated={handleInvoiceCreated} />
			</div>

			{/* Tabla de facturas o estado vacío */}
			{invoices.length > 0 ? (
				<InvoicesTable
					data={invoices}
					onInvoiceDeleted={handleInvoiceDeleted}
				/>
			) : (
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Receipt className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">No hay facturas aún</CardTitle>
						<CardDescription className="text-center mb-4">
							Crea tu primera factura para comenzar a facturar a tus clientes y
							dar seguimiento a los pagos.
						</CardDescription>
						<AddInvoiceDialog onInvoiceCreated={handleInvoiceCreated} />
					</CardContent>
				</Card>
			)}
		</div>
	);
}
