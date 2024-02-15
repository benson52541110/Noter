"use client";

import { Spinner } from "@/components/spinner";
import { useEffect, useState } from "react";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MenuIcon } from "lucide-react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	const [showSidebar, setShowSidebar] = useState(true);
	const [isMobile, setIsMobile] = useState(false);
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

	const handleResize = () => {
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
			<ResizablePanelGroup direction="horizontal">
				{showSidebar && !isMobile && (
					<ResizablePanel defaultSize={15} minSize={15} order={1}>
						<Navigation toggleSidebar={toggleSidebar} />
					</ResizablePanel>
				)}
				{!showSidebar && (
					<nav className="bg-transparent px-3 py-2 w-full">
						<MenuIcon
							onClick={toggleSidebar}
							role="button"
							className="w-6 h-6 text-muted-foreground"
						></MenuIcon>
					</nav>
				)}

				<ResizableHandle onClick={handleResize} />
				<ResizablePanel order={2}>
					<main className="flex-1 h-full overflow-y-auto">{children}</main>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
};

export default MainLayout;
