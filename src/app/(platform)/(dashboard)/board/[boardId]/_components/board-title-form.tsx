'use client';

import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';

import { FormInput } from '@/components/ui/form/form-input/FormInput';
import { Button } from '@/components/ui/shadcn/button';

import { useAction } from '@/hooks/useActions';

import { updateBoard } from '@/actions/update-board';

interface IBoardTitleForm {
	data: Board;
}

export function BoardTitleForm({ data }: IBoardTitleForm) {
	const { execute } = useAction(updateBoard, {
		onSuccess: (data) => {
			toast.success(`Board ${data.title} updated`);
			setTitle(data.title);
			disableEditing();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const [title, setTitle] = useState(data.title);
	const [isEditing, setIsEditing] = useState(false);

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

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string;

		execute({
			title,
			id: data.id,
		});
	};

	function onBlur() {
		formRef.current?.requestSubmit();
	}

	if (isEditing) {
		return (
			<form
				ref={formRef}
				action={onSubmit}
				className="flex items-center gap-x-2"
			>
				<FormInput
					ref={inputRef}
					id="title"
					onBlur={onBlur}
					defaultValue={title}
					className="h-7 border-none bg-transparent px-[7px] py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
				/>
			</form>
		);
	}

	return (
		<Button
			onClick={enableEditing}
			variant={'transparent'}
			className="h-auto w-auto p-1 px-2 text-lg font-bold"
		>
			{title}
		</Button>
	);
}
