'use server';

import { auth } from '@clerk/nextjs/server';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { CreateCard } from './schema';
import { InputType, ReturnType } from './types';
import { createAuditLog } from '@/lib/create-audit-log';
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
	const { title, boardId, listId } = data;

	let card;
	try {
		const list = await db.list.findUnique({
			where: {
				id: listId,
			},
		});
		if (!list) {
			return {
				error: 'List not found',
			};
		}

		const lastCard = await db.card.findFirst({
			where: {
				listId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				order: true,
			},
		});

		const newOrder = lastCard ? lastCard.order + 1 : 1;

		card = await db.card.create({
			data: {
				title,
				listId,
				order: newOrder,
			},
		});
		await createAuditLog({
			entityId: card.id,
			entityType: ENTITY_TYPE.CARD,
			entityTitle: card.title,
			action: ACTION.CREATE,
		});
	} catch {
		return {
			error: 'Failed to create',
		};
	}
	revalidatePath(`/board/${boardId}`);
	return {
		data: card,
	};
};

export const createCard = createSafeAction(
	CreateCard,
	handler
);
