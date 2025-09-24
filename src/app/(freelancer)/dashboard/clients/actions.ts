'use server';

import { createClient } from '@/lib/supabase/server';
import type { ClientUser } from '@/types';

export async function createClientAction(formData: FormData) {
	const name = formData.get('name') as string;
	const email = formData.get('email') as string | null;
	const phone = formData.get('phone') as string | null;

	if (!name) {
		throw new Error('Name is required');
	}

	const supabase = await createClient();

	const {
		data: { user },
		error: errorUser,
	} = await supabase.auth.getUser();

	const currentUserId = user?.id;
	if (!currentUserId) throw new Error('User not found');

	const { data, error } = await supabase
		.from('clients')
		.insert([
			{
				user_id: currentUserId,
				name,
				email,
				phone,
			},
		])
		.select()
		.single();

	if (error) throw error;

	return data as ClientUser;
}

export async function getClientsAction(): Promise<ClientUser[]> {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from('clients')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) throw error;

	return data as ClientUser[];
}
