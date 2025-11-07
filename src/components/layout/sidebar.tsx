'use client';

import {
	BarChart3,
	Clock,
	CreditCard,
	FileText,
	FolderOpen,
	Home,
	LayoutDashboard,
	Receipt,
	Settings,
	User,
	Users,
	BookOpen,
	FileCheck,
	Shield,
	MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/providers/sidebar-provider';

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
		name: 'Billing',
		href: '/dashboard/billing',
		icon: CreditCard,
	},
	{
		name: 'Team',
		href: '/dashboard/team',
		icon: Users,
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

const publicNavigation = [
	{
		name: 'Home',
		href: '/',
		icon: Home,
	},
	{
		name: 'About',
		href: '/about',
		icon: Users,
	},
	{
		name: 'Pricing',
		href: '/pricing',
		icon: CreditCard,
	},
	{
		name: 'Contact',
		href: '/contact',
		icon: MessageSquare,
	},
	{
		name: 'Documentation',
		href: '/docs',
		icon: BookOpen,
	},
	{
		name: 'Terms',
		href: '/terms',
		icon: FileCheck,
	},
	{
		name: 'Privacy',
		href: '/privacy',
		icon: Shield,
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const { isOpen } = useSidebar();

	const renderNavItem = (item: { name: string; href: string; icon: any }) => {
		const isActive = pathname === item.href;
		const Icon = item.icon;

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
				<Link href={item.href} className="flex items-center">
					<Icon className="mr-3 h-4 w-4" />
					{item.name}
				</Link>
			</Button>
		);
	};

	const renderPublicNavItem = (item: {
		name: string;
		href: string;
		icon: any;
	}) => {
		const isActive = pathname === item.href;
		const Icon = item.icon;

		return (
			<Link
				key={item.href}
				href={item.href}
				className={cn(
					'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
					isActive ? 'bg-accent' : 'text-muted-foreground',
				)}
			>
				<Icon className="mr-3 h-4 w-4" />
				<span>{item.name}</span>
			</Link>
		);
	};

	return (
		<div
			className={cn(
				'h-screen max-h-svh flex flex-col sidebar-transition w-64 md:w-64',
				!isOpen && 'w-0 overflow-hidden md:w-0',
			)}
		>
			{/* Header */}
			<div className="flex h-14 items-center justify-between border-b px-4">
				<Link className="flex items-center space-x-2" href="/dashboard">
					<span className="font-bold whitespace-nowrap">FreelancePro</span>
				</Link>
			</div>

			{/* Main Content */}
			<div className="flex-1 overflow-y-auto py-4 px-2">
				{/* Workspace Navigation */}
				<div className="mb-8">
					<h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
						Workspace
					</h3>
					<nav className="space-y-1">{navigation.map(renderNavItem)}</nav>
				</div>

				{/* Public Navigation */}
				<div className="mb-4">
					<h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
						Public Pages
					</h3>
					<nav className="space-y-1">
						{publicNavigation.map(renderPublicNavItem)}
					</nav>
				</div>

				<Separator />

				{/* Footer */}
				<div className="p-4">
					<h3 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
						Settings
					</h3>
					<nav className="space-y-1">
						{secondaryNavigation.map(renderNavItem)}
					</nav>
				</div>
			</div>
		</div>
	);
}
