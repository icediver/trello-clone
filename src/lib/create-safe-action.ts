import { z } from 'zod';

export type FieldErrorsType<T> = {
	[K in keyof T]?: string[];
};

export type ActionStateType<TInput, TOutput> = {
	fieldErrors?: FieldErrorsType<TInput>;
	error?: string | null;
	data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
	schema: z.Schema<TInput>,
	handler: (
		validateData: TInput
	) => Promise<ActionStateType<TInput, TOutput>>
) => {
	return async (
		data: TInput
	): Promise<ActionStateType<TInput, TOutput>> => {
		const validateResult = schema.safeParse(data);
		if (!validateResult.success) {
			return {
				fieldErrors: validateResult.error.flatten()
					.fieldErrors as FieldErrorsType<TInput>,
			};
		}
		return handler(validateResult.data);
	};
};
