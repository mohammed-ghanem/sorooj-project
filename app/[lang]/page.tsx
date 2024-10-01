import ProgressBar from "@/components/progressBar/ProgressBar";
import Slider from "@/components/slider/Slider";
import VideoLibTabs from "@/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/components/videoLibTabs/VideoTabs";
import { getDictionary } from "./dictionaries";


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
        <div>home page content</div>

        {/* <Slider />
        <VideoTabs/> */}
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}
