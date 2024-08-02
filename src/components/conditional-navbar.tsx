"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

const ConditionalNavbar = () => {
	const pathname = usePathname();

	if (
		pathname === "/our-work" ||
		pathname.startsWith("/our-work/") ||
		pathname === "/contact-us" ||
		pathname === "/join-us"
	) {
		return null;
	}

	return <Navbar />;
};

export default ConditionalNavbar;
