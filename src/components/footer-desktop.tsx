import Link from "next/link";
import Image from "next/image";

// Import Assets //
import logoblack from "@/assets/images/img-logoblack.png";

export default function FooterDesktop() {
	return (
		<section className="hidden lg:block w-full">
			<div className="flex items-start justify-between px-sectionpxlg pb-20">
				<div className="flex gap-20 w-full h-full">
					<div className="pt-2 w-fit h-fit">
						<Image
							src={logoblack}
							alt="Studio Narta"
							priority={true}
							className="w-[34px] h-auto"
						/>
					</div>
					<div className="flex flex-col h-full w-full">
						<h5 className="text-xl text-black font-medium">
							Studio Narta
						</h5>
						<p className="text-sm text-black font-supportingfont mt-3">
							Lorem ipsum dolor sit amet, consectetur
							<br />
							adipiscing elit, sed diam nonummy nibh
							<br />
							euis
						</p>
						<div className="flex items-end justify-start gap-3 mt-[30px]">
							<p className="text-base text-black font-medium">
								About Us
							</p>
							<p className="text-base text-black font-medium">
								Project
							</p>
							<Link href="/contact">
								<p className="text-base text-black font-medium">
									Contact
								</p>
							</Link>
						</div>
					</div>
				</div>

				<div className="flex flex-col h-full w-full self-start">
					<h5 className="text-xl text-black font-medium">Contact</h5>
					<p className="text-sm text-black font-supportingfont mt-3">
						Raya wendit barat No. 7 Malang, 65154
					</p>
				</div>

				<div className="flex flex-col gap-5 h-full">
					<div className="pb-2 border-b-[1px] w-fit border-black border-opacity-25">
						<p className="text-sm text-black font-medium">
							INSTAGRAM
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
