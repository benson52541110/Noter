"use client";

import useScrollTop from "@/hooks/useScrollTop";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const Navbar = () => {
	const scroll = useScrollTop();
	return (
		<div
			className={cn(
				"bg-background fixed top-0 flex items-center w-full p-4",
				scroll && "shadow-sm border-b"
			)}
		>
			<Logo></Logo>
			<div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2"></div>
		</div>
	);
};
export default Navbar;
