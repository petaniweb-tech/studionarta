"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface VideoPlayerProps {
  url?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  showButton?: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export default function VideoPlayer({
  url,
  autoPlay = false,
  muted = true,
  loop = true,
  className,
  showButton,
  videoRef,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [showButtonState, setShowButtonState] = useState(showButton);
  const [fadeOut, setFadeOut] = useState(false);
  const [orientation, setOrientation] = useState("landscape");

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

  // Detect orientation on video metadata load
  useEffect(() => {
    const videoElement = finalVideoRef.current;
    if (videoElement) {
      const handleLoadedMetadata = () => {
        if (videoElement.videoWidth > videoElement.videoHeight) {
          setOrientation("landscape");
        } else {
          setOrientation("portrait");
        }
      };

      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [finalVideoRef]);

  const landscapeVideoVariants = {
    played: {
      width: "100vw",
      height: "auto",
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
    paused: {
      width: "100vw",
      height: "100vh",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const portraitVideoVariants = {
    played: {
      width: "auto",
      height: "100vh",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    paused: {
      width: "100vw",
      height: "100vh",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const variantBasedOnOrientation =
    orientation === "landscape"
      ? landscapeVideoVariants
      : portraitVideoVariants;

  const videoVariants =
    process?.env?.NEXT_PUBLIC_IS_USED_ASPECT_RATIO_VIDEO === "true"
      ? variantBasedOnOrientation
      : landscapeVideoVariants;

  return (
    <>
      <main
        className="w-full h-screen relative bg-inherit flex items-center justify-center"
        onClick={handleVideoClick}
      >
        <div className="flex w-full h-screen items-center justify-center">
          <motion.video
            ref={finalVideoRef}
            variants={videoVariants}
            initial="paused"
            animate={isPlaying ? "played" : "paused"}
            loop={loop}
            playsInline
            controls={false}
            muted={isMuted}
            className="w-screen object-cover object-center"
          >
            <source src={url} type="video/mp4" />
          </motion.video>
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
                  "scale-100": !isPlaying,
                }
              )}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
