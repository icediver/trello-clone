'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

import { useAction } from '@/hooks/useActions';
import { useProModal } from '@/hooks/useProModal';

import { Button } from '../../shadcn/button';
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '../../shadcn/popover';
import { FormButton } from '../form-button/FormButton';
import { FormInput } from '../form-input/FormInput';
import { FormPicker } from '../form-picker/FormPicker';

import { createBoard } from '@/actions/create-board';

interface IFormPopover {
	children: React.ReactNode;
	side?: 'left' | 'right' | 'bottom' | 'top';
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
}

export function FormPopover({
	children,
	side = 'bottom',
	align = 'start',
	sideOffset = 0,
}: IFormPopover) {
	const proModal = useProModal();
	const router = useRouter();
	const closeRef = useRef<ElementRef<'button'>>(null);

	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			toast.success('Board created');
			closeRef.current?.click();
			router.push(`/board/${data.id}`);
		},
		onError: (error) => {
			toast.error(error);
			proModal.onOpen();
		},
	});

	function onSubmit(formData: FormData) {
		const title = formData.get('title') as string;
		const image = formData.get('image') as string;

		execute({ title, image });
	}
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				side={side}
				sideOffset={sideOffset}
				className="w-80 pt-3"
			>
				<div className="pb-4 text-center text-sm font-medium text-neutral-700">
					Create board
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
				<form
					action={onSubmit}
					className="space-y-4"
				>
					<div className="space-y-4">
						<FormPicker
							id="image"
							errors={fieldErrors}
						/>
						<FormInput
							id="title"
							label="Board title"
							type="text"
							errors={fieldErrors}
						/>
						<FormButton className="w-full">
							Create
						</FormButton>
					</div>
				</form>
			</PopoverContent>
		</Popover>
	);
}
