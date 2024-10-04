'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { DeleteBoard } from './schema';
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
	const { id } = data;

	let board;
	try {
		board = await db.board.delete({
			where: {
				id,
			},
		});
	} catch (error) {
		return {
			error: 'Failed to delete',
		};
	}
	revalidatePath(`/organization/${orgId}`);
	redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(
	DeleteBoard,
	handler
);
