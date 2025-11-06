'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

import { ProjectForm } from './ProjectForm';
import { createProjectAction } from '@/app/(freelancer)/dashboard/projects/actions';
import type { ProjectFormValues } from '@/validations/project';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
// import { createClient } from '@/lib/supabase/client';

interface AddProjectDialogProps {
	variant?:
		| 'default'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| 'destructive';
}

export function AddProjectDialog({
	variant = 'default',
}: AddProjectDialogProps) {
	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	// const queryClient = useQueryClient();

	// Fetch clients for the dropdown
	// const { data: clients = [] } = useQuery({
	// 	queryKey: ['clients'],
	// 	queryFn: async () => {
	// 		const supabase = createClient;
	// 		const { data, error } = await supabase
	// 			.from('clients')
	// 			.select('id, name')
	// 			.order('name', { ascending: true });

	// 		if (error) throw error;
	// 		console.log('Peticion de clientes', data);
	// 		return data || [];
	// 	},
	// });

	// Mock data para la plantilla
	const clients: { id: string; name: string }[] = [];

	const handleSubmit = async (values: ProjectFormValues) => {
		try {
			setIsSubmitting(true);
			const toastId = toast.loading('Creando proyecto...');

			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					formData.append(key, value.toString());
				}
			});

			await createProjectAction(formData);

			toast.success('Proyecto creado con éxito', { id: toastId });
			setOpen(false);

			// Invalidate projects query to refetch the list
			// await queryClient.invalidateQueries({ queryKey: ['projects'] });
			router.refresh();
		} catch (error) {
			console.error('Error creating project:', error);
			toast.error('No se pudo crear el proyecto. Inténtalo de nuevo.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant={variant}>
					<Plus className="mr-2 h-4 w-4" />
					Nuevo Proyecto
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Nuevo Proyecto</DialogTitle>
					<DialogDescription>
						Completa la información del proyecto. Los campos marcados con * son
						obligatorios.
					</DialogDescription>
				</DialogHeader>
				<div className="py-4">
					<ProjectForm
						onSubmit={handleSubmit}
						isSubmitting={isSubmitting}
						clients={clients}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
