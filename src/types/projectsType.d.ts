export interface ProjectDataType {
	slug: string;
	title: string;
	description: string;
	sub_headline: string;
	thumbnail?: Image;
	images?: Image[];
	video?: { url: string };
}

export interface ProjectDataTypeSEO {
	title: string;
	description: string;
	thumbnail?: Image;
}

export interface ProjectProps {
	params: { slug: string };
}
