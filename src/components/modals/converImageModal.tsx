"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/hooks/useCoverImage";
import { SingleImageDropzone } from "@/components/imageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { api } from "@root/convex/_generated/api";
import { Id } from "@root/convex/_generated/dataModel";

export const CoverImageModal = () => {
	const params = useParams();
	const update = useMutation(api.notes.update);
	const coverImage = useCoverImage();
	const { edgestore } = useEdgeStore();

	const [file, setFile] = useState<File>();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onClose = () => {
		setFile(undefined);
		setIsSubmitting(false);
		coverImage.onClose();
	};

	const onChange = async (file?: File) => {
		if (file) {
			setIsSubmitting(true);
			setFile(file);

			const res = await edgestore.publicFiles.upload({
				file,
				options: {
					replaceTargetUrl: coverImage.url,
				},
			});

			await update({
				id: params.noteId as Id<"notes">,
				coverImage: res.url,
			});

			onClose();
		}
	};

	return (
		<Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-center text-lg font-semibold">Cover Image</h2>
				</DialogHeader>
				<SingleImageDropzone
					className="w-full outline-none"
					disabled={isSubmitting}
					value={file}
					onChange={onChange}
				/>
			</DialogContent>
		</Dialog>
	);
};
