import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

// Import Components //
import ConditionalNavbar from "@/components/conditional-navbar";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import { Toaster } from "@/components/ui/toaster"

const mainFont = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--main-font",
});

const supportingFont = Montserrat({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--supporting-font",
});

export const metadata: Metadata = {
	title: "Studionarta",
	description:
		"Creative studio based in Malang and Jakarta that values creativity and design excellence",
	openGraph: {
		title: "Studionarta",
		description: "Studionarta creative studio",
		siteName: "Studionarta",
		images: [
			{
				url: "/img-logowhite.png",
				width: 1200,
				height: 630,
			},
		],
		locale: "en_US",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`scroll-smooth ${mainFont.variable} ${supportingFont.variable}`}
		>
			<body className="bg-bgbase">
				<ConditionalNavbar />
				{children}
				<BackToTop />
				<Footer />
				<Toaster />
			</body>
		</html>
	);
}
