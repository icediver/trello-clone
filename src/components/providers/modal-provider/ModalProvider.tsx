'use client';

import { useEffect, useState } from 'react';

import { CardModal } from '@/components/ui/modals/card-modal';

interface IModalProvider {}

export function ModalProvider({}: IModalProvider) {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return (
		<>
			<CardModal />
		</>
	);
}
