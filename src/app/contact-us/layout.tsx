// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";

export default function ContactUsLayout({
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
