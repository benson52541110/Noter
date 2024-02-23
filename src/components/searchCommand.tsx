"use client";

import { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@root/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";

import useSearch from "@/hooks/useSearch";
import { File } from "lucide-react";

const SearchCommand = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { user } = useUser();
	const router = useRouter();
	const notes = useQuery(api.notes.getSearch);

	const toggle = useSearch((store) => store.toggle);
	const isOpen = useSearch((store) => store.isOpen);
	const onClose = useSearch((store) => store.onClose);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const keydown = (e: KeyboardEvent) => {
			if (e.key === "k" && e.metaKey) {
				e.preventDefault();
				toggle();
			}
		};
		window.addEventListener("keydown", keydown);
		return () => {
			window.removeEventListener("keydown", keydown);
		};
	}, [toggle]);

	const handleSelect = (id: string) => {
		router.push(`/notes/${id}`);
		onClose();
	};

	if (!isMounted) return null;

	return (
		<CommandDialog open={isOpen} onOpenChange={onClose}>
			<CommandInput placeholder={`Search ${user?.fullName}'s notes`} />
			<CommandList>
				<CommandEmpty>No results found</CommandEmpty>
				<CommandGroup heading="notes">
					{notes?.map((note) => (
						<CommandItem
							key={note._id}
							value={`${note.title} - ${note.title}`}
							title={note.title}
							onSelect={() => handleSelect(note._id)}
						>
							{note.icon ? (
								<p className="mr-2 text-sm">{note.icon}</p>
							) : (
								<File className="mr-2 h-4 w-4"></File>
							)}
							<span>{note.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
};

export default SearchCommand;
