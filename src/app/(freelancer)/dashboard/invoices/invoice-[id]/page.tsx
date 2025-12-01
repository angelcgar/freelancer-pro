'use client';

import { use, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import {
	ArrowLeft,
	Calendar,
	DollarSign,
	FileText,
	Loader2,
	Plus,
	Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import type { MockInvoice, InvoiceItem } from '@/mocks/invoices';
import { getInvoiceById, updateInvoice } from '../invoicesStore';
import { mockClientsSimple } from '@/mocks/clients';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const invoiceItemSchema = z.object({
	id: z.string(),
	description: z.string().min(1, 'La descripción es obligatoria'),
	quantity: z.number().min(1, 'La cantidad debe ser al menos 1'),
	unitPrice: z.number().min(0, 'El precio debe ser positivo'),
});

const invoiceFormSchema = z.object({
	client_id: z.string().min(1, { message: 'Debe seleccionar un cliente' }),
	project_id: z.string().min(1, { message: 'Debe seleccionar un proyecto' }),
	invoice_number: z
		.string()
		.min(1, { message: 'El número de factura es obligatorio' }),
	issue_date: z
		.string()
		.min(1, { message: 'La fecha de emisión es obligatoria' }),
	due_date: z
		.string()
		.min(1, { message: 'La fecha de vencimiento es obligatoria' }),
	status: z.enum(['paid', 'unpaid', 'overdue']),
	items: z.array(invoiceItemSchema).min(1, 'Debe agregar al menos un ítem'),
	notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

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

export default function InvoiceDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	// Unwrap params usando React.use()
	const { id } = use(params);

	console.log({ id });

	const [invoice, setInvoice] = useState<MockInvoice | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	const form = useForm<InvoiceFormValues>({
		resolver: zodResolver(invoiceFormSchema),
		defaultValues: {
			client_id: '',
			project_id: '',
			invoice_number: '',
			issue_date: '',
			due_date: '',
			status: 'unpaid',
			items: [],
			notes: '',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	});

	useEffect(() => {
		const loadInvoice = () => {
			const foundInvoice = getInvoiceById(id);
			if (foundInvoice) {
				setInvoice(foundInvoice);
				form.reset({
					client_id: foundInvoice.client_id,
					project_id: foundInvoice.project_id,
					invoice_number: foundInvoice.invoice_number,
					issue_date: foundInvoice.issue_date,
					due_date: foundInvoice.due_date,
					status: foundInvoice.status,
					items: foundInvoice.items,
					notes: foundInvoice.notes || '',
				});
			}
			setIsLoading(false);
		};

		loadInvoice();
	}, [id, form]);

	// Calcular totales en tiempo real
	const watchItems = form.watch('items');
	const subtotal =
		watchItems?.reduce(
			(sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0),
			0,
		) || 0;
	const tax = subtotal * 0.16;
	const total = subtotal + tax;

	const onSubmit = async (data: InvoiceFormValues) => {
		setIsSaving(true);

		try {
			const updatedInvoice = updateInvoice(id, {
				client_id: data.client_id,
				project_id: data.project_id,
				invoice_number: data.invoice_number,
				issue_date: data.issue_date,
				due_date: data.due_date,
				status: data.status,
				items: data.items,
				notes: data.notes || '',
			});

			if (updatedInvoice) {
				setInvoice(updatedInvoice);
				toast.success('Factura actualizada', {
					description: 'Los cambios se han guardado correctamente.',
				});

				// Emitir evento para actualizar otras vistas
				window.dispatchEvent(new Event('invoices-updated'));
			} else {
				toast.error('Error al actualizar', {
					description: 'No se pudo guardar la factura. Inténtalo de nuevo.',
				});
			}
		} catch (error) {
			console.error('Error updating invoice:', error);
			toast.error('Error inesperado', {
				description:
					'Ocurrió un error al guardar. Por favor, intenta de nuevo.',
			});
		} finally {
			setIsSaving(false);
		}
	};

	const handleAddItem = () => {
		append({
			id: `item-${Date.now()}`,
			description: '',
			quantity: 1,
			unitPrice: 0,
		});
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!invoice) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/invoices">
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<h1 className="text-3xl font-bold">Factura no encontrada</h1>
				</div>
				<Card>
					<CardContent className="pt-6">
						<p className="text-muted-foreground">
							La factura que buscas no existe o ha sido eliminada.
						</p>
						<Link href="/dashboard/invoices">
							<Button className="mt-4">Volver a facturas</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	const clientName =
		mockClientsSimple.find((c) => c.id === invoice.client_id)?.name ||
		'Cliente desconocido';

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/invoices">
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-3xl font-bold">{invoice.invoice_number}</h1>
						<p className="text-muted-foreground">
							Factura {invoice.id} - {clientName}
						</p>
					</div>
				</div>
				<Badge variant={statusVariantMap[invoice.status] || 'outline'}>
					{statusLabelMap[invoice.status] || invoice.status}
				</Badge>
			</div>

			{/* Quick Info Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							$
							{invoice.total.toLocaleString('en-US', {
								minimumFractionDigits: 2,
							})}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Subtotal: ${invoice.subtotal.toFixed(2)} + IVA: $
							{invoice.tax.toFixed(2)}
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Fecha de emisión
						</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{format(new Date(invoice.issue_date), 'PP', { locale: es })}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Vencimiento</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{format(new Date(invoice.due_date), 'PP', { locale: es })}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Edit Form */}
			<Card>
				<CardHeader>
					<CardTitle>Editar factura</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid gap-4 md:grid-cols-2">
								<FormField
									control={form.control}
									name="invoice_number"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Número de factura</FormLabel>
											<FormControl>
												<Input placeholder="INV-2024-001" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="client_id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cliente</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecciona un cliente" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{mockClientsSimple.map((client) => (
														<SelectItem key={client.id} value={client.id}>
															{client.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="issue_date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Fecha de emisión</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="due_date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Fecha de vencimiento</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Estado</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecciona un estado" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="unpaid">Pendiente</SelectItem>
													<SelectItem value="paid">Pagada</SelectItem>
													<SelectItem value="overdue">Vencida</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							{/* Items Section */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<FormLabel>Ítems de la factura</FormLabel>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={handleAddItem}
									>
										<Plus className="h-4 w-4 mr-2" />
										Agregar ítem
									</Button>
								</div>

								{fields.length > 0 ? (
									<div className="rounded-md border">
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Descripción</TableHead>
													<TableHead className="w-[100px]">Cantidad</TableHead>
													<TableHead className="w-[120px]">
														Precio Unit.
													</TableHead>
													<TableHead className="w-[120px]">Subtotal</TableHead>
													<TableHead className="w-[80px]">Acciones</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{fields.map((field, index) => (
													<TableRow key={field.id}>
														<TableCell>
															<FormField
																control={form.control}
																name={`items.${index}.description`}
																render={({ field }) => (
																	<FormItem>
																		<FormControl>
																			<Input
																				placeholder="Descripción del servicio"
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</TableCell>
														<TableCell>
															<FormField
																control={form.control}
																name={`items.${index}.quantity`}
																render={({ field }) => (
																	<FormItem>
																		<FormControl>
																			<Input type="number" min="1" {...field} />
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</TableCell>
														<TableCell>
															<FormField
																control={form.control}
																name={`items.${index}.unitPrice`}
																render={({ field }) => (
																	<FormItem>
																		<FormControl>
																			<Input
																				type="number"
																				step="0.01"
																				min="0"
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</TableCell>
														<TableCell>
															<div className="font-medium">
																$
																{(
																	(watchItems[index]?.quantity || 0) *
																	(watchItems[index]?.unitPrice || 0)
																).toFixed(2)}
															</div>
														</TableCell>
														<TableCell>
															<Button
																type="button"
																variant="ghost"
																size="sm"
																onClick={() => remove(index)}
															>
																<Trash2 className="h-4 w-4 text-destructive" />
															</Button>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</div>
								) : (
									<div className="text-center py-8 border rounded-md">
										<p className="text-muted-foreground">
											No hay ítems. Agrega al menos uno.
										</p>
									</div>
								)}

								{/* Totals */}
								{fields.length > 0 && (
									<div className="flex justify-end">
										<div className="w-[300px] space-y-2">
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">Subtotal:</span>
												<span className="font-medium">
													${subtotal.toFixed(2)}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-muted-foreground">
													IVA (16%):
												</span>
												<span className="font-medium">${tax.toFixed(2)}</span>
											</div>
											<div className="flex justify-between text-lg font-bold border-t pt-2">
												<span>Total:</span>
												<span>${total.toFixed(2)}</span>
											</div>
										</div>
									</div>
								)}
							</div>

							<FormField
								control={form.control}
								name="notes"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Notas</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Notas adicionales..."
												className="min-h-[100px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end gap-4">
								<Link href="/dashboard/invoices">
									<Button type="button" variant="outline" disabled={isSaving}>
										Cancelar
									</Button>
								</Link>
								<Button type="submit" disabled={isSaving}>
									{isSaving ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Guardando...
										</>
									) : (
										'Guardar cambios'
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
