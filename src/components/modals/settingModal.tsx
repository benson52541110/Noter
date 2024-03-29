"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useSettings from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/modeToggle";

export const SettingModal = () => {
	const setting = useSettings((store) => store);
	return (
		<Dialog open={setting.isOpen} onOpenChange={setting.onClose}>
			<DialogContent>
				<DialogHeader className="border-b pb-3">
					<h2 className="text-lg font-medium">Settings</h2>
				</DialogHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-1">
						<Label>Appearance</Label>
						<span className="text-sm text-muted-foreground">
							Customize how noter looks on your device
						</span>
					</div>
					<ModeToggle />
				</div>
			</DialogContent>
		</Dialog>
	);
};
