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
}: VideoPlayerProps) {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(muted);
	const [showButtonState, setShowButtonState] = useState(showButton);
	const [fadeOut, setFadeOut] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const hideButtonWithDelay = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}
		timerRef.current = setTimeout(() => {
			setFadeOut(true);
			setTimeout(() => {
				setShowButtonState(false);
			}, 300); // Match the duration of the fade-out effect
		}, 3000);
	};

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				clearTimeout(timerRef.current as NodeJS.Timeout);
				setFadeOut(false);
				setShowButtonState(true);
			} else {
				videoRef.current.play();
				setIsMuted(false);
				videoRef.current.muted = false;
				setFadeOut(false);
				setShowButtonState(true);
				hideButtonWithDelay();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleVideoClick = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				clearTimeout(timerRef.current as NodeJS.Timeout);
				setFadeOut(false);
				setShowButtonState(true);
				setIsPlaying(false);
			} else {
				videoRef.current.play();
				setIsMuted(false);
				videoRef.current.muted = false;
				setFadeOut(false);
				setShowButtonState(true);
				hideButtonWithDelay();
				setIsPlaying(true);
			}
		}
	};

	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

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
					ref={videoRef}
					autoPlay={autoPlay}
					muted={isMuted}
					loop={loop}
					controls={false}
					playsInline
					className={`object-cover object-center h-full w-full transition-aspectratio duration-700 ${
						ignoreAspectRatio
							? "h-screen"
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
						onClick={handlePlayPause}
						className="bg-neutral-200 bg-opacity-30 backdrop-blur-lg pt-[7px] pb-2 px-5 rounded-full font-supportingfont text-white"
					>
						{isPlaying ? "Pause" : "Play"}
					</button>
				</div>
			)}
		</div>
	);
}
