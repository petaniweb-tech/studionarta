import { fetch } from "@/services/sanity";
import { queryProducts } from "@/services/projectsService";
import { ProjectDataType } from "@/types/projectsType";
import BannerComponent from "@/components/banners";

async function fetchData(): Promise<ProjectDataType[]> {
  return fetch(queryProducts);
}

export default async function Project() {
  const projects = await fetchData();

  if (!projects.length) {
    // handle not found projects
    return null;
  }

  return (
    <div>
      <center>
        <h1 className="title">Projects Page</h1>
        {projects?.map((p) => <p>{p.description}</p>)}

        <BannerComponent type="our-client" />
      </center>
    </div>
  );
}
