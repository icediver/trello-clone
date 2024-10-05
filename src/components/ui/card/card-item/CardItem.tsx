'use client';

import { Card } from '@prisma/client';

interface ICardItem {
	data: Card;
	index: number;
}

export function CardItem({ data, index }: ICardItem) {
	return (
		<li
			className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
			role="button"
		>
			{data.title}
		</li>
	);
}
