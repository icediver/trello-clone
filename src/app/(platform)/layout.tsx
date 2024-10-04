import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';

type Props = { children: React.ReactNode };

export default function PlatrformLayout({
	children,
}: Props) {
	return (
		<ClerkProvider>
			<Toaster />
			{children}
		</ClerkProvider>
	);
}
