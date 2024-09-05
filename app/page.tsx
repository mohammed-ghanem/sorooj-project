import ProgressBar from "@/components/progressBar/ProgressBar";
import Slider from "@/components/slider/Slider";
import VideoLibTabs from "@/components/videoLibTabs/VideoLibTabs";
import VideoTabs from "@/components/videoLibTabs/VideoTabs";
export const dynamic = 'force-static';


export default function Home() {
  return (
    <div>
      <main className="w-full">
        {/* <Slider />
        <VideoTabs/> */}
        <ProgressBar />
      </main>
    </div>
  );
}
