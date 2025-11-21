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

import type { MockContract } from '@/mocks/contracts';
import { deleteContract } from './contractsStore';
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

interface ContractsTableProps {
	data: MockContract[];
	onContractDeleted?: (contractId: string) => void;
}

const statusVariantMap: Record<
	string,
	'default' | 'secondary' | 'destructive' | 'outline'
> = {
	active: 'default',
	expired: 'secondary',
	pending: 'outline',
	draft: 'destructive',
};

const statusLabelMap: Record<string, string> = {
	active: 'Activo',
	expired: 'Expirado',
	pending: 'Pendiente',
	draft: 'Borrador',
};

export function ContractsTable({
	data,
	onContractDeleted,
}: ContractsTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [contractToDelete, setContractToDelete] = useState<MockContract | null>(
		null,
	);

	// Handler para confirmar eliminación
	const handleDeleteClick = (contract: MockContract) => {
		setContractToDelete(contract);
		setDeleteDialogOpen(true);
	};

	// Handler para ejecutar la eliminación
	const handleConfirmDelete = () => {
		if (!contractToDelete) return;

		const success = deleteContract(contractToDelete.id);

		if (success) {
			toast.success('Contrato eliminado', {
				description: `"${contractToDelete.title}" ha sido eliminado correctamente.`,
			});

			// Notificar al componente padre
			if (onContractDeleted) {
				onContractDeleted(contractToDelete.id);
			}

			// Emitir evento personalizado para actualizar otras vistas
			window.dispatchEvent(new Event('contracts-updated'));
		} else {
			toast.error('Error al eliminar', {
				description: 'No se pudo eliminar el contrato. Inténtalo de nuevo.',
			});
		}

		setDeleteDialogOpen(false);
		setContractToDelete(null);
	};

	const columns: ColumnDef<MockContract>[] = [
		{
			accessorKey: 'title',
			header: 'Título',
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<FileText className="h-4 w-4 text-muted-foreground" />
					<span className="font-medium">{row.getValue('title')}</span>
				</div>
			),
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
			accessorKey: 'value',
			header: 'Valor',
			cell: ({ row }) => {
				const value = row.getValue('value') as string;
				return (
					<div className="font-medium">
						${Number.parseFloat(value).toLocaleString('en-US')}
					</div>
				);
			},
		},
		{
			accessorKey: 'start_date',
			header: 'Fecha de inicio',
			cell: ({ row }) => {
				const date = row.getValue('start_date');
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
			accessorKey: 'end_date',
			header: 'Fecha de fin',
			cell: ({ row }) => {
				const date = row.getValue('end_date');
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
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }) => {
				const contract = row.original;
				return (
					<div className="flex items-center gap-2">
						<Link
							href={`/dashboard/contracts/${contract.id}`}
							aria-label={`Ver detalles de ${contract.title}`}
						>
							<Button variant="ghost" size="sm">
								<Eye className="h-4 w-4" />
							</Button>
						</Link>
						<Link
							href={`/dashboard/contracts/${contract.id}`}
							aria-label={`Editar ${contract.title}`}
						>
							<Button variant="ghost" size="sm">
								<Edit className="h-4 w-4" />
							</Button>
						</Link>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => handleDeleteClick(contract)}
							aria-label={`Eliminar ${contract.title}`}
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
							placeholder="Buscar contratos..."
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
							Esta acción eliminará permanentemente el contrato{' '}
							<span className="font-semibold">
								&quot;{contractToDelete?.title}&quot;
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
