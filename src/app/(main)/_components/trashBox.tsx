"use client";

import ConfirmModal from "@/components/modals/confirmModal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@root/convex/_generated/api";
import { Id } from "@root/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Undo, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
	const router = useRouter();
	const params = useParams();
	const notes = useQuery(api.notes.getTrash);
	const restore = useMutation(api.notes.restore);
	const remove = useMutation(api.notes.remove);
	const [search, setSearch] = useState("");
	const filteredNotes = notes?.filter((note) =>
		note.title.toLowerCase().includes(search.toLowerCase())
	);
	const navigateToNote = (noteId: string) => {
		router.push(`/notes/${noteId}`);
	};
	const handleRestore = (
		e: React.MouseEvent<HTMLElement>,
		noteId: Id<"notes">
	) => {
		e.stopPropagation();
		const promise = restore({ id: noteId });
		toast.promise(promise, {
			loading: "Restoring note...",
			success: "Note restored",
			error: "Failed to restore note",
		});
	};

	const handleRemove = (noteId: Id<"notes">) => {
		const promise = remove({ id: noteId });

		toast.promise(promise, {
			loading: "Removing note...",
			success: "Note removed",
			error: "Failed to remove note",
		});
		if (params.noteId === noteId) {
			router.push("/notes");
		}
	};

	if (notes === undefined) {
		return (
			<div className="h-full flex items-center justify-center p-4">
				<Spinner size="lg"></Spinner>
			</div>
		);
	}

	return (
		<div className="text-sm">
			<div className="flex items-center gap-x-1 p-2">
				<Search className="w-4 h-4" />
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
					placeholder="Filter Note"
				/>
			</div>
			<div className="mt-2 px-1 pb-1">
				<p className="hidden last:block text-center text-xs text-muted-foreground pb-2">
					No note found
				</p>
				{filteredNotes?.map((note) => (
					<div
						key={note._id}
						role="button"
						className=" text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
					>
						<span className="ml-2">{note.title}</span>
						<div className="flex items-center">
							<div
								onClick={(e) => handleRestore(e, note._id)}
								role="button"
								className="rounded-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
							>
								<Undo className="h-4 w-4 text-muted-foreground"></Undo>
							</div>
							<ConfirmModal onConfirm={() => handleRemove(note._id)}>
								<div
									role="button"
									className="rounded-sm p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
								>
									<Trash className="h-4 w-4 text-muted-foreground"></Trash>
								</div>
							</ConfirmModal>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TrashBox;
