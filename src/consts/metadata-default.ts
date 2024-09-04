import type { Metadata } from "next";

export const defaultMetaData: Metadata = {
  title: "Studionarta",
  description:
    "Creative studio based in Malang and Jakarta that values creativity and design excellence",
  metadataBase: new URL(`https://studionarta.vercel.app`),
  applicationName: "Studionarta",
  authors: [{ name: "PetaniWeb Team", url: "https://petaniweb.com" }],
  alternates: {
    canonical: "./",
  },
  publisher: "Vercel",
  openGraph: {
    title: "Studionarta",
    description:
      "Creative studio based in Malang and Jakarta that values creativity and design excellence",
    siteName: "Studionarta",
    url: "https://studionarta.vercel.app",
    images: [
      {
        url: "/studionarta-og.png",
        width: 1200,
        height: 630,
        alt: "Studionarta",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
