import { OrganizationProfile } from '@clerk/nextjs';

export default function SettingsPage() {
	return (
		<div className="w-full">
			<OrganizationProfile
				appearance={{
					elements: {
						rootBox: {
							boxShadow: 'none',
							width: '100%',
						},
						cardBox: {
							border: '1px solid #E5E5E5',
							boxShadow: 'none',
							width: '100%',
							background: 'white',
						},
					},
				}}
				routing="hash"
			/>
		</div>
	);
}
