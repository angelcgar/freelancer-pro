import { z } from 'zod';

export const projectFormSchema = z.object({
	name: z.string().min(2, {
		message: 'El nombre debe tener al menos 2 caracteres.',
	}),
	description: z.string().optional(),
	status: z.enum(['not_started', 'in_progress', 'completed', 'on_hold']),
	client_id: z.string().min(1, 'Selecciona un cliente'),
	hourly_rate: z.string().optional(),
	fixed_price: z.string().optional(),
	start_date: z.string().optional(),
	end_date: z.string().optional(),
	category: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
