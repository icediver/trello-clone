'use client';

import {
	useOrganization,
	useOrganizationList,
} from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

import { Accordion } from '@/components/ui/shadcn/accordion';
import { Button } from '@/components/ui/shadcn/button';
import { Skeleton } from '@/components/ui/shadcn/skeleton';

import { NavItem, OrganizationType } from './nav-item';

interface ISidebar {
	storageKey?: string;
}

export function Sidebar({
	storageKey = 't-sidebar-state',
}: ISidebar) {
	const [expanded, setExpanded] = useLocalStorage<
		Record<string, any>
	>(storageKey, {});

	const {
		organization: activeOrganization,
		isLoaded: isLoadedOrg,
	} = useOrganization();
	const { userMemberships, isLoaded: isLoadedOrgList } =
		useOrganizationList({
			userMemberships: {
				infinite: true,
			},
		});

	const defaultAccordianValue: string[] = Object.keys(
		expanded
	).reduce((acc: string[], key: string) => {
		if (expanded[key]) {
			acc.push(key);
		}
		return acc;
	}, []);

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}));
	};

	if (
		!isLoadedOrg ||
		!isLoadedOrgList ||
		userMemberships.isLoading
	) {
		return (
			<>
				<div className="mb-2 flex items-center justify-between">
					<Skeleton className="h-10 w-1/2" />
					<Skeleton className="h-10 w-10" />
				</div>
				<div className="space-y-2">
					<NavItem.Skeleton />
					<NavItem.Skeleton />
					<NavItem.Skeleton />
				</div>
			</>
		);
	}

	return (
		<>
			<aside className="mb-1 flex items-center text-xs font-medium">
				<span className="pl-4">Workspaces</span>
				<Button
					asChild
					type="button"
					size="icon"
					variant="ghost"
					className="ml-auto"
				>
					<Link href="/select-org">
						<Plus className="h-4 w-4" />
					</Link>
				</Button>
			</aside>
			<Accordion
				type="multiple"
				defaultValue={defaultAccordianValue}
				className="space-y-2"
			>
				{userMemberships.data?.map(({ organization }) => (
					<NavItem
						key={organization.id}
						isActive={
							activeOrganization?.id === organization.id
						}
						isExpanded={expanded[organization.id]}
						organization={organization as OrganizationType}
						onExpand={onExpand}
					/>
				))}
			</Accordion>
		</>
	);
}
