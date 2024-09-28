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
  ignoreAspectRatio = false,
  videoRef,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [showButtonState, setShowButtonState] = useState(showButton);
  const [fadeOut, setFadeOut] = useState(false);
  const [orientation, setOrientation] = useState("");

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
    const videoElement = finalVideoRef.current;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        clearTimeout(timerRef.current as NodeJS.Timeout);
        setFadeOut(false);
        setShowButtonState(true);
      } else {
        videoElement.play();
        videoElement.muted = false;
        setIsMuted(false);
        setFadeOut(false);
        setShowButtonState(true);
        hideButtonWithDelay();
      }

      setIsPlaying(!isPlaying);
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
    // Programmatically trigger the video to play on component mount
    const videoElement = finalVideoRef.current;
    if (videoElement && autoPlay) {
      videoElement
        .play()
        .then(() => {
          videoElement.onended = () => {
            videoElement.pause();
            videoElement.onended = null; // Clean up the event listener
            setIsPlaying(false);
          };
        })
        .catch((err) => {
          if (videoElement) {
            videoElement.onended = null; // Clean up the event listener
          }
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
      const handleLoadedMetadata = () => {
        const isLandscape = videoElement.videoWidth > videoElement.videoHeight;
        setOrientation(isLandscape ? "landscape" : "portrait");
      };

      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
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
      <div className="flex items-center justify-center origin-center h-screen w-screen">
        <video
          ref={finalVideoRef}
          muted={isMuted}
          loop={loop}
          controls={false}
          playsInline
          preload="metadata"
          className={cn(
            "object-cover object-center h-full w-full transition-all duration-700",
            {
              "min-w-[25rem] max-w-[25rem] md:min-w-[25rem] md:max-w-[25rem] lg:min-w-[30rem] lg:max-w-[30rem] 2xl:min-h-[40rem] 2xl:max-h-[40rem] aspect-[9/16]": isPlaying && orientation == "portrait",
              "min-h-[16rem] max-h-[16rem] lg:min-h-[49rem] lg:max-h-[49rem] 2xl:min-h-[50rem] 2xl:max-h-[50rem] aspect-video":isPlaying && orientation == "landscape",
              "min-h-[100vh] max-h-[100vh] aspect-square": !isPlaying,
            }
          )}
        >
          <source src={url} type="video/mp4" />
        </video>
      </div>

      {showButtonState && (
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out",
            {
			  "opacity-0": fadeOut,
			  "opacity-100": !fadeOut,
			}
          )}
        >
          <button
            onClick={handleVideoClick}
            className={cn(
              "bg-neutral-200 bg-opacity-30 backdrop-blur-lg pt-[7px] pb-2 px-5 rounded-full font-supportingfont text-white transition-transform duration-300 ease-in-out",
              { 
				"scale-105": isPlaying, 
				"scale-100": !isPlaying
			  }
            )}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      )}
    </div>
  );
}
