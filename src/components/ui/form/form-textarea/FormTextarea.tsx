'use client';

import { KeyboardEventHandler, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { Label } from '@/components/ui/shadcn/label';
import { Textarea } from '@/components/ui/shadcn/textarea';

import { FormErrors } from '../form-errors/FormErrors';

import { cn } from '@/lib/utils';

interface IFormTextarea {
	id: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	errors?: Record<string, string[] | undefined>;
	className?: string;
	onBlur?: () => void;
	onClick?: () => void;
	onKeyDown?:
		| KeyboardEventHandler<HTMLTextAreaElement>
		| undefined;
	defaultValue?: string;
}

export const FormTextarea = forwardRef<
	HTMLTextAreaElement,
	IFormTextarea
>(function FormTextarea(
	{
		id,
		label,
		placeholder,
		required,
		disabled,
		errors,
		className,
		onBlur,
		onClick,
		onKeyDown,
		defaultValue,
	},
	ref
) {
	const { pending } = useFormStatus();

	return (
		<div className="w-full space-y-2">
			<div className="w-full space-y-1">
				{label ? (
					<Label
						htmlFor={id}
						className="text-xs font-semibold text-neutral-700"
					>
						{label}
					</Label>
				) : null}
				<Textarea
					onKeyDown={onKeyDown}
					ref={ref}
					id={id}
					placeholder={placeholder}
					required={required}
					disabled={pending || disabled}
					className={cn(
						'resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
						className
					)}
					defaultValue={defaultValue}
					onBlur={onBlur}
					onClick={onClick}
					name={id}
					aria-describedby={`${id}-error`}
				/>
			</div>
			<FormErrors
				id={id}
				errors={errors}
			/>
		</div>
	);
});

FormTextarea.displayName = 'FormTextarea';
