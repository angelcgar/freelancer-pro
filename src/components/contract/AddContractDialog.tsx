'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import type { MockContract } from '@/mocks/contracts';
import { createContract } from '@/app/(freelancer)/dashboard/contracts/contractsStore';
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

const contractFormSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'El título debe tener al menos 3 caracteres' })
		.max(100, { message: 'El título no puede exceder 100 caracteres' }),
	client_id: z.string().min(1, { message: 'Debe seleccionar un cliente' }),
	project_id: z.string().optional(),
	description: z.string().optional(),
	status: z.enum(['active', 'expired', 'pending', 'draft']),
	start_date: z
		.string()
		.min(1, { message: 'La fecha de inicio es obligatoria' }),
	end_date: z.string().min(1, { message: 'La fecha de fin es obligatoria' }),
	value: z.string().min(1, { message: 'El valor del contrato es obligatorio' }),
	terms: z.string().optional(),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

interface AddContractDialogProps {
	onContractCreated?: (contract: MockContract) => void;
}

export function AddContractDialog({
	onContractCreated,
}: AddContractDialogProps) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<ContractFormValues>({
		resolver: zodResolver(contractFormSchema),
		defaultValues: {
			title: '',
			client_id: '',
			project_id: '',
			description: '',
			status: 'draft',
			start_date: '',
			end_date: '',
			value: '',
			terms: '',
		},
	});

	const onSubmit = async (data: ContractFormValues) => {
		setIsSubmitting(true);

		try {
			const newContract = createContract({
				title: data.title,
				client_id: data.client_id,
				project_id: data.project_id || '',
				description: data.description || '',
				status: data.status,
				start_date: data.start_date,
				end_date: data.end_date,
				value: data.value,
				terms: data.terms || '',
			});

			toast.success('Contrato creado', {
				description: `"${newContract.title}" ha sido creado exitosamente.`,
			});

			// Llamar al callback si existe
			if (onContractCreated) {
				onContractCreated(newContract);
			}

			// Emitir evento personalizado para actualizar otras vistas
			window.dispatchEvent(new Event('contracts-updated'));

			// Resetear el formulario y cerrar el diálogo
			form.reset();
			setOpen(false);
		} catch (error) {
			console.error('Error creating contract:', error);
			toast.error('Error al crear contrato', {
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
					Nuevo Contrato
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Crear nuevo contrato</DialogTitle>
					<DialogDescription>
						Completa la información para crear un nuevo contrato. Los campos
						marcados son obligatorios.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Título del contrato *</FormLabel>
										<FormControl>
											<Input
												placeholder="Ej: Contrato de desarrollo web"
												{...field}
											/>
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
												<SelectItem value="draft">Borrador</SelectItem>
												<SelectItem value="pending">Pendiente</SelectItem>
												<SelectItem value="active">Activo</SelectItem>
												<SelectItem value="expired">Expirado</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="value"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Valor del contrato *</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.01"
												placeholder="15000.00"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="start_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fecha de inicio *</FormLabel>
										<FormControl>
											<Input type="date" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="end_date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fecha de fin *</FormLabel>
										<FormControl>
											<Input type="date" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descripción</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Descripción del contrato..."
											className="min-h-[100px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="terms"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Términos y condiciones</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Términos y condiciones del contrato..."
											className="min-h-[120px]"
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
									'Crear contrato'
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
