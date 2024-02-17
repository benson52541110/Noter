import { create } from "zustand";

type SettingState = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

const useSettings = create<SettingState>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useSettings;
