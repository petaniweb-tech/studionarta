// Import Components //
import HeroCarousel from "@/components/hero-carousel";
import AboutCarousel from "@/components/about-carousel";

export default function Home() {
	return (
		<>
			{/* <-- ==== Hero Section Start ==== --> */}
			<section className="w-full h-screen">
				<HeroCarousel />
			</section>
			{/* <-- ==== Hero Section End ==== --> */}

			{/* <-- ==== About Section End ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl pt-20 lg:pt-36">
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

			<section id="about" className="w-full px-sectionpxsm pt-24 pb-28 lg:pt-36 lg:mb-52 lg:px-0 ">
				<AboutCarousel />
			</section>
			{/* <-- ==== About Section Desktop End ==== --> */}
		</>
	);
}
