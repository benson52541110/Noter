"use client";

import useScrollTop from "@/hooks/useScrollTop";
import Logo from "./logo";
import { ModeToggle } from "@/components/modeToggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";

import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { ArrowUpRight, Github } from "lucide-react";

const Navbar = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const scroll = useScrollTop();
	const handleGithub = () => {
		window.open("https://github.com/benson52541110/Noter");
	};
	return (
		<div
			className={cn(
				"bg-background fixed top-0 flex items-center w-full p-4 z-[9999]",
				scroll && "shadow-sm border-b"
			)}
		>
			<Logo></Logo>
			<div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
				{isLoading && <Spinner></Spinner>}

				{!isAuthenticated && !isLoading && (
					<>
						<SignInButton mode="modal">
							<Button variant="ghost" size="sm">
								Log in
							</Button>
						</SignInButton>
						<SignInButton mode="modal">
							<Button size="sm">Get Noter free</Button>
						</SignInButton>
					</>
				)}
				{isAuthenticated && !isLoading && (
					<>
						<Button size="sm" variant="ghost">
							Enter Noter
						</Button>
						<UserButton afterSignOutUrl="/"></UserButton>
					</>
				)}
				<ModeToggle></ModeToggle>
				<Button
					variant="ghost"
					size="sm"
					className="gap-x-1 border"
					onClick={handleGithub}
				>
					<Github></Github>
					noter
					<ArrowUpRight></ArrowUpRight>
				</Button>
			</div>
		</div>
	);
};
export default Navbar;
