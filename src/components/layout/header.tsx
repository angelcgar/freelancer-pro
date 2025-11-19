'use client';

import { Menu, Sun, Moon, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/providers/sidebar-provider';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function Header() {
	const { toggle } = useSidebar();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
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
					{mounted ? (
						theme === 'dark' ? (
							<Sun className="h-5 w-5" />
						) : (
							<Moon className="h-5 w-5" />
						)
					) : (
						<div className="h-5 w-5" /> // Placeholder para evitar hydration mismatch
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
