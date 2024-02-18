import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexProvider } from "@/components/providers/convex-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import { EdgeStoreProvider } from "@/lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Noter",
	description: "A simple note-taking app",
	icons: {
		icon: [
			{
				media: "(prefers-color-scheme: light)",
				url: "/logo.png",
				href: "/logo.png",
			},
			{
				media: "(prefers-color-scheme: dark)",
				url: "/logo-dark.png",
				href: "/logo-dark.png",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ConvexProvider>
					<EdgeStoreProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Toaster position="bottom-center"></Toaster>
							<ModalProvider></ModalProvider>
							{children}
						</ThemeProvider>
					</EdgeStoreProvider>
				</ConvexProvider>
			</body>
		</html>
	);
}
