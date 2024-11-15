import Link from "next/link";
import Image from "next/image";

// Import Assets //
import logoblack from "@/assets/images/img-logoblack.png";
import igLogo from "@/assets/images/ig-logo.png";
import linkedinLogo from "@/assets/images/linkedin.png";
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

					<div className="flex flex-col mt-14 gap-3">
						<p className="text-2xl text-black font-medium">
							Contact Us
						</p>
						<div className="flex flex-col gap-2">
							<p className="text-[15px] text-neutral-500 font-supportingfont">
								CP01 - Devina{" "}
								<span>
									<Link href="https://wa.me/628123024660">
										+62 812 3024 660
									</Link>
								</span>{" "}
								<span className="inline-block whitespace-normal">
									(WhatsApp only)
								</span>
							</p>
							<p className="text-[15px] text-neutral-500 font-supportingfont">
								CP02 - Dio{" "}
								<span>
									<Link href="https://wa.me/6281803383993">
									+62 818 0338 3993
									</Link>
								</span>{" "}
								<span className="inline-block whitespace-normal">
									(WhatsApp only)
								</span>
							</p>
							<p className="text-[15px] text-neutral-500 font-supportingfont">
								Email -{" "}
								<span>
									<Link
										href={"mailto:hello@studionarta.com"}
										target="_blank"
									>
										hello@studionarta.com
									</Link>
								</span>
							</p>
						</div>
					</div>

					<div className="flex flex-col mt-12 gap-[18px]">
						<Link href="/our-work">
							<div className="w-fit pb-[6px] border-b border-black border-opacity-35">
								<p className="text-base text-neutral-500 font-supportingfont">
									Our Work
								</p>
							</div>
						</Link>
						<Link href="/corporate-project">
							<div className="w-fit pb-[6px] border-b border-black border-opacity-35">
								<p className="text-base text-neutral-500 font-supportingfont">
									Corporate Work
								</p>
							</div>
						</Link>
						<Link href="/contact-us">
							<div className="w-fit pb-[6px] border-b border-black border-opacity-35">
								<p className="text-base text-neutral-500 font-supportingfont">
									Contact Us
								</p>
							</div>
						</Link>
						<Link href="/join-us">
							<div className="w-fit pb-[6px] border-b border-black border-opacity-35">
								<p className="text-base text-neutral-500 font-supportingfont">
									Join Us
								</p>
							</div>
						</Link>
					</div>

					<div className="flex flex-col mt-12 gap-3">
						<p className="text-2xl text-black font-medium">
							Office Studio
						</p>
						<p className="text-[15px] text-neutral-500 font-supportingfont">
						Malang - Raya Wendit Barat No. 7, Malang, 65154
						</p>
						<p className="text-[15px] text-neutral-500 font-supportingfont">
						Jakarta -  Pakubuwono VI No. 70, Jakarta Selatan, 12120
						</p>
					</div>

					<div className="flex flex-col mt-12 gap-3">
						<p className="text-2xl text-black font-medium">
							Social Media
						</p>
						<Link
							href="https://www.instagram.com/studionarta"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="w-fit">
								<Image
									src={igLogo}
									alt={`Instagram`}
									priority={false}
									width={25}
									height={25}
									quality={100}
								/>
							</div>
						</Link>
						<Link
							href="https://www.linkedin.com/in/studionarta-1b0a87307/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="w-fit">
								<Image
									src={linkedinLogo}
									alt={`Linkedin`}
									priority={false}
									width={25}
									height={25}
									quality={100}
								/>
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
							className="w-8 2xl:w-9 h-auto"
						/>
					</div>

					<div className="flex justify-between w-full">
						<div className="flex flex-col w-full h-full">
							<h5 className="text-xl 2xl:text-2xl text-black font-medium">
								Contact Us
							</h5>
							<p className="text-sm 2xl:text-base text-neutral-500 font-supportingfont mt-3">
								CP01 - Devina{" "}
								<Link href="https://wa.me/628123024660">
									<span className="hover:text-black duration-300">
										+62 812 3024 660
									</span>
								</Link>{" "}
								(WhatsApp Only)
							</p>
							<p className="text-sm 2xl:text-base text-neutral-500 font-supportingfont mt-3">
								CP02 - Dio{" "}
								<Link href="https://wa.me/6281803383993">
									<span className="hover:text-black duration-300">
									+62 818 0338 3993
									</span>
								</Link>{" "}
								(WhatsApp Only)
							</p>
							<p className="text-sm 2xl:text-base text-neutral-500 font-supportingfont mt-2">
								Email -{" "}
								<span className="hover:text-black duration-300">
									<Link
										href={"mailto:hello@studionarta.com"}
										target="_blank"
									>
										hello@studionarta.com
									</Link>
								</span>
							</p>
							<div className="flex items-end justify-start gap-[14px] 2xl:gap-4 mt-8 2xl:mt-9">
								<Link href="/our-work">
									<p className="text-[15px] 2xl:text-[17px] text-neutral-500 leading-tight hover:text-black duration-300 font-supportingfont">
										Our Work
									</p>
								</Link>

								<div className="w-[1px] h-auto self-stretch bg-neutral-400"></div>

								<Link href="/corporate-project">
									<p className="text-[15px] 2xl:text-[17px] text-neutral-500 leading-tight hover:text-black duration-300 font-supportingfont">
										Corporate Work
									</p>
								</Link>

								<div className="w-[1px] h-auto self-stretch bg-neutral-400"></div>

								<Link href="/contact-us">
									<p className="text-[15px] 2xl:text-[17px] text-neutral-500 leading-tight hover:text-black duration-300 font-supportingfont">
										Contact Us
									</p>
								</Link>

								<div className="w-[1px] h-auto self-stretch bg-neutral-400"></div>

								<Link href="/join-us">
									<p className="text-[15px] 2xl:text-[17px] text-neutral-500 leading-tight hover:text-black duration-300 font-supportingfont">
										Join Us
									</p>
								</Link>
							</div>
						</div>

						<div className="flex flex-col w-full h-full">
							<h5 className="text-xl 2xl:text-2xl text-black font-medium">
								Office Studio
							</h5>
							<p className="text-sm 2xl:text-base text-neutral-500 font-supportingfont mt-3">
								Malang - Raya Wendit Barat No. 7, Malang, 65154
							</p>
							<p className="text-sm 2xl:text-base text-neutral-500 font-supportingfont mt-3">
								Jakarta -  Pakubuwono VI No. 70, Jakarta Selatan, 12120
							</p>
						</div>

						<div className="flex flex-col w-fit h-full whitespace-nowrap">
							<h5 className="text-xl 2xl:text-2xl text-black font-medium text-nowrap mb-2">
								Social Media
							</h5>
							<Link
								href="https://www.instagram.com/studionarta"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="w-fit cursor-pointer mb-2">
									<Image
										src={igLogo}
										alt={`Instagram`}
										priority={false}
										width={25}
										height={25}
										quality={100}
									/>
								</div>
							</Link>
							<Link
								href="https://www.linkedin.com/in/studionarta-1b0a87307/ "
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="w-fit cursor-pointer">
									<Image
										src={linkedinLogo}
										alt={`Linkedin`}
										priority={false}
										width={25}
										height={25}
										quality={100}
									/>
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
