"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

//  Import Services
import { queryHero } from "@/services/bannersService";
import { fetch } from "@/services/sanity";

// Import CSS
import "swiper/css";

// Import Assets //
import RenderAsset from "./render-asset";

interface Banner {
	url: string;
}

export default function HeroCarousel() {
	const [banners, setBanners] = useState<Banner[]>([]);
	const hasFetched = useRef(false);
	const [swiperRef, setSwiperRef] = useState<any>(null);
	const [current, setCurrent] = useState(1);
	const videoRefs = useRef<React.RefObject<HTMLVideoElement>[]>([]);

	useEffect(() => {
		if (!hasFetched.current) {
			fetch(queryHero)
				.then((data) => setBanners(data.banners))
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
			// Pause the previous video
			videoRefs.current.forEach((videoRef) => {
				if (videoRef.current) {
					videoRef.current.pause();
				}
			});
			setCurrent(swiperRef.realIndex + 1);
		});
	}, [swiperRef]);

	return (
		<Swiper
			modules={[Autoplay]}
			loop={true}
			autoplay={{
				delay: 12000,
				disableOnInteraction: true,
			}}
			onSwiper={setSwiperRef}
			className="w-full h-screen"
		>
			{banners?.map((banner, index) => {
				if (!banner?.url) {
					return "";
				}

				if (!videoRefs.current[index]) {
					videoRefs.current[index] =
						React.createRef<HTMLVideoElement>();
				}

				return (
					<SwiperSlide
						key={`banner-${index}`}
						className="block w-full object-cover"
					>
						<div className="relative">
							<RenderAsset
								url={banner.url}
								imageClassName="object-cover object-center h-screen w-full"
								imageAlt={`banner-image-${index}`}
								videoClassName="object-cover object-center h-screen w-full"
								videoAutoPlay={true}
								videoLoop={true}
								videoMute={true}
								showButton={true}
								ignoreAspectRatio={true}
								videoRef={videoRefs.current[index]}
							/>

							<div
								className="absolute flex justify-center w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl items-end pb-10 lg:pb-[70px]"
								style={{
									height: "fit-content",
									alignSelf: "flex-end",
									bottom: 0,
								}}
							>
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
				);
			})}
		</Swiper>
	);
}
