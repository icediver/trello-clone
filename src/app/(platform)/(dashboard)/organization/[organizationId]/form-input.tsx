'use client';

import { useFormStatus } from 'react-dom';

import { Input } from '@/components/ui/shadcn/input';

interface IFormInput {
	errors?: {
		title?: string[];
	};
}
export function FormInput({ errors }: IFormInput) {
	const { pending } = useFormStatus();
	return (
		<div>
			<Input
				type="text"
				name="title"
				id="title"
				required
				placeholder="Enter a board title"
				className="border border-black p-1"
				disabled={pending}
			/>
			{errors?.title ? (
				<div className="">
					{errors.title.map((error: string) => (
						<p
							key={error}
							className="text-rose-500"
						>
							{error}
						</p>
					))}
				</div>
			) : null}
		</div>
	);
}
