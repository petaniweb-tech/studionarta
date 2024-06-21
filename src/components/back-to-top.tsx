"use client";

import { useState, useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";

// Import Icons //
import { ChevronUpIcon } from "@radix-ui/react-icons";

export default function BackToTop() {
	const [isLargeScreen, setIsLargeScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsLargeScreen(window.innerWidth >= 1024);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const styles = {
		borderRadius: "50%",
		width: "50px",
		height: "50px",
		boxShadow: "none",
		right: isLargeScreen ? "50px" : "36px",
		bottom: isLargeScreen ? "80px" : "40px",
		background: isLargeScreen ? "none" : "white",
		border: isLargeScreen ? "0.8px solid rgba(0, 0, 0, 0.4)" : "none",
	};

	return (
		<section>
			<ScrollToTop
				smooth
				component={<ChevronUpIcon className="w-2/5 h-2/5 text-black" />}
				className="flex items-center justify-center"
				style={styles}
			/>
		</section>
	);
}
