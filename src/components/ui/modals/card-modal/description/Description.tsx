'use client';

import { useQueryClient } from '@tanstack/react-query';
import { AlignLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
	useEventListener,
	useOnClickOutside,
} from 'usehooks-ts';

import { FormButton } from '@/components/ui/form/form-button/FormButton';
import { FormTextarea } from '@/components/ui/form/form-textarea/FormTextarea';
import { Button } from '@/components/ui/shadcn/button';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

import { useAction } from '@/hooks/useActions';

import { CardWithListType } from '@/types/list.type';

import { updateCard } from '@/actions/update-card';

interface IDescription {
	data: CardWithListType;
}

export function Description({ data }: IDescription) {
	const queryClient = useQueryClient();
	const params = useParams();

	const [isEditing, setIsEditing] = useState(false);

	const textareaRef = useRef<ElementRef<'textarea'>>(null);
	const formRef = useRef<ElementRef<'form'>>(null);

	function enableEditing() {
		setIsEditing(true);
		setTimeout(() => {
			textareaRef.current?.focus();
		});
	}

	function disableEditing() {
		setIsEditing(false);
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			disableEditing();
		}
	}

	useEventListener('keydown', onKeyDown);
	useOnClickOutside(formRef, disableEditing);

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['card', data.id],
			});
			queryClient.invalidateQueries({
				queryKey: ['card-logs', data.id],
			});

			toast.success(`Card "${data.title}" updated`);
			disableEditing();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	function onSubmit(formData: FormData) {
		const description = formData.get(
			'description'
		) as string;
		const boardId = params.boardId as string;

		execute({
			description,
			boardId,
			id: data.id,
		});
	}

	return (
		<div className="flex w-full items-start gap-x-3">
			<AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700" />
			<div className="w-full">
				<p className="mb-2 font-semibold text-neutral-700">
					Description
				</p>
				{isEditing ? (
					<form
						action={onSubmit}
						ref={formRef}
						className="space-y-2"
					>
						<FormTextarea
							ref={textareaRef}
							id="description"
							className="mt-2 w-full"
							placeholder="Add a more detailed description..."
							defaultValue={data.description || undefined}
							errors={fieldErrors}
						/>
						<div className="flex items-center gap-x-2">
							<FormButton>Save</FormButton>
							<Button
								type="button"
								onClick={disableEditing}
								size={'sm'}
								variant="ghost"
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						onClick={enableEditing}
						role="button"
						className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
					>
						{data.description ||
							'Add a more detailed description...'}
					</div>
				)}{' '}
			</div>
		</div>
	);
}

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className="flex w-full items-start gap-x-3">
			<Skeleton className="h-6 w-6 bg-neutral-200" />
			<div className="w-full">
				<Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
				<Skeleton className="h-[78px] w-full bg-neutral-200" />
			</div>
		</div>
	);
};
