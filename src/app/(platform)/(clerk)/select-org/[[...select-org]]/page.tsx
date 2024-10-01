import { OrganizationList } from '@clerk/nextjs';

export default function CreateOrganiztionPage() {
	return (
		<OrganizationList
			hidePersonal
			afterSelectOrganizationUrl="/organization/:id"
			afterCreateOrganizationUrl={'/organization/:id'}
		/>
	);
}
