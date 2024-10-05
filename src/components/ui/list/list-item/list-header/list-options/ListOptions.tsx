import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

import { FormButton } from '@/components/ui/form/form-button/FormButton';
import { Button } from '@/components/ui/shadcn/button';
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/shadcn/popover';
import { Separator } from '@/components/ui/shadcn/separator';

import { useAction } from '@/hooks/useActions';

import { copyList } from '@/actions/copy-list';
import { deleteList } from '@/actions/delete-list';

interface IListOptions {
	data: List;
	onAddCard: () => void;
}

export function ListOptions({
	data,
	onAddCard,
}: IListOptions) {
	const closeRef = useRef<ElementRef<'button'>>(null);
	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: () => {
			toast.success(`List "${data.title}" deleted`);
			closeRef.current?.click();
		},
		onError: (error) => {
			toast.error(error);
		},
	});
	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: () => {
			toast.success(`List "${data.title}" copied`);
			closeRef.current?.click();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	function onDelete(formData: FormData) {
		const id = formData.get('id') as string;
		const boardId = formData.get('boardId') as string;
		executeDelete({ id, boardId });
	}

	function onCopy(formData: FormData) {
		const id = formData.get('id') as string;
		const boardId = formData.get('boardId') as string;
		executeCopy({ id, boardId });
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="h-auto w-auto p-2"
					variant="ghost"
				>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="px-0 pb-3 pt-3"
				align="start"
				side="bottom"
			>
				<div className="pb-4 text-center text-sm font-medium text-neutral-600">
					List actions
				</div>
				<PopoverClose
					ref={closeRef}
					asChild
				>
					<Button
						className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
						variant="ghost"
					>
						<X className="h-4 w-4" />
					</Button>
				</PopoverClose>
				<Button
					className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
					variant="ghost"
					onClick={onAddCard}
				>
					Add card...
				</Button>
				<form action={onCopy}>
					<input
						hidden
						name="id"
						id="id"
						defaultValue={data.id}
					/>
					<input
						hidden
						name="boardId"
						id="boardId"
						defaultValue={data.boardId}
					/>
					<FormButton
						variant="ghost"
						className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
					>
						Copy list...
					</FormButton>
				</form>
				<Separator />
				<form action={onDelete}>
					<input
						hidden
						name="id"
						id="id"
						defaultValue={data.id}
					/>
					<input
						hidden
						name="boardId"
						id="boardId"
						defaultValue={data.boardId}
					/>
					<FormButton
						variant="ghost"
						className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
					>
						Delete this list...
					</FormButton>
				</form>
			</PopoverContent>
		</Popover>
	);
}
