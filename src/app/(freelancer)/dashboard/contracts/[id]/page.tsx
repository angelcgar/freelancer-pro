'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
	ArrowLeft,
	Calendar,
	DollarSign,
	FileText,
	Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import type { MockContract } from '@/mocks/contracts';
import { getContractById, updateContract } from '../contractsStore';
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

export default function ContractDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const [contract, setContract] = useState<MockContract | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

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

	useEffect(() => {
		const loadContract = () => {
			const foundContract = getContractById(params.id);
			if (foundContract) {
				setContract(foundContract);
				form.reset({
					title: foundContract.title,
					client_id: foundContract.client_id,
					project_id: foundContract.project_id || '',
					description: foundContract.description || '',
					status: foundContract.status,
					start_date: foundContract.start_date,
					end_date: foundContract.end_date,
					value: foundContract.value,
					terms: foundContract.terms || '',
				});
			}
			setIsLoading(false);
		};

		loadContract();
	}, [params.id, form]);

	const onSubmit = async (data: ContractFormValues) => {
		setIsSaving(true);

		try {
			const updatedContract = updateContract(params.id, {
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

			if (updatedContract) {
				setContract(updatedContract);
				toast.success('Contrato actualizado', {
					description: 'Los cambios se han guardado correctamente.',
				});

				// Emitir evento para actualizar otras vistas
				window.dispatchEvent(new Event('contracts-updated'));
			} else {
				toast.error('Error al actualizar', {
					description: 'No se pudo guardar el contrato. Inténtalo de nuevo.',
				});
			}
		} catch (error) {
			console.error('Error updating contract:', error);
			toast.error('Error inesperado', {
				description:
					'Ocurrió un error al guardar. Por favor, intenta de nuevo.',
			});
		} finally {
			setIsSaving(false);
		}
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!contract) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/contracts">
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<h1 className="text-3xl font-bold">Contrato no encontrado</h1>
				</div>
				<Card>
					<CardContent className="pt-6">
						<p className="text-muted-foreground">
							El contrato que buscas no existe o ha sido eliminado.
						</p>
						<Link href="/dashboard/contracts">
							<Button className="mt-4">Volver a contratos</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	const clientName =
		mockClientsSimple.find((c) => c.id === contract.client_id)?.name ||
		'Cliente desconocido';

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/contracts">
						<Button variant="ghost" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>
					<div>
						<h1 className="text-3xl font-bold">{contract.title}</h1>
						<p className="text-muted-foreground">
							Contrato #{contract.id} - {clientName}
						</p>
					</div>
				</div>
				<Badge variant={statusVariantMap[contract.status] || 'outline'}>
					{statusLabelMap[contract.status] || contract.status}
				</Badge>
			</div>

			{/* Quick Info Cards */}
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Valor del contrato
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							${Number.parseFloat(contract.value).toLocaleString('en-US')}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Fecha de inicio
						</CardTitle>
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{format(new Date(contract.start_date), 'PP', { locale: es })}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Fecha de fin</CardTitle>
						<FileText className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{format(new Date(contract.end_date), 'PP', { locale: es })}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Edit Form */}
			<Card>
				<CardHeader>
					<CardTitle>Editar contrato</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div className="grid gap-4 md:grid-cols-2">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Título del contrato</FormLabel>
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
													<SelectItem value="active">Activo</SelectItem>
													<SelectItem value="pending">Pendiente</SelectItem>
													<SelectItem value="expired">Expirado</SelectItem>
													<SelectItem value="draft">Borrador</SelectItem>
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
											<FormLabel>Valor del contrato</FormLabel>
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
											<FormLabel>Fecha de inicio</FormLabel>
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
											<FormLabel>Fecha de fin</FormLabel>
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
												className="min-h-[150px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end gap-4">
								<Link href="/dashboard/contracts">
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
