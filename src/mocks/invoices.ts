/**
 * Mock data para Facturas (Invoices)
 */

export interface InvoiceItem {
	id: string;
	description: string;
	quantity: number;
	unitPrice: number;
}

export interface MockInvoice {
	id: string;
	user_id: string;
	client_id: string;
	project_id: string;
	invoice_number: string;
	issue_date: string;
	due_date: string;
	status: 'paid' | 'unpaid' | 'overdue';
	items: InvoiceItem[];
	subtotal: number;
	tax: number;
	total: number;
	notes?: string;
	created_at: Date;
	updated_at: string;
}

export const mockInvoices: MockInvoice[] = [
	{
		id: 'inv-001',
		user_id: 'user-1',
		client_id: 'client-1',
		project_id: 'project-1',
		invoice_number: 'INV-2024-001',
		issue_date: '2024-01-15',
		due_date: '2024-02-15',
		status: 'paid',
		items: [
			{
				id: 'item-1',
				description: 'Diseño de interfaz de usuario',
				quantity: 40,
				unitPrice: 75,
			},
			{
				id: 'item-2',
				description: 'Desarrollo frontend React',
				quantity: 60,
				unitPrice: 85,
			},
			{
				id: 'item-3',
				description: 'Integración con API',
				quantity: 20,
				unitPrice: 90,
			},
		],
		subtotal: 9900,
		tax: 1584,
		total: 11484,
		notes: 'Pago recibido el 10 de febrero. Gracias por su confianza.',
		created_at: new Date('2024-01-15'),
		updated_at: '2024-02-10T10:30:00Z',
	},
	{
		id: 'inv-002',
		user_id: 'user-1',
		client_id: 'client-2',
		project_id: 'project-2',
		invoice_number: 'INV-2024-002',
		issue_date: '2024-02-01',
		due_date: '2024-03-01',
		status: 'unpaid',
		items: [
			{
				id: 'item-1',
				description: 'Desarrollo de aplicación móvil iOS',
				quantity: 120,
				unitPrice: 95,
			},
			{
				id: 'item-2',
				description: 'Testing y QA',
				quantity: 30,
				unitPrice: 70,
			},
			{
				id: 'item-3',
				description: 'Deployment a App Store',
				quantity: 10,
				unitPrice: 80,
			},
		],
		subtotal: 14300,
		tax: 2288,
		total: 16588,
		notes: 'Incluye soporte post-lanzamiento por 30 días.',
		created_at: new Date('2024-02-01'),
		updated_at: '2024-02-01T09:00:00Z',
	},
	{
		id: 'inv-003',
		user_id: 'user-1',
		client_id: 'client-3',
		project_id: 'project-3',
		invoice_number: 'INV-2024-003',
		issue_date: '2023-12-10',
		due_date: '2024-01-10',
		status: 'overdue',
		items: [
			{
				id: 'item-1',
				description: 'Diseño de identidad corporativa',
				quantity: 50,
				unitPrice: 65,
			},
			{
				id: 'item-2',
				description: 'Manual de marca',
				quantity: 20,
				unitPrice: 55,
			},
		],
		subtotal: 4350,
		tax: 696,
		total: 5046,
		notes: 'URGENTE: Factura vencida. Por favor, proceder con el pago.',
		created_at: new Date('2023-12-10'),
		updated_at: '2024-01-20T15:45:00Z',
	},
	{
		id: 'inv-004',
		user_id: 'user-1',
		client_id: 'client-4',
		project_id: 'project-4',
		invoice_number: 'INV-2024-004',
		issue_date: '2024-03-05',
		due_date: '2024-04-05',
		status: 'paid',
		items: [
			{
				id: 'item-1',
				description: 'Desarrollo de e-commerce Shopify',
				quantity: 80,
				unitPrice: 100,
			},
			{
				id: 'item-2',
				description: 'Integración con pasarela de pago',
				quantity: 25,
				unitPrice: 110,
			},
			{
				id: 'item-3',
				description: 'Configuración de inventario',
				quantity: 15,
				unitPrice: 75,
			},
			{
				id: 'item-4',
				description: 'Capacitación del equipo',
				quantity: 8,
				unitPrice: 85,
			},
		],
		subtotal: 12530,
		tax: 2004.8,
		total: 14534.8,
		notes: 'Pago anticipado. Proyecto completado satisfactoriamente.',
		created_at: new Date('2024-03-05'),
		updated_at: '2024-03-01T11:20:00Z',
	},
	{
		id: 'inv-005',
		user_id: 'user-1',
		client_id: 'client-5',
		project_id: 'project-5',
		invoice_number: 'INV-2024-005',
		issue_date: '2024-03-20',
		due_date: '2024-04-20',
		status: 'unpaid',
		items: [
			{
				id: 'item-1',
				description: 'Auditoría SEO completa',
				quantity: 30,
				unitPrice: 80,
			},
			{
				id: 'item-2',
				description: 'Optimización on-page',
				quantity: 40,
				unitPrice: 70,
			},
			{
				id: 'item-3',
				description: 'Link building',
				quantity: 20,
				unitPrice: 90,
			},
		],
		subtotal: 7000,
		tax: 1120,
		total: 8120,
		notes: 'Incluye reporte mensual de métricas por 3 meses.',
		created_at: new Date('2024-03-20'),
		updated_at: '2024-03-20T14:00:00Z',
	},
];
