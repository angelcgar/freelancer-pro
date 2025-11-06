// import { useEffect, useState } from 'react';

// import type { AuthUser } from '@supabase/supabase-js';

// import { getUser } from '@/utils/getUser';

export function useCurrentUser() {
	// const [user, setUser] = useState<AuthUser | null>(null);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const load = async () => {
	// 		setLoading(true);

	// 		const user = await getUser();

	// 		if (!user) {
	// 			setUser(null);
	// 			setLoading(false);
	// 			return;
	// 		}

	// 		setUser(user);
	// 		setLoading(false);
	// 	};

	// 	load();
	// }, []);

	// Plantilla - sin auth
	const user: any = null; // Antes era: AuthUser | null
	const loading = false;

	return { user, loading };
}
