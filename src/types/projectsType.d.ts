export interface ProjectDataType {
	slug: string;
	title: string;
	description: string;
	thumbnail?: Image;
	images?: Image[];
}

export interface ProjectProps {
	params: { slug: string };
}
