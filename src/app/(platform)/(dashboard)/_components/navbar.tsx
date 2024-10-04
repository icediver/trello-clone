import {
	OrganizationSwitcher,
	UserButton,
} from '@clerk/nextjs';
import { Plus } from 'lucide-react';

import { FormPopover } from '@/components/ui/form/form-popover/FormPopover';
import { Logo } from '@/components/ui/logo/Logo';
import { Button } from '@/components/ui/shadcn/button';

import { MobileSidebar } from './mobile-sidebar';

export function Navbar() {
	return (
		<nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
			<MobileSidebar />
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>
				<FormPopover
					align="start"
					side="bottom"
					sideOffset={18}
				>
					<Button
						className="hidden h-auto rounded-sm px-2 py-1.5 md:block"
						size="sm"
						variant="primary"
					>
						Create
					</Button>
				</FormPopover>
				<FormPopover>
					<Button
						className="block rounded-sm md:hidden"
						size="sm"
						variant="primary"
					>
						<Plus className="h-4 w-4" />
					</Button>
				</FormPopover>
			</div>
			<div className="ml-auto flex items-center gap-x-2">
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl={'/organization/:id'}
					afterLeaveOrganizationUrl={'/select-org'}
					afterSelectOrganizationUrl={'/organization/:id'}
					appearance={{
						elements: {
							rootBox: {
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							},
						},
					}}
				/>
				<UserButton
					afterSignOutUrl={'/'}
					appearance={{
						elements: {
							avatarBox: {
								height: 30,
								width: 30,
							},
						},
					}}
				/>
			</div>
		</nav>
	);
}
