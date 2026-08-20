import { getDbData } from "@/app/actions/cms";
import CertificationsClient from "./CertificationsClient";

export default async function CertificationsPage() {
  const data = await getDbData();
  return <CertificationsClient certifications={data.certifications} />;
}
