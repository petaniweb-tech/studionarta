export interface Hero {
  banners: Image[];
}

export interface Client {
  banners: Image[];
}

export interface About {
  banners: Image[];
  images: Image[];
}

export interface BannersProps {
  type: BannersType;
}

export type BannersType = "hero" | "our-client";
