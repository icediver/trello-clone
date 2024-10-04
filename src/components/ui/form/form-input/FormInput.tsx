'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { FormErrors } from '@/components/ui/form/form-errors/FormErrors';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';

import { cn } from '@/lib/utils';

interface Props {
	id: string;
	label?: string;
	type?: string;
	errors?: Record<string, string[] | undefined>;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	className?: string;
	defaultValue?: string;
	onBlur?: () => void;
}
export const FormInput = forwardRef<
	HTMLInputElement,
	Props
>(
	(
		{
			id,
			label,
			type,
			errors,
			placeholder,
			required,
			disabled,
			className,
			defaultValue = '',
			onBlur,
		},
		ref
	) => {
		const { pending } = useFormStatus();
		return (
			<div className="space-y-2">
				<div className="space-y-1">
					{label ? (
						<Label
							htmlFor={id}
							className="to-neutral-700 text-xs font-semibold"
						>
							{label}
						</Label>
					) : null}
					<Input
						onBlur={onBlur}
						defaultValue={defaultValue}
						ref={ref}
						name={id}
						id={id}
						type={type}
						placeholder={placeholder}
						required={required}
						className={cn(
							'h-7 px-2 py-1 text-sm',
							className
						)}
						disabled={pending || disabled}
						aria-describedby={`${id}-error`}
					/>
				</div>
				<FormErrors
					id={id}
					errors={errors}
				/>
			</div>
		);
	}
);

FormInput.displayName = 'FormInput';
