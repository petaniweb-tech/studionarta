"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Image as ImageType } from "@/types/commonType";
import { queryHero } from "@/services/bannersService";
import { fetch } from "@/services/sanity";
import "swiper/css";

// Import Assets //
import logowhite from "@/assets/images/img-logowhite.png";

interface Banner {
	url: string;
	type: "image" | "video";
}

export default function HeroCarouselNew() {
	const [banners, setBanners] = useState<Banner[]>([]);
	const hasFetched = useRef(false);
	const [swiperRef, setSwiperRef] = useState<any>(null);
	const [current, setCurrent] = useState(1);

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

	useEffect(() => {
		if (!swiperRef) {
			return;
		}

		setCurrent(swiperRef.realIndex + 1);

		swiperRef.on("slideChange", () => {
			setCurrent(swiperRef.realIndex + 1);
		});
	}, [swiperRef]);

	return (
		<Swiper
			modules={[Autoplay]}
			loop={true}
			autoplay={{
				delay: 4000,
				disableOnInteraction: false,
			}}
			onSwiper={setSwiperRef}
			className="w-full h-screen"
		>
			{banners?.map((banner, index) => (
				<SwiperSlide
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

						<div className="absolute inset-0 flex justify-center w-full px-sectionpxsm lg:px-sectionpxlg items-end pb-10 lg:pb-[70px]">
							<div className="w-full flex items-end bg-white h-[1px] bg-opacity-70">
								<div className="flex w-full">
									{banners.map((_, index) => (
										<div
											key={index}
											className={`h-[5px] flex-1 ${current - 1 === index ? "bg-white" : ""}`}
										></div>
									))}
								</div>
							</div>
						</div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
