import { getDbData } from "@/app/actions/cms";
import ProjectsClient from "./ProjectsClient";

export default async function ProjectsPage() {
  const data = await getDbData();

  return <ProjectsClient initialProjects={data.projects} />;
}
