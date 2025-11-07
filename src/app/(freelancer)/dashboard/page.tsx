import { Clock, FolderOpen, Plus, Receipt, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function DashboardPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
					<p className="text-muted-foreground">
						Welcome back! Here's an overview of your freelance business.
					</p>
				</div>
				<Button className="cursor-pointer">
					<Plus className="mr-2 h-4 w-4" />
					Quick Action
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Projects
						</CardTitle>
						<FolderOpen className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0</div>
						<p className="text-xs text-muted-foreground">
							No active projects yet
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Clients</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0</div>
						<p className="text-xs text-muted-foreground">
							No clients added yet
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Invoices
						</CardTitle>
						<Receipt className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">$0</div>
						<p className="text-xs text-muted-foreground">No pending invoices</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Hours This Week
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">0h</div>
						<p className="text-xs text-muted-foreground">No time tracked yet</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Recent Activities</CardTitle>
						<CardDescription>
							Your latest project updates and activities
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-center h-32 text-muted-foreground">
							No recent activities to display
						</div>
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Quick Actions</CardTitle>
						<CardDescription>Common tasks to get you started</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Button variant="outline" className="w-full justify-start">
							<Plus className="mr-2 h-4 w-4" />
							Add New Client
						</Button>
						<Button variant="outline" className="w-full justify-start">
							<Plus className="mr-2 h-4 w-4" />
							Create Project
						</Button>
						<Button variant="outline" className="w-full justify-start">
							<Plus className="mr-2 h-4 w-4" />
							Start Timer
						</Button>
						<Button variant="outline" className="w-full justify-start">
							<Plus className="mr-2 h-4 w-4" />
							Create Invoice
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
