import type { Metadata } from "next";

// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";

// Import Const
import { defaultMetaData, OurWorkDescription } from "@/consts/metadata-default";

export async function generateMetadata(): Promise<Metadata> {
	const metaData = {...defaultMetaData};
	metaData.title = "Our Works | Studionarta";
	metaData.description = OurWorkDescription;
	if (metaData.openGraph) {
		metaData.openGraph.title = "Our Works | Studionarta";
		metaData.openGraph.description = OurWorkDescription;
		metaData.openGraph.url = `${process?.env?.NEXT_PUBLIC_BASE_URL}/our-work`;
	}
	return metaData;
}

export default function OurWorkLayout({
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
