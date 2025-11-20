'use client';

import { useEffect, useId, useState } from 'react';
import {
	ArrowLeft,
	Save,
	AlertCircle,
	Mail,
	Phone,
	Building2,
	MapPin,
} from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { getClientById, updateClient } from '../clientStore';
import type { ClientUser } from '@/types';

interface ClientPageProps {
	params: {
		id: string;
	};
}

/**
 * NOTA IMPORTANTE: Sistema de persistencia simulada - CLIENTES
 *
 * Esta página usa el clientStore que persiste en localStorage.
 * Los cambios se guardan con la key: `client-override-${clientId}`
 *
 * La tabla principal y otras vistas leen estos cambios automáticamente.
 */

export default function ClientDetailPage({ params }: ClientPageProps) {
	const clientId = params.id;
	const id = useId();

	// Estado para el cliente
	const [client, setClient] = useState<ClientUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	// Estados del formulario
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		company: '',
		address: '',
		notes: '',
	});

	// Cargar cliente
	useEffect(() => {
		const loadClient = () => {
			const loadedClient = getClientById(clientId);

			if (loadedClient) {
				setClient(loadedClient);
				setFormData({
					name: loadedClient.name,
					email: loadedClient.email,
					phone: loadedClient.phone || '',
					company: loadedClient.company || '',
					address: loadedClient.address || '',
					notes: loadedClient.notes || '',
				});
			}

			setIsLoading(false);
		};

		loadClient();
	}, [clientId]);

	// Handler para cambios en el formulario
	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	// Guardar cambios
	const handleSave = () => {
		if (!client) return;

		setIsSaving(true);

		// Simular delay de guardado
		setTimeout(() => {
			const updatedClient = updateClient(client.id, formData);

			if (updatedClient) {
				setClient(updatedClient);
				toast.success('Cambios guardados', {
					description:
						'La información del cliente se ha actualizado correctamente.',
				});

				// Emitir evento para actualizar otras vistas
				window.dispatchEvent(new Event('clients-updated'));
			} else {
				toast.error('Error al guardar', {
					description:
						'No se pudieron guardar los cambios. Inténtalo de nuevo.',
				});
			}

			setIsSaving(false);
		}, 500);
	};

	// Estados de la UI
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<p className="text-muted-foreground">Cargando cliente...</p>
			</div>
		);
	}

	if (!client) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-4">
					<Link href="/dashboard/clients">
						<Button variant="outline" size="sm">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Volver
						</Button>
					</Link>
				</div>
				<Card>
					<CardContent className="flex flex-col items-center justify-center py-12">
						<AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">Cliente no encontrado</CardTitle>
						<CardDescription className="text-center mb-4">
							El cliente con ID &quot;{clientId}&quot; no existe en el sistema.
						</CardDescription>
						<Link href="/dashboard/clients">
							<Button variant="outline">Volver a clientes</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<div className="flex items-center gap-4">
						<Link href="/dashboard/clients">
							<Button variant="outline" size="sm">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Volver
							</Button>
						</Link>
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								{client.name}
							</h1>
							<p className="text-sm text-muted-foreground">ID: {client.id}</p>
						</div>
					</div>
				</div>
				<Badge variant="outline" className="h-fit">
					Cliente
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

			{/* Información de contacto rápida */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-primary/10 rounded-lg">
								<Mail className="h-5 w-5 text-primary" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-muted-foreground">
									Email
								</p>
								<p className="text-sm truncate">{client.email}</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-primary/10 rounded-lg">
								<Phone className="h-5 w-5 text-primary" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-muted-foreground">
									Teléfono
								</p>
								<p className="text-sm truncate">
									{client.phone || 'No especificado'}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="pt-6">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-primary/10 rounded-lg">
								<Building2 className="h-5 w-5 text-primary" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-muted-foreground">
									Empresa
								</p>
								<p className="text-sm truncate">
									{client.company || 'No especificada'}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Formulario de edición */}
			<Card>
				<CardHeader>
					<CardTitle>Información del Cliente</CardTitle>
					<CardDescription>
						Edita la información de contacto y detalles del cliente.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Nombre */}
						<div className="space-y-2">
							<Input
								id={`${id}-name`}
								value={formData.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
								placeholder="Nombre del cliente"
								required
							/>
						</div>

						{/* Email */}
						<div className="space-y-2">
							<Input
								id={`${id}-email`}
								type="email"
								value={formData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								placeholder="email@ejemplo.com"
								required
							/>
						</div>

						{/* Teléfono */}
						<div className="space-y-2">
							<Input
								id={`${id}-phone`}
								type="tel"
								value={formData.phone}
								onChange={(e) => handleInputChange('phone', e.target.value)}
								placeholder="+1 (555) 123-4567"
							/>
						</div>

						{/* Empresa */}
						<div className="space-y-2">
							<Input
								id={`${id}-company`}
								value={formData.company}
								onChange={(e) => handleInputChange('company', e.target.value)}
								placeholder="Nombre de la empresa"
							/>
						</div>
					</div>

					{/* Dirección */}
					<div className="space-y-2">
						<Input
							id={`${id}-address`}
							value={formData.address}
							onChange={(e) => handleInputChange('address', e.target.value)}
							placeholder="Dirección completa"
						/>
					</div>

					{/* Notas */}
					<div className="space-y-2">
						<Textarea
							id={`${id}-notes`}
							value={formData.notes}
							onChange={(e) => handleInputChange('notes', e.target.value)}
							placeholder="Notas adicionales sobre el cliente..."
							rows={5}
							className="resize-none"
						/>
					</div>

					{/* Botones de acción */}
					<div className="flex justify-end gap-3 pt-4">
						<Link href="/dashboard/clients">
							<Button variant="outline">Cancelar</Button>
						</Link>
						<Button
							onClick={handleSave}
							disabled={isSaving || !formData.name || !formData.email}
						>
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Fecha de creación
							</p>
							<p className="text-sm">
								{new Date(client.created_at).toLocaleDateString('es-ES', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">
								Última actualización
							</p>
							<p className="text-sm">
								{new Date(client.updated_at).toLocaleDateString('es-ES', {
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								})}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
