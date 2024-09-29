import ProgressBar from "@/src/components/progressBar/ProgressBar";
import Slider from "@/src/components/slider/Slider";
import VideoLibTabs from "@/src/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/src/components/videoLibTabs/VideoTabs";

import { useTranslations } from 'next-intl';


export const dynamic = 'force-static';


export default function Home() {
  const t = useTranslations('HomePage');
 
  return (
    <div>
      <main className="w-full">
        <div>home page content</div>
        <h1>{t('title')}</h1>
        {/* <Slider />
        <VideoTabs/> */}
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}
