'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { UpdateCardOrder } from './schema';
import { InputType, ReturnType } from './types';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db.utils';

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		};
	}
	const { items, boardId } = data;

	let updatedCards;
	try {
		const transaction = items.map((card) => {
			return db.card.update({
				where: {
					id: card.id,
				},
				data: {
					order: card.order,
					listId: card.listId,
				},
			});
		});

		updatedCards = await db.$transaction(transaction);
	} catch {
		return {
			error: 'Failed to reorder',
		};
	}
	revalidatePath(`/board/${boardId}`);
	return {
		data: updatedCards,
	};
};

export const updateCardOrder = createSafeAction(
	UpdateCardOrder,
	handler
);
