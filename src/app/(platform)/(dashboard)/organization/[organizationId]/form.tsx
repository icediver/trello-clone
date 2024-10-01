'use client';

import { useFormState } from 'react-dom';

import { Button } from '@/components/ui/shadcn/button';

import { FormButton } from './form-button';
import { FormInput } from './form-input';
import {
	StateType,
	create,
} from '@/actions/create-board.actions';

export function Form() {
	const initialState: StateType = {
		message: null,
		errors: {},
	};
	const [state, dispatch] = useFormState(
		create,
		initialState
	);
	return (
		<form action={dispatch}>
			<div className="flex flex-col space-y-2">
				<FormInput errors={state?.errors} />
			</div>
			<FormButton />
		</form>
	);
}
