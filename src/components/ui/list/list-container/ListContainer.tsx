'use client';

import {
	DragDropContext,
	Droppable,
} from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ListItem } from '@/components/ui/list/list-item/ListItem';

import { useAction } from '@/hooks/useActions';

import { ListWithCardsType } from '@/types/list.type';

import { ListForm } from '../list-form/ListForm';

import { updateCardOrder } from '@/actions/update-card-order';
import { updateListOrder } from '@/actions/update-list-order';

interface IListContainer {
	boardId: string;
	data: ListWithCardsType[];
}

function reorder<T>(
	list: T[],
	startIndex: number,
	endIndex: number
) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
}

export function ListContainer({
	boardId,
	data,
}: IListContainer) {
	const { execute: executeUpdateListOrder } = useAction(
		updateListOrder,
		{
			onSuccess: () => {
				toast.success('List reordered');
			},
			onError: (error) => {
				toast.error(error);
			},
		}
	);

	const { execute: executeUpdateCardOrder } = useAction(
		updateCardOrder,
		{
			onSuccess: () => {
				toast.success('Cards reordered');
			},
			onError: (error) => {
				toast.error(error);
			},
		}
	);

	const [orderedData, setOrderedData] = useState(data);

	useEffect(() => {
		setOrderedData(data);
	}, [data]);
	const onDragEnd = (result: any) => {
		const { source, destination, type } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}
		if (type === 'list') {
			const items = reorder(
				orderedData,
				source.index,
				destination.index
			).map((item, index) => ({
				...item,
				order: index,
			}));
			setOrderedData(items);

			executeUpdateListOrder({
				items,
				boardId,
			});
		}

		if (type === 'card') {
			let newOrderedData = [...orderedData];

			const sourceList = newOrderedData.find(
				(list) => list.id === source.droppableId
			);
			const destList = newOrderedData.find(
				(list) => list.id === destination.droppableId
			);

			if (!sourceList || !destList) return;

			if (!sourceList.cards) {
				sourceList.cards = [];
			}

			if (!destList.cards) {
				destList.cards = [];
			}

			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index
				);

				reorderedCards.forEach((card, idx) => {
					card.order = idx;
				});

				sourceList.cards = reorderedCards;

				setOrderedData(newOrderedData);
				executeUpdateCardOrder({
					items: reorderedCards,
					boardId,
				});
			} else {
				const [movedCard] = sourceList.cards.splice(
					source.index,
					1
				);

				movedCard.listId = destination.droppableId;

				destList.cards.splice(
					destination.index,
					0,
					movedCard
				);

				sourceList.cards.forEach((card, idx) => {
					card.order = idx;
				});

				destList.cards.forEach((card, idx) => {
					card.order = idx;
				});

				setOrderedData(newOrderedData);
				executeUpdateCardOrder({
					items: destList.cards,
					boardId,
				});
			}
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId={'lists'}
				type={'list'}
				direction="horizontal"
			>
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex h-full gap-x-3"
					>
						{orderedData.map((list, index) => {
							return (
								<ListItem
									key={list.id}
									index={index}
									data={list}
								/>
							);
						})}
						{provided.placeholder}
						<ListForm />
						<div className="w-1 flex-shrink-0" />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	);
}
