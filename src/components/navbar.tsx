"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Import Icons //
import { HamburgerMenuIcon, Cross2Icon } from "@radix-ui/react-icons";

// Import Assets //
import logowhite from "@/assets/images/img-logowhite.png";
import logoblack from "@/assets/images/img-logoblack.png";

function Navbar() {
	// Navbar Links //
	const navLinks = [
		{
			text: "Project",
			path: "/project",
		},
		{
			text: "About Us",
			path: "/#about",
		},
		{
			text: "Contact",
			path: "/contact",
		},
	];

	// Navbar Mobile View //
	const [isOpen, setOpen] = useState(false);

	// Navbar Toggle //
	const toggleMenu = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	// Navbar Items //
	interface NavItemProps {
		text: string;
		path: string;
	}
	const NavItem = ({ text, path }: NavItemProps) => {
		return <Link href={path}>{text}</Link>;
	};

	// Navbar Background //
	const [scrolling, setScrolling] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScrolling(true);
			} else {
				setScrolling(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{/* <-- ==== Navbar Mobile Start ==== --> */}
			<nav className="fixed flex w-full z-[100] lg:hidden">
				<div
					className={`flex items-center w-full justify-between px-sectionpxsm py-5 ${
						scrolling
							? "bg-white bg-opacity-10 backdrop-blur-2xl"
							: "bg-transparent"
					}
                    
                    `}
				>
					{isOpen ? (
						<Image
							src={logoblack}
							alt="Studio Narta Logo"
							priority={true}
							className="h-7 w-auto"
						/>
					) : (
						<Image
							src={logowhite}
							alt="Studio Narta Logo"
							priority={true}
							className="h-7 w-auto"
						/>
					)}

					{/* <-- === Navbar Toggle === --> */}
					<div
						onClick={toggleMenu}
						className={`w-fit h-fit flex items-center justify-center rounded-md px-2 py-2 border cursor-pointer ${
							isOpen
								? "border-black border-opacity-15"
								: "border-white border-opacity-80"
						}`}
					>
						{isOpen ? (
							<Cross2Icon className="w-[22px] h-[22px] text-black" />
						) : (
							<HamburgerMenuIcon className="w-[22px] h-[22px] text-white" />
						)}
					</div>
					{/* <-- === Navbar Toggle === --> */}
				</div>
			</nav>
			{/* <-- ==== Navbar Open Start ==== --> */}
			<div
				className={`fixed w-full h-screen z-[90] lg:hidden
            ${
				isOpen
					? "top-0 left-0 transition-all duration-500 ease-in-out"
					: "-top-full left-0 transition-all duration-500 ease-in-out"
			}`}
			>
				<div className="w-full flex flex-col h-full bg-bgbase bg-opacity-60 backdrop-blur-xl px-sectionpxsm pb-20 pt-40 justify-between items-start">
					<div className="flex flex-col w-full">
						{/* <-- === Navbar Links Start === --> */}
						{navLinks.map((link, index) => (
							<div
								key={index}
								className="w-full py-3 text-5xl text-black"
							>
								<NavItem
									key={index}
									text={link.text}
									path={link.path}
								/>
							</div>
						))}
						{/* <-- === Navbar Links End === --> */}
					</div>
					<div className="flex flex-col gap-14">
						<div className="w-full flex flex-col gap-[6px]">
							<h5 className="text-[22px] text-black font-medium">
								Contact
							</h5>
							<p className="text-lg text-black">
								Raya wendit barat No. 7 Malang, 65154
							</p>
						</div>

						<div className="flex w-fit pb-2 border-b-[1px] border-black border-opacity-25">
							<p className="text-base font-medium text-black">
								INSTAGRAM
							</p>
						</div>
					</div>
				</div>
			</div>
			{/* <-- ==== Navbar Open End ==== --> */}
			{/* <-- ==== Navbar Mobile End ==== --> */}

			{/* <-- ==== Navbar Desktop Start ==== --> */}
			<nav
				className={`hidden lg:flex fixed w-full px-sectionpxlg 2xl:px-sectionpx2xl z-[100] py-9 items-center justify-between ${
					scrolling
						? "bg-white bg-opacity-10 backdrop-blur-2xl"
						: "bg-transparent"
				}`}
			>
				<Link href="/">
					<Image
						src={logowhite}
						alt="Studio Narta"
						priority={true}
						className="h-[26px] w-auto"
					/>
				</Link>

				{/* <-- === Navbar Links Start === --> */}
				<div className="flex items-center justify-center gap-7">
					{navLinks.map((link, index) => (
						<div key={index} className="w-fit text-xl text-white">
							<NavItem
								key={index}
								text={link.text}
								path={link.path}
							/>
						</div>
					))}
					{/* <-- === Navbar Links End === --> */}
				</div>
			</nav>
			{/* <-- ==== Navbar Desktop End ==== --> */}
		</>
	);
}

export default Navbar;
