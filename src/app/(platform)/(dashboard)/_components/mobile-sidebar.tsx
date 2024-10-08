'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/shadcn/button';
import {
	Sheet,
	SheetContent,
} from '@/components/ui/shadcn/sheet';

import { useMobileSidebar } from '@/hooks/useMobileSidebar';

import { Sidebar } from './sidebar';

export function MobileSidebar() {
	const pathname = usePathname();
	const [isMounted, setIsMounted] = useState(false);

	const onOpen = useMobileSidebar((state) => state.onOpen);
	const onClose = useMobileSidebar(
		(state) => state.onClose
	);
	const isOpen = useMobileSidebar((state) => state.isOpen);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		onClose();
	}, [pathname, onClose]);

	if (!isMounted) return null;

	return (
		<>
			<Button
				onClick={onOpen}
				className="mr-2 block md:hidden"
				variant="ghost"
				size="sm"
			>
				<Menu className="h-4 w-4" />
			</Button>
			<Sheet
				open={isOpen}
				onOpenChange={onClose}
			>
				<SheetContent
					side={'left'}
					className="p-2 pt-10"
				>
					<Sidebar storageKey="t-sidebar-mobile-state" />
				</SheetContent>
			</Sheet>
		</>
	);
}
