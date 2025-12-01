'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Plus, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import type { MockInvoice } from '@/mocks/invoices';
import { createInvoice } from '@/app/(freelancer)/dashboard/invoices/invoicesStore';
import { mockClientsSimple } from '@/mocks/clients';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
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
	project_id: z
		.string()
		.min(1, { message: 'El ID de proyecto es obligatorio' }),
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

interface AddInvoiceDialogProps {
	onInvoiceCreated?: (invoice: MockInvoice) => void;
}

export function AddInvoiceDialog({ onInvoiceCreated }: AddInvoiceDialogProps) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<InvoiceFormValues>({
		resolver: zodResolver(invoiceFormSchema),
		defaultValues: {
			client_id: '',
			project_id: '',
			invoice_number: '',
			issue_date: '',
			due_date: '',
			status: 'unpaid',
			items: [
				{
					id: 'item-1',
					description: '',
					quantity: 1,
					unitPrice: 0,
				},
			],
			notes: '',
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'items',
	});

	// Calcular totales en tiempo real
	const watchItems = form.watch('items');
	const subtotal =
		watchItems?.reduce(
			(sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0),
			0,
		) || 0;
	const tax = subtotal * 0.16;
	const total = subtotal + tax;

	const handleAddItem = () => {
		append({
			id: `item-${Date.now()}`,
			description: '',
			quantity: 1,
			unitPrice: 0,
		});
	};

	const onSubmit = async (data: InvoiceFormValues) => {
		setIsSubmitting(true);

		try {
			const newInvoice = createInvoice({
				client_id: data.client_id,
				project_id: data.project_id,
				invoice_number: data.invoice_number,
				issue_date: data.issue_date,
				due_date: data.due_date,
				status: data.status,
				items: data.items,
				notes: data.notes || '',
				subtotal: 0, // Se calculará en createInvoice
				tax: 0,
				total: 0,
			});

			toast.success('Factura creada', {
				description: `Factura ${newInvoice.invoice_number} creada exitosamente.`,
			});

			// Llamar al callback si existe
			if (onInvoiceCreated) {
				onInvoiceCreated(newInvoice);
			}

			// Emitir evento personalizado para actualizar otras vistas
			window.dispatchEvent(new Event('invoices-updated'));

			// Resetear el formulario y cerrar el diálogo
			form.reset();
			setOpen(false);
		} catch (error) {
			console.error('Error creating invoice:', error);
			toast.error('Error al crear factura', {
				description:
					'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Nueva Factura
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Crear nueva factura</DialogTitle>
					<DialogDescription>
						Completa la información para crear una nueva factura. Los campos
						marcados son obligatorios.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="invoice_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Número de factura *</FormLabel>
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
										<FormLabel>Cliente *</FormLabel>
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
								name="project_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>ID de Proyecto *</FormLabel>
										<FormControl>
											<Input placeholder="project-1" {...field} />
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
										<FormLabel>Estado *</FormLabel>
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

							<FormField
								control={form.control}
								name="issue_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fecha de emisión *</FormLabel>
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
										<FormLabel>Fecha de vencimiento *</FormLabel>
										<FormControl>
											<Input type="date" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Items Section */}
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<FormLabel>Ítems de la factura *</FormLabel>
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

							<div className="rounded-md border">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Descripción</TableHead>
											<TableHead className="w-[100px]">Cantidad</TableHead>
											<TableHead className="w-[120px]">Precio Unit.</TableHead>
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
														disabled={fields.length === 1}
													>
														<Trash2 className="h-4 w-4 text-destructive" />
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>

							{/* Totals */}
							<div className="flex justify-end">
								<div className="w-[300px] space-y-2">
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">Subtotal:</span>
										<span className="font-medium">${subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between text-sm">
										<span className="text-muted-foreground">IVA (16%):</span>
										<span className="font-medium">${tax.toFixed(2)}</span>
									</div>
									<div className="flex justify-between text-lg font-bold border-t pt-2">
										<span>Total:</span>
										<span>${total.toFixed(2)}</span>
									</div>
								</div>
							</div>
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
											className="min-h-[80px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									form.reset();
									setOpen(false);
								}}
								disabled={isSubmitting}
							>
								Cancelar
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Creando...
									</>
								) : (
									'Crear factura'
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
