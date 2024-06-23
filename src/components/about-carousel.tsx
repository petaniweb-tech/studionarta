"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import { About } from "@/types/bannersType";
import { Image as ImageType } from "@/types/commonType";
import { queryAbout } from "@/services/bannersService";
import { fetch } from "@/services/sanity";

async function fetchAboutBanner(): Promise<About> {
	return fetch(queryAbout);
}

export default function AboutCarousel() {
	const [banners, setBanners] = useState<ImageType[]>([]);

	useEffect(() => {
		fetchAboutBanner()
			.then((data) => {
				const { banners } = data;
				setBanners(banners);
			})
			.catch((err) => console.error(err));
	}, []);

	console.log("banners", banners);

	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay: 3000,
				}),
			]}
			className="w-full h-full"
		>
			<CarouselContent>
				{banners?.map((banner, index) => (
					<CarouselItem
						key={`banner-${index}`}
						className="block w-full object-cover h-full"
					>
						<Image
							src={banner.url}
							alt={`about-image-${index}`}
							priority={true}
							width={1000}
							height={400}
							className="object-cover object-center w-full h-full"
						/>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
