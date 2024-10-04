import { auth } from '@clerk/nextjs/server';
import { startCase } from 'lodash';

import { OrgControl } from './_components/org-control';

type Props = { children: React.ReactNode };

export async function generateMetadata() {
	const { orgSlug } = auth();

	return {
		title: startCase(orgSlug || 'organization'),
	};
}

export default function OrganizationIdLayout({
	children,
}: Props) {
	return (
		<>
			<OrgControl />
			{children}
		</>
	);
}
