import { create } from 'zustand';

type TypeProModalStore = {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
};

export const useProModal = create<TypeProModalStore>(
	(set) => ({
		id: undefined,
		isOpen: false,
		onOpen: () => set({ isOpen: true }),
		onClose: () => set({ isOpen: false }),
	})
);
