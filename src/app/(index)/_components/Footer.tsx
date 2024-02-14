"use client";

import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { ArrowUpRight, Github } from "lucide-react";

const Footer = () => {
	const handleGithub = () => {
		window.open("https://github.com/benson52541110");
	};
	return (
		<footer className="flex items-center w-full p-6 bg-background">
			<div className="text-muted-foreground flex justify-end w-full">
				<Button
					variant="ghost"
					size="sm"
					className="gap-x-1"
					onClick={handleGithub}
				>
					<Github></Github>
					benson
					<ArrowUpRight></ArrowUpRight>
				</Button>
			</div>
		</footer>
	);
};
export default Footer;
