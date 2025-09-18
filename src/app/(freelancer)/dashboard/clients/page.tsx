import { Plus, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ClientsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Clients</h1>
					<p className="text-muted-foreground">
						Manage your client relationships and contact information.
					</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add Client
				</Button>
			</div>

			{/* Search and Filters */}
			<div className="flex items-center space-x-2">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search clients..." className="pl-8" />
				</div>
				<Button variant="outline">Filter</Button>
			</div>

			{/* Clients Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Empty State */}
				<Card className="col-span-full">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<Users className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">No clients yet</CardTitle>
						<CardDescription className="text-center mb-4">
							Add your first client to start building your professional network
							and managing projects.
						</CardDescription>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Add Client
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
