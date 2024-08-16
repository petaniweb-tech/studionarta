// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";
import Modal from "@/components/modal";

export default function CorporateProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Modal />
			<SecondaryNavbar />
			{children}
		</>
	);
}
