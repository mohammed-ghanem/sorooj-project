import ProgressBar from "@/app/components/progressBar/ProgressBar";
import Slider from "@/app/components/slider/Slider";
import VideoLibTabs from "@/app/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/app/components/videoLibTabs/VideoTabs";

import {useTranslations} from 'next-intl';

export const dynamic = 'force-static';


export default function Home() {

  const t = useTranslations('HomePage');
  return (
    <div>
      <main className="w-full">
        <h1>{t('title')}</h1>
        {/* <Slider />
        <VideoTabs/> */}
        {/* <ProgressBar /> */}
      </main>
    </div>
  );
}
