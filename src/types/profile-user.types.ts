export interface ProfileUser {
	id: string;
	email: string;
	full_name: string;
	avatar_url: string;
	timezone: string;
	created_at: string;
	updated_at: string;
	role: 'user' | 'admin' | 'freelancer';
}
