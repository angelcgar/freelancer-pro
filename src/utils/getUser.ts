import type { AuthUser } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/client';

/**
 * Get user with auth in supabase.
 * Use on the client side.
 * @returns AuthUser | null
 */
export async function getUser(): Promise<AuthUser | null> {
	const supabase = createClient;

	const { data, error } = await supabase.auth.getUser();

	if (error) {
		console.error('Error fetching user:', error.message);
		return null;
	}

	return data.user;
}
