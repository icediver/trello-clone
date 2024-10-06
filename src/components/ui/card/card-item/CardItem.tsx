'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';

import { useCardModal } from '@/hooks/useCardModal';

interface ICardItem {
	data: Card;
	index: number;
}

export function CardItem({ data, index }: ICardItem) {
	const cardModal = useCardModal();

	return (
		<Draggable
			draggableId={data.id}
			index={index}
		>
			{(provided) => (
				<li
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					onClick={() => cardModal.onOpen(data.id)}
					className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
					role="button"
				>
					{data.title}
				</li>
			)}
		</Draggable>
	);
}
