'use server';

import { auth } from '@clerk/nextjs/server';
import { ACTION, ENTITY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { InputType, ReturnType } from './board.type';
import { CreateBoard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db.utils';
import {
	hasAvailableCount,
	incrementAvailableCount,
} from '@/lib/org-limit';
import { checkSubscription } from '@/lib/subscription';

const handler = async (
	data: InputType
): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		};
	}

	const canCreateBoard = await hasAvailableCount();
	const isPro = await checkSubscription();

	if (!canCreateBoard && !isPro) {
		return {
			error:
				'You have reached your limit of free boards. Upgrade your account to create more.',
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

		if (!isPro) {
			await incrementAvailableCount();
		}

		await createAuditLog({
			entityId: board.id,
			entityTitle: board.title,
			entityType: ENTITY_TYPE.BOARD,
			action: ACTION.CREATE,
		});
	} catch {
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
