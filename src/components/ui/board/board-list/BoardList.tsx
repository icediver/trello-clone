import { auth } from '@clerk/nextjs/server';
import { HelpCircle, User2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { FormPopover } from '../../form/form-popover/FormPopover';
import { Skeleton } from '../../shadcn/skeleton';
import { Hint } from '../hint/Hint';

import { db } from '@/lib/db.utils';

export async function BoardList() {
	const { orgId } = auth();

	if (!orgId) return redirect('/select-org');

	const boards = await db.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return (
		<div className="space-y-4">
			<div className="flex items-center text-lg font-semibold text-neutral-700">
				<User2 className="mr-2 h-6 w-6" />
				Your boards
			</div>
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{boards.map((board) => (
					<Link
						key={board.id}
						href={`/board/${board.id}`}
						style={{
							backgroundImage: `url(${board.imageThumbUrl})`,
						}}
						className="realative group aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
					>
						<div className="inseet-0 absolute bg-black/30 transition group-hover:bg-black/40" />
						<p className="relative font-semibold text-white">
							{board.title}
						</p>
					</Link>
				))}
				<FormPopover
					sideOffset={10}
					side="right"
				>
					<div
						className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
						role="button"
					>
						<p className="text-sm">Create new board</p>
						<span className="text-xs">5 remaining</span>
						<Hint
							sideOffset={40}
							description={`Free Workspaces can have up to 5 boards. For unlimited boards upgrade this workspace.`}
						>
							<HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	);
}

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
		</div>
	);
};
