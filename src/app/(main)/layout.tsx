"use client";

import { Spinner } from "@/components/spinner";
import { useEffect, useState } from "react";
import { useConvexAuth } from "convex/react";
import { redirect, useParams } from "next/navigation";
import Navigation from "./_components/navigation";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MenuIcon } from "lucide-react";
import SearchCommand from "@/components/searchCommand";
import Navbar from "@/app/(main)/_components/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [showSidebar, setShowSidebar] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
	const params = useParams();
	useEffect(() => {
		const resizeHandler = () => {
			setIsMobile(window.innerWidth < 768);
			setShowSidebar(window.innerWidth > 768);
		};
		window.addEventListener("resize", resizeHandler);
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	if (isLoading) {
		return (
			<div className="h-full flex items-center justify-center">
				<Spinner size="lg" />
			</div>
		);
	}
	if (!isAuthenticated) {
		return redirect("/");
	}
	return (
		<div className="h-full flex dark:bg-slate-500">
			<SearchCommand />

			<ResizablePanelGroup direction="horizontal">
				{showSidebar && !isMobile && (
					<ResizablePanel defaultSize={15} minSize={15} order={1}>
						<Navigation toggleSidebar={toggleSidebar} />
					</ResizablePanel>
				)}

				<ResizableHandle style={{ display: showSidebar ? "block" : "none" }} />
				<ResizablePanel order={2}>
					{!!params.noteId ? (
						<Navbar
							isShowSidebar={showSidebar}
							isCollapsed={true}
							toggleSidebar={toggleSidebar}
						/>
					) : (
						<nav className="bg-transparent px-3 py-2">
							{!showSidebar && (
								<MenuIcon
									onClick={toggleSidebar}
									role="button"
									className="w-6 h-6 text-muted-foreground"
								/>
							)}
						</nav>
					)}

					<main className="flex-1 h-full overflow-y-auto">{children}</main>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default MainLayout;
