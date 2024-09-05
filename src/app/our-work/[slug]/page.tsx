// Import services
import type { Metadata } from 'next'
import { fetch } from "@/services/sanity";
import { queryProductBySlug, queryProductBySlugSEO } from "@/services/projectsService";

// Import data type
import { ProjectDataType, ProjectDataTypeSEO, ProjectProps } from "@/types/projectsType";

// Import Component
import RenderAsset from "@/components/render-asset";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

// Import Const
import { defaultMetaData } from "@/consts/metadata-default";

const INDEX_DOUBLE_ASSETS = [
	2, 3, 9, 10, 16, 17, 23, 24, 30, 31, 37, 38, 44, 45,
];

async function fetchData(slug: string): Promise<ProjectDataType> {
	return fetch(queryProductBySlug(slug));
}

async function fetchSEO(slug: string): Promise<ProjectDataTypeSEO> {
	return fetch(queryProductBySlugSEO(slug))
}

export async function generateMetadata({ params }: ProjectProps): Promise<Metadata> {
	const project = await fetchSEO(params.slug);
	const description = project.description.split('.')[0];

	const thumbnail = project?.thumbnail?.url || "/studionarta-og.png";

	const metaData = {
		...defaultMetaData,
	};
	metaData.title = `${project.title} - Our Work | Studionarta`;
	metaData.description = description;
	if (metaData.openGraph) {
		// @ts-ignore
		metaData.openGraph.type = "article";
		metaData.openGraph.title = `${project.title} - Our Work | Studionarta`;
		metaData.openGraph.description = description;
		metaData.openGraph.url = `${process?.env?.NEXT_PUBLIC_BASE_URL}/our-work/${params.slug}`;
		metaData.openGraph.images = [
			{
				url: thumbnail,
				width: 1200,
				height: 630,
				alt: project.title,
			}
		]
	}
	return metaData
}

export default async function ProjectDetail({ params }: ProjectProps) {
	const project = await fetchData(params.slug);

	if (!project?.slug) {
		// handle not found data
		return null;
	}

	return (
		<>
			{/* <-- === Breadcrumb Start === --> */}
			<div className="sticky w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl z-[70] top-[76px] lg:top-[83px] 2xl:top-[95px] bg-bgbase py-[14px] lg:pt-[14px] lg:pb-4 2xl:pt-4 2xl:pb-[18px]">
				<DynamicBreadcrumb />
			</div>
			{/* <-- === Breadcrumb Start === --> */}

			<section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl pt-32 lg:pt-40">
				<div className="flex flex-col gap-[14px]">
					<h5 className="text-3xl lg:text-[32px] 2xl:text-4xl text-black font-medium tracking-wide">
						{project.title}
					</h5>
					<p
						className="text-[15px] lg:text-sm 2xl:text-[17px] text-black font-supportingfont text-opacity-60 leading-relaxed lg:leading-[1.8] lg:pt-3"
						dangerouslySetInnerHTML={{
							__html: project.description,
						}}
					></p>
					<p
						className="mt-[6px] lg:mt-[2px] text-[15px] lg:text-sm 2xl:text-[17px] text-black font-supportingfont text-opacity-60 leading-relaxed lg:leading-[1.8] lg:pt-3"
						dangerouslySetInnerHTML={{
							__html: project.sub_headline,
						}}
					></p>
				</div>
			</section>

			<section className="w-full grid grid-cols-2 gap-2 mt-16 mb-28 lg:mt-24">
				{project.images?.map((image, index) => (
					<div
						className={`${INDEX_DOUBLE_ASSETS.includes(index) ? "lg:col-span-1 col-span-2" : "col-span-2"}`}
						key={`wrapper-${project.title}-${index}`}
					>
						<RenderAsset
							key={`${project.title}-${index}`}
							url={image.url}
							imageClassName="w-screen h-full object-cover"
							imageAlt={`${project.title}-${index}`}
							videoClassName="w-screen h-full object-cover"
							videoAutoPlay={false}
							videoLoop={true}
							videoMute={true}
							showButton={true}
						/>
					</div>
				))}
			</section>
		</>
	);
}
