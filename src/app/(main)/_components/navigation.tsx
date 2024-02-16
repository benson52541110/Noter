import { ChevronsLeft, PlusCircle, Search, Settings } from "lucide-react";
import { toast } from "sonner";
import Item from "./Item";
import UserItem from "./UserItem";
import { useMutation } from "convex/react";
import { api } from "@root/convex/_generated/api";
import NoteList from "./noteList";

const Navigation = ({ toggleSidebar }) => {
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
					<Item label="Search" icon={Search} isSearch onClick={() => {}}></Item>
					<Item label="Settings" icon={Settings} onClick={() => {}}></Item>
					<Item
						onClick={handleCreate}
						label="New Page"
						icon={PlusCircle}
					></Item>
				</div>
				<div className="mt-4">
					<NoteList />
				</div>
				<div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute  h-full w-1 bg-primary/5 right-0 top-0"></div>
			</aside>
		</>
	);
};

export default Navigation;
