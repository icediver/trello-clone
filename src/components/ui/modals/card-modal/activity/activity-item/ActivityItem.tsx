import { Auditlog } from '@prisma/client';
import { format } from 'date-fns';

import {
	Avatar,
	AvatarImage,
} from '@/components/ui/shadcn/avatar';

import { generateLogMessage } from '@/lib/generate-log-message';

interface IActivityItem {
	data: Auditlog;
}

export function ActivityItem({ data }: IActivityItem) {
	return (
		<li className="flex items-center gap-x-2">
			<Avatar className="h-8 w-8">
				<AvatarImage src={data.userImage} />
			</Avatar>
			<div className="5 flex flex-col space-y-0">
				<p className="text-sm text-muted-foreground">
					<span className="mr-2 font-semibold lowercase text-neutral-700">
						{data.userName}
					</span>
					{generateLogMessage(data)}
				</p>

				<p className="text-xs text-muted-foreground">
					{format(
						new Date(data.createdAt),
						"MMM d, yyyy 'at' h:mm a"
					)}
				</p>
			</div>
		</li>
	);
}
