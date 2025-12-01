/**
 * Store simulado para gestión de Invoices (Facturas)
 * Persistencia con localStorage
 */

import type { MockInvoice, InvoiceItem } from '@/mocks/invoices';
import { mockInvoices } from '@/mocks/invoices';

const STORAGE_KEY = 'freelance-pro-invoices';
const OVERRIDES_PREFIX = 'invoice-override-';

/**
 * Obtener todas las facturas (desde localStorage + mocks)
 */
export function getInvoices(): MockInvoice[] {
	if (typeof window === 'undefined') return mockInvoices;

	try {
		const storedIds = localStorage.getItem(STORAGE_KEY);
		if (!storedIds) return mockInvoices;

		const ids: string[] = JSON.parse(storedIds);
		const invoices: MockInvoice[] = [];

		for (const id of ids) {
			const override = localStorage.getItem(`${OVERRIDES_PREFIX}${id}`);
			if (override) {
				invoices.push(JSON.parse(override));
			} else {
				const mock = mockInvoices.find((inv) => inv.id === id);
				if (mock) invoices.push(mock);
			}
		}

		return invoices;
	} catch (error) {
		console.error('Error getting invoices:', error);
		return mockInvoices;
	}
}

/**
 * Obtener una factura por ID
 */
export function getInvoiceById(id: string): MockInvoice | null {
	if (typeof window === 'undefined') {
		return mockInvoices.find((inv) => inv.id === id) || null;
	}

	try {
		// Buscar en overrides primero
		const override = localStorage.getItem(`${OVERRIDES_PREFIX}${id}`);
		if (override) {
			return JSON.parse(override);
		}

		// Si no, buscar en mocks
		return mockInvoices.find((inv) => inv.id === id) || null;
	} catch (error) {
		console.error('Error getting invoice:', error);
		return null;
	}
}

/**
 * Calcular total de una factura a partir de sus items
 */
export function calculateInvoiceTotals(items: InvoiceItem[]): {
	subtotal: number;
	tax: number;
	total: number;
} {
	const subtotal = items.reduce(
		(sum, item) => sum + item.quantity * item.unitPrice,
		0,
	);
	const tax = subtotal * 0.16; // 16% IVA
	const total = subtotal + tax;

	return {
		subtotal: Math.round(subtotal * 100) / 100,
		tax: Math.round(tax * 100) / 100,
		total: Math.round(total * 100) / 100,
	};
}

/**
 * Crear una nueva factura
 */
export function createInvoice(
	data: Omit<MockInvoice, 'id' | 'created_at' | 'updated_at' | 'user_id'> & {
		items: InvoiceItem[];
	},
): MockInvoice {
	const { subtotal, tax, total } = calculateInvoiceTotals(data.items);

	const newInvoice: MockInvoice = {
		id: `inv-${Date.now()}`,
		user_id: 'user-1',
		...data,
		subtotal,
		tax,
		total,
		created_at: new Date(),
		updated_at: new Date().toISOString(),
	};

	if (typeof window !== 'undefined') {
		try {
			// Guardar override
			localStorage.setItem(
				`${OVERRIDES_PREFIX}${newInvoice.id}`,
				JSON.stringify(newInvoice),
			);

			// Actualizar lista de IDs
			const invoices = getInvoices();
			const invoiceIds = invoices.map((inv) => inv.id);
			invoiceIds.unshift(newInvoice.id); // Agregar al inicio
			localStorage.setItem(STORAGE_KEY, JSON.stringify(invoiceIds));
		} catch (error) {
			console.error('Error creating invoice:', error);
		}
	}

	return newInvoice;
}

/**
 * Actualizar una factura existente
 */
export function updateInvoice(
	id: string,
	data: Partial<Omit<MockInvoice, 'id' | 'user_id' | 'created_at'>>,
): MockInvoice | null {
	const existingInvoice = getInvoiceById(id);
	if (!existingInvoice) return null;

	// Recalcular totales si los items cambiaron
	let totals = {
		subtotal: existingInvoice.subtotal,
		tax: existingInvoice.tax,
		total: existingInvoice.total,
	};

	if (data.items) {
		totals = calculateInvoiceTotals(data.items);
	}

	const updatedInvoice: MockInvoice = {
		...existingInvoice,
		...data,
		...totals,
		updated_at: new Date().toISOString(),
	};

	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem(
				`${OVERRIDES_PREFIX}${id}`,
				JSON.stringify(updatedInvoice),
			);
		} catch (error) {
			console.error('Error updating invoice:', error);
		}
	}

	return updatedInvoice;
}

/**
 * Eliminar una factura
 */
export function deleteInvoice(id: string): boolean {
	if (typeof window === 'undefined') return false;

	try {
		// Eliminar override si existe
		localStorage.removeItem(`${OVERRIDES_PREFIX}${id}`);

		// Actualizar lista de IDs
		const storedIds = localStorage.getItem(STORAGE_KEY);
		if (storedIds) {
			const ids: string[] = JSON.parse(storedIds);
			const newIds = ids.filter((invId) => invId !== id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
		} else {
			// Si no hay lista, crear una sin este ID
			const allIds = mockInvoices.map((inv) => inv.id).filter((i) => i !== id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds));
		}

		return true;
	} catch (error) {
		console.error('Error deleting invoice:', error);
		return false;
	}
}

/**
 * Resetear todas las facturas a los valores mock originales
 */
export function resetInvoices(): void {
	if (typeof window === 'undefined') return;

	try {
		// Eliminar todos los overrides
		for (const invoice of mockInvoices) {
			localStorage.removeItem(`${OVERRIDES_PREFIX}${invoice.id}`);
		}

		// Resetear lista de IDs
		localStorage.removeItem(STORAGE_KEY);
	} catch (error) {
		console.error('Error resetting invoices:', error);
	}
}
