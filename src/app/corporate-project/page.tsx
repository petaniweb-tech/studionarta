import Link from "next/link";

// Import services
import { fetch } from "@/services/sanity";
import { queryCorporateProject } from "@/services/corporateProjectService";

// Import data type
import { CorporateProjectDataType } from "@/types/corporateprojectType";

// Import Components //
import RenderAsset from "@/components/render-asset";

async function fetchData(): Promise<CorporateProjectDataType[]> {
	return fetch(queryCorporateProject);
}

export default async function CorporateProject() {
	const corporateProjects = await fetchData();

	if (!corporateProjects.length) {
		// handle not found corporate projects
		return <div>No Corporate Projects found.</div>;
	}

	return (
		<>
			{/* <-- ==== Project Section Start ==== --> */}
			<section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl pt-[88px] lg:pt-40">
				{/* <-- === Headline Mobile Start === --> */}
				<div className="flex lg:hidden flex-col gap-[14px] mt-5">
					<h5 className="text-[28px] text-black font-medium tracking-wide">
						Corporate Project.
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
				<div className="hidden lg:flex gap-14 2xl:gap-[52px] items-start">
					<p className="text-lg text-transparent [writing-mode:vertical-rl] rotate-180 leading-none tracking-wider">
						XXX
					</p>
					<div className="flex gap-16 justify-between">
						<h5 className="text-[28px] 2xl:text-[34px] text-black font-medium tracking-wide whitespace-nowrap">
							Corporate Project.
						</h5>
						<p className="text-sm 2xl:text-[17px] text-black font-supportingfont opacity-60 leading-[1.8] 2xl:leading-[1.9] pt-3 2xl:pt-[14px]">
							Studionarta is proud to present our latest projects.
							These projects showcase our expertise. We
							collaborated closely with our clients to understand
							their unique needs and develop the best possible
							solution. Above and beyond.
						</p>
					</div>
				</div>
				{/* <-- === Headline Desktop End === --> */}

				<div className="flex gap-6 lg:gap-14 2xl:gap-[52px] items-start mt-16 lg:mt-24 mb-28 lg:mb-36 2xl:mb-[150px]">
					<p className="text-lg 2xl:text-[21px] text-black [writing-mode:vertical-rl] rotate-180 leading-none tracking-wider">
						Corporate Project.
					</p>
					<div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
						{corporateProjects.map((corporateProjects) => (
							<Link
								href={`/corporate-project/${corporateProjects.slug}`}
							>
								<div
									key={corporateProjects.slug}
									className="flex flex-col gap-6 lg:gap-7"
								>
									{corporateProjects?.thumbnail?.url && (
										<div className="w-full h-60 lg:h-52 2xl:h-60 relative">
											<RenderAsset
												key={`${corporateProjects.title}}`}
												url={
													corporateProjects.thumbnail
														.url
												}
												imageClassName="w-full h-full lg:cursor-pointer object-cover"
												imageAlt={`${corporateProjects.title}}`}
												videoClassName="w-full h-full lg:cursor-pointer object-cover"
												videoAutoPlay={true}
												videoLoop={true}
												videoMute={true}
												showButton={false}
											/>
										</div>
									)}
									<div className="flex flex-col gap-2">
										<p className="text-[22px] 2xl:text-[26px] text-black font-semibold">
											{corporateProjects.title}
										</p>
										<p
											className="text-sm text-black text-opacity-60 font-supportingfont leading-[1.7] text-wrap"
											dangerouslySetInnerHTML={{
												__html: corporateProjects.sub_headline,
											}}
										></p>
									</div>
									<div className="w-full h-[1px] bg-black opacity-15 lg:mb-5"></div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
			{/* <-- ==== Project Section End ==== --> */}
		</>
	);
}
