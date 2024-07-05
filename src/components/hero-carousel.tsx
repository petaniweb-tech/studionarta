"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Image as ImageType } from "@/types/commonType";
import { queryHero } from "@/services/bannersService";
import { fetch } from "@/services/sanity";

// Import Assets //
import logowhite from "@/assets/images/img-logowhite.png";

interface Banner {
	url: string;
	type: "image" | "video";
}

export default function HeroCarousel() {
	const [banners, setBanners] = useState<Banner[]>([]);
	const hasFetched = useRef(false);

	useEffect(() => {
		if (!hasFetched.current) {
			fetch(queryHero)
				.then((data) => {
					const { banners } = data;
					// Sort banners to have video first
					const sortedBanners = banners.sort(
						(a: Banner, b: Banner) => {
							if (a.type === "video" && b.type === "image")
								return -1;
							if (a.type === "image" && b.type === "video")
								return 1;
							return 0;
						}
					);
					setBanners(sortedBanners);
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
							{banner.type === "image" ? (
								<Image
									src={banner.url}
									alt={`banner-image-${index}`}
									priority={true}
									width={400}
									height={400}
									className="object-cover object-center h-screen w-full"
								/>
							) : (
								<video
									src={banner.url}
									autoPlay={true}
									muted={true}
									loop={true}
									controls={false}
									playsInline
									className="object-cover object-center h-screen w-full"
								/>
							)}
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
