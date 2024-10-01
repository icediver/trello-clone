import { Medal } from 'lucide-react';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';

import { Button } from '@/components/ui/shadcn/button';

import { cn } from '@/lib/utils';

export const metadata: Metadata = {
	title: 'Marketing',
	description: 'Trello Marketing',
};

const headingFont = localFont({
	src: '../../../public/fonts/font.woff2',
});
const textFont = Poppins({
	subsets: ['latin'],
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'700',
		'800',
		'900',
	],
});

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div
				className={cn(
					'flex flex-col items-center justify-center',
					headingFont.className
				)}
			>
				<div
					className={
						'mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm'
					}
				>
					<Medal className={'mr-2 h-6 w-6'} />
					No 1 task managment
				</div>
				<h1 className="md:text-6xl:text-center mb-6 text-3xl text-neutral-800">
					Taskify helps team move
				</h1>
				<div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl">
					work forward
				</div>
			</div>
			<div
				className={cn(
					'mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
					textFont.className
				)}
			>
				Collaborate, manage projects, and reach new
				proctivity peaks. From high rises to the home
				office, the way your team works is unique -
				accomplish it all with Taskify.
			</div>
			<Button
				className="mt-6"
				size="lg"
				asChild
			>
				<Link href="/sign-up">Get Taskify for free</Link>
			</Button>
		</div>
	);
}
