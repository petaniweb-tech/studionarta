import Image from "next/image";
import { fetch } from "@/services/sanity";
import { queryProductBySlug } from "@/services/projectsService";
import { ProjectDataType, ProjectProps } from "@/types/projectsType";

async function fetchData(slug: string): Promise<ProjectDataType> {
	return fetch(queryProductBySlug(slug));
}

export default async function ProjectDetail({ params }: ProjectProps) {
	const project = await fetchData(params.slug);

	if (!project.slug) {
		// handle not found data
		return null;
	}

	return (
		<>
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg pt-32 lg:pt-40 mb-28">
				<div className="flex flex-col gap-[14px]">
					<h5 className="text-[28px] text-black font-medium tracking-wide">
						{project.title}
					</h5>
					<p className="text-[15px] lg:text-sm text-black font-supportingfont opacity-60 leading-relaxed lg:leading-[1.8] lg:pt-3">
						{project.description}
					</p>
				</div>

				<div className="flex gap-6 lg:gap-16 items-start mt-16 lg:mt-24">
					<p className="text-lg text-black [writing-mode:vertical-rl] rotate-180 leading-none tracking-wider">
						Showcase.
					</p>
					<div className="flex w-full flex-col gap-10 lg:gap-16">
						{project.images?.map((image) => (
							<div key={image.url}>
								{image.url && (
									<Image
										src={image.url}
										alt={project.title}
										priority={true}
										width={1000}
										height={1000}
										className="w-full h-full pb-10 lg:pb-16 border-b-[1px] border-black border-opacity-15"
									/>
								)}
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
