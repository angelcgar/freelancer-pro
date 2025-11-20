'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { mockProjects } from '@/mocks/projects';
import { mockCategories } from '@/mocks/categories';
import { mockClientsSimple } from '@/mocks/clients';
import type { ProjectUser } from '@/types';

interface ProjectPageProps {
	params: {
		id: string;
	};
}

/**
 * NOTA IMPORTANTE: Sistema de persistencia simulada
 *
 * Esta página usa localStorage para simular la persistencia de cambios.
 * Cuando guardas cambios aquí, se almacenan en localStorage con la key:
 * `project-overrides-${projectId}`
 *
 * La tabla principal debería leer de localStorage también para reflejar
 * los cambios. Ver comentarios en el código sobre cómo implementarlo.
 */

export default function ProjectDetailPage({ params }: ProjectPageProps) {
	const projectId = params.id;

	// Estado para el proyecto
	const [project, setProject] = useState<ProjectUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	// Estados del formulario
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		category: '',
		status: '',
		client_id: '',
		hourly_rate: '',
		fixed_price: '',
		start_date: '',
		end_date: '',
	});

	// Cargar proyecto desde mock o localStorage
	useEffect(() => {
		const loadProject = () => {
			// Primero intentar cargar desde localStorage (overrides simulados)
			const storageKey = `project-override-${projectId}`;
			const savedOverride = localStorage.getItem(storageKey);

			let loadedProject: ProjectUser | null = null;

			if (savedOverride) {
				// Si hay override, usarlo
				loadedProject = JSON.parse(savedOverride);
			} else {
				// Si no, buscar en los mocks
				loadedProject = mockProjects.find((p) => p.id === projectId) || null;
			}

			if (loadedProject) {
				setProject(loadedProject);
				setFormData({
					name: loadedProject.name,
					description: loadedProject.description,
					category: loadedProject.category,
					status: loadedProject.status,
					client_id: loadedProject.client_id,
					hourly_rate: loadedProject.hourly_rate,
					fixed_price: loadedProject.fixed_price,
					start_date: loadedProject.start_date,
					end_date: loadedProject.end_date,
				});
			}

			setIsLoading(false);
		};

		loadProject();
	}, [projectId]);

	// Handler para cambios en el formulario
	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Guardar cambios (simulado en localStorage)
	const handleSave = () => {
		if (!project) return;

		setIsSaving(true);

		// Simular delay de guardado
		setTimeout(() => {
			const updatedProject: ProjectUser = {
				...project,
				...formData,
				updated_at: new Date(),
			};

			// Guardar en localStorage
			const storageKey = `project-override-${projectId}`;
			localStorage.setItem(storageKey, JSON.stringify(updatedProject));

			setProject(updatedProject);
			setIsSaving(false);

			toast.success('Cambios guardados (simulado)', {
				description:
					'Los cambios se han guardado localmente y se reflejarán en la tabla.',
			});
		}, 500);
	};

	// Estados de la UI
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<p className="text-muted-foreground">Cargando proyecto...</p>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/projects">
						<Button variant="outline" size="sm">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Button>
					</Link>
				</div>
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">Proyecto no encontrado</CardTitle>
						<CardDescription className="text-center mb-4">
							El proyecto con ID &quot;{projectId}&quot; no existe en el
							sistema.
						</CardDescription>
						<Link href="/dashboard/projects">
							<Button variant="outline">Volver a proyectos</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	// Mapeo de estados para badges
	const statusVariantMap: Record<
		string,
		'default' | 'secondary' | 'destructive' | 'outline'
	> = {
		in_progress: 'default',
		completed: 'secondary',
		on_hold: 'outline',
		not_started: 'destructive',
	};

	const statusLabelMap: Record<string, string> = {
		in_progress: 'En Progreso',
		completed: 'Completado',
		on_hold: 'En Pausa',
		not_started: 'No Iniciado',
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<div className="flex items-center gap-4">
						<Link href="/dashboard/projects">
							<Button variant="outline" size="sm">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Volver
							</Button>
						</Link>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								{project.name}
							</h1>
							<p className="text-sm text-muted-foreground">ID: {project.id}</p>
						</div>
					</div>
				</div>
				<Badge variant={statusVariantMap[project.status] || 'outline'}>
					{statusLabelMap[project.status] || project.status}
				</Badge>
			</div>

			{/* Alert de simulación */}
			<Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
				<CardContent className="pt-6">
					<div className="flex items-start gap-3">
						<AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
						<div className="space-y-1">
							<p className="text-sm font-medium text-blue-900 dark:text-blue-100">
								Modo de demostración
							</p>
							<p className="text-sm text-blue-700 dark:text-blue-300">
								Los cambios se guardan en localStorage y son solo para
								demostración. No se persisten en ningún backend.
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Formulario de edición */}
			<Card>
				<CardHeader>
					<CardTitle>Detalles del Proyecto</CardTitle>
					<CardDescription>
						Edita la información del proyecto. Los cambios se simularán
						localmente.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Nombre */}
						<div className="space-y-2">
							<Label htmlFor="name">Nombre del proyecto</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
								placeholder="Nombre del proyecto"
							/>
						</div>

						{/* Cliente */}
						<div className="space-y-2">
							<Label htmlFor="client">Cliente</Label>
							<Select
								value={formData.client_id}
								onValueChange={(value) => handleInputChange('client_id', value)}
							>
								<SelectTrigger id="client">
									<SelectValue placeholder="Selecciona un cliente" />
								</SelectTrigger>
								<SelectContent>
									{mockClientsSimple.map((client) => (
										<SelectItem key={client.id} value={client.id}>
											{client.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Categoría */}
						<div className="space-y-2">
							<Label htmlFor="category">Categoría</Label>
							<Select
								value={formData.category}
								onValueChange={(value) => handleInputChange('category', value)}
							>
								<SelectTrigger id="category">
									<SelectValue placeholder="Selecciona una categoría" />
								</SelectTrigger>
								<SelectContent>
									{mockCategories.map((category) => (
										<SelectItem key={category.id} value={category.name}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{/* Estado */}
						<div className="space-y-2">
							<Label htmlFor="status">Estado</Label>
							<Select
								value={formData.status}
								onValueChange={(value) => handleInputChange('status', value)}
							>
								<SelectTrigger id="status">
									<SelectValue placeholder="Selecciona un estado" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="not_started">No Iniciado</SelectItem>
									<SelectItem value="in_progress">En Progreso</SelectItem>
									<SelectItem value="completed">Completado</SelectItem>
									<SelectItem value="on_hold">En Pausa</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Tarifa por hora */}
						<div className="space-y-2">
							<Label htmlFor="hourly_rate">Tarifa por hora ($)</Label>
							<Input
								id="hourly_rate"
								type="number"
								value={formData.hourly_rate}
								onChange={(e) =>
									handleInputChange('hourly_rate', e.target.value)
								}
								placeholder="0.00"
							/>
						</div>

						{/* Precio fijo */}
						<div className="space-y-2">
							<Label htmlFor="fixed_price">Precio fijo ($)</Label>
							<Input
								id="fixed_price"
								type="number"
								value={formData.fixed_price}
								onChange={(e) =>
									handleInputChange('fixed_price', e.target.value)
								}
								placeholder="0.00"
							/>
						</div>
					</div>

					{/* Descripción */}
					<div className="space-y-2">
						<Label htmlFor="description">Descripción</Label>
						<Textarea
							id="description"
							value={formData.description}
							onChange={(e) => handleInputChange('description', e.target.value)}
							placeholder="Describe el proyecto..."
							rows={5}
							className="resize-none"
						/>
					</div>

					{/* Botones de acción */}
					<div className="flex justify-end gap-3 pt-4">
						<Link href="/dashboard/projects">
							<Button variant="outline">Cancelar</Button>
						</Link>
						<Button onClick={handleSave} disabled={isSaving}>
							<Save className="mr-2 h-4 w-4" />
							{isSaving ? 'Guardando...' : 'Guardar cambios'}
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Card de información adicional */}
			<Card>
				<CardHeader>
					<CardTitle>Información adicional</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Fecha de inicio
							</p>
							<p className="text-sm">
								{project.start_date
									? new Date(project.start_date).toLocaleDateString('es-ES')
									: 'No especificada'}
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Fecha de finalización
							</p>
							<p className="text-sm">
								{project.end_date
									? new Date(project.end_date).toLocaleDateString('es-ES')
									: 'No especificada'}
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Última actualización
							</p>
							<p className="text-sm">
								{new Date(project.updated_at).toLocaleDateString('es-ES')}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
