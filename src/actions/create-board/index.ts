'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

import { InputType, ReturnType } from './board.type';
import { CreateBoard } from './schema';
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

	const { title, image } = data;

	const [
		imageId,
		imageThumbUrl,
		imageFullUrl,
		imageLinkHTML,
		imageUserName,
	] = image.split('|');

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHTML ||
		!imageUserName
	) {
		return {
			error: 'Missing fields. Failes to create board.',
		};
	}

	let board;
	try {
		board = await db.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageLinkHTML,
				imageUserName,
			},
		});
	} catch (error) {
		return {
			error: 'Failed to create board',
		};
	}

	revalidatePath(`/board/${board.id}`);

	return {
		data: board,
	};
};

export const createBoard = createSafeAction(
	CreateBoard,
	handler
);
