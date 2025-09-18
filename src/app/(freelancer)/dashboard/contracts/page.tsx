import { FileText, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ContractsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
					<p className="text-muted-foreground">
						Create, manage, and track your contracts and proposals.
					</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					New Contract
				</Button>
			</div>

			{/* Search and Filters */}
			<div className="flex items-center space-x-2">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search contracts..." className="pl-8" />
				</div>
				<Button variant="outline">Filter</Button>
			</div>

			{/* Contracts Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Empty State */}
				<Card className="col-span-full">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<FileText className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">No contracts yet</CardTitle>
						<CardDescription className="text-center mb-4">
							Create your first contract or proposal to formalize agreements
							with your clients.
						</CardDescription>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Create Contract
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
