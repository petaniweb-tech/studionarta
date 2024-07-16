import Image from "next/image";
import { fetch } from "@/services/sanity";
import { queryProductBySlug } from "@/services/projectsService";
import { ProjectDataType, ProjectProps } from "@/types/projectsType";

// Import Breadcrumb //
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import testdarcy from "@/assets/images/test-darcy.jpg";

async function fetchData(slug: string): Promise<ProjectDataType> {
	return fetch(queryProductBySlug(slug));
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
			<div className="sticky w-full px-sectionpxsm lg:px-sectionpxlg z-[70] top-[76px] lg:top-[99px] bg-bgbase py-[14px] lg:py-4">
				<Breadcrumb className="font-supportingfont">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbSeparator />

						<BreadcrumbItem>
							<BreadcrumbLink href="/project">
								Project
							</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbSeparator />

						<BreadcrumbItem>
							<BreadcrumbPage>{project.title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			{/* <-- === Breadcrumb Start === --> */}

			<section className="w-full px-sectionpxsm lg:px-sectionpxlg pt-32 lg:pt-40">
				<div className="flex flex-col gap-[14px]">
					<h5 className="text-[28px] text-black font-medium tracking-wide">
						{project.title}
					</h5>
					<p
						className="text-[15px] lg:text-sm text-black font-supportingfont opacity-60 leading-relaxed lg:leading-[1.8] lg:pt-3"
						dangerouslySetInnerHTML={{
							__html: project.description,
						}}
					></p>
				</div>
			</section>

			<section className="flex w-full lg:gap-16 items-center justify-center mt-16 mb-28 lg:mt-24">
				<div className="flex w-full flex-col">
					<div className="w-full object-cover object-center">
						{project.video?.url && (
							<video
								src={project.video.url}
								autoPlay={true}
								muted={true}
								loop={true}
								controls={false}
								playsInline
								className="w-screen h-full object-cover"
							/>
						)}
					</div>
					{project.images?.map((image) => (
						<div key={image.url} className="-translate-y-1">
							{image.url && (
								<Image
									src={image.url}
									alt={project.title}
									priority={true}
									width={1000}
									height={1000}
									className="w-screen h-full object-cover"
								/>
							)}
						</div>
					))}
				</div>
			</section>
		</>
	);
}
