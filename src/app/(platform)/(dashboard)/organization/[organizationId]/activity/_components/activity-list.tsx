import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { ActivityItem } from '@/components/ui/modals/card-modal/activity/activity-item/ActivityItem';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

import { db } from '@/lib/db.utils';

export async function ActivityList() {
	const { orgId } = auth();

	if (!orgId) {
		redirect('/select-org');
	}

	const auditLogs = await db.auditlog.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<ol className="mt-4 space-y-4">
			<p className="hidden text-center text-xs text-muted-foreground last:block">
				No activity found inside this organization
			</p>
			{auditLogs.map((log) => {
				return (
					<ActivityItem
						key={log.id}
						data={log}
					/>
				);
			})}
		</ol>
	);
}

ActivityList.Skeleton = function ActivityListSkeleton() {
	return (
		<ol className="space-y-4">
			<Skeleton className="h-14 w-[80%]" />
			<Skeleton className="h-14 w-[50%]" />
			<Skeleton className="h-14 w-[70%]" />
			<Skeleton className="h-14 w-[80%]" />
			<Skeleton className="h-14 w-[75%]" />
		</ol>
	);
};
