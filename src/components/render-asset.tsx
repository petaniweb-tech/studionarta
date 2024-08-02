import * as React from "react";
import { whatIsType } from "@/lib/utils";
import Image from "next/image";
import VideoPlayerTest from "./video-player";

const RenderAsset: React.FC<{
	url: string;
	imageAlt: string;
	imageClassName: string;
	videoClassName: string;
	videoAutoPlay: boolean;
	videoMute: boolean;
	videoLoop: boolean;
	showButton?: boolean;
	parentAspectClasses?: string;
	videoAspectClasses?: string;
	videoPlayingAspectClasses?: string;
	ignoreAspectInHero?: boolean;
}> = ({
	url,
	imageAlt,
	imageClassName,
	videoClassName,
	videoAutoPlay,
	videoLoop,
	videoMute,
	showButton = true,
	parentAspectClasses = "aspect-square lg:aspect-[16/10]",
	videoAspectClasses = "aspect-square lg:aspect-[16/10]",
	videoPlayingAspectClasses = "aspect-video lg:aspect-[16/9]",
	ignoreAspectInHero = false,
}) => {
	const type = whatIsType(url);

	if (type === "image") {
		return (
			<Image
				src={url}
				alt={imageAlt}
				priority={true}
				width={0}
				height={0}
				sizes="100vw"
				quality={100}
				className={imageClassName}
			/>
		);
	}

	if (type === "video") {
		return (
			<VideoPlayerTest
				url={url}
				autoPlay={videoAutoPlay}
				muted={videoMute}
				loop={videoLoop}
				className={videoClassName}
				showButton={showButton}
				parentAspectClasses={parentAspectClasses}
				videoAspectClasses={videoAspectClasses}
				videoPlayingAspectClasses={videoPlayingAspectClasses}
				ignoreAspectInHero={ignoreAspectInHero}
			/>
		);
	}

	return null;
};

export default RenderAsset;