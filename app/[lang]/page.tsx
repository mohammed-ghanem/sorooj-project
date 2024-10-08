import Slider from "@/components/slider/Slider";
import ProgressBar from "@/components/progressBar/ProgressBar";
import VideoLibTabs from "@/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/components/videoLibTabs/VideoTabs";
import { getDictionary } from "./dictionaries";
import Statistics from "@/components/statistics/Statistics";


export const dynamic = 'force-static';

type Props = {
  params: { lang: string };
};

export default async function Home({ params }: Props) {

  const { lang } = params;

  const dict = await getDictionary(lang);
  return (
    <div>
      <main className="w-full">
           <h1>{dict.pages.homePage.title}</h1>

        <Slider />
        <Statistics/>
        {/* <VideoTabs/>  */}
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}
