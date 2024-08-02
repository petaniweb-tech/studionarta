"use client";

import { useState, useRef } from "react";

interface VideoPlayerProps {
	url: string;
	autoPlay?: boolean;
	muted?: boolean;
	loop?: boolean;
	className?: string;
	showButton?: boolean;
	parentAspectClasses?: string;
	videoAspectClasses?: string;
	videoPlayingAspectClasses?: string;
	ignoreAspectInHero?: boolean;
}

export default function VideoPlayer({
	url,
	autoPlay = true,
	muted = true,
	loop = true,
	className = "",
	showButton = true,
	parentAspectClasses = "aspect-square lg:aspect-[16/10]",
	videoAspectClasses = "aspect-square lg:aspect-[16/10]",
	videoPlayingAspectClasses = "aspect-video lg:aspect-[16/9]",
	ignoreAspectInHero = false,
}: VideoPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	return (
		<div
			className={`relative bg-inherit flex items-center justify-center ${
				ignoreAspectInHero ? "h-screen" : parentAspectClasses
			} ${className}`}
		>
			<div className="flex items-center w-full justify-center origin-center">
				<video
					ref={videoRef}
					autoPlay={autoPlay}
					muted={muted}
					loop={loop}
					controls={false}
					playsInline
					className={`object-cover object-center h-full w-full transition-aspectratio duration-700 ${
						ignoreAspectInHero
							? "h-screen"
							: isPlaying
								? videoPlayingAspectClasses
								: videoAspectClasses
					}`}
				>
					<source src={url} type="video/mp4" />
				</video>
			</div>

			{showButton && (
				<div className="absolute inset-0 flex items-center justify-center">
					<button
						onClick={handlePlayPause}
						className="bg-neutral-200 bg-opacity-30 backdrop-blur-lg pt-[7px] pb-2 px-4 rounded-full font-supportingfont text-white"
					>
						{isPlaying ? "Pause Video" : "Play Video"}
					</button>
				</div>
			)}
		</div>
	);
}
