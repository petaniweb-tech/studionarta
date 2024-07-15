import Image from "next/image";
import Link from "next/link";
import { fetch } from "@/services/sanity";
import { queryProducts } from "@/services/projectsService";
import { ProjectDataType } from "@/types/projectsType";

// Import Breadcrumb //
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Import Components //
import OurClientCarousel from "@/components/our-client-carousel";

async function fetchData(): Promise<ProjectDataType[]> {
	return fetch(queryProducts);
}

export default async function Project() {
	const projects = await fetchData();

	if (!projects.length) {
		// handle not found projects
		return <div>No projects found.</div>;
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
							<BreadcrumbPage>Project</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			{/* <-- === Breadcrumb Start === --> */}

			{/* <-- ==== Project Section Start ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg pt-[88px] lg:pt-40">
				{/* <-- === Headline Mobile Start === --> */}
				<div className="flex lg:hidden flex-col gap-[14px] mt-5">
					<h5 className="text-[28px] text-black font-medium tracking-wide">
						Project.
					</h5>
					<p className="text-[15px] text-black font-supportingfont opacity-60 leading-relaxed">
						Studionarta is proud to present our latest projects.
						These projects showcase our expertise. We collaborated
						closely with our clients to understand their unique
						needs and develop the best possible solution. Above and
						beyond.
					</p>
				</div>
				{/* <-- === Headline Mobile End === --> */}

				{/* <-- === Headline Desktop Start === --> */}
				<div className="hidden lg:flex gap-16 items-start">
					<p className="text-lg text-transparent [writing-mode:vertical-rl] rotate-180 leading-none tracking-wider">
						XXX
					</p>
					<div className="flex gap-16 justify-between">
						<h5 className="text-[28px] text-black font-medium tracking-wide">
							Project.
						</h5>
						<p className="text-sm text-black font-supportingfont opacity-60 leading-[1.8] pt-3">
							Studionarta is proud to present our latest projects.
							These projects showcase our expertise. We
							collaborated closely with our clients to understand
							their unique needs and develop the best possible
							solution. Above and beyond.
						</p>
					</div>
				</div>
				{/* <-- === Headline Desktop End === --> */}

				<div className="flex gap-6 lg:gap-16 items-start mt-16 lg:mt-24">
					<p className="text-lg text-black [writing-mode:vertical-rl] rotate-180 leading-none tracking-wider">
						Project.
					</p>
					<div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
						{projects.map((project) => (
							<Link href={`/project/${project.slug}`}>
								<div
									key={project.slug}
									className="flex flex-col gap-6 lg:gap-7"
								>
									{project?.thumbnail?.url && (
										<div className="w-full h-60 lg:h-48 relative">
											<Image
												src={project.thumbnail.url}
												alt={project.title}
												priority={true}
												width={1000}
												height={1000}
												className="w-full h-full lg:cursor-pointer object-cover"
											/>
										</div>
									)}
									<div className="flex flex-col gap-1 lg:mb-5">
										<p className="text-[21px] text-black font-semibold">
											{project.title}
										</p>
										{/* <p className="text-sm text-neutral-500 font-supportingfont">
											{project.description}
										</p> */}
									</div>
									{/* <div className="w-full h-[1px] bg-black opacity-15 mt-1 lg:mb-5"></div> */}
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
			{/* <-- ==== Project Section End ==== --> */}

			{/* <-- ==== Our Client Section Start ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg pt-24">
				<h5 className="block lg:hidden text-[28px] text-black font-medium tracking-wide">
					Our Client.
				</h5>
				<div className="hidden lg:flex gap-16 items-start">
					<p className="text-lg text-transparent [writing-mode:vertical-rl] rotate-180 leading-none tracking-wider">
						XXX
					</p>
					<div className="flex gap-16 justify-between">
						<h5 className="text-[28px] text-black font-medium tracking-wide">
							Our Client.
						</h5>
					</div>
				</div>
			</section>
			<section className="w-full mt-10 lg:mt-14 mb-28">
				<OurClientCarousel />
			</section>
			{/* <-- ==== Our Client Section End ==== --> */}
		</>
	);
}
