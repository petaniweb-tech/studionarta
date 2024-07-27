import * as React from "react";
import { whatIsType } from "@/lib/utils";
import Image from "next/image";

const RenderAsset: React.FC<{
  url: string;
  imageAlt: string;
  imageClassName: string;
  videoClassName: string;
  videoAutoPlay: boolean;
  videoMute: boolean;
  videoLoop: boolean;
}> = ({
  url,
  imageAlt,
  imageClassName,
  videoClassName,
  videoAutoPlay,
  videoLoop,
  videoMute,
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

  // TODO: update this vide to new video component
  if (type === "video") {
    return (
      <video
        src={url}
        autoPlay={videoAutoPlay}
        muted={videoLoop}
        loop={videoMute}
        controls={false}
        playsInline
        className={videoClassName}
      />
    );
  }

  return null;
};

export default RenderAsset;
