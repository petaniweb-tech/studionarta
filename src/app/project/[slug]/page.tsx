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
			<div className="sticky w-full px-sectionpxsm lg:px-sectionpxlg z-[90] top-[76px] lg:top-[99px] bg-bgbase py-[14px] lg:py-4">
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
					<p className="text-[15px] lg:text-sm text-black font-supportingfont opacity-60 leading-relaxed lg:leading-[1.8] lg:pt-3">
						{project.description}
					</p>
				</div>
			</section>

			<section className="flex w-full lg:gap-16 items-center justify-center mt-16 mb-[76px] lg:mb-[56px] lg:mt-24">
				<div className="flex w-full flex-col">
					{project.images?.map((image) => (
						<div key={image.url} className="flex flex-col gap-14">
							{image.url && (
								<Image
									src={image.url}
									alt={project.title}
									priority={true}
									width={1000}
									height={1000}
									className="w-screen h-full"
								/>
							)}
							<div className="w-full items-center justify-center block px-sectionpxsm lg:px-sectionpxlg">
								<div className="w-full lg:px-sectionpxlg h-[1px] bg-black bg-opacity-15 mb-9 lg:mb-14"></div>
							</div>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
