// import { useEffect, useState } from 'react';
// import type { Session } from '@supabase/supabase-js';

// import { createClient } from '@/lib/supabase/client';

export function useCurrentSession() {
	// const [session, setSession] = useState<Session | null>(null);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	const supabase = createClient;

	// 	const load = async () => {
	// 		setLoading(true);

	// 		const {
	// 			data: { session },
	// 		} = await supabase.auth.getSession();

	// 		if (!session) {
	// 			setSession(null);
	// 			setLoading(false);
	// 			return;
	// 		}

	// 		setSession(session);
	// 		setLoading(false);
	// 	};

	// 	load();
	// }, []);

	// Plantilla - sin auth
	const session: any = null; // Antes era: Session | null
	const loading = false;

	return { session, loading };
}
