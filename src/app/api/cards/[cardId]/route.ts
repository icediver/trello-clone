import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { db } from '@/lib/db.utils';

export async function GET(
	req: Request,
	{ params }: { params: { cardId: string } }
) {
	try {
		const { userId, orgId } = auth();
		if (!userId || !orgId) {
			return new NextResponse('Unauthorized', {
				status: 401,
			});
		}

		const card = await db.card.findUnique({
			where: {
				id: params.cardId,
			},
			include: {
				list: {
					select: {
						title: true,
					},
				},
			},
		});
		return NextResponse.json(card);
	} catch (error) {
		return new NextResponse('Internal Error', {
			status: 500,
		});
	}
}
