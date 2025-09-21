'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { createClient } from '@/lib/supabase/client';

type LoginForm = {
	email: string;
	password: string;
};

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		createClient.auth.getUser().then(({ data, error: _ }) => {
			if (data.user) {
				console.log('Usuario Logeado');
				router.push('/dashboard');
			}
		});
	}, [router]);

	const onSubmit = async (data: LoginForm) => {
		const { error } = await createClient.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});

		if (error) {
			setError(error.message);
		} else {
			router.push('/dashboard');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-80"
			>
				<input
					type="email"
					placeholder="Email"
					{...register('email', { required: 'Email is required' })}
					className="border p-2 rounded"
				/>
				{errors.email && <span>{errors.email.message}</span>}

				<input
					type="password"
					placeholder="Password"
					{...register('password', { required: 'Password is required' })}
					className="border p-2 rounded"
				/>
				{errors.password && <span>{errors.password.message}</span>}

				{error && <p className="text-red-500">{error}</p>}

				<p>
					Don't have an account? <Link href="/register">Register</Link>
				</p>

				<button type="submit" className="bg-blue-500 text-white py-2 rounded">
					Login
				</button>
			</form>
		</div>
	);
}
