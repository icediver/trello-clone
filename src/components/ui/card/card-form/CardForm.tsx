'use client';

import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
	ElementRef,
	KeyboardEventHandler,
	forwardRef,
	useRef,
} from 'react';
import { toast } from 'sonner';
import {
	useEventListener,
	useOnClickOutside,
} from 'usehooks-ts';

import { useAction } from '@/hooks/useActions';

import { FormButton } from '../../form/form-button/FormButton';
import { FormTextarea } from '../../form/form-textarea/FormTextarea';
import { Button } from '../../shadcn/button';

import { createCard } from '@/actions/create-card';

interface ICardForm {
	listId: string;
	enableEditing: () => void;
	disableEditing: () => void;
	isEditing: boolean;
}

export const CardForm = forwardRef<
	HTMLTextAreaElement,
	ICardForm
>(function CardForm(
	{ listId, enableEditing, disableEditing, isEditing },
	ref
) {
	const params = useParams();
	const formRef = useRef<ElementRef<'form'>>(null);

	const { execute, fieldErrors } = useAction(createCard, {
		onSuccess: (data) => {
			toast.success(`Card "${data.title}" created`);
			formRef.current?.reset();
		},
		onError: (error) => {
			toast.error(error);
		},
	});
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			disableEditing();
		}
	};

	useOnClickOutside(formRef, disableEditing);
	useEventListener('keydown', onKeyDown);

	const onTextareaKeyDown: KeyboardEventHandler<
		HTMLTextAreaElement
	> = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			formRef.current?.requestSubmit();
		}
	};

	function onSubmit(formData: FormData) {
		const title = formData.get('title') as string;
		const listId = formData.get('listId') as string;
		const boardId = params.boardId as string;
		execute({ title, listId, boardId });
	}

	if (isEditing) {
		return (
			<form
				ref={formRef}
				action={onSubmit}
				className="m-1 space-y-4 px-1 py-0.5"
			>
				<FormTextarea
					id="title"
					onKeyDown={onTextareaKeyDown}
					ref={ref}
					defaultValue=""
					placeholder="Enter a title for this card..."
					errors={fieldErrors}
				/>
				<input
					hidden
					id="listId"
					name="listId"
					defaultValue={listId}
				/>
				<div className="flex items-center gap-x-1">
					<FormButton>Add card</FormButton>
					<Button
						onClick={disableEditing}
						size={'sm'}
						variant={'ghost'}
					>
						<X className="h-5 w-5" />
					</Button>
				</div>
			</form>
		);
	}

	return (
		<div className="px-2 pt-2">
			<Button
				onClick={enableEditing}
				className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
				size={'sm'}
				variant={'ghost'}
			>
				<Plus className="mr-2 h-4 w-4" />
				Add a card
			</Button>
		</div>
	);
});

CardForm.displayName = 'CardForm';
