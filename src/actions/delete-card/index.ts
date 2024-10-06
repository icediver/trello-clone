'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { DeleteCard } from './schema';
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
	const { id, boardId } = data;

	let card;
	try {
		card = await db.card.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		return {
			error: 'Failed to delete',
		};
	}
	revalidatePath(`/board/${boardId}`);

	return {
		data: card,
	};
};

export const deleteCard = createSafeAction(
	DeleteCard,
	handler
);
