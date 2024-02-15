"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@root/convex/_generated/api";
import { toast } from "sonner";

const Files = () => {
	const { user } = useUser();
	const create = useMutation(api.files.create);
	const handleCreate = () => {
		const promise = create({ title: "Untitled" });
		toast.promise(promise, {
			loading: "Creating note...",
			success: "Note created",
			error: "Failed to create note",
		});
	};
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image src="/home-hero.webp" alt="main" width="300" height="300"></Image>
			<h2 className="text-lg font-medium">
				Welcome to {user?.firstName} &apos;s Noter
			</h2>
			<Button onClick={handleCreate}>
				<PlusCircle className="h-6 w-6 mr-2" />
				Create a note
			</Button>
		</div>
	);
};

export default Files;
