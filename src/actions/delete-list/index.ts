'use server';

import { auth } from '@clerk/nextjs/server';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { DeleteList } from './schema';
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
		list = await db.list.delete({
			where: {
				id,
			},
		});

		await createAuditLog({
			entityId: list.id,
			entityTitle: list.title,
			entityType: ENTITY_TYPE.LIST,
			action: ACTION.DELETE,
		});
	} catch {
		return {
			error: 'Failed to delete',
		};
	}
	revalidatePath(`/board/${boardId}`);
	return {
		data: list,
	};
};

export const deleteList = createSafeAction(
	DeleteList,
	handler
);
