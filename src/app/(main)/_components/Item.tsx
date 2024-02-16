"use client";

import { LucideIcon, ChevronsDown, ChevronsRight } from "lucide-react";
import { Id } from "@root/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemProps {
	id?: Id<"notes">;
	noteIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExpand?: () => void;
	label: string;
	onClick: () => void;
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
	const ChevronsIcon = expanded ? ChevronsDown : ChevronsRight;
	console.log(id);
	return (
		<div
			role="button"
			onClick={onClick}
			style={{ paddingLeft: "12px" }}
			className={cn(
				"group min-h-7 text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
				level && `pl-[${level * 12 + 12}px]`,
				active && "bg-primary/5 text-primary"
			)}
		>
			{!!id && (
				<div className="h-full rounded-sm ">
					<ChevronsIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"></ChevronsIcon>
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
