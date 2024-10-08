'use server';

import { auth } from '@clerk/nextjs/server';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { UpdateList } from './schema';
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
	const { title, id, boardId } = data;

	let list;
	try {
		list = await db.list.update({
			where: {
				id,
			},
			data: {
				title,
			},
		});

		await createAuditLog({
			entityId: list.id,
			entityTitle: list.title,
			entityType: ENTITY_TYPE.LIST,
			action: ACTION.UPDATE,
		});
	} catch {
		return {
			error: 'Failed to update',
		};
	}
	revalidatePath(`/board/${boardId}`);
	return {
		data: list,
	};
};

export const updateList = createSafeAction(
	UpdateList,
	handler
);
