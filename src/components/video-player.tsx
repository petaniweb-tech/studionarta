"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

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
	ignoreAspectRatio?: boolean;
	videoRef?: React.RefObject<HTMLVideoElement>;
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
	ignoreAspectRatio = false,
	videoRef,
}: VideoPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(muted);
	const [showButtonState, setShowButtonState] = useState(showButton);
	const [fadeOut, setFadeOut] = useState(false);
	const internalVideoRef = useRef<HTMLVideoElement>(null);
	const finalVideoRef = videoRef || internalVideoRef;
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const hideButtonWithDelay = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			setFadeOut(true);
			setTimeout(() => {
				setShowButtonState(false);
			}, 300); // Fade Out duration
		}, 3000);
	};

	const handleVideoClick = () => {
		if (finalVideoRef.current) {
			if (isPlaying) {
				finalVideoRef.current.pause();
				clearTimeout(timerRef.current as NodeJS.Timeout);
				setFadeOut(false);
				setShowButtonState(true);
			} else {
				finalVideoRef.current.play();
				finalVideoRef.current.muted = false;
				setIsMuted(false);
				setFadeOut(false);
				setShowButtonState(true);
				hideButtonWithDelay();
			}

			setIsPlaying(!isPlaying);
		}
	};

	useEffect(() => {
		if (finalVideoRef.current) {
			finalVideoRef.current.muted = isMuted;
		}
	}, [isMuted]);

	useEffect(() => {
		// Programmatically trigger the video to play on component mount
		if (finalVideoRef.current && autoPlay) {
			finalVideoRef.current.play().catch((err) => {
				// Handle autoplay failure (browser restrictions, etc.)
				console.error("Autoplay failed: ", err);
				setIsPlaying(false);
			});
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [autoPlay]);

	return (
		<div
			className={cn(
				"relative bg-inherit flex items-center justify-center",
				{
					"h-screen": ignoreAspectRatio,
					[parentAspectClasses]: !ignoreAspectRatio,
				},
				className
			)}
			onClick={handleVideoClick}
		>
			<div className="flex items-center w-full justify-center origin-center">
				<video
					ref={finalVideoRef}
					autoPlay={autoPlay}
					muted={isMuted}
					loop={loop}
					controls={false}
					playsInline
					className={`object-cover object-center h-full w-full transition-all duration-700 ${
						ignoreAspectRatio
							? isPlaying
								? "min-h-[16rem] max-h-[16rem] lg:min-h-[49rem] lg:max-h-[49rem] 2xl:min-h-[50rem] 2xl:max-h-[50rem]"
								: "min-h-[100vh] max-h-[100vh]"
							: isPlaying
								? videoPlayingAspectClasses
								: videoAspectClasses
					}`}
				>
					<source src={url} type="video/mp4" />
				</video>
			</div>

			{showButtonState && (
				<div
					className={cn(
						"absolute inset-0 flex items-center justify-center transition-opacity duration-500",
						{ "opacity-0": fadeOut, "opacity-100": !fadeOut }
					)}
				>
					<button
						onClick={handleVideoClick}
						className="bg-neutral-200 bg-opacity-30 backdrop-blur-lg pt-[7px] pb-2 px-5 rounded-full font-supportingfont text-white"
					>
						{isPlaying ? "Pause" : "Play"}
					</button>
				</div>
			)}
		</div>
	);
}
