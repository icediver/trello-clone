import { OrgControl } from './_components/org-control';

type Props = { children: React.ReactNode };

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
