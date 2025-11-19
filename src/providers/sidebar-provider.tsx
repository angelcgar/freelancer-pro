'use client';

import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from 'react';

interface SidebarContextType {
	isOpen: boolean;
	isMobile: boolean;
	toggle: () => void;
	open: () => void;
	close: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(true); // Default para SSR
	const [isMobile, setIsMobile] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Marcar como montado
	useEffect(() => {
		setMounted(true);
	}, []);

	// Detect mobile screen size
	useEffect(() => {
		if (!mounted) return;

		const checkMobile = () => {
			const mobile = window.innerWidth < 768; // md breakpoint
			setIsMobile(mobile);
			// En desktop, abrir por defecto; en móvil, cerrar por defecto
			if (!mobile) {
				setIsOpen(true);
			} else {
				setIsOpen(false);
			}
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, [mounted]);

	const toggle = () => setIsOpen(!isOpen);
	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	return (
		<SidebarContext.Provider value={{ isOpen, isMobile, toggle, open, close }}>
			{children}
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (context === undefined) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
}
