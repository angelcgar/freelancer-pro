import { FolderOpen, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ProjectsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Projects</h1>
					<p className="text-muted-foreground">
						Manage your projects, track progress, and monitor deadlines.
					</p>
				</div>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					New Project
				</Button>
			</div>

			{/* Search and Filters */}
			<div className="flex items-center space-x-2">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search projects..." className="pl-8" />
				</div>
				<Button variant="outline">Filter</Button>
			</div>

			{/* Projects Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Empty State */}
				<Card className="col-span-full">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">No projects yet</CardTitle>
						<CardDescription className="text-center mb-4">
							Create your first project to start tracking your work and managing
							client deliverables.
						</CardDescription>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Create Project
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
