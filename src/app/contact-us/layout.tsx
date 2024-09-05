import type { Metadata } from "next";

// Import Components //
import SecondaryNavbar from "@/components/secondary-navbar";

// Import Const
import { ContactUsDescription, defaultMetaData } from "@/consts/metadata-default";

export async function generateMetadata(): Promise<Metadata> {
	const metaData = {...defaultMetaData};
	metaData.title = "Contact Us | Studionarta";
	metaData.description = ContactUsDescription;
	if (metaData.openGraph) {
		metaData.openGraph.title = "Contact Us | Studionarta";
		metaData.openGraph.description = ContactUsDescription;
		metaData.openGraph.url = `${process?.env?.NEXT_PUBLIC_BASE_URL}/contact-us`;
	}
	if (metaData.twitter) {
		metaData.twitter.title = "Contact Us | Studionarta";
		metaData.twitter.description = ContactUsDescription;
	}
	return metaData;
}

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
