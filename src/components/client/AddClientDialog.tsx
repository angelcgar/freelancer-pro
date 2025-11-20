'use client';

import { useState, type ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

// import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Plus } from 'lucide-react';

import { toast } from 'sonner';

import { ClientForm } from '@/components/client/ClientForm';
// import { createClientAction } from '@/app/(freelancer)/dashboard/clients/actions';
import type { ClientFormValues } from '@/validations/client';
import { createClient } from '@/app/(freelancer)/dashboard/clients/clientStore';
import type { ClientUser } from '@/types';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

interface AddClientDialogProps {
	variant?: ComponentProps<typeof Button>['variant'];
	onClientCreated?: (client: ClientUser) => void;
}

export function AddClientDialog({
	variant,
	onClientCreated,
}: AddClientDialogProps) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	// const queryClient = useQueryClient();

	// const mutation = useMutation({
	// 	mutationFn: async (formData: FormData) => {
	// 		return await createClientAction(formData);
	// 	},
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: ['clients'] });
	// 	},
	// });

	const handleSubmit = async (values: ClientFormValues) => {
		try {
			setIsSubmitting(true);
			const toastId = toast.loading('Creando cliente...');

			// Crear cliente usando el store simulado
			const newClient = createClient({
				name: values.name,
				email: values.email || '',
				phone: values.phone || '',
				company: values.company || '',
				address: values.address || '',
				notes: values.notes || '',
			});

			// Simular llamada al servidor (comentado para la plantilla)
			// const formData = new FormData();
			// Object.entries(values).forEach(([key, value]) => {
			// 	if (value) formData.append(key, value);
			// });
			// await createClientAction(formData);

			// Callback para agregar el cliente a la lista
			if (onClientCreated) {
				onClientCreated(newClient);
			}

			// Emitir evento para actualizar otras vistas
			window.dispatchEvent(new Event('clients-updated'));

			toast.success('Cliente creado con éxito', { id: toastId });
			setOpen(false);
			router.refresh();
		} catch (error) {
			console.error('Error creating client:', error);
			toast.error('No se pudo crear el cliente. Inténtalo de nuevo.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={variant}>
					<Plus className="mr-2 h-4 w-4" />
					Agregar cliente
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Agregar nuevo cliente</DialogTitle>
					<DialogDescription>
						Completa la información del nuevo cliente. Los campos marcados con *
						son obligatorios.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<ClientForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
				</div>
			</DialogContent>
		</Dialog>
	);
}
