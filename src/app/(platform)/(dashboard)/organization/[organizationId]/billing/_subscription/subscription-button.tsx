'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/shadcn/button';

import { useAction } from '@/hooks/useActions';
import { useProModal } from '@/hooks/useProModal';

import { stripeRedirect } from '@/actions/stripe-redirect';

interface ISubscriptionButton {
	isPro: boolean;
}

export function SubscriptionButton({
	isPro,
}: ISubscriptionButton) {
	const proModal = useProModal();

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data;
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	function onClick() {
		if (isPro) {
			execute({});
		} else {
			proModal.onOpen();
		}
	}
	return (
		<Button
			disabled={isLoading}
			onClick={onClick}
			variant="primary"
		>
			{isPro ? 'Mange subscription' : 'Upgrade to Pro'}
		</Button>
	);
}
