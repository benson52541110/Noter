"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Header = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<header className="max-w-3xl space-y-4">
			<div className="text-3xl sm:text-5xl md:text-6xl font-bold">
				Write, plan, share.
			</div>
			<div className="text-3xl sm:text-5xl md:text-6xl font-bold">
				With AI at your side.
			</div>
			<div className="text-2xl sm:text-4xl md:text-xl font-semibold">
				Notion is the connected workspace where better, faster work happens.
			</div>
			{isLoading && (
				<div className="w-full flex items-center justify-center">
					<Spinner size="lg" />
				</div>
			)}
			{!isAuthenticated && !isLoading && (
				<SignInButton mode="modal">
					<Button>
						Get Noter free
						<ArrowRight className="h-4 w-4 ml-1"></ArrowRight>
					</Button>
				</SignInButton>
			)}
			{isAuthenticated && !isLoading && (
				<Button asChild>
					<Link href="/files">
						Enter Noter
						<ArrowRight className="h-4 w-4 ml-1"></ArrowRight>
					</Link>
				</Button>
			)}
		</header>
	);
};

export default Header;
