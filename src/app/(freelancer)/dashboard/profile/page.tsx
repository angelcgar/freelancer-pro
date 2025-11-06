'use client';

import { useCurrentProfile } from '@/hooks/useCurrentProfile';

export default function ProfilePage() {
	const { user, profile, loading } = useCurrentProfile();

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<h1>Profile page</h1>
			<h2>id</h2>
			<pre>{user?.app_metadata.provider}</pre>
			<h2>email</h2>
			<pre>{user?.email}</pre>

			<pre>{JSON.stringify(user, null, 2)}</pre>
			<h2>Profile current user</h2>
			<pre>{JSON.stringify(profile, null, 2)}</pre>
		</div>
	);
}
