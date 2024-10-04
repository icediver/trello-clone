import { Suspense } from 'react';

import { BoardList } from '@/components/ui/board/board-list/BoardList';
import { Separator } from '@/components/ui/shadcn/separator';

import { Info } from './_components/info';
import { db } from '@/lib/db.utils';

export default async function OrganizationIdPage() {
	const boards = await db.board.findMany();
	return (
		<div className="mb-20 w-full">
			<Info />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList />
				</Suspense>
			</div>
		</div>
	);
}
