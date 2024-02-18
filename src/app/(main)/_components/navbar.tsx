"use client";

import { api } from "@root/convex/_generated/api";
import { Id } from "@root/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Publish } from "./publish";
import { Menu } from "./menu";
import { Banner } from "./banner";

interface NavbarProps {
	isShowSidebar: boolean;
	toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar, isShowSidebar }: NavbarProps) => {
	const params = useParams();
	const note = useQuery(api.notes.getDataById, {
		noteId: params.noteId as Id<"notes">,
	});
	if (note === undefined) {
		return <div>Loading</div>;
	}

	if (note === null) return null;

	return (
		<>
			<nav className="bg-background px-3 py-2 w-full flex items-center justify-between gap-x-4">
				{!isShowSidebar && (
					<MenuIcon
						role="button"
						className="w-6 h-6 text-muted-foreground"
						onClick={toggleSidebar}
					></MenuIcon>
				)}
				<div className="flex items-center gap-x-2 justify-between w-full">
					<Title initialData={note}></Title>
					<div className="flex items-center gap-x-2">
						<Publish initialData={note} />
						<Menu noteId={note._id} />
					</div>
				</div>
			</nav>
			{note.isArchived && <Banner noteId={note._id} />}
		</>
	);
};

export default Navbar;
