'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { DeleteList } from './schema';
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

	let list;
	try {
		list = await db.list.delete({
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
	//redirect(`/board/${boardId}`);
	return {
		data: list,
	};
};

export const deleteList = createSafeAction(
	DeleteList,
	handler
);
