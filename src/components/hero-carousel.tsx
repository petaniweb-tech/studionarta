"use client";

import Image from "next/image";
import { useEffect, useState, useRef  } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import { Image as ImageType } from "@/types/commonType";
import { queryHero } from "@/services/bannersService";
import { fetch } from "@/services/sanity";

// Import Assets //
import logowhite from "@/assets/images/img-logowhite.png";

export default function HeroCarousel() {
	const [banners, setBanners] = useState<ImageType[]>([]);
	const hasFetched = useRef(false);

	useEffect(() => {
		if (!hasFetched.current) {
			fetch(queryHero)
			.then((data) => {
				const { banners } = data;
				setBanners(banners);
			})
			.catch((err) => console.error(err));
			hasFetched.current = true;
		}
	}, []);

	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 4000,
				}),
			]}
			className="w-full h-screen"
		>
			<CarouselContent>
				{banners?.map((banner, index) => (
					<CarouselItem
						key={`banner-${index}`}
						className="block w-full object-cover"
					>
						<div className="relative">
							<Image
								src={banner.url}
								alt={`banner-image-${index}`}
								priority={true}
								width={400}
								height={400}
								className="object-cover object-center h-screen w-full"
							/>
							<div className="absolute inset-0 flex items-center justify-center">
								<Image
									src={logowhite}
									alt="Studio Narta Logo"
									priority={true}
									className="h-14 lg:h-[70px] w-auto"
								/>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
