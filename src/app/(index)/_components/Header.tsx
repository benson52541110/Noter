"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Header = () => {
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
			<Button>
				Get Noter free
				<ArrowRight className="h-4 w-4 ml-1"></ArrowRight>
			</Button>
		</header>
	);
};

export default Header;
