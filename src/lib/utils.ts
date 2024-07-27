import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function whatIsType(fileName: string): "video" | "image" | null {
  if (!fileName) {
    return null;
  }

  const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"];
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "webp"];
  const extension = fileName.split(".").pop()?.toLowerCase() || "";

  if (videoExtensions.includes(extension)) {
    return "video";
  }
  if (imageExtensions.includes(extension)) {
    return "image";
  }

  return null;
}
