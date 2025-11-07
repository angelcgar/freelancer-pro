'use client';

import React, {
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
	const [isOpen, setIsOpen] = useState(false); // Cerrado por defecto en móvil
	const [isMobile, setIsMobile] = useState(false);

	// Detect mobile screen size
	useEffect(() => {
		const checkMobile = () => {
			const mobile = window.innerWidth < 768; // md breakpoint
			setIsMobile(mobile);
			// En desktop, abrir por defecto; en móvil, cerrar por defecto
			if (!mobile && !isOpen) {
				setIsOpen(true);
			} else if (mobile && isOpen) {
				setIsOpen(false);
			}
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, [isOpen]);

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
