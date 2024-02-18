import Image from "next/image";
import { cn } from "@/lib/utils";

const Logo = () => {
	return (
		<div className="hidden md:flex items-center gap-x-2">
			<Image src="/logo.png" alt="Logo" height={40} width={40} />
			<span className=" font-medium">Noter</span>
		</div>
	);
};
export default Logo;
