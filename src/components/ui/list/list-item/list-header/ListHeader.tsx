import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';

import { FormInput } from '@/components/ui/form/form-input/FormInput';

import { useAction } from '@/hooks/useActions';

import { ListOptions } from './list-options/ListOptions';
import { updateList } from '@/actions/update-list';

interface IListHeader {
	data: List;
	onAddCard: () => void;
}

export function ListHeader({
	data,
	onAddCard,
}: IListHeader) {
	const [title, setTitle] = useState(data.title);
	const [isEditing, setIsEditing] = useState(false);

	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const { execute } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`Renamed to "${data.title}"`);
			setTitle(data.title);
			disableEditing();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	function handleSubmit(formData: FormData) {
		const id = formData.get('id') as string;
		const boardId = formData.get('boardId') as string;
		const title = formData.get('title') as string;

		if (title === data.title) {
			return disableEditing();
		}
		execute({ id, title, boardId });
	}

	function onBlur() {
		formRef.current?.requestSubmit();
	}

	useEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			formRef.current?.requestSubmit();
		}
	});

	return (
		<div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
			{isEditing ? (
				<form
					ref={formRef}
					action={handleSubmit}
					className="flex-1 px-[2px]"
				>
					<input
						hidden
						id="id"
						name="id"
						defaultValue={data.id}
					/>
					<input
						hidden
						name="boardId"
						id="boardId"
						defaultValue={data.boardId}
					/>
					<FormInput
						ref={inputRef}
						id="title"
						className="h-7 w-full truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
						onBlur={onBlur}
						placeholder="Enter list title..."
						defaultValue={title}
					/>
					<button
						type="submit"
						hidden
					/>
				</form>
			) : (
				<div
					onClick={enableEditing}
					className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
				>
					{title}
				</div>
			)}
			<ListOptions
				data={data}
				onAddCard={onAddCard}
			/>
		</div>
	);
}
