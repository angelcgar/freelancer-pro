'use client';

import { FolderOpen, Search } from 'lucide-react';
import { AddProjectDialog } from '@/components/projects/AddProjectDialog';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { useQuery } from '@tanstack/react-query';
// import { getProjectsAction } from './actions';
import { ProjectsTable } from './ProjectsTable';
import type { ProjectUser } from '@/types';

export default function ProjectsPage() {
	// const { data: projects = [], isLoading } = useQuery<ProjectUser[]>({
	// 	queryKey: ['projects'],
	// 	queryFn: getProjectsAction,
	// });

	// Mock data para la plantilla
	const projects: ProjectUser[] = [];
	const isLoading = false;

	if (isLoading) return <p>Loading...</p>;

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Projects</h1>
					<p className="text-muted-foreground">
						Manage your projects, track progress, and monitor deadlines.
					</p>
				</div>
				<AddProjectDialog />
			</div>

			{/* Search and Filters */}
			<div className="flex items-center space-x-2">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search projects..."
						className="pl-8"
					/>
				</div>
				<Button variant="outline">Filter</Button>
			</div>

			{/* Projects Grid */}
			{/* Empty State */}
			{projects.length === 0 ? (
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card className="col-span-full">
						<CardContent className="flex flex-col items-center justify-center py-12">
							<FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
							<CardTitle className="mb-2">No projects yet</CardTitle>
							<CardDescription className="text-center mb-4">
								Create your first project to start tracking your work and
								managing client deliverables.
							</CardDescription>
							<AddProjectDialog variant="outline" />
						</CardContent>
					</Card>
				</div>
			) : (
				<ProjectsTable data={projects} />
			)}
		</div>
	);
}
