import type { Metadata } from "next";

// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";
import Modal from "@/components/modal";

// Import Components //
import { defaultMetaData } from "@/consts/metadata-default";

export async function generateMetadata(): Promise<Metadata> {
	const metaData = defaultMetaData;
	metaData.title = "Our Works | Studionarta";
	if (metaData.openGraph) {
		metaData.openGraph.title = "Our Works | Studionarta"
	}
	return metaData;
}

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
