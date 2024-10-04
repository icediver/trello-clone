'use client';

import { Plus, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
	useEventListener,
	useOnClickOutside,
} from 'usehooks-ts';

import { FormButton } from '@/components/ui/form/form-button/FormButton';
import { FormInput } from '@/components/ui/form/form-input/FormInput';
import { ListWrapper } from '@/components/ui/list/list-wrapper/ListWrapper';
import { Button } from '@/components/ui/shadcn/button';

import { useAction } from '@/hooks/useActions';

import { createList } from '@/actions/create-list';

interface IListForm {}

export function ListForm({}: IListForm) {
	const router = useRouter();
	const params = useParams();

	const [isEditing, setIsEditing] = useState(false);
	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast.success(`List ${data.title} created`);
			disableEditing();
			router.refresh();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			disableEditing();
		}
	}

	useEventListener('keydown', onKey);
	useOnClickOutside(formRef, disableEditing);

	function onSubmit(formData: FormData) {
		const title = formData.get('title') as string;
		const boardId = formData.get('boardId') as string;

		execute({
			title,
			boardId,
		});
	}

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					action={onSubmit}
					ref={formRef}
					className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
				>
					<FormInput
						ref={inputRef}
						errors={fieldErrors}
						id="title"
						className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
						placeholder="Enter list title..."
					/>
					<input
						hidden
						value={params.boardId}
						name="boardId"
					/>
					<div className="flex items-center gap-x-1">
						<FormButton>Add list</FormButton>
						<Button
							size="sm"
							variant={'ghost'}
							onClick={disableEditing}
						>
							<X className="h-5 w-5" />
						</Button>
					</div>
				</form>
			</ListWrapper>
		);
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
			>
				<Plus className="mr-2 h-4 w-4" />
				Add a list
			</button>
		</ListWrapper>
	);
}
