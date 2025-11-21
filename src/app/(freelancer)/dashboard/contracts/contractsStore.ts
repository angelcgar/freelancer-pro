/**
 * Contract Store - Sistema de gestión simulada de contratos
 *
 * Este módulo simula una conexión a una API/base de datos usando localStorage
 * para persistir los cambios. Es ideal para demostraciones sin backend.
 *
 * Funciones disponibles:
 * - getContracts(): Obtener todos los contratos
 * - getContractById(id): Obtener un contrato específico
 * - createContract(data): Crear nuevo contrato
 * - updateContract(id, data): Actualizar contrato existente
 * - deleteContract(id): Eliminar contrato
 */

import { mockContracts, type MockContract } from '@/mocks/contracts';

const STORAGE_KEY = 'freelance-pro-contracts';
const OVERRIDES_PREFIX = 'contract-override-';

/**
 * Cargar contratos desde localStorage o usar mocks por defecto
 */
export function getContracts(): MockContract[] {
	if (typeof window === 'undefined') return mockContracts;

	try {
		// Intentar cargar lista personalizada de localStorage
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			const contractIds = JSON.parse(stored) as string[];

			// Cargar cada contrato (con overrides si existen)
			return contractIds
				.map((id) => getContractById(id))
				.filter((contract): contract is MockContract => contract !== null);
		}

		// Si no hay lista, aplicar overrides a los mocks
		return mockContracts.map((contract) => {
			const override = localStorage.getItem(
				`${OVERRIDES_PREFIX}${contract.id}`,
			);
			return override ? JSON.parse(override) : contract;
		});
	} catch (error) {
		console.error('Error loading contracts:', error);
		return mockContracts;
	}
}

/**
 * Obtener un contrato por ID
 */
export function getContractById(id: string): MockContract | null {
	if (typeof window === 'undefined') {
		return mockContracts.find((c) => c.id === id) || null;
	}

	try {
		// Primero buscar en overrides
		const override = localStorage.getItem(`${OVERRIDES_PREFIX}${id}`);
		if (override) {
			return JSON.parse(override);
		}

		// Si no, buscar en mocks
		return mockContracts.find((c) => c.id === id) || null;
	} catch (error) {
		console.error('Error getting contract:', error);
		return null;
	}
}

/**
 * Crear un nuevo contrato
 */
export function createContract(
	data: Omit<MockContract, 'id' | 'created_at' | 'updated_at' | 'user_id'> & {
		project_id?: string;
		description?: string;
		terms?: string;
	},
): MockContract {
	const newContract: MockContract = {
		id: `ct-${Date.now()}`,
		user_id: 'user-1',
		title: data.title,
		client_id: data.client_id,
		project_id: data.project_id || '',
		description: data.description || '',
		status: data.status,
		start_date: data.start_date,
		end_date: data.end_date,
		value: data.value,
		terms: data.terms || '',
		created_at: new Date(),
		updated_at: new Date().toISOString(),
	};

	if (typeof window !== 'undefined') {
		try {
			// Guardar el nuevo contrato
			localStorage.setItem(
				`${OVERRIDES_PREFIX}${newContract.id}`,
				JSON.stringify(newContract),
			);

			// Actualizar lista de IDs
			const contracts = getContracts();
			const contractIds = contracts.map((c) => c.id);
			contractIds.unshift(newContract.id); // Agregar al inicio
			localStorage.setItem(STORAGE_KEY, JSON.stringify(contractIds));
		} catch (error) {
			console.error('Error creating contract:', error);
		}
	}

	return newContract;
}

/**
 * Actualizar un contrato existente
 */
export function updateContract(
	id: string,
	data: Partial<Omit<MockContract, 'id' | 'user_id' | 'created_at'>>,
): MockContract | null {
	const existingContract = getContractById(id);
	if (!existingContract) return null;

	const updatedContract: MockContract = {
		...existingContract,
		...data,
		updated_at: new Date().toISOString(),
	};

	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem(
				`${OVERRIDES_PREFIX}${id}`,
				JSON.stringify(updatedContract),
			);
		} catch (error) {
			console.error('Error updating contract:', error);
		}
	}

	return updatedContract;
}

/**
 * Eliminar un contrato
 */
export function deleteContract(id: string): boolean {
	if (typeof window === 'undefined') return false;

	try {
		// Eliminar override
		localStorage.removeItem(`${OVERRIDES_PREFIX}${id}`);

		// Actualizar lista de IDs
		const contracts = getContracts();
		const updatedIds = contracts.filter((c) => c.id !== id).map((c) => c.id);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));

		return true;
	} catch (error) {
		console.error('Error deleting contract:', error);
		return false;
	}
}

/**
 * Resetear todos los contratos a los mocks originales
 * (útil para desarrollo/testing)
 */
export function resetContracts(): void {
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
		console.error('Error resetting contracts:', error);
	}
}
