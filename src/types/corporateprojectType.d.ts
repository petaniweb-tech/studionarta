export interface CorporateProjectDataType {
	slug: string;
	title: string;
	description: string;
	sub_headline: string;
	thumbnail?: Image;
	images?: Image[];
	video?: { url: string };
}

export interface CorporateProjectDataTypeSEO {
	title: string;
	description: string;
	thumbnail?: Image;
}

export interface CorporateProjectProps {
	params: { slug: string };
}
