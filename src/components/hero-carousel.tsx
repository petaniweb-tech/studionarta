"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

// Import Assets //
import carouselitem1 from "@/assets/images/img-dummy-1.jpg";
import carouselitemlg from "@/assets/images/img-dummy-6.jpg";
import logowhite from "@/assets/images/img-logowhite.png";

export default function HeroCarousel() {
	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 5000,
				}),
			]}
			className="w-full h-screen"
		>
			<CarouselContent>
				<CarouselItem className="block lg:hidden w-full object-cover">
					<div className="relative">
						<Image
							src={carouselitem1}
							alt="Carousel Item 1"
							priority={true}
							className="object-cover object-center h-screen w-auto"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<Image
								src={logowhite}
								alt="Studio Narta Logo"
								priority={true}
								className="h-14 w-auto"
							/>
						</div>
					</div>
				</CarouselItem>

				<CarouselItem className="hidden lg:block w-full">
					<div className="relative">
						<Image
							src={carouselitemlg}
							alt="Carousel Item 1"
							priority={true}
							className="object-cover object-center w-full h-screen"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<Image
								src={logowhite}
								alt="Studio Narta Logo"
								priority={true}
								className="h-[70px] w-auto"
							/>
						</div>
					</div>
				</CarouselItem>
			</CarouselContent>
		</Carousel>
	);
}
