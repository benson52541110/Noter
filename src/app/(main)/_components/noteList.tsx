"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@root/convex/_generated/api";
import { Doc, Id } from "@root/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import Item from "./item";

interface NoteListProps {
	parentNoteId?: Id<"notes">;
	level?: number;
	data?: Doc<"notes">[];
}

const NoteList = ({ parentNoteId, level = 0 }: NoteListProps) => {
	const params = useParams();
	const router = useRouter();
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});
	const onExpand = (noteId: string) => {
		setExpanded((prev) => ({ ...prev, [noteId]: !prev[noteId] }));
	};
	const notes = useQuery(api.notes.getSidebar, { parentNote: parentNoteId });
	const onRedirect = (noteId: string) => {
		router.push(`/notes/${noteId}`);
	};
	if (notes === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
						<Item.Skeleton level={level} />
						<Item.Skeleton level={level} />
					</>
				)}
			</>
		);
	}
	return (
		<>
			<p
				style={{
					paddingLeft: level ? `${level * 12 + 25}px` : undefined,
				}}
				className={cn(
					"hidden text-sm font-medium text-muted-foreground/80",
					expanded && "last:block",
					level === 0 && "hidden"
				)}
			>
				No page inside
			</p>
			{notes.map((note) => (
				<div key={note._id}>
					<Item
						id={note._id}
						onClick={() => onRedirect(note._id)}
						label={note.title}
						icon={FileIcon}
						noteIcon={note.icon}
						active={params.noteId === note._id}
						level={level}
						onExpand={() => onExpand(note._id)}
						expanded={expanded[note._id]}
					/>
					{expanded[note._id] && (
						<NoteList parentNoteId={note._id} level={level + 1} />
					)}
				</div>
			))}
		</>
	);
};
export default NoteList;
