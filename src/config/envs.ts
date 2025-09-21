import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const envs = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		CLERK_SECRET_KEY: z.string(),
	},

	/*
	 * Environment variables available on the client (and server).
	 *
	 * You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		NEXT_PUBLIC_SUPABASE_URL: z.string(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	},

	runtimeEnv: {
		// server
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		// client
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	},
});
