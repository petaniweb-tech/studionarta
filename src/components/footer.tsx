import Link from "next/link";
import Image from "next/image";

// Import Assets //
import logoblack from "@/assets/images/img-logoblack.png";

export default function Footer() {
	return (
		<>
			{/* <-- ==== Footer Mobile Start ==== --> */}
			<section className="w-full px-sectionpxsm pb-10 lg:hidden">
				<div className="flex flex-col">
					<Image
						src={logoblack}
						alt="Studionarta Logo"
						priority={true}
						className="w-7 h-auto"
					/>

					<div className="flex flex-col mt-14 gap-2">
						<p className="text-2xl text-black font-medium">
							Contact Us
						</p>
						<p className="text-[15px] text-neutral-500 font-supportingfont">
							CP - Devina{" "}
							<span>
								<Link href="https://wa.me/628123024660">
									+62 812 3024 660
								</Link>
							</span>{" "}
							(WhatsApp only)
						</p>
					</div>

					<div className="flex flex-col mt-12 gap-[18px]">
						<Link href="/#about">
							<div className="w-fit pb-[6px] border-b border-black border-opacity-35">
								<p className="text-base text-neutral-500 font-supportingfont">
									About Us
								</p>
							</div>
						</Link>
						<Link href="/project">
							<div className="w-fit pb-[6px] border-b border-black border-opacity-35">
								<p className="text-base text-neutral-500 font-supportingfont">
									Project
								</p>
							</div>
						</Link>
						<Link href="/contact">
							<div className="w-fit pb-[6px] border-b border-black border-opacity-35">
								<p className="text-base text-neutral-500 font-supportingfont">
									Contact
								</p>
							</div>
						</Link>
					</div>

					<div className="flex flex-col mt-12 gap-2">
						<p className="text-2xl text-black font-medium">
							Office Studio
						</p>
						<p className="text-[15px] text-neutral-500 font-supportingfont">
							Raya wendit barat No. 7 Malang, 65154
						</p>
					</div>

					<div className="flex flex-col mt-12 gap-2">
						<p className="text-2xl text-black font-medium">
							Social Media
						</p>
						<Link
							href="https://www.instagram.com/studionarta"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="w-fit">
								<p className="text-[15px] text-neutral-500 font-supportingfont">
									Instagram
								</p>
							</div>
						</Link>
					</div>
				</div>
			</section>
			{/* <-- ==== Footer Mobile End ==== --> */}

			{/* <-- ==== Footer Destop Start ==== --> */}
			<section className="hidden lg:block w-full">
				<div className="flex items-start justify-between gap-24 px-sectionpxlg 2xl:px-sectionpx2xl pb-20">
					<div className="w-fit flex pt-2">
						<Image
							src={logoblack}
							alt="Studionarta"
							priority={true}
							className="w-8 h-auto"
						/>
					</div>

					<div className="flex justify-between w-full">
						<div className="flex flex-col w-full h-full">
							<h5 className="text-xl text-black font-medium">
								Contact Us
							</h5>
							<p className="text-sm text-neutral-500 font-supportingfont mt-3">
								CP - Devina{" "}
								<span className="text-black">
									<Link href="https://wa.me/628123024660">
										+62 812 3024 660
									</Link>
								</span>{" "}
								(WhatsApp Only)
							</p>
							<div className="flex items-end justify-start gap-[14px] mt-[30px]">
								<Link href="/#about">
									<p className="text-[15px] text-neutral-500 leading-tight hover:text-black duration-300 font-supportingfont">
										About Us
									</p>
								</Link>

								<div className="w-[1px] h-auto self-stretch bg-neutral-400"></div>

								<Link href="/project">
									<p className="text-[15px] text-neutral-500 leading-tight hover:text-black duration-300 font-supportingfont">
										Project
									</p>
								</Link>

								<div className="w-[1px] h-auto self-stretch bg-neutral-400"></div>

								<Link href="/contact">
									<p className="text-[15px] text-neutral-500 leading-tight hover:text-black duration-300 font-supportingfont">
										Contact
									</p>
								</Link>
							</div>
						</div>

						<div className="flex flex-col w-full h-full">
							<h5 className="text-xl text-black font-medium">
								Office Studio
							</h5>
							<p className="text-sm text-neutral-500 font-supportingfont mt-3">
								Raya wendit barat No. 7 Malang, 65154
							</p>
						</div>

						<div className="flex flex-col w-fit h-full whitespace-nowrap">
							<h5 className="text-xl text-black font-medium text-nowrap">
								Social Media
							</h5>
							<Link
								href="https://www.instagram.com/studionarta"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="w-fit cursor-pointer">
									<p className="text-sm text-neutral-500 hover:text-black duration-300 font-supportingfont mt-3 text-nowrap">
										Instagram
									</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</section>
			{/* <-- ==== Footer Destop End ==== --> */}
		</>
	);
}
