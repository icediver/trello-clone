'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { db } from '@/lib/db.utils';

export type StateType = {
	errors?: { title?: string[] };
	message?: string | null;
};

const CreateBoard = z.object({
	title: z.string().min(3, {
		message: 'Minimum length of 3 letters is required',
	}),
});

export async function create(
	prevState: StateType,
	formData: FormData
) {
	const validatesFields = CreateBoard.safeParse({
		title: formData.get('title'),
	});

	if (!validatesFields.success) {
		return {
			errors: validatesFields.error.flatten().fieldErrors,
			message: 'Missing fields',
		};
	}

	const { title } = validatesFields.data;

	try {
		await db.board.create({
			data: {
				title,
			},
		});
	} catch (error) {
		return {
			message: 'Database error',
		};
	}

	revalidatePath(
		'/organization/org_2ml1cCFfGlBXBOX9SPFvPcs6IXm'
	);
	redirect('/organization/org_2ml1cCFfGlBXBOX9SPFvPcs6IXm');
}
