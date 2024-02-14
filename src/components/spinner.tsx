import { Loader } from "lucide-react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
	variants: {
		size: {
			default: "w-4 h-4",
			sm: "w-4 h-4",
			md: "w-6 h-6",
			lg: "w-8 h-8",
			xl: "w-12 h-12",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

export const Spinner = ({ size }: VariantProps<typeof spinnerVariants>) => {
	return <Loader className={cn(spinnerVariants({ size }))} />;
};
