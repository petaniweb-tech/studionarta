"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";


import { Hero } from "@/types/bannersType";
import { Image as ImageType } from "@/types/commonType";
import { queryHero } from "@/services/bannersService";
import { fetch } from "@/services/sanity";

// Import Assets //
import logowhite from "@/assets/images/img-logowhite.png";

async function fetchHeroBanner(): Promise<Hero> { return fetch(queryHero) }

export default function HeroCarousel() {
	const [banners, setBanners] = useState<ImageType[]>([]);

	useEffect(() => {
		fetchHeroBanner().then((data) => {
			const { banners } = data;
			setBanners(banners)
		}).catch((err) => console.error(err));
	}, []);

	console.log("banners", banners)

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
				{banners?.map((banner, index) => (
					<CarouselItem className={"block w-full object-cover"} key={`banner-${index}`}>
						<div className="relative">
							<Image
								src={banner.url}
								alt={`banner-image-${index}`}
								priority={index === 0}
								width={400}
								height={400}
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
				))}
			</CarouselContent>
		</Carousel>
	);
}
