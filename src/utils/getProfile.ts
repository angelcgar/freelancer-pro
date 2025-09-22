import { createClient } from '@/lib/supabase/client';

import type { ProfileUser } from '@/types';

/**
 * Get profile by user id in supabase.
 * Use on the client side.
 * @param userId - User id
 * @returns Profile
 */
export async function getProfileById(
	userId: string,
): Promise<ProfileUser | null> {
	const supabase = createClient;

	const { data, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', userId)
		.single();

	if (error) {
		console.error('Error fetching profile:', error.message);
		return null;
	}

	return data;
}
