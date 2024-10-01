import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';

const headingFont = localFont({
	src: '../../../assets/fonts/font.woff2',
});

export function Logo() {
	return (
		<Link href="/">
			<div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
				<Image src="/images/logo.svg" alt="logo" width={30} height={30} />
				<p className={cn('pb-1 text-lg text-neutral-700', headingFont.className)}>Taskify</p>
			</div>
		</Link>
	);
}
