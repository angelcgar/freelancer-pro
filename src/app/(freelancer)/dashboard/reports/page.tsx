import { BarChart3, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function ReportsPage() {
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Reports</h1>
					<p className="text-muted-foreground">
						Analyze your business performance with detailed reports and analytics.
					</p>
				</div>
				<Button>
					<Download className="mr-2 h-4 w-4" />
					Export Report
				</Button>
			</div>

			{/* Report Categories */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5" />
							Revenue Reports
						</CardTitle>
						<CardDescription>
							Track your income, payments, and financial performance
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline" className="w-full">
							View Revenue Reports
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BarChart3 className="h-5 w-5" />
							Time Reports
						</CardTitle>
						<CardDescription>
							Analyze time tracking data and productivity metrics
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline" className="w-full">
							View Time Reports
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<BarChart3 className="h-5 w-5" />
							Project Reports
						</CardTitle>
						<CardDescription>
							Monitor project completion rates and performance
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant="outline" className="w-full">
							View Project Reports
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Empty State */}
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
					<CardTitle className="mb-2">No data available</CardTitle>
					<CardDescription className="text-center mb-4">
						Start creating projects, tracking time, and generating invoices to
						see detailed reports and analytics.
					</CardDescription>
				</CardContent>
			</Card>
		</div>
	);
}
