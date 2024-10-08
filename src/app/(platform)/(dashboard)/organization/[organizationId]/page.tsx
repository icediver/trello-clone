import { Suspense } from 'react';

import { BoardList } from '@/components/ui/board/board-list/BoardList';
import { Separator } from '@/components/ui/shadcn/separator';

import { Info } from './_components/info';
import { checkSubscription } from '@/lib/subscription';

export default async function OrganizationIdPage() {
	const isPro = await checkSubscription();
	return (
		<div className="mb-20 w-full">
			<Info isPro={isPro} />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<Suspense fallback={<BoardList.Skeleton />}>
					<BoardList />
				</Suspense>
			</div>
		</div>
	);
}
