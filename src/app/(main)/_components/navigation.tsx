import {
	ChevronsLeft,
	PlusCircle,
	Plus,
	Search,
	Settings,
	Trash,
} from "lucide-react";
import { toast } from "sonner";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Item from "./item";
import UserItem from "./userItem";
import { useMutation } from "convex/react";
import { api } from "@root/convex/_generated/api";
import NoteList from "./noteList";
import { useState, useEffect } from "react";
import TrashBox from "./trashBox";
import useSearch from "@/hooks/useSearch";
import useSettings from "@/hooks/useSettings";
import { useParams } from "next/navigation";

const Navigation = ({ toggleSidebar }) => {
	const settings = useSettings();
	const search = useSearch();
	const params = useParams();
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const resizeHandler = () => {
			setIsMobile(window.innerWidth < 768);
		};
		window.addEventListener("resize", resizeHandler);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	const create = useMutation(api.notes.create);
	const handleCreate = () => {
		const promise = create({ title: "Untitled" });
		toast.promise(promise, {
			loading: "Creating note...",
			success: "Note created",
			error: "Failed to create note",
		});
	};
	return (
		<>
			<aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex flex-col">
				<div
					role="button"
					className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-gray-300 dark:bg-gray-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
				>
					<ChevronsLeft
						className="h-6 w-6"
						onClick={toggleSidebar}
					></ChevronsLeft>
				</div>
				<div>
					<UserItem></UserItem>
					<Item
						label="Search"
						icon={Search}
						isSearch
						onClick={search.onOpen}
					></Item>
					<Item
						label="Settings"
						icon={Settings}
						onClick={settings.onOpen}
					></Item>
					<Item
						onClick={handleCreate}
						label="New Page"
						icon={PlusCircle}
					></Item>
				</div>
				<div className="mt-4">
					<NoteList />
					<Item label="Add a page" icon={Plus} onClick={handleCreate}></Item>
					<Popover>
						<PopoverTrigger className="w-full mt-4">
							<Item icon={Trash} label="Trash"></Item>
						</PopoverTrigger>
						<PopoverContent
							className="p-0 w-72"
							side={isMobile ? "bottom" : "right"}
						>
							<TrashBox />
						</PopoverContent>
					</Popover>
				</div>
				<div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute  h-full w-1 bg-primary/5 right-0 top-0"></div>
			</aside>
		</>
	);
};

export default Navigation;
