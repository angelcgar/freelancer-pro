import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default async function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
			<div className="container mx-auto px-4 py-16">
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
						FreelancePro
					</h1>
					<p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
						Comprehensive SaaS platform to help freelancers manage projects,
						clients, contracts, invoices, and business operations efficiently.
					</p>
					<div className="flex gap-4 justify-center">
						<Link href="/register">
							<Button size="lg">Get Started</Button>
						</Link>
						<Link href="/login">
							<Button size="lg">login</Button>
						</Link>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								📊 Project Management
							</CardTitle>
							<CardDescription>
								Track projects, deadlines, and progress with ease
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="text-sm text-slate-600 space-y-1">
								<li>• Project status tracking</li>
								<li>• Time tracking</li>
								<li>• File attachments</li>
								<li>• Deadline management</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								💼 Client & Contract Management
							</CardTitle>
							<CardDescription>
								Manage clients and contracts professionally
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="text-sm text-slate-600 space-y-1">
								<li>• Client database</li>
								<li>• Contract templates</li>
								<li>• Digital signatures</li>
								<li>• Communication logs</li>
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								💳 Invoicing & Payments
							</CardTitle>
							<CardDescription>
								Create invoices and get paid faster
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="text-sm text-slate-600 space-y-1">
								<li>• Professional invoices</li>
								<li>• Stripe integration</li>
								<li>• Payment tracking</li>
								<li>• Automated reminders</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
