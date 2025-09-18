import { Clock, Play, Plus, Search, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function TimeTrackingPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
					<p className="text-muted-foreground">
						Track your time, manage billable hours, and generate reports.
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline">
						<Play className="mr-2 h-4 w-4" />
						Start Timer
					</Button>
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Add Entry
					</Button>
				</div>
			</div>

			{/* Active Timer */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="h-5 w-5" />
						Current Timer
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">No active timer</p>
						</div>
						<Button variant="outline" disabled>
							<Square className="mr-2 h-4 w-4" />
							Stop
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Search and Filters */}
			<div className="flex items-center space-x-2">
				<div className="relative flex-1 max-w-sm">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input placeholder="Search time entries..." className="pl-8" />
				</div>
				<Button variant="outline">Filter</Button>
			</div>

			{/* Time Entries */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Time Entries</CardTitle>
					<CardDescription>Your latest tracked time entries</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col items-center justify-center py-12">
						<Clock className="h-12 w-12 text-muted-foreground mb-4" />
						<CardTitle className="mb-2">No time entries yet</CardTitle>
						<CardDescription className="text-center mb-4">
							Start tracking your time to monitor productivity and bill clients
							accurately.
						</CardDescription>
						<Button>
							<Play className="mr-2 h-4 w-4" />
							Start Timer
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
