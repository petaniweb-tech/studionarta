"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

const ConditionalNavbar = () => {
	const pathname = usePathname();

	if (pathname === "/project" || pathname === "/contact") {
		return null;
	}

	return <Navbar />;
};

export default ConditionalNavbar;
