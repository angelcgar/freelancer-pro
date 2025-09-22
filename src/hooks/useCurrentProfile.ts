import { useEffect, useState } from 'react';

import type { AuthUser } from '@supabase/supabase-js';

import { getProfileById } from '@/utils/getProfile';

import type { ProfileUser } from '@/types';
import { getUser } from '@/utils/getUser';

export function useCurrentProfile() {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [profile, setProfile] = useState<ProfileUser | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const load = async () => {
			setLoading(true);

			const user = await getUser();

			if (!user) {
				setUser(null);
				setLoading(false);
				return;
			}
			setUser(user);

			const profile = await getProfileById(user.id);
			if (!profile) {
				setProfile(null);
				setLoading(false);
				return;
			}
			setProfile(profile);

			setLoading(false);
		};

		load();
	}, []);

	return { user, profile, loading };
}
