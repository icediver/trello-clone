import { z } from 'zod';

export const UpdateCard = z.object({
	boardId: z.string(),
	description: z.optional(
		z
			.string({
				invalid_type_error: 'Description must be a string',
				required_error: 'Description is required',
			})
			.min(3, {
				message:
					'Description must be at least 3 characters',
			})
	),
	title: z.optional(
		z
			.string({
				required_error: 'Title is required',
				invalid_type_error:
					'Title is required and must be a string',
			})
			.min(3, {
				message:
					'Title is required and must be at least 3 characters',
			})
	),
	id: z.string(),
});
