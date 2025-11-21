/**
 * Mock de Contratos
 *
 * Datos simulados para contratos entre freelancer y clientes.
 * Usado para demostración sin backend.
 */

export interface MockContract {
	id: string;
	user_id: string;
	client_id: string;
	project_id: string;
	title: string;
	description: string;
	status: 'active' | 'expired' | 'pending' | 'draft';
	start_date: string;
	end_date: string;
	value: string;
	terms: string;
	created_at: Date;
	updated_at: string;
}

export const mockContracts: MockContract[] = [
	{
		id: 'ct-001',
		user_id: 'user-1',
		client_id: 'client-1',
		project_id: 'project-1',
		title: 'Website Redesign Contract',
		description:
			'Full website redesign including UI/UX design, frontend development, and responsive implementation',
		status: 'active',
		start_date: '2024-10-01T00:00:00Z',
		end_date: '2024-12-31T00:00:00Z',
		value: '15000',
		terms:
			'Payment in 3 milestones: 50% upfront, 30% mid-project, 20% on completion. All source code delivered upon final payment.',
		created_at: new Date('2024-09-25'),
		updated_at: '2024-11-15T10:00:00Z',
	},
	{
		id: 'ct-002',
		user_id: 'user-1',
		client_id: 'client-2',
		project_id: 'project-2',
		title: 'Mobile App Development Agreement',
		description:
			'Native iOS and Android application development with backend API integration',
		status: 'active',
		start_date: '2024-09-15T00:00:00Z',
		end_date: '2025-03-15T00:00:00Z',
		value: '50000',
		terms:
			'Fixed price project with monthly billing. Includes 3 months post-launch support and maintenance.',
		created_at: new Date('2024-09-10'),
		updated_at: '2024-11-14T14:30:00Z',
	},
	{
		id: 'ct-003',
		user_id: 'user-1',
		client_id: 'client-3',
		project_id: 'project-3',
		title: 'Brand Identity Package Contract',
		description:
			'Complete brand identity including logo design, brand guidelines, and marketing materials',
		status: 'expired',
		start_date: '2024-08-01T00:00:00Z',
		end_date: '2024-10-15T00:00:00Z',
		value: '8500',
		terms:
			'All deliverables include unlimited revisions within scope. Final files delivered in vector and raster formats.',
		created_at: new Date('2024-07-28'),
		updated_at: '2024-10-15T16:45:00Z',
	},
	{
		id: 'ct-004',
		user_id: 'user-1',
		client_id: 'client-4',
		project_id: 'project-4',
		title: 'E-commerce Platform Development',
		description:
			'Custom e-commerce solution with payment gateway integration and admin dashboard',
		status: 'active',
		start_date: '2024-11-01T00:00:00Z',
		end_date: '2025-02-28T00:00:00Z',
		value: '35000',
		terms:
			'Hourly rate of $85/hr with weekly invoicing. Estimated 400-450 hours total. Includes training and documentation.',
		created_at: new Date('2024-10-28'),
		updated_at: '2024-11-18T09:15:00Z',
	},
	{
		id: 'ct-005',
		user_id: 'user-1',
		client_id: 'client-5',
		project_id: 'project-5',
		title: 'SEO Optimization Services Agreement',
		description:
			'Comprehensive SEO audit, strategy development, and ongoing optimization',
		status: 'pending',
		start_date: '2024-12-01T00:00:00Z',
		end_date: '2025-01-31T00:00:00Z',
		value: '4500',
		terms:
			'Monthly retainer with detailed reporting. 3-month minimum commitment. Results-driven approach with KPI tracking.',
		created_at: new Date('2024-11-10'),
		updated_at: '2024-11-10T11:20:00Z',
	},
];
