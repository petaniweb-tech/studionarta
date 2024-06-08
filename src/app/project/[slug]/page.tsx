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

  // console.log("project", project)

  return (
    <div>
      <center>
        <h1 className="title">Projects detail page: {project.slug}</h1>
        <h2>Project description: {project.description}</h2>
      </center>
    </div>
  );
}
