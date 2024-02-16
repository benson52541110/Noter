"use client";

import {
	LucideIcon,
	ChevronDown,
	ChevronRight,
	Plus,
	MoreHorizontal,
	Trash,
} from "lucide-react";
import { Id } from "@root/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useMutation } from "convex/react";
import { api } from "@root/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ItemProps {
	id?: Id<"notes">;
	noteIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExpand?: () => void;
	label: string;
	onClick?: () => void;
	icon: LucideIcon;
}
const Item = ({
	id,
	label,
	onClick,
	icon: Icon,
	active,
	noteIcon,
	isSearch,
	level = 0,
	onExpand,
	expanded,
}: ItemProps) => {
	const ChevronIcon = expanded ? ChevronDown : ChevronRight;
	const { user } = useUser();
	const router = useRouter();
	const create = useMutation(api.notes.create);
	const archive = useMutation(api.notes.archive);
	const handleArchive = (
		e: React.MouseEvent<HTMLDialogElement, MouseEvent>
	) => {
		e.stopPropagation();
		if (!id) return;
		const promise = archive({ id });
		toast.promise(promise, {
			loading: "Archiving note...",
			success: "Note archived",
			error: "Failed to archive note",
		});
	};
	const handleExpand = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
		e.stopPropagation();
		onExpand?.();
	};
	const handleCreate = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
		e.stopPropagation();
		if (!id) return;
		const promise = create({ title: "Untitled", parentNote: id }).then(
			(noteId) => {
				if (!expanded) {
					onExpand?.();
				}
				// router.push(`/notes/${noteId}`);
			}
		);
		toast.promise(promise, {
			loading: "Creating note...",
			success: "Note created",
			error: "Failed to create note",
		});
	};
	return (
		<div
			role="button"
			onClick={onClick}
			style={{
				paddingLeft: `${level ? level * 12 + 12 : 12}px`,
			}}
			className={cn(
				"group min-h-7 text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
				active && "bg-primary/5 text-primary"
			)}
		>
			{!!id && (
				<div
					className="h-full rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600"
					role="button"
					onClick={handleExpand}
				>
					<ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"></ChevronIcon>
				</div>
			)}
			{noteIcon ? (
				<div className="shrink-0 mr-2 text-[18px]">{noteIcon}</div>
			) : (
				<Icon className="shrink-0 h-4 mr-2 text-muted-foreground"></Icon>
			)}
			<span className="truncate">{label}</span>
			{isSearch && (
				<kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border bg-muted px-2 text-sm font-medium">
					<span className="text-xs">⌘</span>K
				</kbd>
			)}
			{!!id && (
				<div className="ml-auto flex items-center gap-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
							<div
								role="button"
								className=" opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600"
							>
								<MoreHorizontal className="w-4 h-4 text-muted-foreground"></MoreHorizontal>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-60"
							align="start"
							side="right"
							forceMount
						>
							<DropdownMenuItem onClick={handleArchive}>
								<Trash className="w-4 h-4 mr-2" />
								Delete
							</DropdownMenuItem>

							<DropdownMenuSeparator />
							<div className="text-xs text-muted-foreground p-2">
								Last edited by: {user?.fullName}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
					<div
						className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-gray-300 dark:hover:bg-gray-600"
						role="button"
						onClick={handleCreate}
					>
						<Plus className="h-4 w-4 text-muted-foreground" />
					</div>
				</div>
			)}
		</div>
	);
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
			className=" flex gap-2 py-1"
		>
			<Skeleton className="w-4 h-4" />
			<Skeleton className="w-[30%] h-4" />
		</div>
	);
};

export default Item;
