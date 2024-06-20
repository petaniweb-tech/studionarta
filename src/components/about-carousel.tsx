"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

// Import Assets //
import carouselitem1 from "@/assets/images/img-dummy-3.jpg";
import carouselitem2 from "@/assets/images/img-dummy-4.jpg";
import carouselitem3 from "@/assets/images/img-dummy-5.jpg";
import carouselitem4 from "@/assets/images/img-dummy-10.jpg";
import carouselitem5 from "@/assets/images/img-dummy-11.jpg";
import carouselitem6 from "@/assets/images/img-dummy-12.jpg";

export default function AboutCarousel() {
	return (
		<>
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
				className="w-full h-auto block lg:hidden"
			>
				<CarouselContent>
					<CarouselItem className="block w-full object-cover">
						<Image
							src={carouselitem1}
							alt="Carousel Item 1"
							priority={true}
							className="object-cover object-center h-full w-auto"
						/>
					</CarouselItem>

					<CarouselItem className="block w-full object-cover">
						<Image
							src={carouselitem2}
							alt="Carousel Item 2"
							priority={true}
							className="object-cover object-center h-full w-auto"
						/>
					</CarouselItem>

					<CarouselItem className="block w-full object-cover">
						<Image
							src={carouselitem3}
							alt="Carousel Item 3"
							priority={true}
							className="object-cover object-center h-full w-auto"
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>

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
				className="w-full h-auto hidden lg:block"
			>
				<CarouselContent>
					<CarouselItem className="block w-full object-cover">
						<Image
							src={carouselitem4}
							alt="Carousel Item 1"
							priority={true}
							className="object-cover object-center h-full w-auto"
						/>
					</CarouselItem>

					<CarouselItem className="block w-full object-cover">
						<Image
							src={carouselitem5}
							alt="Carousel Item 2"
							priority={true}
							className="object-cover object-center h-full w-auto"
						/>
					</CarouselItem>

					<CarouselItem className="block w-full object-cover">
						<Image
							src={carouselitem6}
							alt="Carousel Item 3"
							priority={true}
							className="object-cover object-center h-full w-auto"
						/>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</>
	);
}
