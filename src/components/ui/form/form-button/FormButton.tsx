'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/shadcn/button';

import { cn } from '@/lib/utils';

type Props = {
	children?: React.ReactNode;
	disabled?: boolean;
	className?: string;
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'ghost'
		| 'link'
		| 'primary';
};
export function FormButton({
	children,
	disabled,
	className,
	variant = 'primary',
}: Props) {
	const { pending } = useFormStatus();
	return (
		<Button
			disabled={pending || disabled}
			className={cn(className)}
			type="submit"
			variant={variant}
			size="sm"
		>
			{children}
		</Button>
	);
}
