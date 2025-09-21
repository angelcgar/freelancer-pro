'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { createClient } from '@/lib/supabase/client';

type RegisterForm = {
	email: string;
	password: string;
	fullName: string;
};

export default function RegisterPage() {
	const router = useRouter();

	useEffect(() => {
		createClient.auth.getUser().then(({ data, error: _ }) => {
			if (data.user) {
				router.push('/dashboard');
			}
		});
	}, [router]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: RegisterForm) => {
		setLoading(true);
		setError(null);

		const { error: authError, data: authData } = await createClient.auth.signUp(
			{
				email: data.email,
				password: data.password,
				options: {
					data: { full_name: data.fullName }, // <- lo usamos en el trigger
				},
			},
		);

		if (authError) {
			setError(authError.message);
			setLoading(false);
			return;
		}

		console.log('authData', authData);
		setLoading(false);
		router.push('/dashboard');
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 w-80"
			>
				<input
					type="text"
					placeholder="Full Name"
					{...register('fullName', { required: 'Full name is required' })}
					className="border p-2 rounded"
				/>
				{errors.fullName && <span>{errors.fullName.message}</span>}

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
					{...register('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must be at least 6 chars',
						},
					})}
					className="border p-2 rounded"
				/>
				{errors.password && <span>{errors.password.message}</span>}

				{error && <p className="text-red-500">{error}</p>}

				<button
					type="submit"
					className="bg-green-500 text-white py-2 rounded"
					disabled={loading}
				>
					{loading ? 'Registering...' : 'Register'}
				</button>
			</form>
		</div>
	);
}
