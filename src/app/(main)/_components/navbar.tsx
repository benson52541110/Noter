"use client";

import { api } from "@root/convex/_generated/api";
import { Id } from "@root/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";

interface NavbarProps {
	isCollapsed: boolean;
	isShowSidebar: boolean;
	toggleSidebar: () => void;
}

const Navbar = ({ isCollapsed, toggleSidebar, isShowSidebar }: NavbarProps) => {
	const params = useParams();
	const note = useQuery(api.notes.getDataById, {
		noteId: params.noteId as Id<"notes">,
	});
	if (note === undefined) {
		return <div>Loading</div>;
	}

	if (note === null) return null;

	return (
		<nav className="bg-background px-3 py-2 w-full flex items-center justify-between gap-x-4 h-6">
			{isCollapsed && (
				<div className="flex items-center gap-x-2">
					{!isShowSidebar && (
						<MenuIcon
							role="button"
							className="w-6 h-6 text-muted-foreground"
							onClick={toggleSidebar}
						></MenuIcon>
					)}
					Navbar
				</div>
			)}
		</nav>
	);
};

export default Navbar;
