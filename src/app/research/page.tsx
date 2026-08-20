import { getDbData } from "@/app/actions/cms";
import ResearchClient from "./ResearchClient";

export default async function ResearchPage() {
  const data = await getDbData();
  return <ResearchClient research={data.research} hackathons={data.hackathons} />;
}
