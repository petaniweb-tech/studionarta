// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";

export default function JoinusLayout({
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
