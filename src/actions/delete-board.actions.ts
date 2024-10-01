'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db.utils';

export async function deleteBoard(id: string) {
	await db.board.delete({
		where: {
			id,
		},
	});
	revalidatePath(
		'/organization/org_2ml1cCFfGlBXBOX9SPFvPcs6IXm'
	);
}
