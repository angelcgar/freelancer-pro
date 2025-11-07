'use client';

import { Menu, Sun, Moon, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/providers/sidebar-provider';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export function Header() {
	const { toggle } = useSidebar();
	const { theme, setTheme } = useTheme();
	const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

	const toggleTheme = () => {
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		setTheme(newTheme);
		setIsDarkMode(newTheme === 'dark');
	};

	return (
		<header className="flex h-14 items-center justify-between border-b bg-background px-4 shadow-sm">
			{/* Left side - Sidebar toggle */}
			<Button
				variant="ghost"
				size="icon"
				onClick={toggle}
				className="hover:bg-accent"
				aria-label="Toggle sidebar"
			>
				<Menu className="h-5 w-5" />
			</Button>

			{/* Right side - Theme toggle, notifications, avatar */}
			<div className="flex items-center gap-2">
				{/* Theme toggle */}
				<Button
					variant="ghost"
					size="icon"
					onClick={toggleTheme}
					className="hover:bg-accent"
					aria-label="Toggle theme"
				>
					{isDarkMode ? (
						<Sun className="h-5 w-5" />
					) : (
						<Moon className="h-5 w-5" />
					)}
				</Button>

				{/* Notifications */}
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-accent relative"
					aria-label="Notifications"
				>
					<Bell className="h-5 w-5" />
					{/* Notification badge */}
					<span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
						3
					</span>
				</Button>

				{/* User Avatar */}
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-accent"
					aria-label="User menu"
				>
					<User className="h-5 w-5" />
				</Button>
			</div>
		</header>
	);
}
