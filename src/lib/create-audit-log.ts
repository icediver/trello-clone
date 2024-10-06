import { auth, currentUser } from '@clerk/nextjs/server';
import { ACTION, ENTITY_TYPE } from '@prisma/client';

import { db } from './db.utils';

interface Props {
	entityId: string;
	entityType: ENTITY_TYPE;
	entityTitle: string;
	action: ACTION;
}

export async function createAuditLog(props: Props) {
	try {
		const { orgId } = auth();
		const user = await currentUser();

		if (!user || !orgId) {
			throw new Error('User not found!');
		}
		const { entityId, entityType, entityTitle, action } =
			props;

		await db.auditlog.create({
			data: {
				orgId,
				userId: user.id,
				userImage: user?.imageUrl,
				userName: user?.firstName + ' ' + user?.lastName,
				entityId,
				entityType,
				entityTitle,
				action,
			},
		});
	} catch (error) {
		console.error('[AUDIT_LOG_ERROR]', error);
	}
}
