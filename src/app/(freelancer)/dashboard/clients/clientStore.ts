/**
 * Client Store - Sistema de gestión simulada de clientes
 *
 * Este módulo simula una conexión a una API/base de datos usando localStorage
 * para persistir los cambios. Es ideal para demostraciones sin backend.
 *
 * Funciones disponibles:
 * - getClients(): Obtener todos los clientes
 * - getClientById(id): Obtener un cliente específico
 * - createClient(data): Crear nuevo cliente
 * - updateClient(id, data): Actualizar cliente existente
 * - deleteClient(id): Eliminar cliente
 */

import { mockClients } from '@/mocks/clients';
import type { ClientUser } from '@/types/clients-user.types';

const STORAGE_KEY = 'freelance-pro-clients';
const OVERRIDES_PREFIX = 'client-override-';

/**
 * Cargar clientes desde localStorage o usar mocks por defecto
 */
export function getClients(): ClientUser[] {
	if (typeof window === 'undefined') return mockClients;

	try {
		// Intentar cargar lista personalizada de localStorage
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const clientIds = JSON.parse(stored) as string[];

			// Cargar cada cliente (con overrides si existen)
			return clientIds
				.map((id) => getClientById(id))
				.filter((client): client is ClientUser => client !== null);
		}

		// Si no hay lista, aplicar overrides a los mocks
		return mockClients.map((client) => {
			const override = localStorage.getItem(`${OVERRIDES_PREFIX}${client.id}`);
			return override ? JSON.parse(override) : client;
		});
	} catch (error) {
		console.error('Error loading clients:', error);
		return mockClients;
	}
}

/**
 * Obtener un cliente por ID
 */
export function getClientById(id: string): ClientUser | null {
	if (typeof window === 'undefined') {
		return mockClients.find((c) => c.id === id) || null;
	}

	try {
		// Primero buscar en overrides
		const override = localStorage.getItem(`${OVERRIDES_PREFIX}${id}`);
		if (override) {
			return JSON.parse(override);
		}

		// Si no, buscar en mocks
		return mockClients.find((c) => c.id === id) || null;
	} catch (error) {
		console.error('Error getting client:', error);
		return null;
	}
}

/**
 * Crear un nuevo cliente
 */
export function createClient(
	data: Omit<ClientUser, 'id' | 'created_at' | 'updated_at' | 'user_id'>,
): ClientUser {
	const newClient: ClientUser = {
		id: `client-${Date.now()}`,
		user_id: 'user-1',
		...data,
		created_at: new Date(),
		updated_at: new Date().toISOString(),
	};

	if (typeof window !== 'undefined') {
		try {
			// Guardar el nuevo cliente
			localStorage.setItem(
				`${OVERRIDES_PREFIX}${newClient.id}`,
				JSON.stringify(newClient),
			);

			// Actualizar lista de IDs
			const clients = getClients();
			const clientIds = clients.map((c) => c.id);
			clientIds.unshift(newClient.id); // Agregar al inicio
			localStorage.setItem(STORAGE_KEY, JSON.stringify(clientIds));
		} catch (error) {
			console.error('Error creating client:', error);
		}
	}

	return newClient;
}

/**
 * Actualizar un cliente existente
 */
export function updateClient(
	id: string,
	data: Partial<Omit<ClientUser, 'id' | 'user_id' | 'created_at'>>,
): ClientUser | null {
	const existingClient = getClientById(id);
	if (!existingClient) return null;

	const updatedClient: ClientUser = {
		...existingClient,
		...data,
		updated_at: new Date().toISOString(),
	};

	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem(
				`${OVERRIDES_PREFIX}${id}`,
				JSON.stringify(updatedClient),
			);
		} catch (error) {
			console.error('Error updating client:', error);
		}
	}

	return updatedClient;
}

/**
 * Eliminar un cliente
 */
export function deleteClient(id: string): boolean {
	if (typeof window === 'undefined') return false;

	try {
		// Eliminar override
		localStorage.removeItem(`${OVERRIDES_PREFIX}${id}`);

		// Actualizar lista de IDs
		const clients = getClients();
		const updatedIds = clients.filter((c) => c.id !== id).map((c) => c.id);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));

		return true;
	} catch (error) {
		console.error('Error deleting client:', error);
		return false;
	}
}

/**
 * Resetear todos los clientes a los mocks originales
 * (útil para desarrollo/testing)
 */
export function resetClients(): void {
	if (typeof window === 'undefined') return;

	try {
		// Eliminar lista personalizada
		localStorage.removeItem(STORAGE_KEY);

		// Eliminar todos los overrides
		Object.keys(localStorage)
			.filter((key) => key.startsWith(OVERRIDES_PREFIX))
			.forEach((key) => {
				localStorage.removeItem(key);
			});
	} catch (error) {
		console.error('Error resetting clients:', error);
	}
}
