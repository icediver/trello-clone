'use client';

import { Auditlog } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useCardModal } from '@/hooks/useCardModal';

import { CardWithListType } from '@/types/list.type';

import {
	Dialog,
	DialogContent,
	DialogTitle,
} from '../../shadcn/dialog';

import { Actions } from './actions/Actions';
import { Activity } from './activity/Activity';
import { Description } from './description/Description';
import { Header } from './header/Header';
import { fetcher } from '@/lib/fetcher';

export function CardModal() {
	const id = useCardModal((state) => state.id);
	const isOpen = useCardModal((state) => state.isOpen);
	const onClose = useCardModal((state) => state.onClose);

	const { data: cardData } = useQuery<CardWithListType>({
		queryKey: ['card', id],
		queryFn: () => {
			return fetcher(`/api/cards/${id}`);
		},
	});

	const { data: auditLogsData } = useQuery<Auditlog[]>({
		queryKey: ['card-logs', id],

		queryFn: async () => {
			const log = await fetcher(`/api/cards/${id}/logs`);
			console.log(log);
			return log;
		},
	});

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent aria-describedby={undefined}>
				<DialogTitle>
					{!cardData ? (
						<Header.Skeleton />
					) : (
						<Header data={cardData} />
					)}
				</DialogTitle>
				<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
					<div className="col-span-3">
						<div className="w-full space-y-6">
							{!cardData ? (
								<Description.Skeleton />
							) : (
								<Description data={cardData} />
							)}
							{!auditLogsData ? (
								<Activity.Skeleton />
							) : (
								<Activity items={auditLogsData} />
							)}
						</div>
					</div>
					{!cardData ? (
						<Actions.Skeleton />
					) : (
						<Actions data={cardData} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
