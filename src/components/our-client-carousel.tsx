"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import { Client } from "@/types/bannersType";
import { Image as ImageType } from "@/types/commonType";
import { queryClient } from "@/services/bannersService";
import { fetch } from "@/services/sanity";

async function fetchClientBanner(): Promise<Client> {
	return fetch(queryClient);
}

export default function OurClientCarousel() {
	const [banners, setBanners] = useState<ImageType[]>([]);

	useEffect(() => {
		fetchClientBanner()
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
					delay: 4000,
				}),
			]}
			className="w-full h-auto"
		>
			<CarouselContent>
				{banners?.map((banner, index) => (
					<CarouselItem
						key={`banner-${index}`}
						className="block w-full object-cover"
					>
						<div>
							<Image
								src={banner.url}
								alt={`banner-image-${index}`}
								priority={true}
								width={0}
								height={0}
								sizes="100vw"
								quality={100}
								className="object-cover object-center h-auto w-full"
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
