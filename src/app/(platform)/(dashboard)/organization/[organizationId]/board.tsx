'use client';

import { Button } from '@/components/ui/shadcn/button';

import { FormDelete } from './form-delete';
import { deleteBoard } from '@/actions/delete-board.actions';

export default function Board({
	title,
	id,
}: {
	id: string;
	title: string;
}) {
	const deleteBoardWithId = deleteBoard.bind(null, id);
	return (
		<form
			action={deleteBoardWithId}
			className="flex items-center gap-x-2"
		>
			<p>Board title: {title}</p>
			<FormDelete />
		</form>
	);
}
