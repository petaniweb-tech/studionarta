// Import services
import { fetch } from "@/services/sanity";
import { queryProductBySlug } from "@/services/projectsService";

// Import data type
import { ProjectDataType, ProjectProps } from "@/types/projectsType";

// Import Component
import RenderAsset from "@/components/render-asset";
import DynamicBreadcrumb from "@/components/dynamic-breadcrumb";

const INDEX_DOUBLE_ASSETS = [
  2, 3, 9, 10, 16, 17, 23, 24, 30, 31, 37, 38, 44, 45,
];

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
      <div className="sticky w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl z-[70] top-[76px] lg:top-[99px] bg-bgbase py-[14px] lg:py-4">
        <DynamicBreadcrumb />
      </div>
      {/* <-- === Breadcrumb Start === --> */}

      <section className="w-full px-sectionpxsm lg:px-sectionpxlg 2xl:px-sectionpx2xl pt-32 lg:pt-40">
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

      <section className="w-full grid grid-cols-2 gap-2 mt-16 mb-28 lg:mt-24">
        {project.images?.map((image, index) => (
          <div
            className={`${INDEX_DOUBLE_ASSETS.includes(index) ? "lg:col-span-1 col-span-2" : "col-span-2"}`} key={`wrapper-${project.title}-${index}`}
          >
            <RenderAsset
              key={`${project.title}-${index}`}
              url={image.url}
              imageClassName="w-screen h-full object-cover"
              imageAlt={`${project.title}-${index}`}
              videoClassName="w-screen h-full object-cover"
              videoAutoPlay={true}
              videoLoop={true}
              videoMute={true}
            />
          </div>
        ))}
      </section>
    </>
  );
}
