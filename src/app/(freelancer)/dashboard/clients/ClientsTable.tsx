import { useState } from 'react';
import Link from 'next/link';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	Search,
	Eye,
	Edit,
	Trash2,
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

import type { ClientUser } from '@/types/clients-user.types';
import { deleteClient } from './clientStore';
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

interface ClientsTableProps {
	data: ClientUser[];
	onClientDeleted?: (clientId: string) => void;
}

export function ClientsTable({ data, onClientDeleted }: ClientsTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState('');
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [clientToDelete, setClientToDelete] = useState<ClientUser | null>(null);

	// Handler para confirmar eliminación
	const handleDeleteClick = (client: ClientUser) => {
		setClientToDelete(client);
		setDeleteDialogOpen(true);
	};

	// Handler para ejecutar la eliminación
	const handleConfirmDelete = () => {
		if (!clientToDelete) return;

		const success = deleteClient(clientToDelete.id);

		if (success) {
			toast.success('Cliente eliminado', {
				description: `${clientToDelete.name} ha sido eliminado correctamente.`,
			});

			// Notificar al componente padre
			if (onClientDeleted) {
				onClientDeleted(clientToDelete.id);
			}

			// Emitir evento personalizado para actualizar otras vistas
			window.dispatchEvent(new Event('clients-updated'));
		} else {
			toast.error('Error al eliminar', {
				description: 'No se pudo eliminar el cliente. Inténtalo de nuevo.',
			});
		}

		setDeleteDialogOpen(false);
		setClientToDelete(null);
	};

	const columns: ColumnDef<ClientUser>[] = [
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<div className="font-medium">{row.getValue('name')}</div>
			),
		},
		{
			accessorKey: 'email',
			header: 'Email',
			cell: ({ row }) => (
				<div className="text-muted-foreground">{row.getValue('email')}</div>
			),
		},
		{
			accessorKey: 'company',
			header: 'Company',
			cell: ({ row }) => <div>{row.getValue('company') || '-'}</div>,
		},
		{
			accessorKey: 'phone',
			header: 'Phone',
			cell: ({ row }) => (
				<div className="text-muted-foreground">
					{row.getValue('phone') || '-'}
				</div>
			),
		},
		{
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }) => {
				const client = row.original;
				return (
					<div className="flex items-center gap-2">
						<Link
							href={`/dashboard/clients/${client.id}`}
							aria-label={`Ver detalles de ${client.name}`}
						>
							<Button variant="ghost" size="sm">
								<Eye className="h-4 w-4" />
							</Button>
						</Link>
						<Link
							href={`/dashboard/clients/${client.id}`}
							aria-label={`Editar ${client.name}`}
						>
							<Button variant="ghost" size="sm">
								<Edit className="h-4 w-4" />
							</Button>
						</Link>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => handleDeleteClick(client)}
							aria-label={`Eliminar ${client.name}`}
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
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			rowSelection,
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
							placeholder="Search clients..."
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
						Page {table.getState().pagination.pageIndex + 1} of{' '}
						{table.getPageCount()}
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
									className="hover:bg-muted/50 cursor-pointer"
									onClick={() => {
										// Handle row click (e.g., navigate to client details)
										console.log('Selected client:', row.original);
									}}
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
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.firstPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.lastPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>

			{/* Alert Dialog para confirmar eliminación */}
			<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta acción eliminará permanentemente a{' '}
							<span className="font-semibold">{clientToDelete?.name}</span>.
							Esta acción no se puede deshacer.
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
