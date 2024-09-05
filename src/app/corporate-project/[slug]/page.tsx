import { Metadata } from "next";
// Import services
import { fetch } from "@/services/sanity";
import { queryCorporateProjectBySlug, queryCorporateProjectBySlugSEO } from "@/services/corporateProjectService";

// Import data type
import {
	CorporateProjectDataType,
	CorporateProjectDataTypeSEO,
	CorporateProjectProps,
} from "@/types/corporateprojectType";

// Import Component
import RenderAsset from "@/components/render-asset";

// Import Const
import { defaultMetaData } from "@/consts/metadata-default";

const INDEX_DOUBLE_ASSETS = [
	2, 3, 9, 10, 16, 17, 23, 24, 30, 31, 37, 38, 44, 45,
];

async function fetchData(slug: string): Promise<CorporateProjectDataType> {
	return fetch(queryCorporateProjectBySlug(slug));
}

async function fetchSEO(slug: string): Promise<CorporateProjectDataTypeSEO> {
	return fetch(queryCorporateProjectBySlugSEO(slug))
}

export async function generateMetadata({ params }: CorporateProjectProps): Promise<Metadata> {
	const project = await fetchSEO(params.slug);
	const description = project.description.split('.')[0];

	const thumbnail = project?.thumbnail?.url || "/studionarta-og.png";

	const metaData = defaultMetaData;
	metaData.title = `${project.title} - Corporate Project | Studionarta`;
	metaData.description = description;
	if (metaData.openGraph) {
		// @ts-ignore 
		metaData.openGraph.type = "article";
		metaData.openGraph.url = `${process?.env?.NEXT_PUBLIC_BASE_URL}/corporate-project/${params.slug}`;
		metaData.openGraph.title = `${project.title} - Corporate Project | Studionarta`;
		metaData.openGraph.description = description;
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

export default async function CorporateProjectDetail({
	params,
}: CorporateProjectProps) {
	const corporateProject = await fetchData(params.slug);

	if (!corporateProject?.slug) {
		// handle not found data
		return null;
	}

	return (
		<>
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl pt-32 lg:pt-40">
				<div className="flex flex-col gap-[14px]">
					<h5 className="text-3xl lg:text-[32px] 2xl:text-4xl text-black font-medium tracking-wide">
						{corporateProject.title}
					</h5>
					<p
						className="text-[15px] lg:text-sm 2xl:text-[17px] text-black font-supportingfont text-opacity-60 leading-relaxed lg:leading-[1.8] lg:pt-3"
						dangerouslySetInnerHTML={{
							__html: corporateProject.description,
						}}
					></p>
					<p
						className="mt-[6px] lg:mt-[2px] text-[15px] lg:text-sm 2xl:text-[17px] text-black font-supportingfont text-opacity-60 leading-relaxed lg:leading-[1.8] lg:pt-3"
						dangerouslySetInnerHTML={{
							__html: corporateProject.sub_headline,
						}}
					></p>
				</div>
			</section>

			<section className="w-full grid grid-cols-2 gap-2 mt-16 mb-28 lg:mt-24">
				{corporateProject.images?.map((image, index) => (
					<div
						className={`${INDEX_DOUBLE_ASSETS.includes(index) ? "lg:col-span-1 col-span-2" : "col-span-2"}`}
						key={`wrapper-${corporateProject.title}-${index}`}
					>
						<RenderAsset
							key={`${corporateProject.title}-${index}`}
							url={image.url}
							imageClassName="w-screen h-full object-cover"
							imageAlt={`${corporateProject.title}-${index}`}
							videoClassName="w-screen h-full object-cover"
							videoAutoPlay={true}
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
