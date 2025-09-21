'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
	const supabase = createClient;
	const router = useRouter();

	const handleLogout = () => {
		supabase.auth.signOut();
		router.push('/');
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
		>
			Logout
		</button>
	);
}
