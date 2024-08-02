import Link from "next/link";

// Import Components //
import HeroCarousel from "@/components/hero-carousel";
import OurClientCarousel from "@/components/our-client-carousel";

export default function Home() {
	return (
		<>
			{/* <-- ==== Hero Section Start ==== --> */}
			<section className="w-full h-screen">
				<HeroCarousel />
			</section>
			{/* <-- ==== Hero Section End ==== --> */}

			{/* <-- ==== About Studionarta Section Start ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl mt-[110px] lg:mt-32 2xl:mt-[140px]">
				<p className="text-[22px] lg:text-2xl 2xl:text-[26px] lg:leading-relaxed text-black lg:px-16 2xl:px-[50px]">
					Studionarta is a creative studio based in Malang and Jakarta
					that values creativity and design excellence. Our team of
					experts is dedicated to helping businesses and individuals
					create unique, memorable brands that resonate with their
					audiences. Discover how we can transform your vision into
					reality.
				</p>
			</section>
			{/* <-- ==== About Studionarta Section End ==== --> */}

			{/* <section
				id="about"
				className="w-full px-sectionpxsm pt-24 pb-28 lg:pt-36 lg:mb-52 lg:px-0 "
			>
				<AboutCarousel />
			</section> */}

			{/* <-- ==== Our Client Section Start ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl mt-28 lg:mt-36">
				<div className="w-full flex items-center justify-start">
					<h3 className="text-[28px] lg:text-[33px] 2xl:text-[41px] text-black cursor-pointer">
						Our Client.
					</h3>
				</div>
			</section>
			<section className="w-full mt-7 lg:mt-12 2xl:mt-14">
				<OurClientCarousel />
			</section>
			{/* <-- ==== Our Client Section End ==== --> */}

			{/* <-- ==== Links Section Start ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl mt-16 lg:mt-20 mb-28 lg:mb-36 2xl:mb-[150px]">
				<div className="flex flex-col w-full gap-2 lg:gap-4">
					<Link href="/our-work">
						<div className="w-full py-2 border-b-[1px] border-black border-opacity-15 lg:hover:border-opacity-35 duration-300 cursor-pointer">
							<div className="w-fit">
								<h3 className="text-[28px] lg:text-[33px] 2xl:text-[41px] text-black">
									Our Work
								</h3>
							</div>
						</div>
					</Link>

					<Link href="/contact-us">
						<div className="w-full py-2 border-b-[1px] border-black border-opacity-15 lg:hover:border-opacity-35 duration-300 cursor-pointer">
							<div className="w-fit">
								<h3 className="text-[28px] lg:text-[33px] 2xl:text-[41px] text-black">
									Contact Us
								</h3>
							</div>
						</div>
					</Link>

					<Link href="/join-us">
						<div className="w-full py-2 border-b-[1px] border-black border-opacity-15 lg:hover:border-opacity-35 duration-300 cursor-pointer">
							<div className="w-fit">
								<h3 className="text-[28px] lg:text-[33px] 2xl:text-[41px] text-black">
									Join Us
								</h3>
							</div>
						</div>
					</Link>
				</div>
			</section>
			{/* <-- ==== Links Section End ==== --> */}
		</>
	);
}
