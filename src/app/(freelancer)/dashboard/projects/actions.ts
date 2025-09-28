'use server';

import type { ProjectUser } from '@/types';
import { createClient } from '@/lib/supabase/server';

export async function createProjectAction(formData: FormData) {
	const name = formData.get('name') as string;
	const description = formData.get('description') as string | null;
	const status = formData.get('status') as string;
	const client_id = formData.get('client_id') as string;
	const hourly_rate = formData.get('hourly_rate') as string | null;
	const fixed_price = formData.get('fixed_price') as string | null;
	const start_date = formData.get('start_date') as string | null;
	const end_date = formData.get('end_date') as string | null;
	const category = formData.get('category') as string | null;

	if (!name) {
		throw new Error('El nombre del proyecto es requerido');
	}

	const supabase = await createClient();

	// Get current user
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	const currentUserId = user?.id;

	if (userError || !currentUserId) {
		throw new Error('No se pudo autenticar el usuario');
	}

	const { data, error } = await supabase
		.from('projects')
		.insert([
			{
				user_id: currentUserId,
				client_id,
				name,
				description,
				status,
				hourly_rate: hourly_rate ? parseFloat(hourly_rate) : null,
				fixed_price: fixed_price ? parseFloat(fixed_price) : null,
				start_date: start_date ? new Date(start_date).toISOString() : null,
				end_date: end_date ? new Date(end_date).toISOString() : null,
				category,
			},
		])
		.select()
		.single();

	if (error) {
		console.error('Error creating project:', error);
		throw new Error('No se pudo crear el proyecto');
	}

	return data as ProjectUser;
}

export async function getProjectsAction(): Promise<ProjectUser[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('projects')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;

	return data as ProjectUser[];
}
