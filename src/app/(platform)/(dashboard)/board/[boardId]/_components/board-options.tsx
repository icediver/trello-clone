'use client';

import { MoreHorizontal, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/shadcn/button';
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/shadcn/popover';

import { useAction } from '@/hooks/useActions';

import { deleteBoard } from '@/actions/delete-board';

interface IBoardOptions {
	id: string;
}

export function BoardOptions({ id }: IBoardOptions) {
	const { execute, isLoading } = useAction(deleteBoard, {
		onError: (error) => {
			toast.error(error);
		},
	});
	function onDelete() {
		execute({ id });
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="transparent"
					className="h-auto w-auto p-2"
				>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="px-0 pb-3 pt-3"
				side="bottom"
				align="start"
			>
				<div className="pb-4 text-center text-sm font-medium text-neutral-600">
					Board actions
				</div>
				<PopoverClose asChild>
					<Button
						className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
						variant={'ghost'}
					>
						<X className="h-4 w-4" />
					</Button>
				</PopoverClose>
				<Button
					className="ronded-none h-auto w-full justify-start p-2 px-5 text-sm font-normal"
					variant={'ghost'}
					onClick={onDelete}
					disabled={isLoading}
				>
					<Trash2 className="mr-2 h-4 w-4 text-red-400" />
					Delete this Board
				</Button>
			</PopoverContent>
		</Popover>
	);
}
