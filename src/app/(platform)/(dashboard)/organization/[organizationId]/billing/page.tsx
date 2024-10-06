import { Separator } from '@/components/ui/shadcn/separator';

import { Info } from '../_components/info';

import { SubscriptionButton } from './_subscription/subscription-button';
import { checkSubscription } from '@/lib/subscription';

export default async function BillingPage() {
	const isPro = await checkSubscription();
	return (
		<div className="w-full">
			<Info isPro={isPro} />
			<Separator className="my-2" />
			<SubscriptionButton isPro={isPro} />
		</div>
	);
}
