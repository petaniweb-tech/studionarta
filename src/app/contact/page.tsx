import Link from "next/link";

export default function Contact() {
	return (
		<section className="w-full bg-cover bg-center bg-bgcontact h-screen mb-28 flex items-center justify-center my-auto px-sectionpxsm lg:px-sectionpxlg">
			<div className="flex w-full items-center justify-center lg:justify-start">
				<div className="flex flex-col w-full lg:w-[36%] h-auto px-11 pt-12 lg:pt-14 pb-14 lg:pb-16 gap-9 bg-white">
					<div className="flex flex-col gap-3">
						<h5 className="text-2xl text-black font-medium">
							Studio Narta.
						</h5>
						<p className="text-[13px] text-black opacity-65 leading-relaxed font-supportingfont">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed diam nonummy nibh euis
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<h5 className="text-2xl text-black font-medium">
							Contact.
						</h5>
						<p className="text-[13px] text-black opacity-65 leading-relaxed font-supportingfont">
							Raya wendit barat No. 7 Malang, 65154
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<h5 className="text-2xl text-black font-medium">
							Follow Us.
						</h5>
						<Link href="">
							<div className="py-2 border-b-[1px] w-fit border-black border-opacity-25">
								<p className="text-[13px] text-black font-medium">
									INSTAGRAM
								</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
