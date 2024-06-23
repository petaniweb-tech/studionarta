// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";

export default function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SecondaryNavbar />
			{children}
		</>
	);
}
