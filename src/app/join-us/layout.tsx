import type { Metadata } from "next";

// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";

// Import Const
import { defaultMetaData, JoinUsDescription } from "@/consts/metadata-default";

export async function generateMetadata(): Promise<Metadata> {
	const metaData = {...defaultMetaData};
	metaData.title = "Our Works | Studionarta";
	metaData.description = JoinUsDescription;
	if (metaData.openGraph) {
		metaData.openGraph.title = "Our Works | Studionarta";
		metaData.description = JoinUsDescription;
		metaData.openGraph.url = `${process?.env?.NEXT_PUBLIC_BASE_URL}/join-us`;
	}
	return metaData;
}

export default function JoinUsLayout({
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
