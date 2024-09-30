import ProgressBar from "@/src/components/progressBar/ProgressBar";
import Slider from "@/src/components/slider/Slider";
import VideoLibTabs from "@/src/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/src/components/videoLibTabs/VideoTabs";
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
           <h1>{dict.title}</h1>
        <div>home page content</div>

        {/* <Slider />
        <VideoTabs/> */}
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}