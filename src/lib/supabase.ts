import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		persistSession: true,
		autoRefreshToken: true,
		detectSessionInUrl: true,
	},
});

// Types for our database schema
export type Database = {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					email: string;
					full_name: string | null;
					avatar_url: string | null;
					timezone: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id: string;
					email: string;
					full_name?: string | null;
					avatar_url?: string | null;
					timezone?: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					email?: string;
					full_name?: string | null;
					avatar_url?: string | null;
					timezone?: string;
					created_at?: string;
					updated_at?: string;
				};
			};
			clients: {
				Row: {
					id: string;
					user_id: string;
					name: string;
					email: string | null;
					phone: string | null;
					company: string | null;
					address: string | null;
					notes: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					name: string;
					email?: string | null;
					phone?: string | null;
					company?: string | null;
					address?: string | null;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					name?: string;
					email?: string | null;
					phone?: string | null;
					company?: string | null;
					address?: string | null;
					notes?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			projects: {
				Row: {
					id: string;
					user_id: string;
					client_id: string | null;
					name: string;
					description: string | null;
					status: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
					category: string | null;
					hourly_rate: number | null;
					fixed_price: number | null;
					start_date: string | null;
					end_date: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					client_id?: string | null;
					name: string;
					description?: string | null;
					status?: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
					category?: string | null;
					hourly_rate?: number | null;
					fixed_price?: number | null;
					start_date?: string | null;
					end_date?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					client_id?: string | null;
					name?: string;
					description?: string | null;
					status?: 'not_started' | 'in_progress' | 'completed' | 'on_hold';
					category?: string | null;
					hourly_rate?: number | null;
					fixed_price?: number | null;
					start_date?: string | null;
					end_date?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			contracts: {
				Row: {
					id: string;
					user_id: string;
					client_id: string;
					project_id: string | null;
					title: string;
					content: string;
					status: 'draft' | 'sent' | 'signed' | 'expired';
					file_url: string | null;
					signed_date: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					client_id: string;
					project_id?: string | null;
					title: string;
					content: string;
					status?: 'draft' | 'sent' | 'signed' | 'expired';
					file_url?: string | null;
					signed_date?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					client_id?: string;
					project_id?: string | null;
					title?: string;
					content?: string;
					status?: 'draft' | 'sent' | 'signed' | 'expired';
					file_url?: string | null;
					signed_date?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			invoices: {
				Row: {
					id: string;
					user_id: string;
					client_id: string;
					project_id: string | null;
					invoice_number: string;
					title: string;
					description: string | null;
					amount: number;
					tax_rate: number;
					status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
					due_date: string | null;
					paid_date: string | null;
					stripe_payment_intent_id: string | null;
					file_url: string | null;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					client_id: string;
					project_id?: string | null;
					invoice_number: string;
					title: string;
					description?: string | null;
					amount: number;
					tax_rate?: number;
					status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
					due_date?: string | null;
					paid_date?: string | null;
					stripe_payment_intent_id?: string | null;
					file_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					client_id?: string;
					project_id?: string | null;
					invoice_number?: string;
					title?: string;
					description?: string | null;
					amount?: number;
					tax_rate?: number;
					status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
					due_date?: string | null;
					paid_date?: string | null;
					stripe_payment_intent_id?: string | null;
					file_url?: string | null;
					created_at?: string;
					updated_at?: string;
				};
			};
			time_entries: {
				Row: {
					id: string;
					user_id: string;
					project_id: string;
					description: string | null;
					start_time: string;
					end_time: string | null;
					duration: number | null;
					is_billable: boolean;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					user_id: string;
					project_id: string;
					description?: string | null;
					start_time: string;
					end_time?: string | null;
					duration?: number | null;
					is_billable?: boolean;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					user_id?: string;
					project_id?: string;
					description?: string | null;
					start_time?: string;
					end_time?: string | null;
					duration?: number | null;
					is_billable?: boolean;
					created_at?: string;
					updated_at?: string;
				};
			};
		};
	};
};
