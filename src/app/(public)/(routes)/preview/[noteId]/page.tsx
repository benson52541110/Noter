"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@root/convex/_generated/api";
import { Id } from "@root/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";

interface NoteIdPageProps {
	params: {
		noteId: Id<"notes">;
	};
}

const NoteIdPage = ({ params }: NoteIdPageProps) => {
	const Editor = useMemo(
		() => dynamic(() => import("@/components/editor"), { ssr: false }),
		[]
	);

	const note = useQuery(api.notes.getDataById, {
		noteId: params.noteId,
	});

	const update = useMutation(api.notes.update);

	const onChange = (content: string) => {
		update({
			id: params.noteId,
			content,
		});
	};

	if (note === undefined) {
		return (
			<div>
				<Cover.Skeleton />
				<div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
					<div className="space-y-4 pl-8 pt-4">
						<Skeleton className="h-14 w-[50%]" />
						<Skeleton className="h-4 w-[80%]" />
						<Skeleton className="h-4 w-[40%]" />
						<Skeleton className="h-4 w-[60%]" />
					</div>
				</div>
			</div>
		);
	}

	if (note === null) {
		return <div>Not found</div>;
	}

	return (
		<div className="pb-40">
			<Cover preview url={note.coverImage} />
			<div className="md:max-w-3xl lg:max-w-4xl mx-auto">
				<Toolbar preview initialData={note} />
				<Editor
					editable={false}
					onChange={onChange}
					initialContent={note.content}
				/>
			</div>
		</div>
	);
};

export default NoteIdPage;
