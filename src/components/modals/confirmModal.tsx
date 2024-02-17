"use client";

import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogFooter,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
}

const ConfirmModal = ({ children, onConfirm }: ConfirmModalProps) => {
	const handleConfirm = (e) => {
		e.stopPropagation();
		onConfirm();
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					This action cannot be undone.
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmModal;