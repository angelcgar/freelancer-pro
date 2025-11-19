export interface Category {
	id: string;
	name: string;
	description?: string;
}

export const mockCategories: Category[] = [
	{
		id: 'web-development',
		name: 'Desarrollo Web',
		description: 'Proyectos de desarrollo web frontend y backend',
	},
	{
		id: 'mobile-development',
		name: 'Desarrollo Móvil',
		description: 'Aplicaciones iOS y Android',
	},
	{
		id: 'ui-ux-design',
		name: 'Diseño UI/UX',
		description: 'Diseño de interfaces y experiencia de usuario',
	},
	{
		id: 'branding',
		name: 'Branding',
		description: 'Identidad corporativa y diseño de marca',
	},
	{
		id: 'consulting',
		name: 'Consultoría',
		description: 'Servicios de consultoría técnica y estratégica',
	},
	{
		id: 'marketing',
		name: 'Marketing Digital',
		description: 'Estrategias de marketing y publicidad digital',
	},
	{
		id: 'seo',
		name: 'SEO',
		description: 'Optimización para motores de búsqueda',
	},
	{
		id: 'maintenance',
		name: 'Mantenimiento',
		description: 'Mantenimiento y soporte técnico',
	},
	{
		id: 'other',
		name: 'Otro',
		description: 'Otros servicios no categorizados',
	},
];
