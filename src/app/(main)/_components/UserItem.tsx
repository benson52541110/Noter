"use client";
import { ChevronsLeftRight } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const UserItem = () => {
	const { user } = useUser();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div
					role="button"
					className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
				>
					<div className="gap-x-2 flex items-center">
						<Avatar className="h-5 w-5">
							<AvatarImage src={user?.imageUrl}></AvatarImage>
						</Avatar>
						<span className="text-start font-medium line-clamp-1">
							{user?.firstName}&apos;s Noter
						</span>
					</div>
					<ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4"></ChevronsLeftRight>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-80"
				align="start"
				forceMount
				alignOffset={11}
			>
				<div className="flex flex-col space-y-4 p-2">
					<p className="text-xs font-medium leading-none text-muted-foreground">
						{user?.emailAddresses[0].emailAddress}
					</p>
					<div className="flex items-center gap-x-2">
						<div className="rounded-md bg-secondary p-1">
							<Avatar className="w-8 h-8">
								<AvatarImage
									width={20}
									height={20}
									src={user?.imageUrl}
								></AvatarImage>
							</Avatar>
						</div>
						<div className="space-y-1">
							<p className="text-sm line-clamp-1">
								{user?.fullName}&apos;s Noter
							</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator></DropdownMenuSeparator>
				<DropdownMenuItem
					className="w-full cursor-pointer text-muted-foreground"
					asChild
				>
					<SignOutButton>Log out</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserItem;
