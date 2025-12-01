'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	ChevronLeft,
	ChevronRight,
	Search,
	Eye,
	Edit,
	Trash2,
	FileText,
} from 'lucide-react';
import type {
	ColumnDef,
	SortingState,
	ColumnFiltersState,
} from '@tanstack/react-table';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import type { MockInvoice } from '@/mocks/invoices';
import { deleteInvoice } from './invoicesStore';
import { mockClientsSimple } from '@/mocks/clients';
import { toast } from 'sonner';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface InvoicesTableProps {
	data: MockInvoice[];
	onInvoiceDeleted?: (invoiceId: string) => void;
}

const statusVariantMap: Record<
	string,
	'default' | 'secondary' | 'destructive' | 'outline'
> = {
	paid: 'default',
	unpaid: 'outline',
	overdue: 'destructive',
};

const statusLabelMap: Record<string, string> = {
	paid: 'Pagada',
	unpaid: 'Pendiente',
	overdue: 'Vencida',
};

export function InvoicesTable({ data, onInvoiceDeleted }: InvoicesTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [invoiceToDelete, setInvoiceToDelete] = useState<MockInvoice | null>(
		null,
	);

	// Handler para confirmar eliminación
	const handleDeleteClick = (invoice: MockInvoice) => {
		setInvoiceToDelete(invoice);
		setDeleteDialogOpen(true);
	};

	// Handler para ejecutar la eliminación
	const handleConfirmDelete = () => {
		if (!invoiceToDelete) return;

		const success = deleteInvoice(invoiceToDelete.id);

		if (success) {
			toast.success('Factura eliminada', {
				description: `Factura ${invoiceToDelete.invoice_number} eliminada correctamente.`,
			});

			// Notificar al componente padre
			if (onInvoiceDeleted) {
				onInvoiceDeleted(invoiceToDelete.id);
			}

			// Emitir evento personalizado para actualizar otras vistas
			window.dispatchEvent(new Event('invoices-updated'));
		} else {
			toast.error('Error al eliminar', {
				description: 'No se pudo eliminar la factura. Inténtalo de nuevo.',
			});
		}

		setDeleteDialogOpen(false);
		setInvoiceToDelete(null);
	};

	const columns: ColumnDef<MockInvoice>[] = [
		{
			accessorKey: 'invoice_number',
			header: 'N° Factura',
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<FileText className="h-4 w-4 text-muted-foreground" />
					<span className="font-medium">{row.getValue('invoice_number')}</span>
				</div>
			),
		},
		{
			accessorKey: 'client_id',
			header: 'Cliente',
			cell: ({ row }) => {
				const clientId = row.getValue('client_id') as string;
				const client = mockClientsSimple.find((c) => c.id === clientId);
				return (
					<div className="text-muted-foreground">
						{client?.name || 'Desconocido'}
					</div>
				);
			},
		},
		{
			accessorKey: 'issue_date',
			header: 'Fecha emisión',
			cell: ({ row }) => {
				const date = row.getValue('issue_date');
				return date ? (
					<div className="text-muted-foreground">
						{format(new Date(date as string), 'PP', { locale: es })}
					</div>
				) : (
					<div>-</div>
				);
			},
		},
		{
			accessorKey: 'due_date',
			header: 'Fecha venc.',
			cell: ({ row }) => {
				const date = row.getValue('due_date');
				return date ? (
					<div className="text-muted-foreground">
						{format(new Date(date as string), 'PP', { locale: es })}
					</div>
				) : (
					<div>-</div>
				);
			},
		},
		{
			accessorKey: 'total',
			header: 'Total',
			cell: ({ row }) => {
				const total = row.getValue('total') as number;
				return (
					<div className="font-semibold">
						${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
					</div>
				);
			},
		},
		{
			accessorKey: 'status',
			header: 'Estado',
			cell: ({ row }) => {
				const status = row.getValue('status') as string;
				return (
					<Badge variant={statusVariantMap[status] || 'outline'}>
						{statusLabelMap[status] || status}
					</Badge>
				);
			},
		},
		{
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }) => {
				const invoice = row.original;
				return (
					<div className="flex items-center gap-2">
						<Link
							href={`/dashboard/invoices/invoice-${invoice.id}`}
							aria-label={`Ver factura ${invoice.invoice_number}`}
						>
							<Button variant="ghost" size="sm">
								<Eye className="h-4 w-4" />
							</Button>
						</Link>
						<Link
							href={`/dashboard/invoices/invoice-${invoice.id}`}
							aria-label={`Editar factura ${invoice.invoice_number}`}
						>
							<Button variant="ghost" size="sm">
								<Edit className="h-4 w-4" />
							</Button>
						</Link>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => handleDeleteClick(invoice)}
							aria-label={`Eliminar factura ${invoice.invoice_number}`}
						>
							<Trash2 className="h-4 w-4 text-destructive" />
						</Button>
					</div>
				);
			},
		},
	];

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
	});

	return (
		<div className="w-full space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Buscar facturas..."
							value={globalFilter ?? ''}
							onChange={(event) => setGlobalFilter(event.target.value)}
							className="pl-8 w-[300px]"
						/>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<span className="text-sm text-muted-foreground">
						Página {table.getState().pagination.pageIndex + 1} de{' '}
						{table.getPageCount() || 1}
					</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No se encontraron resultados.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{/* Alert Dialog para confirmar eliminación */}
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta acción eliminará permanentemente la factura{' '}
							<span className="font-semibold">
								{invoiceToDelete?.invoice_number}
							</span>
							. Esta acción no se puede deshacer.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleConfirmDelete}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							Eliminar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
