// import { cookies } from 'next/headers';

// import { createServerClient } from '@supabase/ssr';

// import { envs } from '@/config/envs';

// Cliente para el servidor (layouts, RSC, server actions, etc.)
// export async function createClient() {
// 	const cookieStore = await cookies();

// 	return createServerClient(
// 		envs.NEXT_PUBLIC_SUPABASE_URL,
// 		envs.NEXT_PUBLIC_SUPABASE_ANON_KEY,
// 		{
// 			cookies: {
// 				getAll() {
// 					return cookieStore.getAll();
// 				},
// 				setAll(cookiesToSet) {
// 					try {
// 						cookiesToSet.forEach(({ name, value, options }) => {
// 							cookieStore.set(name, value, options);
// 						});
// 					} catch {
// 						// The `setAll` method was called from a Server Component.
// 						// This can be ignored if you have middleware refreshing
// 						// user sessions.
// 					}
// 				},
// 			},
// 		},
// 	);
// }

// Plantilla - Supabase comentado
export async function createClient(): Promise<any> {
	// Antes era: Promise<SupabaseClient>
	return null;
}
