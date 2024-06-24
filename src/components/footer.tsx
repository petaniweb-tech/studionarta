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
							Studionarta
						</p>
						<p className="text-sm text-neutral-500 font-supportingfont">
							CP - Devina{" "}
							<span>
								<Link href="https://wa.me/628123024660">
									+62 81 2302 4660
								</Link>
							</span>{" "}
							(WA only)
						</p>
					</div>

					<div className="flex flex-col mt-12 gap-2">
						<Link href="/#about">
							<p className="text-lg text-black font-medium">
								About Us
							</p>
						</Link>
						<Link href="/project">
							<p className="text-lg text-black font-medium">
								Project
							</p>
						</Link>
						<Link href="/contact">
							<p className="text-lg text-black font-medium">
								Contact
							</p>
						</Link>
					</div>

					<div className="flex flex-col mt-12 gap-2">
						<p className="text-2xl text-black font-medium">
							Contact
						</p>
						<p className="text-sm text-neutral-500 font-supportingfont">
							Raya wendit barat No. 7 Malang, 65154
						</p>
					</div>

					<div className="flex flex-col mt-12 gap-3">
						<Link
							href="https://www.instagram.com/studionarta"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="py-2 border-b-[1px] w-fit border-black border-opacity-25">
								<p className="text-lg text-black font-medium">
									INSTAGRAM
								</p>
							</div>
						</Link>
					</div>
				</div>
			</section>
			{/* <-- ==== Footer Mobile End ==== --> */}

			{/* <-- ==== Footer Destop Start ==== --> */}
			<section className="hidden lg:block w-full">
				<div className="flex items-start justify-between px-sectionpxlg pb-20">
					<div className="flex gap-20 w-full h-full">
						<div className="pt-2 w-fit h-fit">
							<Image
								src={logoblack}
								alt="Studionarta"
								priority={true}
								className="w-[34px] h-auto"
							/>
						</div>
						<div className="flex flex-col h-full w-full self-start">
							<h5 className="text-xl text-black font-medium">
								Studionarta
							</h5>
							<p className="text-sm text-neutral-500 font-supportingfont mt-3">
								CP - Devina{" "}
								<span className="text-black">
									<Link href="https://wa.me/628123024660">
										+62 81 2302 4660
									</Link>
								</span>{" "}
								(WA only)
							</p>
							<div className="flex items-end justify-start gap-3 mt-[30px]">
								<Link href="/#about">
									<p className="text-lg text-black font-medium">
										About Us
									</p>
								</Link>
								<Link href="/project">
									<p className="text-lg text-black font-medium">
										Project
									</p>
								</Link>
								<Link href="/contact">
									<p className="text-lg text-black font-medium">
										Contact
									</p>
								</Link>
							</div>
						</div>
					</div>

					<div className="flex flex-col h-full w-full self-start">
						<h5 className="text-xl text-black font-medium">
							Contact
						</h5>
						<p className="text-sm text-neutral-500 font-supportingfont mt-3">
							Raya wendit barat No. 7 Malang, 65154
						</p>
					</div>

					<div className="flex flex-col gap-5 h-full">
						<Link
							href="https://www.instagram.com/studionarta"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="pb-2 border-b-[1px] w-fit border-black border-opacity-25">
								<p className="text-sm text-black font-medium">
									INSTAGRAM
								</p>
							</div>
						</Link>
					</div>
				</div>
			</section>
			{/* <-- ==== Footer Destop End ==== --> */}
		</>
	);
}
