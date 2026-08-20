import Portfolio from "@/components/Portfolio";
import SplashScreen from "@/components/SplashScreen";
import { getDbData } from "@/app/actions/cms";

export default async function Home() {
  const data = await getDbData();
  return (
    <main>
      <SplashScreen />
      <Portfolio dbData={data} />
    </main>
  );
}
