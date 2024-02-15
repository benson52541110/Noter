"use client";

import { LucideIcon, ChevronsDown, ChevronsRight } from "lucide-react";
import { Id } from "@root/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

interface ItemProps {
	id?: Id<"files">;
	fileIcon?: string;
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
	fileIcon,
	isSearch,
	level = 0,
	onExpand,
	expanded,
}: ItemProps) => {
	const ChevronsIcon = expanded ? ChevronsDown : ChevronsRight;
	return (
		<div
			role="button"
			onClick={onClick}
			style={{ paddingLeft: "12px" }}
			className={cn(
				"group min-h-7 text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
				level && `pl-[${level * 12 + 12}px]`, // 根據 level 動態計算 padding-left
				active && "bg-primary/5 text-primary" // 如果 active 為 true，則添加這些類名
			)}
		>
			{!!id && (
				<div className="h-full rounded-sm hover:bg-gray-300 dark:bg-gray-600">
					<ChevronsIcon className="h-4 w-4 shrink-0 text-muted-foreground/50"></ChevronsIcon>
				</div>
			)}
			{fileIcon ? (
				<div className="shrink-0 mr-2 text-[18px]">{fileIcon}</div>
			) : (
				<Icon className="shrink-0 h-4 mr-2 text-muted-foreground"></Icon>
			)}
			<span>{label}</span>
			{isSearch && (
				<kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border bg-muted px-2 text-sm font-medium">
					<span className="text-xs">⌘</span>K
				</kbd>
			)}
		</div>
	);
};

export default Item;
