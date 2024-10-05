'use client';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ElementRef, useRef, useState } from 'react';

import { ListWithCardsType } from '@/types/list.type';

import { CardForm } from '../../card/card-form/CardForm';
import { CardItem } from '../../card/card-item/CardItem';

import { ListHeader } from './list-header/ListHeader';
import { cn } from '@/lib/utils';

interface IListItem {
	index: number;
	data: ListWithCardsType;
}

export function ListItem({ index, data }: IListItem) {
	const textAreaRef = useRef<ElementRef<'textarea'>>(null);
	const [isEditing, setIsEditing] = useState(false);

	function disableEditing() {
		setIsEditing(false);
	}

	function enableEditing() {
		setIsEditing(true);
		setTimeout(() => {
			textAreaRef.current?.focus();
		});
	}

	return (
		<Draggable
			draggableId={data.id}
			index={index}
		>
			{(provided) => (
				<li
					{...provided.draggableProps}
					ref={provided.innerRef}
					className="h-full w-[272px] shrink-0 select-none"
				>
					<div
						{...provided.dragHandleProps}
						className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"
					>
						<ListHeader
							data={data}
							onAddCard={enableEditing}
						/>
						<Droppable
							droppableId={data.id}
							type={'card'}
						>
							{(provided) => (
								<ol
									ref={provided.innerRef}
									{...provided.droppableProps}
									className={cn(
										'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
										data.cards.length > 0 ? 'mt-2' : 'mt-0'
									)}
								>
									{data.cards.map((card, index) => (
										<CardItem
											index={index}
											key={card.id}
											data={card}
										/>
									))}

									{provided.placeholder}
								</ol>
							)}
						</Droppable>
						<CardForm
							listId={data.id}
							ref={textAreaRef}
							isEditing={isEditing}
							enableEditing={enableEditing}
							disableEditing={disableEditing}
						/>
					</div>
				</li>
			)}
		</Draggable>
	);
}
