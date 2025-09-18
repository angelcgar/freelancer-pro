'use client';

import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs';

import { ClerkProviderWrapper } from '@/providers/clerk-provider';

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 items-center justify-between">
				<div className="hidden md:flex">
					<a className="mr-6 flex items-center space-x-2" href="/">
						<span className="hidden font-bold sm:inline-block">
							FreelancePro
						</span>
					</a>
				</div>
				<nav className="flex items-center">
					<ClerkProviderWrapper>
						<SignedOut>
							<SignInButton />
							<SignUpButton>
								<button
									type="button"
									className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
								>
									Sign Up
								</button>
							</SignUpButton>
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</ClerkProviderWrapper>
				</nav>
			</div>
		</header>
	);
}
