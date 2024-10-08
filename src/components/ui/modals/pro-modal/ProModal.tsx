'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import {
	Dialog,
	DialogContent,
} from '@/components/ui/shadcn/dialog';

import { useAction } from '@/hooks/useActions';
import { useProModal } from '@/hooks/useProModal';

import { Button } from '../../shadcn/button';

import { stripeRedirect } from '@/actions/stripe-redirect';

export function ProModal() {
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
		execute({});
	}

	return (
		<Dialog
			open={proModal.isOpen}
			onOpenChange={proModal.onClose}
		>
			<DialogContent className="oveflow-hidden max-w-xl p-0">
				<div className="relative flex aspect-video items-center justify-center">
					<Image
						src="/images/hero.svg"
						alt="hero"
						fill
						className="object-cover"
					/>
				</div>
				<div className="mx-auto space-y-6 p-6 text-neutral-700">
					<h2 className="text-xl font-semibold">
						Upgrade to Taskify Pro Today!
					</h2>
					<p className="text-xs font-semibold text-neutral-600">
						Explore the best of Taskify
					</p>
					<div className="pl-3">
						<ul className="list-disc text-sm">
							<li>Unlimited boards</li>
							<li>Unlimited checklists</li>
							<li>Admin and security features</li>
							<li>And more!</li>
						</ul>
					</div>
					<Button
						disabled={isLoading}
						onClick={onClick}
						className="w-full"
						variant={'primary'}
					>
						Upgrade
					</Button>
				</div>
			</DialogContent>
			ProModal
		</Dialog>
	);
}
