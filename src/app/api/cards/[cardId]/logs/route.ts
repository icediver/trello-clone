import { auth } from '@clerk/nextjs/server';
import { ENTITY_TYPE } from '@prisma/client';
import { request } from 'http';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db.utils';

export async function GET(
	request: Request,
	{ params }: { params: { cardId: string } }
) {
	try {
		const { userId, orgId } = auth();

		if (!userId || !orgId) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}
		const auditLogs = await db.auditlog.findMany({
			where: {
				orgId,
				entityId: params.cardId,
				entityType: ENTITY_TYPE.CARD,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 3,
		});
		return NextResponse.json(auditLogs);
	} catch (error) {
		return new NextResponse('Internal Error', {
			status: 500,
		});
	}
}
