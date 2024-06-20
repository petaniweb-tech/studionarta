import Image from "next/image";

// Import Components //
import HeroCarousel from "@/components/hero-carousel";

// Import Components //
import AboutCarousel from "@/components/about-carousel";

// Import Assets //
import aboutdummy1 from "@/assets/images/img-dummy-3.jpg";
import aboutdummy2 from "@/assets/images/img-dummy-5.jpg";
import aboutdummy3 from "@/assets/images/img-dummy-4.jpg";
import aboutdummy4 from "@/assets/images/img-dummy-7.jpg";
import aboutdummy5 from "@/assets/images/img-dummy-8.jpg";
import aboutdummy6 from "@/assets/images/img-dummy-9.jpg";

export default function Home() {
	return (
		<>
			{/* <-- ==== Hero Section Start ==== --> */}
			<section className="w-full h-screen">
				<HeroCarousel />
			</section>
			{/* <-- ==== Hero Section End ==== --> */}

			{/* <-- ==== About Section End ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg pt-20 lg:pt-36">
				<p className="text-[22px] lg:text-2xl lg:leading-relaxed text-black lg:px-16">
					Studionarta is a creative studio based in Malang and Jakarta
					that values creativity and design excellence. Our team of
					experts is dedicated to helping businesses and individuals
					create unique, memorable brands that resonate with their
					audiences. Discover how we can transform your vision into
					reality.
				</p>
			</section>
			{/* <-- ==== About Section End ==== --> */}

			{/* <-- ==== About Section Mobile Start ==== --> */}
			<section className="block lg:hidden w-full px-sectionpxsm pt-24 pb-28">
				<div className="flex gap-6 items-start">
					<p className="text-lg text-black [writing-mode:vertical-rl] rotate-180 leading-none">
						About us
					</p>
					<div className="flex flex-col gap-5">
						<div className="relative">
							<div className="absolute inset-0 items-end flex px-7 pb-7">
								<p className="text-xl leading-none text-white">
									Lorem ipsum dolor
								</p>
							</div>
							<Image
								src={aboutdummy1}
								alt="About Dummy"
								priority={true}
								className="w-full h-auto"
							/>
						</div>

						<div className="relative">
							<div className="absolute inset-0 items-end flex px-7 pb-7">
								<p className="text-xl leading-none text-white">
									Lorem ipsum dolor
								</p>
							</div>
							<Image
								src={aboutdummy2}
								alt="About Dummy"
								priority={true}
								className="w-full h-auto"
							/>
						</div>

						<div className="relative">
							<div className="absolute inset-0 items-end flex px-7 pb-7">
								<p className="text-xl leading-none text-white">
									Lorem ipsum dolor
								</p>
							</div>
							<Image
								src={aboutdummy3}
								alt="About Dummy"
								priority={true}
								className="w-full h-auto"
							/>
						</div>

						<AboutCarousel />
					</div>
				</div>

				<div className="w-full pt-16">
					<div className="w-full py-4 border-b-[1px] border-black border-opacity-25">
						<p className="text-[26px] text-black">Project</p>
					</div>
					<div className="w-full py-4 border-b-[1px] border-black border-opacity-25">
						<p className="text-[26px] text-black">Contact</p>
					</div>
				</div>
			</section>
			{/* <-- ==== About Section Mobile End ==== --> */}

			{/* <-- ==== About Section Desktop Start ==== --> */}
			<section className="hidden lg:block w-full pt-36 pb-52">
				<div className="relative">
					<div className="absolute inset-0 flex px-36 items-start">
						<p className="text-lg text-black [writing-mode:vertical-rl] tracking-wider rotate-180 leading-none">
							About us
						</p>
					</div>
					<div className="flex items-center w-full gap-4 justify-center px-sectionpxlg">
						<div className="relative">
							<div className="absolute inset-0 items-end flex px-7 pb-7">
								<p className="text-xl leading-none text-white">
									Lorem ipsum dolor
								</p>
							</div>
							<Image
								src={aboutdummy4}
								alt="About Dummy"
								priority={true}
								className="w-full h-auto"
							/>
						</div>

						<div className="relative">
							<div className="absolute inset-0 items-end flex px-7 pb-7">
								<p className="text-xl leading-none text-white">
									Lorem ipsum dolor
								</p>
							</div>
							<Image
								src={aboutdummy5}
								alt="About Dummy"
								priority={true}
								className="w-full h-auto"
							/>
						</div>

						<div className="relative">
							<div className="absolute inset-0 items-end flex px-7 pb-7">
								<p className="text-xl leading-none text-white">
									Lorem ipsum dolor
								</p>
							</div>
							<Image
								src={aboutdummy6}
								alt="About Dummy"
								priority={true}
								className="w-full h-auto"
							/>
						</div>
					</div>
				</div>

				<div className="px-sectionpxlg w-full mt-4">
					<AboutCarousel />
				</div>

				<div className="px-sectionpxlg w-full mt-32 flex flex-col gap-3">
					<div className="w-full py-3 border-b-[1px] border-black border-opacity-25">
						<p className="text-[26px] text-black">Project</p>
					</div>
					<div className="w-full py-3 border-b-[1px] border-black border-opacity-25">
						<p className="text-[26px] text-black">Contact</p>
					</div>
				</div>
			</section>
			{/* <-- ==== About Section Desktop End ==== --> */}
		</>
	);
}
