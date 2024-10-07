'use client';

import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/shadcn/button';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

import { useAction } from '@/hooks/useActions';
import { useCardModal } from '@/hooks/useCardModal';

import { CardWithListType } from '@/types/list.type';

import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';

interface IActions {
	data: CardWithListType;
}

export function Actions({ data }: IActions) {
	const params = useParams();
	const cardModal = useCardModal();

	const { execute: executeCopy, isLoading: isLoadingCopy } =
		useAction(copyCard, {
			onSuccess: (data) => {
				toast.success(`Card "${data.title}" copied`);
				cardModal.onClose();
			},
			onError: (error) => {
				toast.error(error);
			},
		});

	const {
		execute: executeDelete,
		isLoading: isLoadingDelete,
	} = useAction(deleteCard, {
		onSuccess: (data) => {
			toast.success(`Card "${data.title}" deleted`);
			cardModal.onClose();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	function onCopy() {
		const boardId = params.boardId as string;

		executeCopy({
			boardId,
			id: data.id,
		});
	}

	function onDelete() {
		const boardId = params.boardId as string;

		executeDelete({
			boardId,
			id: data.id,
		});
	}

	return (
		<div className="mt-2 space-y-2">
			<p className="text-xs font-semibold">Actions</p>
			<Button
				onClick={onCopy}
				disabled={isLoadingCopy}
				variant="gray"
				className="w-full justify-start"
				size="inline"
			>
				<Copy className="mr-2 h-4 w-4" />
				Copy
			</Button>
			<Button
				onClick={onDelete}
				disabled={isLoadingDelete}
				variant="gray"
				className="w-full justify-start transition hover:text-red-500"
				size="inline"
			>
				<Trash className="mr-2 h-4 w-4" />
				Delete
			</Button>
		</div>
	);
}

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className="mt-2 space-y-2">
			<Skeleton className="h-4 w-20 bg-neutral-200" />
			<Skeleton className="h-8 w-full bg-neutral-200" />
			<Skeleton className="h-8 w-full bg-neutral-200" />
		</div>
	);
};
