import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default function DashboardNotFound() {
	return (
		<div className="flex items-center justify-center min-h-[60vh]">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
						<Search className="h-8 w-8 text-muted-foreground" />
					</div>
					<CardTitle className="text-2xl">Dashboard Page Not Found</CardTitle>
					<CardDescription>
						The dashboard page you're looking for doesn't exist.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="text-center">
						<p className="text-6xl font-bold text-muted-foreground mb-2">404</p>
					</div>
					<div className="flex flex-col gap-2">
						<Button asChild className="w-full">
							<Link href="/dashboard">
								<Home className="mr-2 h-4 w-4" />
								Go to Dashboard
							</Link>
						</Button>
						<Button variant="outline" asChild className="w-full">
							<Link href="/dashboard/projects">View Projects</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
