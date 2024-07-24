"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

import { Image as ImageType } from "@/types/commonType";
import { queryAbout } from "@/services/bannersService";
import { fetch } from "@/services/sanity";

export default function AboutCarousel() {
  const [banners, setBanners] = useState<ImageType[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetch(queryAbout)
        .then((data) => {
          const { banners } = data;
          setBanners(banners);
        })
        .catch((err) => console.error(err));
      hasFetched.current = true;
    }
  }, []);

  const imageLabel = [
    "Innovation",
    "Design Excellence",
    "Collaborative Approach",
  ];

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex px-36 2xl:px-[102px] items-start">
          <p className="text-lg text-black [writing-mode:vertical-rl] tracking-wider rotate-180 leading-none">
            About us
          </p>
        </div>
        <div className="flex items-center w-full gap-4 justify-center px-sectionpxlg 2xl:px-sectionpx2xl">
          {imageLabel.map((label, index) => (
            <div className="relative w-full">
              <div className="absolute inset-0 items-end flex px-7 pb-7">
                <p className="text-xl leading-none text-white">{label}</p>
              </div>
              {banners[index]?.url ? (
                <Image
                  src={banners[index].url}
                  alt={`about-image-${label}`}
                  priority={true}
                  width={1000}
                  height={1000}
                  className="w-full h-[210px] object-cover"
                />
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-sectionpxlg 2xl:px-sectionpx2xl w-full mt-4">
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
                className="block w-full h-full aspect-square lg:aspect-auto"
              >
                <Image
                  src={banner.url}
                  alt={`about-image-${index}`}
                  priority={true}
                  width={1000}
                  height={1000}
                  className="object-cover object-center w-full h-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
