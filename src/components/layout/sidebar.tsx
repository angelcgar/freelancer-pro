'use client';

import {
	BarChart3,
	Clock,
	FileText,
	FolderOpen,
	LayoutDashboard,
	Receipt,
	Settings,
	User,
	Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const navigation = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		name: 'Projects',
		href: '/dashboard/projects',
		icon: FolderOpen,
	},
	{
		name: 'Clients',
		href: '/dashboard/clients',
		icon: Users,
	},
	{
		name: 'Contracts',
		href: '/dashboard/contracts',
		icon: FileText,
	},
	{
		name: 'Invoices',
		href: '/dashboard/invoices',
		icon: Receipt,
	},
	{
		name: 'Time Tracking',
		href: '/dashboard/time-tracking',
		icon: Clock,
	},
	{
		name: 'Reports',
		href: '/dashboard/reports',
		icon: BarChart3,
	},
];

const secondaryNavigation = [
	{
		name: 'Settings',
		href: '/dashboard/settings',
		icon: Settings,
	},
	{
		name: 'Profile',
		href: '/dashboard/profile',
		icon: User,
	},
];

export function Sidebar() {
	const pathname = usePathname();

	return (
		<div className="flex h-full w-full flex-col">
			<div className="flex h-14 items-center border-b px-4">
				<Link className="flex items-center space-x-2" href="/dashboard">
					<span className="font-bold">FreelancePro</span>
				</Link>
			</div>
			<div className="flex-1 overflow-auto py-2">
				<nav className="grid items-start px-2 text-sm font-medium">
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Button
								key={item.name}
								variant={isActive ? 'secondary' : 'ghost'}
								className={cn(
									'w-full justify-start',
									isActive && 'bg-muted font-medium text-muted-foreground',
								)}
								asChild
							>
								<Link href={item.href}>
									<item.icon className="mr-2 h-4 w-4" />
									{item.name}
								</Link>
							</Button>
						);
					})}
					<Separator className="my-2" />
					{secondaryNavigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Button
								key={item.name}
								variant={isActive ? 'secondary' : 'ghost'}
								className={cn(
									'w-full justify-start',
									isActive && 'bg-muted font-medium text-muted-foreground',
								)}
								asChild
							>
								<Link href={item.href}>
									<item.icon className="mr-2 h-4 w-4" />
									{item.name}
								</Link>
							</Button>
						);
					})}
				</nav>
			</div>
		</div>
	);
}
