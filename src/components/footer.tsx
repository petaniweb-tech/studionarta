import Link from "next/link";
import Image from "next/image";

// Import Assets //
import logoblack from "@/assets/images/img-logoblack.png";

export default function Footer() {
	return (
		<>
			<section className="w-full px-sectionpxsm pb-10 lg:hidden">
				<div className="flex flex-col">
					<Image
						src={logoblack}
						alt="Narta Studio Logo"
						priority={true}
						className="w-7 h-auto"
					/>

					<div className="flex flex-col mt-14 gap-2">
						<p className="text-2xl text-black font-medium">
							Studio Narta
						</p>
						<p className="text-sm text-black font-supportingfont">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed diam nonummy nibh euis
						</p>
					</div>

					<div className="flex flex-col mt-12 gap-2">
						<p className="text-xl text-black font-medium">
							About Us
						</p>
						<p className="text-xl text-black font-medium">
							Project
						</p>
						<Link href="/contact">
							<p className="text-xl text-black font-medium">
								Contact
							</p>
						</Link>
					</div>

					<div className="flex flex-col mt-12 gap-2">
						<p className="text-2xl text-black font-medium">
							Contact
						</p>
						<p className="text-sm text-black font-supportingfont">
							Raya wendit barat No. 7 Malang, 65154
						</p>
					</div>

					<div className="flex flex-col mt-12 gap-3">
						<div className="py-2 border-b-[1px] w-fit border-black border-opacity-25">
							<p className="text-lg text-black font-medium">
								INSTAGRAM
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
