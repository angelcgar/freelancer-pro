'use client';

import { useState, useEffect } from 'react';
import { FolderOpen, Search } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { useQuery } from '@tanstack/react-query';
// import { getProjectsAction } from './actions';

import { AddProjectDialog } from '@/components/projects/AddProjectDialog';

import { ProjectsTable } from './ProjectsTable';
import type { ProjectUser } from '@/types';
import { mockProjects } from '@/mocks/projects';

/**
 * SISTEMA DE PERSISTENCIA SIMULADA
 *
 * Esta página carga proyectos desde mockProjects y luego aplica los overrides
 * que se hayan guardado en localStorage desde la página de detalle.
 *
 * Cuando editas un proyecto en /dashboard/projects/[id], los cambios se guardan
 * en localStorage con la key: `project-override-${projectId}`
 *
 * Esta página lee esos overrides y los aplica sobre los mocks para mostrar
 * los cambios simulados en la tabla.
 */

export default function ProjectsPage() {
	// const { data: projects = [], isLoading } = useQuery<ProjectUser[]>({
	// 	queryKey: ['projects'],
	// 	queryFn: getProjectsAction,
	// });

	// Mock data para la plantilla - Estado para agregar nuevos proyectos
	const [projects, setProjects] = useState<ProjectUser[]>(mockProjects);
	const isLoading = false;

	// Cargar overrides de localStorage al montar el componente
	useEffect(() => {
		const loadProjectsWithOverrides = () => {
			const projectsWithOverrides = mockProjects.map((project) => {
				const storageKey = `project-override-${project.id}`;
				const savedOverride = localStorage.getItem(storageKey);

				if (savedOverride) {
					// Si hay override, usarlo
					return JSON.parse(savedOverride) as ProjectUser;
				}

				// Si no, usar el proyecto del mock
				return project;
			});

			setProjects(projectsWithOverrides);
		};

		loadProjectsWithOverrides();

		// Escuchar cambios en localStorage (cuando se guarda en otra pestaña)
		const handleStorageChange = () => {
			loadProjectsWithOverrides();
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	const handleProjectCreated = (newProject: ProjectUser) => {
		setProjects((prev) => [newProject, ...prev]);
	};

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
				<AddProjectDialog onProjectCreated={handleProjectCreated} />
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
							<AddProjectDialog
								variant="outline"
								onProjectCreated={handleProjectCreated}
							/>
						</CardContent>
					</Card>
				</div>
			) : (
				<ProjectsTable data={projects} />
			)}
		</div>
	);
}
