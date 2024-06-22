// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";

export default function ContactLayout({
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
