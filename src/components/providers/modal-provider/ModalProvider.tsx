'use client';

import { useEffect, useState } from 'react';

import { CardModal } from '@/components/ui/modals/card-modal';
import { ProModal } from '@/components/ui/modals/pro-modal/ProModal';

export function ModalProvider() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) return null;
	return (
		<>
			<CardModal />
			<ProModal />
		</>
	);
}
