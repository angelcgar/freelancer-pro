import { get } from 'env-var';

export const env = {
	NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: get('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY')
		.required()
		.asString(),
	CLERK_SECRET_KEY: get('CLERK_SECRET_KEY').required().asString(),

	// Supabase
	NEXT_PUBLIC_SUPABASE_URL: get('NEXT_PUBLIC_SUPABASE_URL')
		.required()
		.asString(),
	NEXT_PUBLIC_SUPABASE_ANON_KEY: get('NEXT_PUBLIC_SUPABASE_ANON_KEY')
		.required()
		.asString(),
	SUPABASE_SERVICE_ROLE_KEY: get('SUPABASE_SERVICE_ROLE_KEY')
		.required()
		.asString(),

	// Stripe
	NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: get('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
		.required()
		.asString(),
	STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
	STRIPE_WEBHOOK_SECRET: get('STRIPE_WEBHOOK_SECRET').required().asString(),

	// Resend
	RESEND_API_KEY: get('RESEND_API_KEY').required().asString(),

	// App
	NEXT_PUBLIC_APP_URL: get('NEXT_PUBLIC_APP_URL').required().asString(),
};
