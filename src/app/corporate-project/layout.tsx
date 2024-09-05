import type { Metadata } from "next";

// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";
import Modal from "@/components/modal";

// Import Components //
import { CorporateProjectDescription, defaultMetaData } from "@/consts/metadata-default";

export async function generateMetadata(): Promise<Metadata> {
	const metaData = {...defaultMetaData};
	metaData.title = "Corporate Project | Studionarta";
	metaData.description = CorporateProjectDescription;
	if (metaData.openGraph) {
		metaData.openGraph.title = "Corporate Project | Studionarta";
		metaData.openGraph.description = CorporateProjectDescription;
		metaData.openGraph.url = `${process?.env?.NEXT_PUBLIC_BASE_URL}/corporate-project`;
	}
	if (metaData.twitter) {
		metaData.twitter.title = "Corporate Project | Studionarta";
		metaData.twitter.description = CorporateProjectDescription;
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
