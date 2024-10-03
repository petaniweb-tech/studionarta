"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
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
    const hasFetched = useRef(false);
    const swiperRef = useRef<SwiperRef>(null);

    const [banners, setBanners] = useState<Banner[]>([]);
    const [current, setCurrent] = useState(1);

    const videoRefs = useRef<React.RefObject<HTMLVideoElement>[]>([]);

    //   let timeoutId: NodeJS.Timeout[] = [];
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!hasFetched.current) {
            fetch(queryHero)
                .then((data) => setBanners(data.banners))
                .catch((err) => console.error(err));
            hasFetched.current = true;
        }
    }, []);

    const muteAllVideos = () => {
        videoRefs.current.forEach((videoRef) => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.muted = true;
            }
        });
    };

    const swapSlideNext = () => {
        swiperRef?.current?.swiper?.slideNext();
    };

    if (!banners.length) {
        return null;
    }

    return (
        <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            loop={true}
            onSlideChange={(swiper) => {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                muteAllVideos();

                const videoRef = videoRefs.current[swiper.realIndex];
                if (videoRef?.current) {
                    videoRef.current.currentTime = 1;
                    videoRef.current.play();
                    videoRef.current.classList.remove(
                        "min-h-[16rem]",
                        "max-h-[16rem]",
                        "lg:min-h-[49rem]",
                        "lg:max-h-[49rem]",
                        "2xl:min-h-[50rem]",
                        "2xl:max-h-[50rem]"
                    );
                    videoRef.current.classList.add("min-h-[100vh]", "max-h-[100vh]");
                }
                timeoutRef.current = setTimeout(swapSlideNext, 5000); // set default delay 5s

                setCurrent(swiper.realIndex + 1);
            }}
            onClick={(swiper) => {
                const videoRef = videoRefs.current[swiper.realIndex];
                if (videoRef?.current) {
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }

                    const validateVideo = (ref: React.RefObject<HTMLVideoElement>) => {
                        if (ref?.current) {
                            if (ref.current.paused) {
                                timeoutRef.current = setTimeout(swapSlideNext, 3000); // set delay 3s
                                ref.current.onended = null; // Clean up the event listener
                            } else {
                                ref.current.onended = () => {
                                    if (ref?.current) {
                                        ref.current.pause();
                                        ref.current.onended = null; // Clean up the event listener
                                        swapSlideNext();
                                    }
                                };
                            }
                        }
                    };
                    // TODO: Refactor me
                    // This code is not following best practices.
                    // Investigate how to accurately retrieve the current status of the video (playing/paused).
                    // The current implementation introduces a delay to get the status, which may not be optimal.
                    setTimeout(() => validateVideo(videoRef), 5); // set delay 5ms
                }
            }}
            className="w-full h-screen"
        >
            {banners?.map((banner, index) => {
                if (!banner?.url) {
                    return "";
                }

                if (!videoRefs.current[index]) {
                    videoRefs.current[index] = React.createRef<HTMLVideoElement>();
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
                                videoAutoPlay={false}
                                videoLoop={false}
                                videoMute={true}
                                showButton={true}
                                ignoreAspectRatio={true}
                                videoRef={videoRefs.current[index]}
                                isHeroCarousel={true}
                                firstClickVideo={current - 1 === index}
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
