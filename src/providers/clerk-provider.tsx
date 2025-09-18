'use client';

import { ClerkProvider } from '@clerk/nextjs';

export function ClerkProviderWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

	if (!publishableKey) {
		throw new Error('Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
	}

	return (
		<ClerkProvider
			publishableKey={publishableKey}
			appearance={{
				baseTheme: undefined,
				variables: {
					colorPrimary: '#0f172a',
					colorBackground: '#ffffff',
					colorInputBackground: '#ffffff',
					colorInputText: '#0f172a',
				},
				elements: {
					formButtonPrimary: 'bg-slate-900 hover:bg-slate-800 text-white',
					card: 'shadow-lg',
				},
			}}
		>
			{children}
		</ClerkProvider>
	);
}
