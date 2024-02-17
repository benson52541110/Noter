"use client";

import { SettingModal } from "@/components/modals/settingModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return (
		<>
			<SettingModal />
		</>
	);
};
