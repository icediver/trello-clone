'use client';

import { List } from '@prisma/client';

import { ListWithCardsType } from '@/types/list.type';

import { ListForm } from './list-form';

interface IListContainer {
	boardId: string;
	data: ListWithCardsType[];
}

export function ListContainer({
	boardId,
	data,
}: IListContainer) {
	return (
		<ol>
			<ListForm />
			<div className="w-1 flex-shrink-0" />
		</ol>
	);
}
