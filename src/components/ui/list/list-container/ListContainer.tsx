'use client';

import { useEffect, useState } from 'react';

import { ListItem } from '@/components/ui/list/list-item/ListItem';

import { ListWithCardsType } from '@/types/list.type';

import { ListForm } from '../list-form/ListForm';

interface IListContainer {
	boardId: string;
	data: ListWithCardsType[];
}

export function ListContainer({
	boardId,
	data,
}: IListContainer) {
	const [orderedData, setOrderedData] = useState(data);

	useEffect(() => {
		setOrderedData(data);
	}, [data]);

	return (
		<ol className="flex h-full gap-x-3">
			{orderedData.map((list, index) => {
				return (
					<ListItem
						key={list.id}
						index={index}
						data={list}
					/>
				);
			})}
			<ListForm />
			<div className="w-1 flex-shrink-0" />
		</ol>
	);
}
