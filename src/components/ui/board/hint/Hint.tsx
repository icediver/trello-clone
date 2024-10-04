import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../../shadcn/tooltip';

interface IHint {
	children: React.ReactNode;
	description: string;
	side?: 'left' | 'right' | 'top' | 'bottom';
	sideOffset?: number;
}

export function Hint({
	children,
	description,
	side = 'bottom',
	sideOffset = 0,
}: IHint) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					sideOffset={sideOffset}
					className="max-w-[220px] break-words text-sm"
				>
					{description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
