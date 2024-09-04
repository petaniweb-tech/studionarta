import type { Metadata } from "next";

export const defaultMetaData: Metadata = {
  title: "Studionarta",
  description:
    "Creative studio based in Malang and Jakarta that values creativity and design excellence",
  metadataBase: process?.env?.NEXT_PUBLIC_BASE_URL ? new URL(process?.env?.NEXT_PUBLIC_BASE_URL) : new URL(`https://studionarta.vercel.app`),
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
    url: process?.env?.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: "/studionarta-og.png",
        width: 1200,
        height: 630,
        alt: "Studionarta",
      },
    ],
    countryName: "Indonesia",
    locale: "en_US",
    type: "article"
  },
};

export const JoinUsDescription: string = "Join our creative studio in Malang and Jakarta, where passion for design meets a commitment to innovation and excellence. Be part of a dynamic team that thrives on creativity and pushes the boundaries of design.";
export const ContactUsDescription: string = "Get in touch with our creative studio in Malang and Jakarta. We're here to collaborate on your next project and bring your vision to life with exceptional design and creativity.";
export const OurWorkDescription: string = "Explore our creative portfolio showcasing public projects that highlight our dedication to design excellence. Discover how our studio in Malang and Jakarta brings innovative ideas to life through exceptional creativity and craftsmanship.";
export const CorporateProjectDescription: string = "Take a sneak peek at our upcoming corporate projects, where creativity meets strategy. Discover how our Malang and Jakarta-based studio is set to deliver exceptional design solutions for businesses, tailored to their unique goals.";
