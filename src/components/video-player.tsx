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
	firstClick: boolean;
	isHeroCarousel?: boolean;
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
	firstClick,
	isHeroCarousel = false,
	videoRef,
}: VideoPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(muted);
	const [showButtonState, setShowButtonState] = useState(showButton);
	const [fadeOut, setFadeOut] = useState(false);
	const [isFirstClick, setIsFirstClick] = useState(true);

	const internalVideoRef = useRef<HTMLVideoElement>(null);
	const finalVideoRef = videoRef || internalVideoRef;
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const isLargeScreen =
		typeof window !== "undefined" && window.innerWidth >= 1024;

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
		const videoElement = finalVideoRef.current;
		if (videoElement) {
			if (isPlaying) {
				videoElement.pause();
				clearTimeout(timerRef.current as NodeJS.Timeout);
				setFadeOut(false);
				setShowButtonState(true);
				setIsPlaying(!isPlaying);
				return;
			}

			if (isFirstClick) {
				videoElement.currentTime = 0;
				setIsFirstClick(false);
			}

			videoElement.muted = false;
			videoElement.play();
			setIsMuted(false);
			setFadeOut(false);
			setShowButtonState(true);
			hideButtonWithDelay();
			setIsPlaying(!isPlaying);
			return;
		}
	};

	useEffect(() => {
		if (finalVideoRef?.current?.paused) {
			setIsPlaying(false);
		}
	}, [finalVideoRef?.current?.paused]);

	useEffect(() => {
		const videoElement = finalVideoRef.current;
		if (videoElement) {
			videoElement.muted = isMuted;
		}
	}, [isMuted]);

	useEffect(() => {
		if (firstClick) {
			setIsFirstClick(true); // Reset isFirstClick when the prop changes
		}
	}, [firstClick]);

	useEffect(() => {
		// Programmatically trigger the video to play on component mount
		const videoElement = finalVideoRef.current;
		if (videoElement && autoPlay) {
			videoElement.play().catch((err) => {
				videoElement.onended = null; // Clean up the event listener
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

	useEffect(() => {
		const videoElement = finalVideoRef.current;

		if (videoElement) {
			const handleVideoEnd = () => {
				videoElement.pause();
				setIsFirstClick(true);
				setIsPlaying(false);
			};

			videoElement.addEventListener("ended", handleVideoEnd);

			return () => {
				videoElement.removeEventListener("ended", handleVideoEnd); // Proper cleanup
			};
		}
	}, []);

	return (
		<div
			className={cn(
				"relative bg-inherit flex items-center justify-center",
				{
					"h-screen":
						ignoreAspectRatio || (isHeroCarousel && isLargeScreen),
					[parentAspectClasses]:
						!ignoreAspectRatio &&
						!(isHeroCarousel && isLargeScreen),
				},
				className
			)}
			onClick={handleVideoClick}
		>
			<div className="flex items-center w-full justify-center origin-center">
				<video
					ref={finalVideoRef}
					muted={isMuted}
					loop={loop}
					controls={false}
					playsInline
					preload="metadata"
					className={`object-cover object-center h-full w-full transition-all duration-700 ${
						isHeroCarousel
							? isLargeScreen
								? // Large devices: always h-screen and w-screen
									"w-screen h-screen"
								: // Small devices: aspect ratio transition when playing
									isPlaying
									? "h-[56.25vw] lg:min-h-[49rem] lg:max-h-[49rem] 2xl:min-h-[50rem] 2xl:max-h-[50rem]"
									: "h-[100vh]"
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
