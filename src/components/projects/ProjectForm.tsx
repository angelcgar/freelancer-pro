'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
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
	projectFormSchema,
	type ProjectFormValues,
} from '@/validations/project';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { mockCategories } from '@/mocks/categories';

interface ProjectFormProps {
	onSubmit: (values: ProjectFormValues) => void;
	isSubmitting?: boolean;
	defaultValues?: Partial<ProjectFormValues>;
	clients: Array<{ id: string; name: string }>;
}

export function ProjectForm({
	onSubmit,
	isSubmitting,
	defaultValues,
	clients,
}: ProjectFormProps) {
	const form = useForm<ProjectFormValues>({
		resolver: zodResolver(projectFormSchema),
		defaultValues: {
			name: '',
			description: '',
			status: 'not_started',
			client_id: '',
			hourly_rate: '',
			fixed_price: '',
			category: '',
			...defaultValues,
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="md:col-span-2">
								<FormLabel>Nombre del proyecto</FormLabel>
								<FormControl>
									<Input placeholder="Nombre del proyecto" {...field} />
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
										{clients.map((client) => (
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
										<SelectItem value="not_started">No Started</SelectItem>
										<SelectItem value="in_progress">In progress</SelectItem>
										<SelectItem value="completed">Completed</SelectItem>
										<SelectItem value="on_hold">On hold</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="start_date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Fecha de inicio</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												className={cn(
													'pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}
											>
												{field.value ? (
													format(new Date(field.value), 'PPP', { locale: es })
												) : (
													<span>Selecciona una fecha</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value ? new Date(field.value) : undefined}
											onSelect={(date) => field.onChange(date?.toISOString())}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="end_date"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Fecha de finalización</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="outline"
												className={cn(
													'pl-3 text-left font-normal',
													!field.value && 'text-muted-foreground',
												)}
											>
												{field.value ? (
													format(new Date(field.value), 'PPP', { locale: es })
												) : (
													<span>Selecciona una fecha</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={field.value ? new Date(field.value) : undefined}
											onSelect={(date) => field.onChange(date?.toISOString())}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="hourly_rate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tarifa por hora</FormLabel>
								<FormControl>
									<Input type="number" placeholder="0.00" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="fixed_price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Precio fijo</FormLabel>
								<FormControl>
									<Input type="number" placeholder="0.00" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categoría</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecciona una categoría" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{mockCategories.map((category) => (
											<SelectItem key={category.id} value={category.name}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
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
									placeholder="Describe el proyecto..."
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-2">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Guardando...' : 'Guardar proyecto'}
					</Button>
				</div>
			</form>
		</Form>
	);
}
