'use client';

import { useState, type ComponentProps } from 'react';

import { useRouter } from 'next/navigation';

// import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Plus } from 'lucide-react';

import { toast } from 'sonner';

import { ClientForm } from '@/components/client/ClientForm';
import { createClientAction } from '@/app/(freelancer)/dashboard/clients/actions';
import type { ClientFormValues } from '@/validations/client';

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
}

export function AddClientDialog({ variant }: AddClientDialogProps) {
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
			const toastId = toast.loading('Creating client...');

			// Create form data to send to server action
			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				if (value) formData.append(key, value);
			});

			await createClientAction(formData);

			toast.success('Client created successfully', { id: toastId });
			setOpen(false);
			router.refresh();
		} catch (error) {
			console.error('Error creating client:', error);
			toast.error('Something went wrong while creating the client');
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
