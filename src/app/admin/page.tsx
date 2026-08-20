import { getDbData } from "@/app/actions/cms";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboard() {
  const data = await getDbData();

  return (
    <div className="bg-blueprint min-h-screen text-muted-foreground font-mono text-xs uppercase relative flex flex-col items-center pt-[150px] pb-[100px] px-[5vw]">
      
      <div className="w-full max-w-[1400px] text-left border-b border-border pb-12 flex justify-between items-end relative z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-sans tracking-widest text-foreground">CMS DASHBOARD</h1>
          <p className="text-muted-foreground mt-4 lowercase tracking-widest">Authenticated as: <span className="text-foreground font-bold">SYSTEM ADMIN</span></p>
        </div>
        <LogoutButton />
      </div>

      <AdminDashboardClient initialData={data} />
      
    </div>
  );
}
