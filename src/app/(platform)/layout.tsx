import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

import { ModalProvider } from '@/components/providers/modal-provider/ModalProvider';
import { QueryProvider } from '@/components/providers/query-provider/QueryProvider';

type Props = { children: React.ReactNode };

export default function PlatrformLayout({
	children,
}: Props) {
	return (
		<ClerkProvider>
			<QueryProvider>
				<Toaster richColors />
				<ModalProvider />
				{children}
			</QueryProvider>
		</ClerkProvider>
	);
}
