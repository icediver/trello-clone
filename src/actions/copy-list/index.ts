'use server';

import { auth } from '@clerk/nextjs/server';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { CopyList } from './schema';
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
	const { id, boardId } = data;

	let list;
	try {
		const listToCopy = await db.list.findUnique({
			where: {
				id,
			},
			include: {
				cards: true,
			},
		});

		if (!listToCopy) {
			return {
				error: 'List not found',
			};
		}

		const lastList = await db.list.findFirst({
			where: {
				boardId,
			},
			orderBy: {
				createdAt: 'desc',
			},
			select: { order: true },
		});
		const newOrder = lastList ? lastList.order + 1 : 1;
		list = await db.list.create({
			data: {
				title: `${listToCopy.title} - Copy`,
				boardId: listToCopy.boardId,
				order: newOrder,
				cards: {
					createMany: {
						data: listToCopy.cards.map((card) => ({
							title: card.title,
							description: card.description,
							order: card.order,
						})),
					},
				},
			},
			include: {
				cards: true,
			},
		});

		await createAuditLog({
			entityId: list.id,
			entityTitle: list.title,
			entityType: ENTITY_TYPE.LIST,
			action: ACTION.CREATE,
		});
	} catch (error) {
		return {
			error: 'Failed to copy',
		};
	}
	revalidatePath(`/board/${boardId}`);

	return {
		data: list,
	};
};

export const copyList = createSafeAction(CopyList, handler);
