// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useCurrentSession } from '@/hooks/useCurrentSession';

export default function VerifyEmailPage() {
	// const router = useRouter();

	// const { session } = useCurrentSession();

	// useEffect(() => {
	// 	const checkSession = async () => {
	// 		if (session) {
	// 			// Si ya tiene sesión y está logueado → mándalo al home
	// 			router.replace('/');
	// 			return;
	// 		}

	// 		// Si no, después de 5 segundos, mándalo a login
	// 		const timeout = setTimeout(() => {
	// 			router.replace('/login');
	// 		}, 5000);

	// 		return () => clearTimeout(timeout);
	// 	};

	// 	checkSession();
	// }, [
	// 	session, // Si ya tiene sesión y está logueado → mándalo al home
	// 	router.replace,
	// ]);

	return (
		<main className="flex min-h-screen items-center justify-center px-4">
			<div className="max-w-md text-center space-y-4">
				<p className="text-lg text-gray-600">
					Este componente ha sido comentado - Verificación de Email
				</p>
				{/*
				<h1 className="text-2xl font-bold">Confirma tu correo</h1>
				<p className="text-gray-600">
					Te enviamos un enlace de verificación a tu bandeja de entrada.
					<br />
					Por favor revisa tu correo y da clic en el enlace para activar tu
					cuenta.
				</p>
				<p className="text-sm text-gray-400">
					Serás redirigido automáticamente a la página de inicio de sesión en
					unos segundos.
				</p>
				*/}
			</div>
		</main>
	);
}
