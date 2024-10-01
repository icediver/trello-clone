import { Navbar } from './_components/navbar';

type Props = { children: React.ReactNode };

export default function DashboardLayout({
	children,
}: Props) {
	return (
		<div className="h-full">
			<Navbar />
			{children}
		</div>
	);
}
